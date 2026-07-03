/* hub portal */
class Component extends DCLogic {
  state = { lang: 'he' };

  setCanvas = (el) => { this.canvasEl = el; };

  componentDidMount() {
    const build = () => {
      const cvs = document.getElementById('pe-bg-canvas');
      if (!cvs || !cvs.clientWidth) { this._raf = requestAnimationFrame(build); return; }
      this.canvasEl = cvs;
      const ctx = cvs.getContext('2d');
      let W = 0, H = 0, DPR = 1;
      const ensureSize = () => {
        const cw = cvs.clientWidth || cvs.parentElement.clientWidth || 900;
        const ch = cvs.clientHeight || 960;
        if (cw === W && ch === H) return;
        DPR = Math.min(window.devicePixelRatio || 1, 2);
        W = cw; H = ch;
        cvs.width = W * DPR; cvs.height = H * DPR;
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      };

      // fibonacci sphere
      const N = 340;
      const pts = [];
      const gold = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < N; i++) {
        const y = 1 - (i / (N - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const th = gold * i;
        pts.push({ x: Math.cos(th) * r, y, z: Math.sin(th) * r });
      }
      // precompute edges (rigid sphere)
      const edges = [];
      const TH = 0.30;
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, dz = pts[i].z - pts[j].z;
          if (dx * dx + dy * dy + dz * dz < TH * TH) edges.push([i, j]);
        }
      }
      // engine anchor nodes
      const engColors = ['#ff8a3d', '#34e08a', '#3d9bff', '#a78bfa', '#c4f542'];
      const engEmoji = ['🏀', '⚽', '⚾', '🏈', '🎾'];
      const anchors = [];
      for (let k = 0; k < 5; k++) {
        const idx = Math.floor((k + 0.5) / 5 * N);
        anchors.push({ i: idx, color: engColors[k], emoji: engEmoji[k] });
      }

      let ay = 0;
      const camDist = 2.4;
      const ax = 0.42, cosX = Math.cos(ax), sinX = Math.sin(ax);

      const project = (p, cosY, sinY, R, cx, cy) => {
        let x = p.x * cosY - p.z * sinY;
        let z = p.x * sinY + p.z * cosY;
        let y = p.y * cosX - z * sinX;
        z = p.y * sinX + z * cosX;
        const f = camDist / (camDist - z);
        return { sx: cx + x * R * f, sy: cy + y * R * f, f, z };
      };

      const loop = () => {
        if (!this.canvasEl) return;
        ensureSize();
        ay += 0.0012;
        const cosY = Math.cos(ay), sinY = Math.sin(ay);
        const R = Math.min(W, H) * 0.42;
        const cx = W * 0.5, cy = 430;
        ctx.clearRect(0, 0, W, H);

        // central core glow — the hub all engines connect to
        const coreR = R * 0.2;
        const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 2.6);
        const cpulse = 0.28 + Math.sin(Date.now() * 0.0018) * 0.06;
        cg.addColorStop(0, `rgba(150,138,255,${cpulse})`);
        cg.addColorStop(0.5, 'rgba(124,109,255,0.09)');
        cg.addColorStop(1, 'rgba(124,109,255,0)');
        ctx.fillStyle = cg;
        ctx.beginPath(); ctx.arc(cx, cy, coreR * 2.6, 0, Math.PI * 2); ctx.fill();

        const pr = pts.map(p => project(p, cosY, sinY, R, cx, cy));

        // edges
        ctx.lineWidth = 1;
        for (let e = 0; e < edges.length; e++) {
          const a = pr[edges[e][0]], b = pr[edges[e][1]];
          const depth = (a.f + b.f) / 2;
          const al = Math.max(0, (depth - 0.62) * 0.5);
          if (al <= 0.01) continue;
          ctx.strokeStyle = `rgba(124,109,255,${al * 0.5})`;
          ctx.beginPath(); ctx.moveTo(a.sx, a.sy); ctx.lineTo(b.sx, b.sy); ctx.stroke();
        }
        // dots
        for (let i = 0; i < N; i++) {
          const p = pr[i];
          const al = Math.max(0.06, (p.f - 0.5) * 0.7);
          const rad = Math.max(0.6, p.f * 1.5);
          ctx.beginPath();
          ctx.fillStyle = `rgba(200,214,255,${al})`;
          ctx.arc(p.sx, p.sy, rad, 0, Math.PI * 2); ctx.fill();
        }
        // engine anchors (sorted back-to-front)
        const av = anchors.map(a => ({ ...a, ...pr[a.i] })).sort((m, n) => m.z - n.z);
        for (const a of av) {
          const front = a.f > 0.85;
          // spoke from the core out to the engine anchor
          const sp = Math.max(0, (a.f - 0.5)) * 0.5;
          if (sp > 0.02) { ctx.strokeStyle = a.color + Math.round(sp * 255).toString(16).padStart(2, '0'); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(a.sx, a.sy); ctx.stroke(); }
          const glowR = 26 * a.f;
          const g = ctx.createRadialGradient(a.sx, a.sy, 0, a.sx, a.sy, glowR);
          g.addColorStop(0, a.color + (front ? 'cc' : '55'));
          g.addColorStop(1, a.color + '00');
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(a.sx, a.sy, glowR, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath();
          ctx.fillStyle = a.color;
          ctx.arc(a.sx, a.sy, Math.max(2.5, 4.5 * a.f), 0, Math.PI * 2); ctx.fill();
          if (front) {
            ctx.font = `${Math.round(17 * a.f)}px sans-serif`;
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.globalAlpha = Math.min(1, (a.f - 0.85) * 6);
            ctx.fillText(a.emoji, a.sx, a.sy - glowR - 10);
            ctx.globalAlpha = 1;
          }
        }
        this._raf = requestAnimationFrame(loop);
      };
      loop();
    };
    build();
  }

  componentWillUnmount() {
    if (this._raf) cancelAnimationFrame(this._raf);
    this.canvasEl = null;
  }

  data() {
    const he = {
      dir: 'rtl',
      brand: 'מנועי חיזוי',
      liveTag: '2 מנועים חיים',
      eyebrow: 'שיטת מסחר ממושמעת · ספורט',
      h1a: 'לא ניחוש.',
      h1b: 'חיזוי בשיטה.',
      subtitle: 'חמישה מנועים חוזים תוצאות ספורט בשיטת מסחר ממושמעת — מדברים רק על קריאות בביטחון גבוה, ושותקים בשאר. כל בוקר, מכוילים מחדש.',
      cta1: 'צפה בקריאות של היום',
      cta2: 'איך זה עובד',
      sectionKicker: 'חמשת המנועים',
      sectionTitle: 'ענף אחד לכל מנוע',
      sectionSub: 'כל מנוע מאומת על נתונים שלא נראו ומתעדכן אוטומטית ב-06:00. פתח כרטיס לקריאות היום.',
      overallLabel: 'דיוק כללי',
      openLabel: 'פתח מנוע',
      footer: 'כל המנועים מכוילים על נתונים היסטוריים שלא נחשפו למודל. ה-tail, הטוטאל וה-CLV נסגרים על נתונים אמיתיים עם פתיחת העונות.',
      stats: [ {v:'5',k:'מנועים'}, {v:'2',k:'חיים עכשיו'}, {v:'~78%',k:'דיוק A+'}, {v:'06:00',k:'עדכון יומי'} ],
      engines: [
        { emoji:'🏀', name:'NBA', tag:'Elo + 9 שלבים', overall:'65.8%', pct:66, method:'Elo מותאם קצב עם קריאת תשעה שלבים. 82% הצלחה בפרוסת ה-A+ בביטחון הגבוה.', status:'off', statusTextHe:'מחוץ לעונה · חוזר באוקטובר' },
        { emoji:'⚽', name:'מונדיאל 2026', tag:'Elo בינלאומי', overall:'70.0%', pct:70, method:'דירוג נבחרות בינלאומי עם משמעת ביטחון. קריאות דו-כיווניות לכל משחק בטורניר.', status:'live', statusTextHe:'חי · הטורניר פעיל' },
        { emoji:'⚾', name:'בייסבול MLB', tag:'Elo + שלבים', overall:'58.1%', pct:58, method:'Elo עם משמעת שלבים; 70.2% בפרוסת ה-A+, מאומת בין מספר מקורות נתונים.', status:'season', statusTextHe:'בעונה · פעיל' },
        { emoji:'🏈', name:'NFL', tag:'Elo מודע-מרווח', overall:'64.6%', pct:65, method:'Elo מודע-מרווח עם תשעה שלבים. פרוסת A+ מכסה 12% מהמשחקים ב-78.4% דיוק.', status:'off', statusTextHe:'מחוץ לעונה · פתיחה 9.9' },
        { emoji:'🎾', name:'טניס ATP', tag:'Elo משטח-משוקלל', overall:'63.7%', pct:64, method:'Elo משוקלל-משטח עם שלבים. CLV נמדד קדימה, כ-77% דיוק בפרוסת A+.', status:'live', statusTextHe:'חי · מתעדכן יומית' },
      ],
    };
    const en = {
      dir: 'ltr',
      brand: 'Prediction Engines',
      liveTag: '2 engines live',
      eyebrow: 'A disciplined trading method · sports',
      h1a: 'Not a guess.',
      h1b: 'A method.',
      subtitle: 'Five engines forecast sports outcomes with a disciplined trading method — speaking only on high-confidence calls, silent otherwise. Recalibrated every morning.',
      cta1: "See today's calls",
      cta2: 'How it works',
      sectionKicker: 'The five engines',
      sectionTitle: 'One engine per sport',
      sectionSub: 'Each engine is validated on held-out data and updates automatically at 06:00. Open a card for today\u2019s calls.',
      overallLabel: 'overall accuracy',
      openLabel: 'Open engine',
      footer: 'All engines are calibrated on historical data never shown to the model. Tail, total and CLV settle on real data as the seasons open.',
      stats: [ {v:'5',k:'engines'}, {v:'2',k:'live now'}, {v:'~78%',k:'A+ accuracy'}, {v:'06:00',k:'daily update'} ],
      engines: [
        { emoji:'🏀', name:'NBA', tag:'Elo + 9 stages', overall:'65.8%', pct:66, method:'Pace-adjusted Elo with a nine-stage read. 82% hit rate on the high-confidence A+ slice.', status:'off', statusTextHe:'Offseason · returns October' },
        { emoji:'⚽', name:'World Cup 2026', tag:'International Elo', overall:'70.0%', pct:70, method:'International team rating with confidence discipline. Two-way calls on every tournament match.', status:'live', statusTextHe:'Live · tournament on' },
        { emoji:'⚾', name:'MLB', tag:'Elo + stages', overall:'58.1%', pct:58, method:'Elo with stage discipline; 70.2% on the A+ slice, verified across multiple data sources.', status:'season', statusTextHe:'In season · active' },
        { emoji:'🏈', name:'NFL', tag:'Margin-aware Elo', overall:'64.6%', pct:65, method:'Margin-aware Elo with nine stages. The A+ slice covers 12% of games at 78.4% accuracy.', status:'off', statusTextHe:'Offseason · kicks off Sep 9' },
        { emoji:'🎾', name:'ATP Tennis', tag:'Surface-blended Elo', overall:'63.7%', pct:64, method:'Surface-weighted Elo with stages. Forward CLV tracked, ~77% on the A+ slice.', status:'live', statusTextHe:'Live · updates daily' },
      ],
    };
    return this.state.lang === 'he' ? he : en;
  }

  renderVals() {
    const d = this.data();
    const palette = {
      '🏀': { c1:'#ff8a3d', c2:'#ffb347', glow:'rgba(255,138,61,0.22)', chip:'rgba(255,138,61,0.12)', chipB:'rgba(255,138,61,0.3)' },
      '⚽': { c1:'#34e08a', c2:'#5ff0a8', glow:'rgba(52,224,138,0.2)', chip:'rgba(52,224,138,0.12)', chipB:'rgba(52,224,138,0.3)' },
      '⚾': { c1:'#3d9bff', c2:'#6db8ff', glow:'rgba(61,155,255,0.2)', chip:'rgba(61,155,255,0.12)', chipB:'rgba(61,155,255,0.3)' },
      '🏈': { c1:'#a78bfa', c2:'#c4b0ff', glow:'rgba(167,139,250,0.22)', chip:'rgba(167,139,250,0.12)', chipB:'rgba(167,139,250,0.3)' },
      '🎾': { c1:'#c4f542', c2:'#d9fa78', glow:'rgba(196,245,66,0.2)', chip:'rgba(196,245,66,0.12)', chipB:'rgba(196,245,66,0.3)' },
    };
    const statusColors = { live:'#34e08a', season:'#3d9bff', off:'#8f8fa1' };
    const hrefs = {
      '🏀': './nba/',
      '⚽': './worldcup/',
      '⚾': './mlb/',
      '🏈': './nfl/',
      '🎾': './tennis/',
    };
    const engines = d.engines.map(e => ({
      ...e,
      ...palette[e.emoji],
      isLive: e.status === 'live',
      statusText: e.statusTextHe,
      statusColor: statusColors[e.status],
      href: hrefs[e.emoji],
      open: () => { window.location.href = hrefs[e.emoji]; },
    }));
    return {
      ...d,
      engines,
      goLive: () => { window.location.href = './worldcup/'; },
      goGuide: () => { const el = document.getElementById('engines-section'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); },
      onKey: (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.currentTarget.click(); } },
      otherLang: this.state.lang === 'he' ? 'EN' : 'עב',
      toggleLang: () => this.setState(s => ({ lang: s.lang === 'he' ? 'en' : 'he' })),
    };
  }
}

new DcHost(Component).mount();
