// Page load measurement (KNOWN_DEFECTS 103): headless Chromium over CDP, cache disabled, one fresh tab per load.
// node --experimental-websocket perf.mjs [--slow] <base> <outdir> <runs> <width,...> <path> [<path> ...]
// --slow: CPU 4x slower, 1.6 Mbps down / 750 kbps up, 150 ms round trip. Browser: env CHROME_BIN (any Chromium).
// Per load: FCP (paint timing), DOMContentLoaded, load, bytes over the wire (Network.loadingFinished), three.js bytes
// and the time its first request starts; a screenshot 6 s after load for the visual check.
// The Chrome profile is made under $CHROME_PROFILES (default ~/prediction-engines-work/work/chrome-profiles, never /tmp)
// and removed at the end of every run, also when the run fails or is stopped by a signal.
import { spawn } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const argv = process.argv.slice(2); const SLOW = argv[0] === '--slow'; if (SLOW) argv.shift();
const [base, outdir, runsS, widthsS, ...paths] = argv;
const runs = +runsS, widths = widthsS.split(',').map(Number);
const BIN = process.env.CHROME_BIN || (process.env.HOME + '/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell');
const port = 9300 + Math.floor(Math.random() * 500);
const PROFILES = process.env.CHROME_PROFILES || join(process.env.HOME, 'prediction-engines-work', 'work', 'chrome-profiles');
mkdirSync(PROFILES, { recursive: true });
const profile = mkdtempSync(join(PROFILES, 'perf-'));
const proc = spawn(BIN, [`--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
  '--no-first-run', '--disable-gpu-sandbox', '--use-angle=metal', 'about:blank'], { stdio: 'ignore' });
const exited = new Promise(r => proc.once('exit', r));
const sleep = ms => new Promise(r => setTimeout(r, ms));
let ws = null;
const removeProfile = () => { try { rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 }); } catch {} };
for (const sig of ['SIGINT', 'SIGTERM', 'SIGHUP', 'SIGALRM']) process.on(sig, () => { try { ws && ws.close(); } catch {} try { proc.kill('SIGKILL'); } catch {} removeProfile(); process.exit(128); });
let code = 0;
try {
let ver; for (let i = 0; i < 50; i++) { try { ver = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json(); break; } catch { await sleep(200); } }
if (!ver) throw new Error('Chromium did not answer on ' + port);
ws = new WebSocket(ver.webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener('open', r, { once: true }));
let id = 0; const pend = new Map(); const listeners = [];
ws.addEventListener('message', ev => { const m = JSON.parse(ev.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } else listeners.forEach(f => f(m)); });
const send = (method, params = {}, sessionId) => new Promise(r => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params, sessionId })); });

const out = [];
for (const w of widths) for (const p of paths) for (let k = 0; k < runs; k++) {
  const { result: { targetId } } = await send('Target.createTarget', { url: 'about:blank' });
  const { result: { sessionId } } = await send('Target.attachToTarget', { targetId, flatten: true });
  const s = (m, pr) => send(m, pr, sessionId);
  await s('Page.enable'); await s('Network.enable'); await s('Network.setCacheDisabled', { cacheDisabled: true });
  if (SLOW) {
    await s('Emulation.setCPUThrottlingRate', { rate: 4 });
    await s('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 1.6e6 / 8, uploadThroughput: 750e3 / 8 });
  }
  await s('Emulation.setDeviceMetricsOverride', { width: w, height: w < 600 ? 844 : 768, deviceScaleFactor: 1, mobile: w < 600 });
  let bytes = 0, threeBytes = 0; const urls = new Map();
  const onMsg = m => {
    if (m.sessionId !== sessionId) return;
    if (m.method === 'Network.requestWillBeSent') urls.set(m.params.requestId, m.params.request.url);
    if (m.method === 'Network.loadingFinished') { bytes += m.params.encodedDataLength; if (/three/.test(urls.get(m.params.requestId) || '')) threeBytes += m.params.encodedDataLength; }
  };
  listeners.push(onMsg);
  const loaded = new Promise(r => { const f = m => { if (m.sessionId === sessionId && m.method === 'Page.loadEventFired') r(); }; listeners.push(f); });
  await s('Page.navigate', { url: base + p });
  await Promise.race([loaded, sleep(SLOW ? 60000 : 20000)]);
  await sleep(SLOW ? 9000 : 6000);
  const ev = await s('Runtime.evaluate', { returnByValue: true, expression: `(() => { const n = performance.getEntriesByType('navigation')[0];
      const f = performance.getEntriesByType('paint').find(x => x.name === 'first-contentful-paint');
      const th = performance.getEntriesByType('resource').filter(r => /three/.test(r.name));
      const cv = document.getElementById('cc3d');
      return { fcp: f ? Math.round(f.startTime) : null, dcl: Math.round(n.domContentLoadedEventEnd), load: Math.round(n.loadEventEnd),
               threeStart: th.length ? Math.round(Math.min(...th.map(r => r.startTime))) : null,
               threeEnd: th.length ? Math.round(Math.max(...th.map(r => r.responseEnd))) : null,
               canvas: cv ? { w: cv.width, h: cv.height, drawn: !!cv.getAttribute('data-engine') || cv.width > 300 } : null }; })()` });
  const r = ev.result.result.value;
  const shot = await s('Page.captureScreenshot', { format: 'png' });
  const name = `${p.replace(/\//g, '_')}_w${w}_r${k}`;
  writeFileSync(join(outdir, name + '.png'), Buffer.from(shot.result.data, 'base64'));
  out.push({ path: p, w, run: k, ...r, kb: Math.round(bytes / 1024), threeKb: Math.round(threeBytes / 1024) });
  listeners.splice(0, listeners.length);
  await send('Target.closeTarget', { targetId });
}
console.log(JSON.stringify(out));
} catch (e) {
  code = 1; console.error('perf failed: ' + (e && e.message || e));
} finally {
  try { ws && ws.close(); } catch {}
  try { proc.kill(); } catch {}
  await Promise.race([exited, sleep(5000)]);
  try { proc.kill('SIGKILL'); } catch {}
  removeProfile();
}
process.exit(code);
