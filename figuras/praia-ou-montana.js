const EN = new URLSearchParams(location.search).get('lang') === 'en';
const PM_T = EN
  ? { name: 'Beach or hills', hint: 'Click the sun or the cloud · ←→ change the weather · space next',
      aria: 'Isometric split plate: coast on one side, hill with a trail on the other, a signpost between them. The weather changes and the signpost lights the better choice. Click the sun or cloud, or use arrow keys and space.',
      beach: 'PLAYA', hike: 'MONTE', win: ['beach', 'hike'],
      w: ['sun · calm sea', 'clouds · calm sea', 'wind · rough sea', 'sun · light chop'] }
  : { name: 'Playa o monte', hint: 'Clic en el sol o la nube · ←→ cambian el tiempo · espacio siguiente',
      aria: 'Placa isométrica partida: costa a un lado, monte con una senda al otro y un poste indicador en medio. El tiempo cambia y el poste ilumina la mejor opción. Clic en el sol o la nube, o flechas y espacio.',
      beach: 'PLAYA', hike: 'MONTE', win: ['playa', 'monte'],
      w: ['sol · mar en calma', 'nubes · mar en calma', 'viento · mar picado', 'sol · mar rizado'] };

FIGS.push({
  id: 'praia-ou-montana', name: PM_T.name, hint: PM_T.hint, aria: PM_T.aria,
  css: `
[data-fig="praia-ou-montana"] .pm-hit{cursor:pointer}
[data-fig="praia-ou-montana"] .pm-sun{opacity:.3;transition:opacity .5s}
[data-fig="praia-ou-montana"] .pm-sun.on{opacity:1}
[data-fig="praia-ou-montana"] .pm-sun .core{fill:var(--deck);stroke:var(--ink);stroke-width:1.4;vector-effect:non-scaling-stroke}
[data-fig="praia-ou-montana"] .pm-sun .ray{stroke:var(--ink);stroke-width:1.2;vector-effect:non-scaling-stroke}
[data-fig="praia-ou-montana"] .pm-cloud{opacity:.22;transition:opacity .5s}
[data-fig="praia-ou-montana"] .pm-cloud.on{opacity:1}
[data-fig="praia-ou-montana"] .pm-wind{opacity:0;transition:opacity .5s}
[data-fig="praia-ou-montana"] .pm-wind.on{opacity:1}
[data-fig="praia-ou-montana"] .pm-wind path{fill:none;stroke:var(--ink);stroke-width:1.4;stroke-linecap:round;vector-effect:non-scaling-stroke;stroke-dasharray:26 14}
[data-fig="praia-ou-montana"] .pm-wave{fill:none;stroke:var(--line);stroke-width:1.2;vector-effect:non-scaling-stroke}
[data-fig="praia-ou-montana"] .pm-waves.lit .pm-wave.near{stroke:var(--accent-hi);stroke-width:1.8;filter:url(#soft)}
[data-fig="praia-ou-montana"] .pm-dot{fill:var(--line);opacity:.55}
[data-fig="praia-ou-montana"] .pm-wet{fill:var(--accent);fill-opacity:0;transition:fill-opacity .5s}
[data-fig="praia-ou-montana"] .pm-wet.lit{fill-opacity:.6;filter:url(#soft)}
[data-fig="praia-ou-montana"] .pm-shore{fill:none;stroke:var(--line);stroke-width:1.2;vector-effect:non-scaling-stroke}
[data-fig="praia-ou-montana"] .pm-trail{fill:none;stroke:var(--line);stroke-width:1.6;stroke-linejoin:round;stroke-dasharray:5 3;vector-effect:non-scaling-stroke}
[data-fig="praia-ou-montana"] .pm-trails.lit .pm-trail{stroke:var(--accent-hi);stroke-width:2.6;stroke-dasharray:none;filter:url(#glow)}
[data-fig="praia-ou-montana"] .pm-flag line{stroke:var(--line);stroke-width:1.4;vector-effect:non-scaling-stroke}
[data-fig="praia-ou-montana"] .pm-flag path{fill:var(--deck);stroke:var(--line);stroke-width:1.2;vector-effect:non-scaling-stroke}
[data-fig="praia-ou-montana"] .pm-flag.lit path{fill:var(--accent);stroke:var(--accent-hi);filter:url(#glow)}
[data-fig="praia-ou-montana"] .pm-para line,[data-fig="praia-ou-montana"] .pm-tree line{stroke:var(--line);stroke-width:1.3;vector-effect:non-scaling-stroke}
[data-fig="praia-ou-montana"] .pm-para .can,[data-fig="praia-ou-montana"] .pm-tree path{fill:var(--deck);stroke:var(--line);stroke-width:1.2;vector-effect:non-scaling-stroke}
[data-fig="praia-ou-montana"] .pm-board text{font-weight:700;letter-spacing:.06em}
[data-fig="praia-ou-montana"] .pm-board.hot .face{fill:var(--accent);stroke:var(--accent-hi)}
[data-fig="praia-ou-montana"] .pm-board.hot{filter:url(#glow)}
[data-fig="praia-ou-montana"] .pm-board.hot text{fill:var(--panel)}`,
  mount(stage, api) {
    const K = api.iso.frame([[0,0,0],[150,0,0],[0,240,0],[150,240,0],[75,120,142],[0,200,152],[120,30,150]]);
    const { P, TOP, FRONT, box } = K;
    const ID = 'praia-ou-montana';
    const f1 = n => n.toFixed(1);
    const pth = pts => 'M' + pts.map(p => f1(p[0]) + ' ' + f1(p[1])).join('L') + 'z';
    const rr = th => 1 + 0.16 * Math.sin(3 * th + 1) + 0.1 * Math.sin(5 * th + 2);
    const blob = (cx, cy, rx, ry, sc, n = 16) => Array.from({ length: n }, (_, i) => { const th = i * 2 * Math.PI / n, r = rr(th) * sc; return [cx + rx * r * Math.cos(th), cy + ry * r * Math.sin(th)]; });
    // prisma de contorno irregular: paredes visibles (normal hacia +x/+y) y tapa
    const prism = (pts, z0, z1) => {
      const n = pts.length, cx = pts.reduce((a, p) => a + p[0], 0) / n, cy = pts.reduce((a, p) => a + p[1], 0) / n, E = [];
      for (let i = 0; i < n; i++) {
        const a = pts[i], b = pts[(i + 1) % n], mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
        let nx = b[1] - a[1], ny = a[0] - b[0];
        if (nx * (mx - cx) + ny * (my - cy) < 0) { nx = -nx; ny = -ny; }
        if (nx + ny > 1e-6) E.push([a, b, mx + my]);
      }
      E.sort((u, v) => u[2] - v[2]);
      const o = E.map(([a, b]) => `<path class="face" d="${pth([P(a[0], a[1], z0), P(b[0], b[1], z0), P(b[0], b[1], z1), P(a[0], a[1], z1)])}"/>`).join('');
      return o + `<path class="face top" d="${pth(pts.map(p => P(p[0], p[1], z1)))}"/>`;
    };
    const massif = (cx, cy, rx, ry, nl, h) => { let o = ''; for (let k = 0; k < nl; k++) o += prism(blob(cx, cy, rx, ry, 1 - k * 0.8 / nl), 8 + k * h, 8 + (k + 1) * h); return o; };
    const tree = (x, y, z) => { const b = P(x, y, z); return `<g class="pm-tree" transform="translate(${f1(b[0])} ${f1(b[1])})"><line x1="0" y1="0" x2="0" y2="-4"/><path d="M-5 -4 L0 -13 L5 -4 z"/><path d="M-4 -10 L0 -18 L4 -10 z"/></g>`; };
    const rock = (x, y, r) => prism(blob(x, y, r, r * 0.8, 1, 9), 8, 8 + r * 0.8);
    const para = (x, y) => { const b = P(x, y, 8); return `<g class="pm-para" transform="translate(${f1(b[0])} ${f1(b[1])})"><line x1="0" y1="0" x2="0" y2="-20"/><path class="can" d="M-14 -20 a14 9 0 0 1 28 0 z"/></g>`; };
    const xe = y => 120 + 7 * Math.sin(y / 22) + 5 * Math.sin(y / 9 + 1);       // orilla con entrantes
    const sunP = P(0, 204, 138), cloudP = P(112, 30, 126);
    let rays = '';
    for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; rays += `<line class="ray" x1="${f1(Math.cos(a) * 21)}" y1="${f1(Math.sin(a) * 21)}" x2="${f1(Math.cos(a) * 29)}" y2="${f1(Math.sin(a) * 29)}"/>`; }
    const ys = []; for (let y = 10; y <= 230; y += 6) ys.push(y);
    const seaPts = ys.map(y => `${f1(xe(y))},${y}`).join(' ') + ' 142,230 142,10';
    let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    let dots = ''; for (let i = 0; i < 70; i++) { const y = 12 + rnd() * 216, x = 88 + rnd() * (xe(y) - 100); dots += `<circle class="pm-dot" cx="${f1(x)}" cy="${f1(y)}" r="0.9"/>`; }
    const towel = (x, y) => `<rect class="face" x="${x}" y="${y}" width="14" height="7" rx="1"/><line class="detail" x1="${x + 5}" y1="${y}" x2="${x + 5}" y2="${y + 7}"/><line class="detail" x1="${x + 9}" y1="${y}" x2="${x + 9}" y2="${y + 7}"/>`;

    let svg = box(0, 0, 0, 150, 240, 8, 12);
    svg += `<g transform="${TOP(0, 0, 8)}"><rect class="detail" x="8" y="8" width="134" height="224" rx="8"/><line class="detail" x1="82" y1="8" x2="82" y2="232"/>${dots}
      <polygon class="face recess" points="${seaPts}"/>
      <path class="pm-wet" id="${ID}-wet" d="M${ys.map(y => f1(xe(y) - 8) + ' ' + y).join('L')}L${[...ys].reverse().map(y => f1(xe(y)) + ' ' + y).join('L')}z"/>
      <path class="pm-shore" d="M${ys.map(y => f1(xe(y)) + ' ' + y).join('L')}"/>
      <clipPath id="${ID}-clip"><polygon points="${seaPts}"/></clipPath>
      <g clip-path="url(#${ID}-clip)" id="${ID}-waves" class="pm-waves"><path class="pm-wave"/><path class="pm-wave"/><path class="pm-wave"/><path class="pm-wave"/></g>
      ${towel(92, 96)}${towel(94, 178)}</g>`;
    // monte: dos masas de curvas de nivel, senda en zigzag, bandera, arboles y rocas
    svg += massif(34, 48, 24, 40, 4, 14) + massif(38, 152, 30, 78, 6, 14);
    const tp = []; for (let k = 0; k < 6; k++) { const th = (k % 2 ? 78 : 14) * Math.PI / 180, sc = 1 - k * 0.8 / 6 + 0.02; tp.push(P(38 + 30 * rr(th) * sc * Math.cos(th), 152 + 78 * rr(th) * sc * Math.sin(th), 8 + (k + 1) * 14)); }
    const th0 = 14 * Math.PI / 180; tp.unshift(P(38 + 30 * rr(th0) * 1.1 * Math.cos(th0), 152 + 78 * rr(th0) * 1.1 * Math.sin(th0), 8)); tp.push(P(38, 152, 8 + 6 * 14));
    svg += `<g id="${ID}-trails" class="pm-trails"><path class="pm-trail" d="M${tp.map(p => f1(p[0]) + ' ' + f1(p[1])).join('L')}"/></g>`;
    const fl = P(38, 152, 8 + 6 * 14);
    svg += `<g id="${ID}-flag" class="pm-flag" transform="translate(${f1(fl[0])} ${f1(fl[1])})"><line x1="0" y1="0" x2="0" y2="-22"/><path d="M0 -22 l15 4 l-15 5 z"/></g>`;
    [40, 62, 30, 75].forEach(d => { const th = d * Math.PI / 180; svg += tree(38 + 30 * rr(th) * 0.93 * Math.cos(th), 152 + 78 * rr(th) * 0.93 * Math.sin(th), 22); });
    [60, 20].forEach(d => { const th = d * Math.PI / 180; svg += tree(34 + 24 * rr(th) * 0.9 * Math.cos(th), 48 + 40 * rr(th) * 0.9 * Math.sin(th), 22); });
    svg += rock(74, 104, 5) + rock(72, 226, 6);
    // costa: sombrillas, rocas
    svg += para(96, 92) + rock(112, 40, 5) + para(98, 174) + rock(110, 214, 6);
    // poste y brazos
    svg += box(80, 116, 8, 8, 8, 142, 2);
    svg += `<g class="pm-board" id="${ID}-bm">${box(14, 114, 124, 74, 12, 16, 2)}
      <g transform="${FRONT(14, 126, 140)}"><text class="label" x="6" y="12" style="font-size:12px">${PM_T.hike}</text></g></g>`;
    svg += `<g class="pm-board" id="${ID}-bp">${box(80, 114, 104, 66, 12, 16, 2)}
      <g transform="${FRONT(80, 126, 120)}"><text class="label" x="12" y="12" style="font-size:12px">${PM_T.beach}</text></g></g>`;
    // cielo
    svg += `<g class="pm-hit pm-sun" id="${ID}-sun" transform="translate(${f1(sunP[0])} ${f1(sunP[1])})">
      <circle class="core" r="14"/>${rays}<circle r="32" style="fill:var(--panel);fill-opacity:0;pointer-events:all"/></g>`;
    svg += `<g class="pm-hit pm-cloud" id="${ID}-cloud" transform="translate(${f1(cloudP[0])} ${f1(cloudP[1])}) scale(1.35)">
      <path class="face" d="M-26 8 a10 10 0 0 1 4 -18 a14 14 0 0 1 26 -4 a11 11 0 0 1 18 8 a9 9 0 0 1 -2 14 z"/>
      <rect x="-34" y="-26" width="68" height="42" style="fill:var(--panel);fill-opacity:0;pointer-events:all"/></g>`;
    svg += `<g class="pm-wind" id="${ID}-wind" transform="translate(${f1(cloudP[0] - 100)} ${f1(cloudP[1] - 6)})">
      <path d="M0 0 h60 q9 0 9 -7"/><path d="M-10 14 h74 q9 0 9 7"/><path d="M6 28 h46 q8 0 8 -6"/></g>`;

    const vb = K.viewBox.split(/[ ,]+/).map(Number), k = 0.16; stage.setAttribute('viewBox', [vb[0] - vb[2] * k / 2, vb[1] - vb[3] * k / 2, vb[2] * (1 + k), vb[3] * (1 + k)].map(n => n.toFixed(1)).join(' ')); stage.innerHTML = svg;
    const q = s => stage.querySelector('#' + ID + '-' + s);
    const sun = q('sun'), cloud = q('cloud'), wind = q('wind'), waves = q('waves'), wet = q('wet'),
      trails = q('trails'), flag = q('flag'), bm = q('bm'), bp = q('bp');
    const wp = [...waves.querySelectorAll('path')];
    // [sol, nube, viento, amplitud ola, gana playa]
    const W = [[1, 0, 0, 1.5, 1], [0, 1, 0, 1.5, 0], [0, 1, 1, 6, 0], [1, 0, 0, 3.5, 1]];
    const st = { i: 0, auto: false };
    function render() {
      const [s, c, w, A, playa] = W[st.i];
      sun.classList.toggle('on', !!s); cloud.classList.toggle('on', !!c); wind.classList.toggle('on', !!w);
      waves.classList.toggle('lit', !!playa); wet.classList.toggle('lit', !!playa);
      trails.classList.toggle('lit', !playa); flag.classList.toggle('lit', !playa);
      bp.classList.toggle('hot', !!playa); bm.classList.toggle('hot', !playa);
      api.power(true);
      api.readout(PM_T.w[st.i] + ' → ' + PM_T.win[playa ? 0 : 1]);
    }
    const go = d => { st.i = (st.i + d + W.length) % W.length; render(); };
    const user = () => { st.auto = false; };
    sun.addEventListener('click', () => { user(); go(1); });
    cloud.addEventListener('click', () => { user(); go(1); });
    stage.addEventListener('pointerdown', user);
    const stopLoop = api.loop(t => {
      const A = W[st.i], sp = A[2] ? 0.02 : 0.007, amp = A[3] / 2.5;
      wp.forEach((p, j) => {
        const d = 30 - ((t * sp + j * 7.5) % 30);          // las olas avanzan hacia la orilla
        p.setAttribute('d', 'M' + ys.map(y => f1(xe(y) + 2 + d + amp * Math.sin(y / 5 + d / 3)) + ' ' + y).join('L'));
        p.classList.toggle('near', d < 13);
      });
      if (A[2]) wind.querySelectorAll('path').forEach((p, k) => p.style.strokeDashoffset = (-(t * 0.05 + k * 9) % 40).toFixed(1));
    });
    render();
    return {
      key(e) {
        if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') { user(); go(1); return true; }
        if (e.key === 'ArrowLeft') { user(); go(-1); return true; }
        return false;
      },
      demo() { st.auto = true; api.every(3200, () => { if (st.auto) go(1); }); },
      unmount() { if (typeof stopLoop === 'function') stopLoop(); },
    };
  },
});
