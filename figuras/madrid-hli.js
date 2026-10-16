const EN = new URLSearchParams(location.search).get('lang') === 'en';
const MH_T = {
  name: EN ? 'Healthy living index' : 'Índice de vida saludable',
  hint: EN ? 'Click a block · arrows move · space next · r restarts' : 'Clic en un barrio · flechas mueven · espacio siguiente · r reinicia',
  aria: EN
    ? 'Isometric city of nine blocks. Each block is checked against the 3-30-300 green rule: three trees in sight, 30 percent canopy, a park within 300 metres. Click a block, use the arrows, space or r.'
    : 'Ciudad isométrica de nueve barrios. Cada barrio se comprueba con la regla 3-30-300 de verde urbano: tres árboles a la vista, 30 % de copa y un parque a menos de 300 m. Clic en un barrio, flechas, espacio o r.',
  block: EN ? 'block' : 'barrio',
  N: 'N', S: 'S',
  pills: EN ? ['3 trees', '30 % canopy', '300 m park'] : ['3 árboles', '30 % copa', '300 m parque'],
};

FIGS.push({
  id: 'madrid-hli', name: MH_T.name, hint: MH_T.hint, aria: MH_T.aria,
  css: `
    [data-fig="madrid-hli"] .mh-ring { stroke-dasharray: 1000; stroke-dashoffset: 0; fill: none; }
    [data-fig="madrid-hli"] .mh-ring.go { animation: mh-ring .7s ease-out; }
    @keyframes mh-ring { from { stroke-dashoffset: 1000; } to { stroke-dashoffset: 0; } }
    [data-fig="madrid-hli"] .mh-hit { cursor: pointer; fill: transparent; }
    [data-fig="madrid-hli"] .mh-slab { fill-opacity: .8; transition: opacity .35s; opacity: 0; }
    [data-fig="madrid-hli"] .mh-slab.on { opacity: 1; }
    [data-fig="madrid-hli"] .mh-tree { transition: fill .3s, fill-opacity .3s; }
    [data-fig="madrid-hli"] .mh-tree.mh-lit { fill: var(--accent); fill-opacity: .7; }
    [data-fig="madrid-hli"] .mh-pip { transition: fill .3s, opacity .3s; }
    [data-fig="madrid-hli"] .mh-pill { transition: fill .3s, stroke .3s; }
    [data-fig="madrid-hli"] .mh-pt { transition: fill .3s; font-weight: 600; }
    [data-fig="madrid-hli"] .mh-pt { transition: fill .3s; }
  `,
  mount(stage, api) {
    const B = 100, G = 16, STEP = B + G, W = 3 * B + 2 * G;           // plot, gap, city width
    // compliance per block [3 trees, 30 % canopy, 300 m park]; rows: north, middle, south
    const OK = [[1,0,0],[0,0,0],[0,1,0], [1,0,0],[0,0,1],[1,0,0], [1,1,1],[1,1,0],[1,0,1]];
    const PARK = 6;
    const K = api.iso.frame([[-14,-14,0],[W+14,W+14,0],[-14,W+14,0],[W+14,-14,0],[0,0,26],[W+12,W+12,-58]]);
    const { P, TOP, box } = K;
    const vb = K.viewBox.split(/[ ,]+/).map(Number);
    const cell = (a, b) => [6 + a * 22 + 2, 6 + b * 22 + 2];

    // static city, drawn back to front
    let svg = box(-12, -12, -10, W + 24, W + 24, 10, 14);
    svg += `<g transform="${TOP(-12,-12,0)}"><rect class="detail" x="6" y="6" width="${W+12}" height="${W+12}" rx="10"/></g>`;
    const order = [];
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) order.push([r, c]);
    order.sort((p, q) => (p[0] + p[1]) - (q[0] + q[1]));
    const BLD = [[0,0,16],[1,0,10],[3,0,14],[0,2,12],[2,2,20],[3,3,11],[1,3,15]];   // building cells + heights
    for (const [r, c] of order) {
      const i = r * 3 + c, x0 = r * STEP, y0 = c * STEP, ok = OK[i];
      svg += box(x0, y0, 0, B, B, 3, 6);
      svg += `<g transform="${TOP(x0,y0,3)}"><rect id="madrid-hli-slab${i}" class="face led mh-slab" filter="url(#soft)" x="4" y="4" width="${B-8}" height="${B-8}" rx="6"/></g>`;
      const items = [];
      const park = i === PARK;
      const used = new Set();
      if (!park) for (const [a, b, h] of BLD.slice(0, 5 + (i % 2))) { used.add(a + ',' + b); items.push({ a, b, h: Math.round(h * .75) + (i % 3) * 2, bld: true }); }
      else { for (const [a, b, h] of [[3,3,12]]) { used.add(a+','+b); items.push({ a, b, h, bld: true }); } }
      const free = [];
      for (let a = 0; a < 4; a++) for (let b = 0; b < 4; b++) if (!used.has(a + ',' + b)) free.push([a, b]);
      const nTree = park ? free.length : Math.min(free.length, 2 + ok[0] * 2 + ok[1] * 4);
      for (let k = 0; k < nTree; k++) items.push({ a: free[(k * 7 + i) % free.length][0], b: free[(k * 7 + i) % free.length][1], tree: true });
      // dedupe tree cells
      const seen = new Set(); const list = items.filter(t => { if (!t.tree) return true; const key = t.a + ',' + t.b; if (seen.has(key)) return false; seen.add(key); return true; });
      list.sort((p, q) => (p.a + p.b) - (q.a + q.b));
      for (const t of list) {
        const [cx, cy] = cell(t.a, t.b);
        if (t.bld) svg += box(x0 + cx, y0 + cy, 3, 18, 18, t.h, 0) + `<g transform="${TOP(x0 + cx, y0 + cy, 3 + t.h)}"><rect class="face" style="fill:var(--recess);stroke:var(--ink)" width="18" height="18"/></g>`;
        else { const q = P(x0 + cx + 9, y0 + cy + 9, 15); svg += box(x0 + cx + 8, y0 + cy + 8, 3, 2, 2, 8, 0) + `<circle class="face mh-tree mh-t${i}" cx="${q[0]}" cy="${q[1]}" r="6.5"/>`; }
      }
    }
    // orientation labels, outside the plate
    const pn = P(0, W / 2, 0), ps = P(W, W / 2, 0), side = (p, dx, dy, t) => `<text class="label" x="${p[0]+dx}" y="${p[1]+dy}" text-anchor="middle" style="font-size:19px">${t}</text>`;
    svg += side(pn, -14, -8, MH_T.N) + side(ps, 14, 22, MH_T.S);
    // dynamic layers
    svg += `<g id="madrid-hli-ring" pointer-events="none"></g>`;
    for (let i = 0; i < 9; i++) {
      const r = (i / 3) | 0, c = i % 3, p = P(r * STEP + B / 2, c * STEP + B / 2, 36);
      for (let k = 0; k < 3; k++) svg += `<circle id="madrid-hli-pip${i}-${k}" class="mh-pip" cx="${p[0] + (k - 1) * 17}" cy="${p[1]}" r="6.5" pointer-events="none" filter="url(#soft)"/>`;
    }
    // indicator pills in screen space, below the city
    const pcx = P(W / 2, W / 2, 0)[0], py = P(W + 12, W + 12, -10)[1] + 12, pw = 150, pg = 16;
    for (let k = 0; k < 3; k++) {
      const x = pcx + (k - 1) * (pw + pg) - pw / 2;
      svg += `<g pointer-events="none"><rect id="madrid-hli-pill${k}" class="face led mh-pill" x="${x}" y="${py}" width="${pw}" height="34" rx="17"/>`
           + `<text id="madrid-hli-pt${k}" class="label mh-pt" x="${x + pw / 2}" y="${py + 23}" text-anchor="middle" style="font-size:16px">${MH_T.pills[k]}</text></g>`;
    }
    for (let i = 0; i < 9; i++) {
      const r = (i / 3) | 0, c = i % 3;
      svg += `<g transform="${TOP(r*STEP, c*STEP, 3)}"><rect class="mh-hit" data-mh="${i}" width="${B}" height="${B}"/></g>`;
    }
    const vt = Math.min(P(-14,-14,0)[1], P(0,0,26)[1]) - 8, vH = py + 34 + 8 - vt, vW = vH * 1.6;
    stage.setAttribute('viewBox', `${pcx - vW / 2} ${vt} ${vW} ${vH}`);
    stage.innerHTML = svg;

    const $ = id => stage.querySelector('#madrid-hli-' + id);
    const ringG = $('ring');
    const st = { sel: PARK, seen: new Set([0,1,2,3,4,5,6,7,8]) };
    let auto = false, idx = 0, hold = 0;

    function render(anim) {
      for (let i = 0; i < 9; i++) {
        const seen = st.seen.has(i), full = seen && OK[i].every(Boolean);
        $('slab' + i).classList.toggle('on', full);
        stage.querySelectorAll('.mh-t' + i).forEach(t => t.classList.toggle('mh-lit', seen && !!OK[i][1]));
        for (let k = 0; k < 3; k++) {
          const pip = $('pip' + i + '-' + k), on = seen && OK[i][k];
          pip.setAttribute('class', 'mh-pip' + (on ? ' led hot' : ''));
          pip.style.fill = on ? '' : 'none';
          pip.style.stroke = on ? '' : 'var(--line)';
          pip.style.opacity = seen ? 1 : 0;
        }
      }
      if (st.sel >= 0) {
        const r = (st.sel / 3) | 0, c = st.sel % 3, ok = OK[st.sel];
        ringG.innerHTML = `<g transform="${TOP(r*STEP + B/2, c*STEP + B/2, 3)}">`
          + `<circle r="66" style="fill:var(--accent);fill-opacity:.1;stroke:none"/>`
          + `<circle id="madrid-hli-rc" class="wire hot mh-ring${anim ? ' go' : ''}" pathLength="1000" r="66" filter="url(#soft)"/></g>`;
        for (let k = 0; k < 3; k++) {
          const on = !!ok[k];
          $('pill' + k).setAttribute('class', 'face led mh-pill' + (on ? ' hot' : ''));
          $('pt' + k).style.fill = on ? 'var(--panel)' : 'var(--ink-hi)';
        }
        api.readout(`${MH_T.block} ${st.sel + 1} · 3 ${ok[0] ? '✓' : '✗'} 30 ${ok[1] ? '✓' : '✗'} 300 ${ok[2] ? '✓' : '✗'}`);
      } else {
        ringG.innerHTML = '';
        for (let k = 0; k < 3; k++) { $('pill' + k).setAttribute('class', 'face led mh-pill'); $('pt' + k).style.fill = 'var(--ink-hi)'; }
        api.readout(EN ? '9 blocks · 1 passes all' : '9 barrios · 1 cumple los tres');
      }
    }
    function select(i, anim = true) {
      st.sel = Math.max(0, Math.min(8, i)); st.seen.add(st.sel); render(anim);
    }
    function restart() { st.seen = new Set(); idx = 0; hold = 0; select(0); idx = 1; }
    const next = () => { if (st.seen.size >= 9 && st.sel === 8) restart(); else select(st.sel + 1 > 8 ? 0 : st.sel + 1); };
    const manual = () => { auto = false; };

    stage.addEventListener('click', e => {
      const t = e.target.closest && e.target.closest('[data-mh]');
      if (t) { manual(); select(+t.dataset.mh); }
    });
    api.every(1500, () => {
      if (!auto) return;
      if (idx < 9) { select(idx); idx++; }
      else if (hold === 0) { hold = 1; select(PARK); }
      else if (hold < 3) { hold++; }
      else restart();
    });
    render(false);
    return {
      key(e) {
        const k = e.key, r = (st.sel / 3) | 0, c = st.sel % 3;
        if (k === 'ArrowRight') { manual(); select(r * 3 + Math.min(2, c + 1)); return true; }
        if (k === 'ArrowLeft')  { manual(); select(r * 3 + Math.max(0, c - 1)); return true; }
        if (k === 'ArrowDown')  { manual(); select(Math.min(2, r + 1) * 3 + c); return true; }
        if (k === 'ArrowUp')    { manual(); select(Math.max(0, r - 1) * 3 + c); return true; }
        if (k === ' ' || k === 'Enter') { manual(); next(); return true; }
        if (k === 'r' || k === 'R') { manual(); restart(); return true; }
        return false;
      },
      demo() { auto = true; st.seen = new Set(); idx = 0; hold = 0; st.sel = -1; render(false); },
    };
  },
});
