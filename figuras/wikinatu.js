const WN_EN = new URLSearchParams(location.search).get('lang') === 'en';
const WN_T = {
  name: WN_EN ? 'What lives along the path' : 'Lo que vive junto al camino',
  hint: WN_EN ? 'Click or space: next view · r restarts' : 'Clic o espacio: siguiente vista · r reinicia',
  aria: WN_EN
    ? 'Isometric mountain with contour lines. A light climbs the trail and the species seen beside it appear as it passes. The last view names some species at their height. Click, space or r.'
    : 'Montaña isométrica con curvas de nivel. Una luz sube por el sendero y las especies vistas a su lado aparecen a su paso. La última vista rotula especies a su altura. Clic, espacio o r.',
  pills: WN_EN ? ['The route', 'Nature plate'] : ['La ruta', 'Cuadro'],
  read: WN_EN
    ? ['The species appear as the route advances', 'Each species at its height, as Humboldt drew them']
    : ['Las especies aparecen a medida que avanza la ruta', 'Cada especie a su altura, como las dibujó Humboldt'],
  // nombres reales de la ruta de ejemplo de WikiNatu (Lagos de Tristaina), de abajo arriba
  names: WN_EN ? ['Common Frog', 'Alpenrose', 'Alpine Marmot', 'Northern Wheatear'] : ['Rana bermeja', 'Rododendro', 'Marmota alpina', 'Collalba norteña'],
};

FIGS.push({
  id: 'wikinatu', name: WN_T.name, hint: WN_T.hint, aria: WN_T.aria,
  css: `
    [data-fig="wikinatu"] .wn-cell { stroke-width: .7; stroke-linejoin: round; vector-effect: non-scaling-stroke; }
    [data-fig="wikinatu"] .wn-a { fill: var(--deck); stroke: var(--deck); }
    [data-fig="wikinatu"] .wn-sky { fill: none; stroke: var(--line); stroke-width: 1.4; stroke-linejoin: round; vector-effect: non-scaling-stroke; }
    [data-fig="wikinatu"] .wn-iso { fill: none; stroke: var(--detail); stroke-width: 1; vector-effect: non-scaling-stroke; }
    [data-fig="wikinatu"] .wn-iso.idx { stroke: var(--line); stroke-width: 1.2; }
    [data-fig="wikinatu"] .wn-tree line { stroke: var(--line); stroke-width: 1.2; vector-effect: non-scaling-stroke; }
    [data-fig="wikinatu"] .wn-tree path { fill: var(--deck); stroke: var(--line); stroke-width: 1.1; vector-effect: non-scaling-stroke; }
    [data-fig="wikinatu"] .wn-base { fill: none; stroke: var(--line); stroke-width: 1.6; stroke-dasharray: 5 4; stroke-linejoin: round; vector-effect: non-scaling-stroke; }
    [data-fig="wikinatu"] .wn-lit { transition: opacity .9s ease; will-change: opacity; }
    [data-fig="wikinatu"] .wn-band { fill: none; stroke: var(--accent); stroke-opacity: .16; stroke-width: 28; stroke-linejoin: round; stroke-linecap: round; }
    [data-fig="wikinatu"] .wn-halo { fill: none; stroke: var(--accent); stroke-opacity: .28; stroke-width: 9; stroke-linejoin: round; stroke-linecap: round; }
    [data-fig="wikinatu"] .wn-trail { fill: none; stroke: var(--accent); stroke-width: 4; stroke-linejoin: round; stroke-linecap: round; }
    [data-fig="wikinatu"] .wn-far { fill: var(--panel); stroke: var(--line); stroke-width: 1.1; vector-effect: non-scaling-stroke; }
    [data-fig="wikinatu"] .wn-sp { fill: var(--accent); stroke: var(--accent); stroke-opacity: .3; stroke-width: 5; opacity: 0; transform: scale(.15); transform-box: fill-box; transform-origin: center; transition: transform .55s cubic-bezier(.2, 1.5, .4, 1), opacity .35s ease; }
    [data-fig="wikinatu"] .wn-sp.on { opacity: 1; transform: none; }
    [data-fig="wikinatu"] .wn-sp.on.dim { opacity: .4; }
    [data-fig="wikinatu"] .wn-ring { fill: var(--accent); fill-opacity: .16; stroke: var(--accent); stroke-width: 1.4; vector-effect: non-scaling-stroke; transition: opacity .3s; }
    [data-fig="wikinatu"] .wn-spot { fill: var(--accent-hi); transition: opacity .3s; }
    [data-fig="wikinatu"] .wn-lead { fill: none; stroke: var(--accent); stroke-width: 1.1; opacity: 0; transition: opacity .4s; vector-effect: non-scaling-stroke; }
    [data-fig="wikinatu"] .wn-tag { opacity: 0; transition: opacity .4s; font-size: 18px; font-weight: 600; fill: var(--ink-hi); stroke: var(--panel); stroke-width: 5px; paint-order: stroke; }
    [data-fig="wikinatu"] .wn-on { opacity: 1; }
    [data-fig="wikinatu"] .wn-flagcloth { fill: var(--deck); stroke: var(--line); stroke-width: 1.2; vector-effect: non-scaling-stroke; transition: fill .3s, stroke .3s; }
    [data-fig="wikinatu"] .wn-flagcloth.hot { fill: var(--accent); stroke: var(--accent-hi); }
    [data-fig="wikinatu"] .wn-pole { stroke: var(--ink-hi); stroke-width: 1.5; vector-effect: non-scaling-stroke; }
    [data-fig="wikinatu"] .wn-pill { transition: fill .3s, stroke .3s; }
    [data-fig="wikinatu"] .wn-pt { transition: fill .3s; font-weight: 600; }
  `,
  mount(stage, api) {
    const N = 200, G = 40, Q = N / G, ZB = -9, BUF = 15;
    const f1 = n => n.toFixed(1);

    // relieve: un pico con crestas y dos lomas, sobre un bloque cortado
    const bump = (x, y, cx, cy, a, s, k) => {
      const dx = x - cx, dy = y - cy, d = Math.hypot(dx, dy), th = Math.atan2(dy, dx);
      const m = 1 + k * (.16 * Math.sin(3 * th + 1) + .1 * Math.sin(5 * th + 2));
      return a * Math.exp(-Math.pow(d / (s * m), 1.5));
    };
    const h = (x, y) => 7 + bump(x, y, 84, 78, 112, 62, 1.4) + bump(x, y, 150, 50, 44, 34, 1) + bump(x, y, 46, 150, 34, 34, 1)
      + 1.6 * Math.sin(x / 13 + y / 21) * Math.sin(y / 17 - x / 29);
    const top = [84, 78], ZT = h(...top);

    const K = api.iso.frame([[0,0,0],[N,N,0],[0,N,0],[N,0,0],[top[0],top[1],ZT + 30]]);
    const { P, box } = K;
    const sp = (x, y, dz = 0) => P(x, y, h(x, y) + dz);
    // la línea de visión pasa por (t,t,t): un punto se ve si nada del relieve la corta
    const seen = (x, y, z) => { for (let t = 3; t < 200; t += 3) { if (x + t > N || y + t > N) break; if (h(x + t, y + t) > z + t) return false; } return true; };

    // sendero: lazos por la cara visible hasta la cima
    const way = [[186,172],[150,176],[116,168],[128,146],[160,132],[132,120],[100,136],[86,118],[116,104],[100,94],top];
    const cr = (a, b, c, d, t) => .5 * (2 * b + (c - a) * t + (2 * a - 5 * b + 4 * c - d) * t * t + (3 * b - a - 3 * c + d) * t * t * t);
    const tr = [];
    for (let i = 0; i < way.length - 1; i++) {
      const a = way[Math.max(i - 1, 0)], b = way[i], c = way[i + 1], d = way[Math.min(i + 2, way.length - 1)];
      for (let k = 0; k < 16; k++) tr.push([cr(a[0], b[0], c[0], d[0], k / 16), cr(a[1], b[1], c[1], d[1], k / 16)]);
    }
    tr.push(top);
    const tq = tr.map(p => sp(p[0], p[1], .8));
    const len = [0];
    for (let i = 1; i < tq.length; i++) len.push(len[i - 1] + Math.hypot(tq[i][0] - tq[i - 1][0], tq[i][1] - tq[i - 1][1]));
    const TL = len[len.length - 1];
    const atT = t => { const L = t * TL; let i = 1; while (i < len.length - 1 && len[i] < L) i++; const u = (L - len[i - 1]) / ((len[i] - len[i - 1]) || 1); return [tq[i - 1][0] + (tq[i][0] - tq[i - 1][0]) * u, tq[i - 1][1] + (tq[i][1] - tq[i - 1][1]) * u, tq[i][0] < tq[i - 1][0]]; };
    const trailD = 'M' + tq.map(q => f1(q[0]) + ' ' + f1(q[1])).join('L');
    const nearest = (x, y) => { let b = 1e9, bi = 0; tr.forEach((p, i) => { const d = Math.hypot(p[0] - x, p[1] - y); if (d < b) { b = d; bi = i; } }); return [b, bi]; };

    // observaciones: las que caen en la banda son las de la ruta; las demás se quedan apagadas
    let seed = 23; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const obs = [], clear = (x, y, g) => obs.every(o => Math.hypot(o.x - x, o.y - y) > g);
    const add = (x, y, near, r) => { const [, i] = nearest(x, y); obs.push({ x, y, near, r, t: len[i] / TL, q: sp(x, y, 1.5) }); };
    let tries = 0;
    while (obs.length < 30 && tries++ < 4000) {
      const p = tr[Math.floor(rnd() * tr.length)], a = rnd() * 6.283, d = 5 + rnd() * (BUF - 6), x = p[0] + Math.cos(a) * d, y = p[1] + Math.sin(a) * d;
      if (x < 4 || y < 4 || x > N - 4 || y > N - 4 || nearest(x, y)[0] < 4.5 || !clear(x, y, 8.5) || !seen(x, y, h(x, y) + 1)) continue;
      add(x, y, true, 2.8 + rnd() * 1.4);
    }
    const nNear = obs.length; tries = 0;
    while (obs.length < nNear + 34 && tries++ < 4000) {
      const x = 6 + rnd() * (N - 12), y = 6 + rnd() * (N - 12);
      if (nearest(x, y)[0] < BUF + 7 || !clear(x, y, 12) || !seen(x, y, h(x, y) + 1)) continue;
      add(x, y, false, 2 + rnd() * .8);
    }
    const near = obs.map((o, i) => ({ o, i })).filter(e => e.o.near);
    // cuatro especies con nombre, repartidas por la subida
    const named = [.1, .4, .68, .93].map(t => near.reduce((a, b) => Math.abs(b.o.t - t) < Math.abs(a.o.t - t) ? b : a).i);

    // árboles en las laderas bajas, dibujados en su sitio del orden de pintura
    const trees = {};
    for (let k = 0, n = 0; k < 900 && n < 46; k++) {
      const x = 5 + rnd() * (N - 10), y = 5 + rnd() * (N - 10), z = h(x, y);
      if (z > 34 || nearest(x, y)[0] < BUF + 2 || !clear(x, y, 7)) continue;
      const d = Math.floor(x / Q) + Math.floor(y / Q), b = P(x, y, z), s = .75 + rnd() * .35; n++;
      (trees[d] = trees[d] || []).push([b[1], `<g class="wn-tree" transform="translate(${f1(b[0])} ${f1(b[1])}) scale(${s.toFixed(2)})"><line x1="0" y1="0" x2="0" y2="-4"/><path d="M-5 -4 L0 -13 L5 -4 z"/><path d="M-4 -10 L0 -18 L4 -10 z"/></g>`]);
    }

    // relieve por diagonales: las celdas de una misma diagonal no se tapan entre sí, así que cada una es un solo path
    const cross = (a, b, za, zb, lv) => { const u = (lv - za) / (zb - za); return [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u, lv]; };
    const STEP = 11;
    let svg = box(-8, -8, ZB - 7, N + 16, N + 16, 6, 12);
    for (let d = 0; d <= 2 * (G - 1); d++) {
      let cells = '', iso = '', idx = '';
      for (let i = Math.max(0, d - G + 1); i <= Math.min(G - 1, d); i++) {
        const j = d - i, c = [[i * Q, j * Q], [(i + 1) * Q, j * Q], [(i + 1) * Q, (j + 1) * Q], [i * Q, (j + 1) * Q]], z = c.map(p => h(p[0], p[1]));
        cells += 'M' + c.map((p, k) => { const q = P(p[0], p[1], z[k]); return f1(q[0]) + ' ' + f1(q[1]); }).join('L') + 'Z';
        const lo = Math.ceil(Math.min(...z) / STEP), hi = Math.floor(Math.max(...z) / STEP);
        // las laderas casi de canto al observador dan dientes de sierra: ahí no se trazan curvas
        const hx = (z[1] - z[0] + z[2] - z[3]) / (2 * Q), hy = (z[3] - z[0] + z[2] - z[1]) / (2 * Q);
        if (1 - hx - hy < .35) continue;
        for (let n = lo; n <= hi; n++) {
          const lv = n * STEP, hits = [];
          for (let k = 0; k < 4; k++) { const m = (k + 1) % 4; if ((z[k] < lv) !== (z[m] < lv)) hits.push(cross(c[k], c[m], z[k], z[m], lv)); }
          for (let k = 0; k + 1 < hits.length; k += 2) { const A = P(...hits[k]), B = P(...hits[k + 1]), s = `M${f1(A[0])} ${f1(A[1])}L${f1(B[0])} ${f1(B[1])}`; if (n % 4 === 0) idx += s; else iso += s; }
        }
      }
      svg += `<path class="wn-cell wn-a" d="${cells}"/>`;
      if (iso) svg += `<path class="wn-iso" d="${iso}"/>`;
      if (idx) svg += `<path class="wn-iso idx" d="${idx}"/>`;
      if (trees[d]) svg += trees[d].sort((u, v) => u[0] - v[0]).map(e => e[1]).join('');
    }

    // silueta: lo más alto del relieve en cada columna de pantalla, para que se lea sobre el fondo crema
    const sky = new Map();
    for (let x = 0; x <= N; x += 1.25) for (let y = 0; y <= N; y += 1.25) {
      const q = P(x, y, h(x, y)), b = Math.round(q[0] / 2.5), c = sky.get(b);
      if (c === undefined || q[1] < c) sky.set(b, q[1]);
    }
    svg += `<path class="wn-sky" d="M${[...sky.keys()].sort((a, b) => a - b).map(b => f1(b * 2.5) + ' ' + f1(sky.get(b))).join('L')}"/>`;

    // paredes del bloque, siguiendo el perfil del terreno
    const wall = (pts) => { const up = pts.map(p => P(p[0], p[1], h(p[0], p[1]))), dn = [P(...pts[pts.length - 1], ZB), P(...pts[0], ZB)]; return 'M' + [...up, ...dn].map(q => f1(q[0]) + ' ' + f1(q[1])).join('L') + 'Z'; };
    const edgeY = Array.from({ length: G + 1 }, (_, i) => [i * Q, N]), edgeX = Array.from({ length: G + 1 }, (_, i) => [N, i * Q]);
    svg += `<path class="face" d="${wall(edgeY)}"/><path class="face top" d="${wall(edgeX)}"/>`;

    svg += `<path class="wn-base" d="${trailD}"/>`;

    // las observaciones lejanas se quedan apagadas; las de la ruta nacen al paso de la luz
    const order = obs.map((o, i) => ({ o, i })).sort((u, v) => (u.o.x + u.o.y) - (v.o.x + v.o.y));
    svg += order.filter(e => !e.o.near).map(({ o }) => `<circle class="wn-far" cx="${f1(o.q[0])}" cy="${f1(o.q[1])}" r="${f1(o.r)}"/>`).join('');

    // lo que se enciende va sin filtros: un filtro obliga a repintarlo en cada fotograma
    const RX = BUF * 1.2247, RY = BUF * .7071;
    svg += `<g id="wikinatu-lit" class="wn-lit" pointer-events="none" style="opacity:0">`
      + ['band', 'halo', 'trail'].map(k => `<path id="wikinatu-${k}" class="wn-${k}" pathLength="1000" stroke-dasharray="0 1000" d="${trailD}"/>`).join('')
      + order.filter(e => e.o.near).map(({ o, i }) => `<circle id="wikinatu-sp${i}" class="wn-sp" cx="${f1(o.q[0])}" cy="${f1(o.q[1])}" r="${f1(named.includes(i) ? 5 : o.r)}"/>`).join('')
      + `<g id="wikinatu-scan"><ellipse class="wn-ring" rx="${f1(RX)}" ry="${f1(RY)}"/><circle class="wn-spot" r="5"/></g></g>`;

    // bandera de cima y marca de salida
    const fl = sp(top[0] + 7, top[1] - 7, 0);
    svg += `<g pointer-events="none" transform="translate(${f1(fl[0])} ${f1(fl[1])})"><line class="wn-pole" x1="0" y1="0" x2="0" y2="-30"/><path id="wikinatu-flag" class="wn-flagcloth" d="M0 -30 L17 -25 L0 -19 z"/></g>`;

    // pastillas de fase bajo el bloque
    const pcx = P(N / 2, N / 2, 0)[0], py = P(N, N, ZB - 7)[1] + 12, PW = WN_EN ? [138, 160] : [120, 116], pg = 16, PT = PW[0] + PW[1] + pg;
    for (let k = 0; k < 2; k++) {
      const pw = PW[k], x = pcx - PT / 2 + PW.slice(0, k).reduce((a, b) => a + b + pg, 0);
      svg += `<g pointer-events="none"><rect id="wikinatu-pill${k}" class="face led wn-pill" x="${x}" y="${py}" width="${pw}" height="38" rx="19"/>`
           + `<text id="wikinatu-pt${k}" class="label wn-pt" x="${x + pw / 2}" y="${py + 26}" text-anchor="middle" style="font-size:18px">${WN_T.pills[k]}</text></g>`;
    }
    const vt = P(top[0], top[1], ZT + 32)[1] - 6, vH = py + 38 + 8 - vt, vW = Math.max(vH * 1.6, PT + 40), vL = pcx - vW / 2;

    // el cuadro: cada nombre a la altura de su especie, en columna a los lados, como en la lámina de Humboldt
    const tags = named.map((si, k) => {
      const q = obs[si].q, right = k % 2 === 1, x = right ? vL + vW - 14 : vL + 14, w = WN_T.names[k].length * 10.2, end = right ? x - w - 6 : x + w + 6;
      return `<path id="wikinatu-lead${k}" class="wn-lead" d="M${f1(q[0])} ${f1(q[1])}L${f1(end)} ${f1(q[1])}"/>`
           + `<text id="wikinatu-tag${k}" class="label wn-tag" x="${x}" y="${f1(q[1] + 6)}" text-anchor="${right ? 'end' : 'start'}">${api.iso.esc(WN_T.names[k])}</text>`;
    }).join('');
    svg += tags;

    stage.setAttribute('viewBox', `${vL} ${vt} ${vW} ${vH}`);
    stage.innerHTML = svg;

    const $ = id => stage.querySelector('#wikinatu-' + id);
    const lit = $('lit'), scan = $('scan'), flag = $('flag'), dash = ['band', 'halo', 'trail'].map($);
    const spEl = near.map(e => [e, $('sp' + e.i)]);
    const QUIET = /still/.test(location.search) || matchMedia('(prefers-reduced-motion: reduce)').matches;
    const DUR = [1100, 8000, 5400], WALK = 7000;
    const st = { phase: 0, t0: 0 };
    let auto = false;
    const ease = u => (1 - Math.cos(Math.PI * u)) / 2;
    const setT = t => { const v = `${(t * 1000).toFixed(2)} 1000`; for (const d of dash) d.setAttribute('stroke-dasharray', v); };

    function render() {
      const ph = st.phase;
      lit.style.opacity = ph === 0 ? 0 : 1;
      scan.style.opacity = ph === 1 ? 1 : 0;
      flag.classList.toggle('hot', ph === 2);
      if (ph === 1) { setT(0); for (const [, el] of spEl) el.classList.remove('on'); }
      if (ph === 2) { setT(1); for (const [, el] of spEl) el.classList.add('on'); }
      for (const [e, el] of spEl) el.classList.toggle('dim', ph === 2 && !named.includes(e.i));
      for (let k = 0; k < 4; k++) { $('lead' + k).classList.toggle('wn-on', ph === 2); $('tag' + k).classList.toggle('wn-on', ph === 2); }
      for (let k = 0; k < 2; k++) {
        const on = ph === k + 1;
        $('pill' + k).setAttribute('class', 'face led wn-pill' + (on ? ' hot' : ''));
        $('pt' + k).style.fill = on ? 'var(--panel)' : 'var(--ink-hi)';
      }
      api.power(ph >= 1);
      api.readout(ph === 0 ? (WN_EN ? 'A mountain, still dark' : 'Una montaña, aún apagada') : WN_T.read[ph - 1]);
    }

    // solo trabaja mientras la luz sube; el resto de la figura no se toca
    function frame() {
      if (st.phase !== 1) return;
      const u = Math.min(1, (performance.now() - st.t0) / WALK), t = ease(u), [x, y] = atT(t);
      setT(t);
      scan.setAttribute('transform', `translate(${x.toFixed(2)} ${y.toFixed(2)})`);
      for (const [e, el] of spEl) if (e.o.t <= t + .012) el.classList.add('on');
      if (u >= 1) { scan.style.opacity = 0; flag.classList.add('hot'); }
    }

    const go = n => { st.phase = ((n % 3) + 3) % 3; st.t0 = performance.now(); render(); };
    const next = () => go(st.phase + 1);
    const tick = () => api.after(DUR[st.phase], () => { if (auto) { next(); tick(); } });
    api.loop(frame);
    stage.addEventListener('click', () => { auto = false; next(); });
    go(/still/.test(location.search) ? 2 : 0);
    return {
      key(e) {
        if (e.key === ' ' || e.key === 'Enter') { auto = false; next(); return true; }
        if (e.key === 'r' || e.key === 'R') { auto = false; go(0); return true; }
        return false;
      },
      demo() { if (QUIET) { go(2); return; } auto = true; go(1); tick(); },
    };
  },
});
