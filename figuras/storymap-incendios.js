const EN = new URLSearchParams(location.search).get('lang') === 'en';
const SMI = EN ? {
  name: 'Wildfire storymap',
  hint: 'Click the satellite · space next · ← back · r restart',
  aria: 'Isometric terrain split into plots. A satellite sweeps a beam over them and burn severity (low, moderate, high) appears chapter by chapter. Click the satellite or press space for the next chapter.',
  chap: 'chapter', sev: ['', 'low', 'moderate', 'high'], sevWord: 'severity', title: 'Sentinel-2 · dNBR',
} : {
  name: 'Storymap de incendios',
  hint: 'Clic en el satélite · espacio avanza · ← vuelve · r reinicia',
  aria: 'Terreno isométrico dividido en parcelas. Un satélite lanza un haz de barrido y la severidad de lo quemado (baja, moderada, alta) aparece capítulo a capítulo. Pulsa el satélite o espacio para pasar de capítulo.',
  chap: 'capítulo', sev: ['', 'baja', 'moderada', 'alta'], sevWord: 'severidad', title: 'Sentinel-2 · dNBR',
};

FIGS.push({
  id: 'storymap-incendios', name: SMI.name, hint: SMI.hint, aria: SMI.aria,
  css: `[data-fig="storymap-incendios"] .sm-b{fill:var(--accent);opacity:0;transition:opacity .7s ease}
[data-fig="storymap-incendios"] .sm-b.s1{opacity:.28}
[data-fig="storymap-incendios"] .sm-b.s2{opacity:.58}
[data-fig="storymap-incendios"] .sm-b.s3{opacity:.95;filter:url(#soft)}
[data-fig="storymap-incendios"] .sm-t{fill:var(--body);stroke:var(--detail);stroke-width:.8;vector-effect:non-scaling-stroke}
[data-fig="storymap-incendios"] .sm-fan{fill:var(--accent);opacity:.16}
[data-fig="storymap-incendios"] .sm-ln{fill:none;stroke:var(--accent-hi);stroke-width:2.2;vector-effect:non-scaling-stroke}
[data-fig="storymap-incendios"] .sm-strip{fill:var(--accent);opacity:.3}
[data-fig="storymap-incendios"] .sm-lg{font-size:10px}
[data-fig="storymap-incendios"] .sm-f1{fill:var(--accent-hi)}
[data-fig="storymap-incendios"] .sm-f2{fill:var(--accent)}
[data-fig="storymap-incendios"] .sm-sm{fill:none;stroke:var(--ink);stroke-width:.8;vector-effect:non-scaling-stroke}
[data-fig="storymap-incendios"] .sm-pip{fill:none;stroke:var(--line);stroke-width:1;vector-effect:non-scaling-stroke}
[data-fig="storymap-incendios"] .sm-pip.on{fill:var(--accent);stroke:var(--accent-hi)}
[data-fig="storymap-incendios"] #storymap-incendios-sat{cursor:pointer}`,
  mount(stage, api) {
    const id = 'storymap-incendios';
    const N = 6, S = 30, M = 8, W = N * S + 2 * M, Z = 66, GZ = 12, SWEEP = 2400, FIRE = 3200;
    const K = api.iso.frame([[0, 0, 0], [W, 0, 0], [0, W, 0], [W, W, 0], [W / 2, 0, Z + 18]]);
    const { P, D, TOP, FRONT, box } = K;
    const [OX, OY] = P(0, 0, 0);
    const CHSEV = [0, 1, 2, 3, 2, 1, 3, 2, 3, 3];

    // parcelas quemadas: un frente que crece desde una parcela, 3 por capítulo
    let seed = 7;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const key = (i, j) => j * N + i;
    const burn = {};
    const order = [];
    const frontier = [[2, 3]];
    while (order.length < 27 && frontier.length) {
      const [i, j] = frontier.splice(Math.floor(rnd() * frontier.length), 1)[0];
      if (burn[key(i, j)]) continue;
      burn[key(i, j)] = { i, j };
      order.push(burn[key(i, j)]);
      [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([a, b]) => {
        const x = i + a, y = j + b;
        if (x >= 0 && y >= 0 && x < N && y < N && !burn[key(x, y)]) frontier.push([x, y]);
      });
    }
    order.forEach((c, n) => {
      c.ch = 1 + Math.floor(n / 3);
      const d = CHSEV[c.ch];
      c.sev = n % 3 === 0 ? d : (rnd() < 0.65 ? d : Math.max(1, d - 1));
    });

    // terreno
    let svg = box(0, 0, 0, W, W, 6, 10);
    for (let s = 0; s <= 2 * N - 2; s++) {
      for (let i = 0; i < N; i++) {
        const j = s - i;
        if (j < 0 || j >= N) continue;
        const x0 = M + i * S, y0 = M + j * S;
        const h = Math.max(2, Math.round(5 + 3 * Math.sin(i * 0.8 + 0.5) + 3 * Math.cos(j * 0.6 + i * 0.3)));
        const zt = 6 + h;
        svg += box(x0, y0, 6, S, S, h, 1);
        svg += `<g transform="${TOP(x0, y0, zt)}"><rect class="sm-b" id="${id}-b${key(i, j)}" x="0" y="0" width="${S}" height="${S}"/></g>`;
        const trees = [];
        for (let t = 0; t < 5; t++) trees.push([x0 + 5 + rnd() * (S - 10), y0 + 5 + rnd() * (S - 10)]);
        trees.sort((a, b) => a[0] + a[1] - b[0] - b[1]);
        trees.forEach(([x, y]) => {
          const [px, py] = P(x, y, zt);
          svg += `<path class="sm-t" d="M${px - 3.2} ${py}L${px + 3.2} ${py}L${px} ${py - 8.5}Z"/>`;
        });
        if (burn[key(i, j)]) {
          svg += `<g id="${id}-f${key(i, j)}" style="display:none">`;
          [[0.3, 0.35, 1.3], [0.7, 0.45, 1.05], [0.45, 0.78, 1.4]].forEach(([fx, fy, sc], n) => {
            const [px, py] = P(x0 + fx * S, y0 + fy * S, zt);
            svg += `<g class="sm-fl" data-n="${n}" data-sc="${sc}" transform="translate(${px.toFixed(1)} ${py.toFixed(1)})">` +
              `<path class="sm-sm" d="M0 -20q-4 -5 0 -10t0 -10t0 -10"/>` +
              `<g class="sm-fi"><path class="sm-f1" filter="url(#glow)" d="M0 0C-7 -3 -7 -11 -1 -19C0 -13 2 -12 3 -15C7 -9 8 -3 0 0Z"/>` +
              `<path class="sm-f2" d="M0 0C-3 -1 -3 -5 0 -9C1 -6 3 -4 0 0Z"/></g></g>`;
          });
          svg += `</g>`;
        }
      }
    }

    // haz de barrido
    svg += `<path class="sm-fan" id="${id}-fan" d=""/><path class="sm-strip" id="${id}-strip" d=""/><path class="sm-ln" id="${id}-ln" filter="url(#glow)" d=""/>`;

    // satélite (se dibuja en y=0 y se traslada con D)
    const cx = W / 2;
    let sat = box(cx - 54, -4, Z + 5, 40, 8, 3, 0);
    sat += `<g transform="${TOP(cx - 54, -4, Z + 8)}">${api.iso.slits(5, 37, 6, 0, 8)}</g>`;
    sat += `<g class="press">${box(cx - 12, -12, Z, 24, 24, 16, 2)}</g>`;
    sat += `<g transform="${FRONT(cx - 12, 12, Z + 16)}"><rect class="face led hot" filter="url(#soft)" x="4" y="4" width="16" height="7"/></g>`;
    sat += box(cx + 14, -4, Z + 5, 40, 8, 3, 0);
    sat += `<g transform="${TOP(cx + 14, -4, Z + 8)}">${api.iso.slits(5, 37, 6, 0, 8)}</g>`;
    svg += `<g id="${id}-pos"><g id="${id}-sat">${sat}</g></g>`;

    // leyenda mínima y progreso de capítulos
    const lx = OX - 180, ly = OY + 152;
    [1, 2, 3].forEach((v, n) => {
      const yy = ly + n * 12;
      svg += `<rect class="face" x="${lx}" y="${yy}" width="10" height="9"/><rect class="sm-b s${v}" x="${lx}" y="${yy}" width="10" height="9" style="transition:none"/>`;
      svg += `<text class="label sm-lg" x="${lx + 16}" y="${yy + 8}">${SMI.sev[v]}</text>`;
    });
    for (let n = 0; n < 9; n++) svg += `<rect class="sm-pip" id="${id}-p${n}" x="${OX + 62 + n * 12}" y="${OY + 186}" width="8" height="8"/>`;

    stage.setAttribute('viewBox', `${OX - 186} ${OY - 58} 372 279`);
    stage.innerHTML = svg;
    const $ = s => stage.querySelector('#' + id + '-' + s);
    const cellEl = {};
    order.forEach(c => { const k = key(c.i, c.j); cellEl[k] = $('b' + k); c.fEl = $('f' + k); c.seen = false; c.fire = null; c.sc = false; });
    const pips = [...Array(9).keys()].map(n => $('p' + n));
    const fan = $('fan'), strip = $('strip'), ln = $('ln'), pos = $('pos'), satEl = $('sat');

    const st = { ch: 1, t0: -1e9, auto: false };
    const pt = (x, y, z) => P(x, y, z).map(v => v.toFixed(1)).join(' ');
    const ease = q => q * q * (3 - 2 * q);

    function update(ts) {
      const p = (ts - st.t0) / SWEEP;
      let by, on = false;
      if (p < 1) { by = p * W; on = true; }
      else { const q = Math.min(1, (p - 1) * SWEEP / 700); by = W * (1 - ease(q)); }
      by = Math.max(0, Math.min(W, by));
      const bob = 2 * Math.sin(ts / 520);
      const d = D(0, by, bob);
      pos.setAttribute('transform', `translate(${d[0].toFixed(1)} ${d[1].toFixed(1)})`);
      fan.style.display = strip.style.display = ln.style.display = on ? '' : 'none';
      if (on) {
        fan.setAttribute('d', `M${pt(cx, by, Z)}L${pt(0, by, GZ)}L${pt(W, by, GZ)}Z`);
        strip.setAttribute('d', `M${pt(0, by - 6, GZ)}L${pt(W, by - 6, GZ)}L${pt(W, by + 6, GZ)}L${pt(0, by + 6, GZ)}Z`);
        ln.setAttribute('d', `M${pt(0, by, GZ)}L${pt(W, by, GZ)}`);
      }
      order.forEach(c => {
        const want = c.ch <= st.ch && (p >= 1 || M + c.j * S + S / 2 <= by);
        const el = cellEl[key(c.i, c.j)];
        if (want && !c.seen) {
          c.seen = true;
          if (p < 1) { c.fire = ts; c.sc = false; c.fEl.style.display = ''; }
          else { c.sc = true; el.setAttribute('class', 'sm-b s' + c.sev); }
        } else if (c.ch > st.ch && c.seen) {
          c.seen = false; c.fire = null; c.sc = false; c.fEl.style.display = 'none'; el.setAttribute('class', 'sm-b');
        }
        if (c.fire !== null) {
          const age = ts - c.fire;
          if (age > 2200 && !c.sc) { c.sc = true; el.setAttribute('class', 'sm-b s' + c.sev); }
          if (age > FIRE) { c.fire = null; c.fEl.style.display = 'none'; return; }
          c.fEl.style.opacity = Math.min(1, age / 250, (FIRE - age) / 700).toFixed(2);
          c.fEl.querySelectorAll('.sm-fl').forEach(f => {
            const n = +f.dataset.n, sc = +f.dataset.sc;
            const fl = 1 + 0.22 * Math.sin(ts / 85 + n * 2) + 0.1 * Math.sin(ts / 41 + n);
            f.querySelector('.sm-fi').setAttribute('transform', `scale(${(sc * (1 + 0.08 * Math.sin(ts / 110 + n))).toFixed(2)} ${(sc * fl).toFixed(2)}) skewX(${(6 * Math.sin(ts / 130 + n)).toFixed(1)})`);
            const q = ((ts / 1500) + n * 0.33) % 1;
            const sm = f.querySelector('.sm-sm');
            sm.setAttribute('transform', `translate(${(2 * Math.sin(q * 6)).toFixed(1)} ${(-q * 8).toFixed(1)})`);
            sm.style.opacity = ((1 - q) * 0.7).toFixed(2);
          });
        }
      });
    }
    function clearAll() { order.forEach(c => { c.seen = false; c.fire = null; c.sc = false; c.fEl.style.display = 'none'; cellEl[key(c.i, c.j)].setAttribute('class', 'sm-b'); }); }
    function readout() { api.readout(`${SMI.chap} ${st.ch}/9 · ${SMI.sevWord} ${SMI.sev[CHSEV[st.ch]]}`); }
    function go(n, sweep) {
      st.ch = n;
      st.t0 = sweep ? performance.now() : -1e9;
      pips.forEach((e, n) => e.setAttribute('class', 'sm-pip' + (n < n0() ? ' on' : '')));
      readout();
    }
    const n0 = () => st.ch;
    const next = () => { if (st.ch < 9) go(st.ch + 1, true); };
    const autoNext = () => { if (st.ch >= 9) { clearAll(); go(1, true); } else go(st.ch + 1, true); };
    const prev = () => { if (st.ch > 1) go(st.ch - 1, false); };
    const reset = () => { clearAll(); go(1, true); };
    const stop = () => { st.auto = false; };

    satEl.addEventListener('click', e => { e.stopPropagation(); stop(); next(); });
    stage.addEventListener('pointerdown', stop);
    go(1, false);
    update(performance.now());
    api.loop(update);

    return {
      key(e) {
        stop();
        if (e.key === ' ' || e.key === 'ArrowRight') { next(); return true; }
        if (e.key === 'ArrowLeft') { prev(); return true; }
        if (e.key === 'r' || e.key === 'R') { reset(); return true; }
        return false;
      },
      demo() {
        st.auto = true;
        reset();
        api.every(3600, () => { if (st.auto) autoNext(); });
      },
    };
  },
});
