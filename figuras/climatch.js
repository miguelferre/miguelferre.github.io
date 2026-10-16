const EN = new URLSearchParams(location.search).get('lang') === 'en';
FIGS.push({
  id: 'climatch',
  name: EN ? 'Climate match' : 'Clima que encaja',
  hint: EN ? 'Space toggles today / 2050 · 1 2 3 pick the climate you want' : 'Espacio alterna hoy / 2050 · 1 2 3 eligen el clima que quieres',
  aria: EN
    ? 'Isometric figure: three small cities, each with a temperature column and an uncertainty band. A switch moves from today to 2050, the columns rise, the bands widen and the match beacon moves to another city. Space toggles, keys 1 to 3 pick the preferred climate, click the switch to toggle.'
    : 'Figura isométrica: tres ciudades pequeñas, cada una con una columna de temperatura y una banda de incertidumbre. Un interruptor pasa de hoy a 2050, las columnas suben, las bandas se ensanchan y la baliza de coincidencia salta a otra ciudad. Espacio alterna, las teclas 1 a 3 eligen el clima preferido, clic en el interruptor alterna.',
  mount(stage, api) {
    const W = 290, DD = 122;
    const K = api.iso.frame([[0,0,0],[W,0,0],[0,DD,0],[W,DD,0],[0,0,124]]);
    const { P, D, TOP, FRONT, box } = K;
    const L = EN ? { now: 'TODAY', fut: '2050', match: 'MATCH' } : { now: 'HOY', fut: '2050', match: 'MATCH' };
    const NAMES = ['A', 'B', 'C'];
    const TODAY = [0.30, 0.52, 0.78];
    const FUT = [0.58, 0.72, 0.95];
    const UNC = [0.05, 0.15];
    const H = 84;
    const X0 = [10, 106, 202];
    const TARGET = [0.30, 0.52, 0.78];

    const items = [];
    items.push({ s: -1, svg: box(0,0,0, W,DD,8, 12) + `<g transform="${TOP(0,0,8)}"><rect class="detail" x="5" y="5" width="${W - 10}" height="${DD - 10}" rx="8"/></g>` });
    const wins = [[], [], []];
    let wid = 0;
    X0.forEach((x0, i) => {
      // cajas cerradas, disjuntas; orden por suma de centro
      const blocks = [[x0, 30, 24, 24, 40], [x0 + 28, 30, 22, 24, 54], [x0 + 6, 56, 30, 22, 26]];
      blocks.forEach(([x, y, w, d, h]) => {
        let g = `<g transform="${FRONT(x, y + d, 8 + h)}">`;
        for (let c = 0; c < Math.floor((w - 4) / 8); c++) for (let r = 0; r < Math.floor((h - 4) / 10); r++) {
          const id = `climatch-w${wid++}`; wins[i].push(id);
          g += `<rect id="${id}" class="led" x="${4 + c * 8}" y="${4 + r * 10}" width="4" height="5"/>`;
        }
        items.push({ s: x + y + (w + d) / 2, svg: box(x, y, 8, w, d, h, 0) + g + '</g>' });
      });
      const tx = x0 + 54, ty = 32;
      const ZH = 108, grad = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(k => `<rect fill="var(--ink)" fill-opacity=".55" x="11" y="${ZH - 12 - k * 10.5 - 0.4}" width="${k % 4 === 0 ? 5 : 3}" height=".8"/>`).join('');
      items.push({ s: tx + ty + 12, svg:
        box(tx, ty, 8, 14, 8, ZH, 0) +
        `<g transform="${FRONT(tx, ty + 8, 8 + ZH)}">` +
        `<rect class="face recess" x="3.5" y="5" width="7" height="${ZH - 14}" rx="3.5"/>` + grad +
        `<rect id="climatch-bandr${i}" fill="var(--accent-hi)" fill-opacity=".45" stroke="var(--accent)" stroke-width="1" vector-effect="non-scaling-stroke" x="2" y="0" width="10" height="4"/>` +
        `<rect id="climatch-barr${i}" class="led hot" filter="url(#soft)" x="5" y="0" width="4" height="10"/>` +
        `<circle class="led hot" filter="url(#soft)" cx="7" cy="${ZH - 9}" r="7"/>` +
        `<rect id="climatch-tick${i}" fill="var(--ink-hi)" x="1" y="0" width="14" height="1.6"/></g>` });
      items.push({ s: x0 + 100, svg: `<g transform="${TOP(x0 + 2, 79, 8)}"><text class="label" id="climatch-lab${i}" x="0" y="12" font-size="12" font-weight="700">${NAMES[i]}</text></g>` });
    });
    // interruptor de dos posiciones, grande
    const SY = 98, SH = 20, SX = 56, SWD = 84;
    const seg = (id, x, txt) =>
      `<g transform="${TOP(x, SY, 8)}"><rect id="climatch-seg${id}" class="face recess" x="0" y="0" width="${SWD}" height="${SH}" rx="9"/>` +
      `<text id="climatch-t${id}" x="${SWD / 2}" y="${SH / 2 + 7}" text-anchor="middle" font-size="21" font-weight="800">${txt}</text></g>`;
    items.push({ s: 400, svg: `<g id="climatch-switch" style="cursor:pointer">${seg('0', SX, L.now)}${seg('1', SX + SWD + 4, L.fut)}</g>` });
    // nubes de linea fina
    X0.forEach((x0, i) => {
      const cl = (k, sc) => `<g id="climatch-cl${i}${k}"><path d="M2 12 H26 C33 12 33 3 25 3 C24 -3 15 -4 13 1 C8 -2 2 1 4 7 C0 7 -1 12 2 12Z" transform="scale(${sc})" fill="none" stroke="var(--ink)" stroke-opacity=".6" stroke-width="1.2" vector-effect="non-scaling-stroke"/></g>`;
      items.push({ s: 0, svg: cl('a', 1.1) + cl('b', 0.7) });
    });
    items.sort((a, b) => a.s - b.s);
    stage.setAttribute('viewBox', K.viewBox);
    stage.innerHTML = items.map(o => o.svg).join('');

    const $ = id => stage.querySelector('#' + id);
    const st = { era: 0, pref: 1, cur: [...TODAY], unc: UNC[0], match: -1, auto: true };
    const target = () => (st.era ? FUT : TODAY);
    const matchOf = () => { const t = target(); let b = 0; t.forEach((v, i) => { if (Math.abs(v - TARGET[st.pref]) < Math.abs(t[b] - TARGET[st.pref])) b = i; }); return b; };

    function discrete() {
      st.match = matchOf();
      wins.forEach((ids, i) => ids.forEach(id => $(id).classList.toggle('hot', i === st.match)));
      X0.forEach((x0, i) => $(`climatch-tick${i}`).setAttribute('y', 96 - TARGET[st.pref] * H - 0.8));
      ['0', '1'].forEach(k => {
        const on = String(st.era) === k, s = $('climatch-seg' + k);
        s.setAttribute('class', on ? 'led hot' : 'face recess');
        s.setAttribute('filter', on ? 'url(#soft)' : '');
        $('climatch-t' + k).style.fill = on ? 'var(--panel)' : 'var(--ink)';
      });
      NAMES.forEach((n, i) => {
        const t = $(`climatch-lab${i}`);
        t.textContent = i === st.match ? `${n} · ${L.match}` : n;
        t.style.fill = i === st.match ? 'var(--accent)' : '';
      });
      api.power(true);
      api.readout('');
    }
    function frame(dt, t) {
      const k = 1 - Math.pow(0.0015, dt / 1000);
      const tg = target();
      st.unc += (UNC[st.era] - st.unc) * k;
      for (let i = 0; i < 3; i++) {
        const h = Math.max(1, st.cur[i] * H), u = st.unc, BOT = 96;
        $(`climatch-barr${i}`).setAttribute('y', BOT - h);
        $(`climatch-barr${i}`).setAttribute('height', h + 2);
        const top = Math.min(1, st.cur[i] + u) * H, bot = Math.max(0, st.cur[i] - u) * H;
        $(`climatch-bandr${i}`).setAttribute('y', BOT - top);
        $(`climatch-bandr${i}`).setAttribute('height', Math.max(2, top - bot));
        for (const [k2, sc, ph] of [['a', 1, 0], ['b', 0.7, 2]]) {
          const dx = 9 * Math.sin(t / 1800 + i * 1.7 + ph), dz = 1.5 * Math.sin(t / 1100 + i + ph);
          $(`climatch-cl${i}${k2}`).setAttribute('transform', FRONT(X0[i] + (k2 === 'a' ? 6 : 30) + dx, 22, 104 + dz + (k2 === 'a' ? 0 : 9)));
        }
      }
    }
    let last = 0;
    api.loop(ts => { frame(last ? Math.min(60, ts - last) : 16, ts); last = ts; });

    const toggle = () => { st.era = st.era ? 0 : 1; discrete(); };
    const human = () => { st.auto = false; };
    stage.addEventListener('pointerdown', human);
    $('climatch-switch').addEventListener('click', () => { human(); toggle(); });
    discrete();
    frame(16, 0);
    try { // encuadre ajustado al dibujo, 4:3, con margen para el brillo
      const bb = stage.getBBox(), m = 20;
      const w = Math.max(bb.width + 2 * m, (bb.height + 2 * m) * 1.5), h = w / 1.5;
      stage.setAttribute('viewBox', `${(bb.x + bb.width / 2 - w / 2).toFixed(1)} ${(bb.y + bb.height / 2 - h / 2).toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}`);
    } catch (e) {}

    return {
      key(e) {
        if (e.key === ' ' || e.key === 'Enter') { human(); toggle(); return true; }
        if (e.key >= '1' && e.key <= '3') { human(); st.pref = +e.key - 1; discrete(); return true; }
        return false;
      },
      demo() { api.every(3600, () => { if (st.auto) toggle(); }); },
    };
  },
});
