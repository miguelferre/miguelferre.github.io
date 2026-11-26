const MP_EN = new URLSearchParams(location.search).get('lang') === 'en';
const MP_T = {
  name: MP_EN ? 'Water drawn with data' : 'El agua dibujada con datos',
  hint: MP_EN ? 'Click or space: next view · r restarts' : 'Clic o espacio: siguiente vista · r reinicia',
  aria: MP_EN
    ? 'Isometric block of terrain with contour lines. A river comes down from the hills to a ria. First the river lights up from source to mouth; then the depth lines and soundings of the ria light up from the shore to the deep. Click, space or r.'
    : 'Bloque isométrico de terreno con curvas de nivel. Un río baja de los montes a una ría. Primero el río se enciende de la fuente a la boca; después se encienden las isóbatas y las sondas de la ría, de la orilla al fondo. Clic, espacio o r.',
  read: MP_EN
    ? ['The river without the slope', 'The ria under the water']
    : ['El río sin la pendiente', 'La ría bajo el agua'],
  tags: MP_EN ? ['River without the slope', 'Ria under the water'] : ['El río sin pendiente', 'La ría bajo el agua'],
};

FIGS.push({
  id: 'mapas', name: MP_T.name, hint: MP_T.hint, aria: MP_T.aria,
  css: `
    [data-fig="mapas"] .mp-cell { stroke-width: .7; stroke-linejoin: round; vector-effect: non-scaling-stroke; }
    [data-fig="mapas"] .mp-land { fill: var(--deck); stroke: var(--deck); }
    [data-fig="mapas"] .mp-sea { fill: var(--recess); stroke: var(--recess); transition: fill .8s ease, stroke .8s ease; }
    [data-fig="mapas"].mp-wet .mp-sea { fill: color-mix(in srgb, var(--accent) 22%, var(--deck)); stroke: color-mix(in srgb, var(--accent) 22%, var(--deck)); }
    [data-fig="mapas"] .mp-iso { fill: none; stroke: var(--detail); stroke-width: 1; vector-effect: non-scaling-stroke; }
    [data-fig="mapas"] .mp-iso.idx { stroke: var(--line); stroke-width: 1.2; }
    [data-fig="mapas"] .mp-coast { fill: none; stroke: var(--line); stroke-width: 1.5; stroke-linejoin: round; vector-effect: non-scaling-stroke; }
    [data-fig="mapas"] .mp-bat { fill: none; stroke: var(--detail); stroke-width: 1; stroke-dasharray: 3 3; vector-effect: non-scaling-stroke; transition: stroke .5s ease, stroke-width .5s ease; }
    [data-fig="mapas"] .mp-bat.on { stroke: var(--accent); stroke-width: 1.6; stroke-dasharray: none; }
    [data-fig="mapas"] .mp-snd { font-size: 7px; font-style: italic; fill: var(--detail); transition: fill .5s ease; }
    [data-fig="mapas"] .mp-snd.on { fill: var(--accent-hi); font-weight: 600; }
    [data-fig="mapas"] .mp-sky { fill: none; stroke: var(--line); stroke-width: 1.4; stroke-linejoin: round; vector-effect: non-scaling-stroke; }
    [data-fig="mapas"] .mp-sec { fill: var(--recess); stroke: var(--line); stroke-width: 1; vector-effect: non-scaling-stroke; transition: fill .8s ease; }
    [data-fig="mapas"].mp-wet .mp-sec { fill: var(--accent); fill-opacity: .35; }
    [data-fig="mapas"] .mp-bed { fill: none; stroke: var(--line); stroke-width: 1.3; vector-effect: non-scaling-stroke; }
    [data-fig="mapas"] .mp-riv0 { fill: none; stroke: var(--line); stroke-width: 1.6; stroke-linejoin: round; stroke-linecap: round; vector-effect: non-scaling-stroke; }
    [data-fig="mapas"] .mp-tree line { stroke: var(--line); stroke-width: 1.2; vector-effect: non-scaling-stroke; }
    [data-fig="mapas"] .mp-tree path { fill: var(--deck); stroke: var(--line); stroke-width: 1.1; vector-effect: non-scaling-stroke; }
    [data-fig="mapas"] .mp-lit { transition: opacity .9s ease; }
    [data-fig="mapas"] .mp-band { fill: none; stroke: var(--accent); stroke-opacity: .2; stroke-width: 26; stroke-linejoin: round; stroke-linecap: round; }
    [data-fig="mapas"] .mp-halo { fill: none; stroke: var(--accent); stroke-opacity: .35; stroke-width: 9; stroke-linejoin: round; stroke-linecap: round; }
    [data-fig="mapas"] .mp-core { fill: none; stroke: var(--accent); stroke-width: 3.6; stroke-linejoin: round; stroke-linecap: round; }
    [data-fig="mapas"] .mp-lead { fill: none; stroke: var(--accent); stroke-width: 1.1; opacity: 0; transition: opacity .4s; vector-effect: non-scaling-stroke; }
    [data-fig="mapas"] .mp-tag { opacity: 0; transition: opacity .4s; font-size: 17px; font-weight: 600; fill: var(--ink-hi); stroke: var(--panel); stroke-width: 5px; paint-order: stroke; }
    [data-fig="mapas"] .mp-on { opacity: 1; }
  `,
  mount(stage, api) {
    const N = 200, G = 50, Q = N / G, ZB = -34, STEP = 8, f1 = n => n.toFixed(1);
    const sm = (a, b, v) => { const t = Math.min(1, Math.max(0, (v - a) / (b - a))); return t * t * (3 - 2 * t); };
    const bump = (x, y, cx, cy, a, s) => a * Math.exp(-Math.pow(Math.hypot(x - cx, y - cy) / s, 1.6));
    // distancia a una polilínea y posición a lo largo (0 a 1)
    const along = (pts) => { const L = [0]; for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])); return L; };
    const dist = (pts, L, x, y) => {
      let best = 1e9, bt = 0;
      for (let i = 1; i < pts.length; i++) {
        const [ax, ay] = pts[i - 1], [bx, by] = pts[i], dx = bx - ax, dy = by - ay, l2 = dx * dx + dy * dy;
        const u = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / l2)), d = Math.hypot(x - ax - u * dx, y - ay - u * dy);
        if (d < best) { best = d; bt = (L[i - 1] + u * (L[i] - L[i - 1])) / L[L.length - 1]; }
      }
      return [best, bt];
    };

    // el río baja de los montes del fondo; la ría se abre hacia la esquina delantera
    const RIV = [[8, 112], [26, 96], [30, 72], [48, 58], [70, 66], [74, 90], [94, 104], [112, 98]];
    const RIA = [[112, 98], [130, 108], [148, 112], [168, 124], [190, 138], [220, 150]];
    const LR = along(RIV), LA = along(RIA);
    const land = (x, y) => 4 + 24 * (1 - (x + y) / 400)
      + bump(x, y, 34, 160, 40, 34) + bump(x, y, 150, 36, 46, 36) + bump(x, y, 70, 14, 22, 24)
      + bump(x, y, 176, 92, 18, 20) + bump(x, y, 118, 160, 16, 22)
      + 1.4 * Math.sin(x / 11 + y / 19) * Math.sin(y / 15 - x / 27);
    const h = (x, y) => {
      const [dr] = dist(RIV, LR, x, y), [da, ta] = dist(RIA, LA, x, y);
      let z = land(x, y) - 10 * Math.exp(-Math.pow(dr / 12, 2));
      z = Math.max(z, 1.2 + .06 * dr);
      const w = 10 + 50 * Math.sqrt(ta), g = sm(w, w * .4, da), sea = -(3 + 24 * ta) * (1 - Math.pow(da / (w * 1.3), 2));
      z = z * (1 - g) + Math.min(sea, -1) * g;
      const open = sm(352, 392, x + y);
      return z * (1 - open) + (-26 - .5 * Math.sin(x / 9)) * open;
    };
    const zs = (x, y) => Math.max(0, h(x, y));

    const top = [150, 34], ZT = land(...top) + 4;
    const K = api.iso.frame([[0, 0, 0], [N, N, 0], [0, N, 0], [N, 0, 0], [top[0], top[1], ZT + 20], [N, N, ZB]]);
    const { P, box } = K;

    // relieve por diagonales; el mar es la lámina plana a cota 0
    const cross = (a, b, za, zb, lv) => { const u = (lv - za) / (zb - za); return [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u]; };
    const LEV = [-4, -9, -15, -21];
    // árboles en las laderas bajas, lejos del río y del agua, en su sitio del orden de pintura
    let tseed = 5; const trnd = () => (tseed = (tseed * 16807) % 2147483647) / 2147483647;
    const trees = {}, tpos = [];
    for (let k = 0, n = 0; k < 1500 && n < 44; k++) {
      const x = 5 + trnd() * (N - 10), y = 5 + trnd() * (N - 10), z = h(x, y);
      if (z < 3 || z > 30 || dist(RIV, LR, x, y)[0] < 10 || tpos.some(p => Math.hypot(p[0] - x, p[1] - y) < 7)) continue;
      tpos.push([x, y]); n++;
      const d = Math.floor(x / Q) + Math.floor(y / Q), b = P(x, y, z), s = .7 + trnd() * .35;
      (trees[d] = trees[d] || []).push([b[1], `<g class="mp-tree" transform="translate(${f1(b[0])} ${f1(b[1])}) scale(${s.toFixed(2)})"><line x1="0" y1="0" x2="0" y2="-4"/><path d="M-5 -4 L0 -13 L5 -4 z"/><path d="M-4 -10 L0 -18 L4 -10 z"/></g>`]);
    }
    let svg = box(-8, -8, ZB - 7, N + 16, N + 16, 6, 12);
    for (let d = 0; d <= 2 * (G - 1); d++) {
      let landD = '', seaD = '', iso = '', idx = '', coast = '';
      const bat = LEV.map(() => '');
      for (let i = Math.max(0, d - G + 1); i <= Math.min(G - 1, d); i++) {
        const j = d - i, c = [[i * Q, j * Q], [(i + 1) * Q, j * Q], [(i + 1) * Q, (j + 1) * Q], [i * Q, (j + 1) * Q]], z = c.map(p => h(p[0], p[1]));
        const poly = 'M' + c.map((p, k) => { const q = P(p[0], p[1], Math.max(0, z[k])); return f1(q[0]) + ' ' + f1(q[1]); }).join('L') + 'Z';
        if (z.every(v => v <= 0)) seaD += poly; else landD += poly;
        const seg = (lv, zz) => { const out = []; for (let k = 0; k < 4; k++) { const m = (k + 1) % 4; if ((z[k] < lv) !== (z[m] < lv)) out.push(cross(c[k], c[m], z[k], z[m], lv)); } return out; };
        const line = (pts, zz) => { let s = ''; for (let k = 0; k + 1 < pts.length; k += 2) { const A = P(pts[k][0], pts[k][1], zz), B = P(pts[k + 1][0], pts[k + 1][1], zz); s += `M${f1(A[0])} ${f1(A[1])}L${f1(B[0])} ${f1(B[1])}`; } return s; };
        coast += line(seg(0), 0);
        LEV.forEach((lv, n) => { bat[n] += line(seg(lv), 0); });
        const hx = (z[1] - z[0] + z[2] - z[3]) / (2 * Q), hy = (z[3] - z[0] + z[2] - z[1]) / (2 * Q);
        if (1 - hx - hy < .35) continue;
        const lo = Math.max(1, Math.ceil(Math.min(...z) / STEP)), hi = Math.floor(Math.max(...z) / STEP);
        for (let n = lo; n <= hi; n++) { const s = line(seg(n * STEP), n * STEP); if (n % 4 === 0) idx += s; else iso += s; }
      }
      if (seaD) svg += `<path class="mp-cell mp-sea" d="${seaD}"/>`;
      bat.forEach((s, n) => { if (s) svg += `<path class="mp-bat mp-b${n}" d="${s}"/>`; });
      if (landD) svg += `<path class="mp-cell mp-land" d="${landD}"/>`;
      if (iso) svg += `<path class="mp-iso" d="${iso}"/>`;
      if (idx) svg += `<path class="mp-iso idx" d="${idx}"/>`;
      if (coast) svg += `<path class="mp-coast" d="${coast}"/>`;
      if (trees[d]) svg += trees[d].sort((u, v) => u[0] - v[0]).map(e => e[1]).join('');
    }

    // silueta superior, para que el bloque se lea sobre el fondo
    const sky = new Map();
    for (let x = 0; x <= N; x += 1.25) for (let y = 0; y <= N; y += 1.25) {
      const q = P(x, y, zs(x, y)), b = Math.round(q[0] / 2.5), c = sky.get(b);
      if (c === undefined || q[1] < c) sky.set(b, q[1]);
    }
    svg += `<path class="mp-sky" d="M${[...sky.keys()].sort((a, b) => a - b).map(b => f1(b * 2.5) + ' ' + f1(sky.get(b))).join('L')}"/>`;

    // paredes del bloque: el terreno corta la tierra; bajo el mar se ve el corte del agua y el fondo
    const edgeY = Array.from({ length: 4 * G + 1 }, (_, i) => [i * Q / 4, N]), edgeX = Array.from({ length: 4 * G + 1 }, (_, i) => [N, i * Q / 4]);
    const wall = (pts, cls) => {
      const up = pts.map(p => P(p[0], p[1], zs(p[0], p[1]))), dn = [P(...pts[pts.length - 1], ZB), P(...pts[0], ZB)];
      let s = `<path class="face${cls}" d="M${[...up, ...dn].map(q => f1(q[0]) + ' ' + f1(q[1])).join('L')}Z"/>`;
      // corte del agua: entre la lámina (z = 0) y el fondo
      let run = [];
      const flush = () => {
        if (run.length > 1) {
          const surf = run.map(p => P(p[0], p[1], 0)), bed = run.map(p => P(p[0], p[1], h(p[0], p[1]))).reverse();
          s += `<path class="mp-sec" d="M${[...surf, ...bed].map(q => f1(q[0]) + ' ' + f1(q[1])).join('L')}Z"/>`;
        }
        run = [];
      };
      for (const p of pts) { if (h(p[0], p[1]) < 0) run.push(p); else flush(); }
      flush();
      return s;
    };
    svg += wall(edgeY, '') + wall(edgeX, ' top');

    // sondas, como en las cartas náuticas antiguas: números de fondo en brazas sobre el agua
    let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const snd = [];
    for (let k = 0; k < 900 && snd.length < 26; k++) {
      const x = 8 + rnd() * (N - 16), y = 8 + rnd() * (N - 16), z = h(x, y);
      if (z > -2.5 || snd.some(s => Math.hypot(s.x - x, s.y - y) < 15)) continue;
      snd.push({ x, y, v: Math.round(-z / 1.83), lv: LEV.findIndex(l => z > l) });
    }
    snd.sort((a, b) => (a.x + a.y) - (b.x + b.y));
    svg += snd.map((s, k) => `<g transform="${K.TOP(s.x, s.y, 0)}"><text id="mapas-s${k}" class="mp-snd" x="0" y="0" text-anchor="middle">${s.v}</text></g>`).join('');

    // el río: trazo apagado y, encima, la luz que baja de la fuente a la boca
    const rpts = [];
    for (let i = 0; i < 160; i++) {
      const t = i / 159, Lt = t * LR[LR.length - 1];
      let k = 1; while (k < LR.length - 1 && LR[k] < Lt) k++;
      const u = (Lt - LR[k - 1]) / (LR[k] - LR[k - 1]), x = RIV[k - 1][0] + (RIV[k][0] - RIV[k - 1][0]) * u, y = RIV[k - 1][1] + (RIV[k][1] - RIV[k - 1][1]) * u;
      rpts.push(P(x, y, zs(x, y) + .6));
    }
    // suavizado ligero del trazo en pantalla
    const rs = rpts.map((p, i) => i === 0 || i === rpts.length - 1 ? p : [(rpts[i - 1][0] + 2 * p[0] + rpts[i + 1][0]) / 4, (rpts[i - 1][1] + 2 * p[1] + rpts[i + 1][1]) / 4]);
    const rivD = 'M' + rs.map(q => f1(q[0]) + ' ' + f1(q[1])).join('L');
    svg += `<path class="mp-riv0" d="${rivD}"/>`;
    svg += `<g id="mapas-lit" class="mp-lit" pointer-events="none" style="opacity:0">`
      + ['band', 'halo', 'core'].map(k => `<path id="mapas-${k}" class="mp-${k}" pathLength="1000" stroke-dasharray="0 1000" d="${rivD}"/>`).join('') + `</g>`;

    // marco de vista y rótulos con línea de guía, a los lados
    const pcx = P(N / 2, N / 2, 0)[0], vt = P(top[0], top[1], ZT + 20)[1] - 10, vH = P(N, N, ZB - 7)[1] + 14 - vt, vW = vH * 1.6, vL = pcx - vW / 2;
    const anchors = [P(...RIV[4], zs(...RIV[4]) + 1), P(160, 120, 0)];
    svg += anchors.map((q, k) => {
      // el río, arriba a la izquierda; la ría, abajo, a la derecha de su guía
      const w = MP_T.tags[k].length * 10.8;
      if (k === 0) {
        const x = vL + 14, y = vt + 22;
        return `<path id="mapas-lead${k}" class="mp-lead" d="M${f1(q[0])} ${f1(q[1])}L${f1(q[0])} ${f1(y)}L${f1(x + w + 6)} ${f1(y)}"/>`
          + `<text id="mapas-tag${k}" class="label mp-tag" x="${f1(x)}" y="${f1(y + 6)}">${api.iso.esc(MP_T.tags[k])}</text>`;
      }
      const y = vt + vH - 18, x = Math.min(q[0] + 10, vL + vW - 14 - w);
      return `<path id="mapas-lead${k}" class="mp-lead" d="M${f1(q[0])} ${f1(q[1])}L${f1(q[0])} ${f1(y - 5)}"/>`
        + `<text id="mapas-tag${k}" class="label mp-tag" x="${f1(x)}" y="${f1(y)}">${api.iso.esc(MP_T.tags[k])}</text>`;
    }).join('');

    stage.setAttribute('viewBox', `${f1(vL)} ${f1(vt)} ${f1(vW)} ${f1(vH)}`);
    stage.innerHTML = svg;

    const $ = id => stage.querySelector('#mapas-' + id);
    const root = stage.closest('[data-fig]') || stage;
    const lit = $('lit'), dash = ['band', 'halo', 'core'].map($);
    const batEl = LEV.map((_, n) => [...stage.querySelectorAll('.mp-b' + n)]);
    const sndEl = snd.map((s, k) => [s, $('s' + k)]);
    const tagEl = [0, 1].map(k => [$('lead' + k), $('tag' + k)]);
    const QUIET = /still/.test(location.search) || matchMedia('(prefers-reduced-motion: reduce)').matches;
    const DUR = [1200, 5200, 6200], RUN = [0, 4200, 4200];
    const st = { phase: 0, t0: 0 };
    let auto = false;
    const ease = u => (1 - Math.cos(Math.PI * u)) / 2;
    const setT = t => { const v = `${(t * 1000).toFixed(2)} 1000`; for (const d of dash) d.setAttribute('stroke-dasharray', v); };
    const setDepth = t => {
      // de la orilla al fondo: cada isóbata y sus sondas se encienden a su turno
      batEl.forEach((els, n) => { const on = t >= (n + .5) / (LEV.length + .5); for (const el of els) el.classList.toggle('on', on); });
      for (const [s, el] of sndEl) el.classList.toggle('on', t >= (Math.max(0, s.lv === -1 ? LEV.length : s.lv) + .5) / (LEV.length + .5));
    };

    function render() {
      const ph = st.phase;
      lit.style.opacity = ph === 0 ? 0 : 1;
      root.classList.toggle('mp-wet', ph === 2);
      if (ph === 0) { setT(0); setDepth(-1); }
      if (ph === 1) { setT(0); setDepth(-1); }
      if (ph === 2) { setT(1); setDepth(QUIET ? 1 : 0); }
      tagEl[0].forEach(el => el.classList.toggle('mp-on', ph >= 1));
      tagEl[1].forEach(el => el.classList.toggle('mp-on', ph === 2));
      api.power(ph >= 1);
      api.readout(ph === 0 ? (MP_EN ? 'A valley and a ria, still dark' : 'Un valle y una ría, aún apagados') : MP_T.read[ph - 1]);
    }

    function frame() {
      const ph = st.phase; if (ph === 0) return;
      const u = Math.min(1, (performance.now() - st.t0) / RUN[ph]), t = ease(u);
      if (ph === 1) setT(t);
      if (ph === 2 && !QUIET) setDepth(t);
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
