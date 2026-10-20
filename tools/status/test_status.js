// test_status.js - STATUS_JSON_PREREGISTER.md, test 1 (red before the code, green after).
// For each engine: last_data_date and open_call computed from the payload (line 2 of <sport>/app.js) by the rules
// taken out of hub.app.js itself, and the root hub's fields, compared with <sport>/status.json.
// node tools/status/test_status.js [<preview dir>]   (default: the repo root)
const fs = require('fs'), path = require('path');
const DIR = process.argv[2] || path.join(__dirname, '..', '..');
const HUB = fs.readFileSync(path.join(__dirname, '..', '..', 'hub.app.js'), 'utf8');
const take = (name) => { const m = HUB.match(new RegExp('const ' + name + ' = (\\{[\\s\\S]*?\\n    \\});')); if (!m) throw new Error('rule not found: ' + name); return eval('(' + m[1] + ')'); };
const pick = take('pick'), hasCall = take('hasCall');
const norm = v => JSON.parse(JSON.stringify(v === undefined ? null : v, (k, x) => x === undefined ? null : x));
const sub = (o, keys) => Object.fromEntries(keys.map(k => [k, o ? (o[k] === undefined ? null : o[k]) : null]));
const HUBF = {
  nfl: R => sub(R, ['state', 'curWeek', 'season', 'seasonRecord', 'aplusSeason']),
  nba: R => ({ isOffseason: R.isOffseason === undefined ? null : R.isOffseason, nextGame: sub(R.nextGame, ['date']) }),
  mlb: R => ({ slate: sub(R.slate, ['date', 'games']), liveRecord: sub(R.liveRecord, ['season', 'calls', 'correct']) }),
  tennis: R => ({ quotaPauseUntil: R.quotaPauseUntil === undefined ? null : R.quotaPauseUntil,
                  accuracy: sub(R.accuracy, ['journal_n', 'journal_acc', 'journal_aplus_n', 'journal_aplus_acc']) }),
  worldcup: R => { const ms = R.matches || []; return { all_decided: ms.length > 0 && ms.every(m => m.decided),
                   last_match_date: ms.map(m => m.date).filter(Boolean).sort().pop() || null,
                   accuracy: sub(R.accuracy, ['n_called', 'n_correct', 'aplus']) }; },
};
let fails = 0;
const check = (name, ok, detail) => { console.log((ok ? 'PASS ' : 'FAIL ') + name + (ok ? '' : '  [' + detail + ']')); if (!ok) fails++; };
for (const sp of Object.keys(pick)) {
  const line = fs.readFileSync(path.join(DIR, sp, 'app.js'), 'utf8').split('\n')[1];
  const R = JSON.parse(line.slice(line.indexOf('=') + 1).trim().replace(/;$/, ''));
  const ds = pick[sp](R).filter(x => /^\d{4}-\d{2}-\d{2}/.test(String(x))).map(x => String(x).slice(0, 10)).sort();
  const want = { last_data_date: ds.length ? ds[ds.length - 1] : null, open_call: hasCall[sp](R), hub: norm(HUBF[sp](R)) };
  let st;
  try { st = JSON.parse(fs.readFileSync(path.join(DIR, sp, 'status.json'), 'utf8')); }
  catch (e) { check(sp + ': status.json readable', false, e.code || e.message); continue; }
  check(sp + ': v 1 and engine', st.v === 1 && st.engine === sp, JSON.stringify([st.v, st.engine]));
  check(sp + ': built_utc ISO 8601 UTC with Z', /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(st.built_utc || ''), st.built_utc);
  check(sp + ': last_data_date = hub rule', st.last_data_date === want.last_data_date, st.last_data_date + ' vs ' + want.last_data_date);
  check(sp + ': open_call = hub rule', st.open_call === want.open_call, st.open_call + ' vs ' + want.open_call);
  check(sp + ': hub fields = payload', JSON.stringify(norm(st.hub)) === JSON.stringify(want.hub), JSON.stringify(st.hub) + ' vs ' + JSON.stringify(want.hub));
}
console.log(fails ? fails + ' FAILED' : 'ALL TESTS PASS'); process.exit(fails ? 1 : 0);
