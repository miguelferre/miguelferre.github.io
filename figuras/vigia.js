/* Vigía: un modelo en producción decide casos; la consola de Vigía mide calidad, equidad, deriva y capa humana.
   Sola: pulsos del modelo a los casos; aparece deriva (parpadea el panel), se enciende el cable al gestor,
   el gestor hace override y todo vuelve a la normalidad. Teclas: d deriva, o override, r reinicia. */
const EN = new URLSearchParams(location.search).get('lang') === 'en';
const VG = EN
  ? { name: 'Vigía · watching a model', hint: 'Click Drift (d) · click the manager (o) · r resets',
      aria: 'Isometric figure: a model server sends decisions to three cases while the Vigía console shows four panels: Quality, Fairness, Drift and Human layer. Press d or click Drift to cause drift, o or click the manager to override, r to reset.',
      q: 'Quality', e: 'Fairness', d: 'Drift', h: 'Human layer', model: 'MODEL', title: 'VIGÍA',
      ok: 'stable', al: 'drift · alert', fx: 'override · fixing', no: 'no drift to fix' }
  : { name: 'Vigía · vigilar un modelo', hint: 'Clic en Deriva (d) · clic en el gestor (o) · r reinicia',
      aria: 'Figura isométrica: un servidor de modelo envía decisiones a tres casos mientras la consola de Vigía muestra cuatro paneles: Calidad, Equidad, Deriva y Capa humana. Pulsa d o haz clic en Deriva para provocar deriva, o o clic en el gestor para hacer override, r para reiniciar.',
      q: 'Calidad', e: 'Equidad', d: 'Deriva', h: 'Capa humana', model: 'MODELO', title: 'VIGÍA',
      ok: 'estable', al: 'deriva · alerta', fx: 'override · corrigiendo', no: 'sin deriva que corregir' };

FIGS.push({
  id: 'vigia', name: VG.name, hint: VG.hint, aria: VG.aria,
  css: `
    [data-fig="vigia"] .vp { fill:var(--deck); stroke:var(--ink-hi); stroke-width:1.3; vector-effect:non-scaling-stroke; stroke-linejoin:round; transition:fill .35s; }
    [data-fig="vigia"] .vc.hit .vp { fill:var(--accent); }
    [data-fig="vigia"] .vm.act .vp { fill:var(--accent); }
    [data-fig="vigia"] .vm { cursor:pointer; }
    [data-fig="vigia"] .vm .halo { opacity:0; transition:opacity .3s; }
    [data-fig="vigia"] .vm.act .halo { opacity:.5; }
    [data-fig="vigia"] .vpn { cursor:default; }
    [data-fig="vigia"] .vpn .bar { fill:var(--accent); }
    [data-fig="vigia"] #vigia-pd { cursor:pointer; }
    [data-fig="vigia"].alert #vigia-pd { animation:blink .7s steps(1) infinite; }
    [data-fig="vigia"].alert #vigia-pd .glass { stroke:var(--accent-hi); stroke-width:2; }
    [data-fig="vigia"] .vl { fill:var(--ink-hi); font-weight:600; }
    [data-fig="vigia"] .nn { fill:none; stroke:var(--accent); stroke-width:.9; vector-effect:non-scaling-stroke; }
    [data-fig="vigia"] .nd { fill:var(--accent); }
    [data-fig="vigia"] .wire { stroke-width:2; }
    [data-fig="vigia"] .pulse { stroke-width:3.2; }
    [data-fig="vigia"] .pulse.go { animation-duration:.9s; }
    [data-fig="vigia"] .glass.hot { filter:url(#soft); }
    :root[data-theme="light"] [data-fig="vigia"] .glass.hot { fill:color-mix(in srgb, var(--accent) 6%, var(--panel)); stroke-width:1.2; }
    :root[data-theme="light"] [data-fig="vigia"] .vm.act .halo { opacity:.7; }
    @media (prefers-reduced-motion:reduce) { [data-fig="vigia"].alert #vigia-pd { animation:none; } }
  `,
  mount(stage, api) {
    /*  cajas              x    y    z    w    d    h
        parcela            0    0    0  300  220    7
        consola          100   12    7  170   14   76   -> cara FRONT y=26 con los cuatro paneles
        servidor          10  112    7   44   44   56   -> modelo, cara FRONT y=156
        gestor            60   72    7   persona
        casos            240  96/134/172  peanas con persona                                */
    const PZ = 7, CX = [92, 126, 160];
    const K = api.iso.frame([[0,0,0],[300,0,0],[0,196,0],[300,196,0],[100,12,90],[10,156,66]], 0.06);
    const { P, TOP, FRONT, SIDE, box, path } = K, slits = api.iso.slits;
    const f2 = n => n.toFixed(2);
    const person = (x, y, z, k, cls) => {
      const [cx, cy] = P(x, y, z);
      const b = `M${f2(cx - 6 * k)} ${f2(cy)}L${f2(cx - 5 * k)} ${f2(cy - 9 * k)}Q${f2(cx)} ${f2(cy - 14 * k)} ${f2(cx + 5 * k)} ${f2(cy - 9 * k)}L${f2(cx + 6 * k)} ${f2(cy)}Z`;
      return `<g class="${cls}"><rect class="halo" x="${f2(cx - 14 * k)}" y="${f2(cy - 26 * k)}" width="${f2(28 * k)}" height="${f2(30 * k)}" rx="8" filter="url(#bloom)"/>
        <path class="vp" d="${b}"/><circle class="vp" cx="${f2(cx)}" cy="${f2(cy - 17 * k)}" r="${f2(4.4 * k)}"/></g>`;
    };

    let svg = box(0, 0, 0, 300, 196, PZ, 12);
    svg += `<g transform="${TOP(0, 0, PZ)}"><rect class="detail" x="7" y="7" width="286" height="182" rx="8"/></g>`;

    // consola de Vigía
    svg += box(100, 12, PZ, 170, 14, 76, 2);
    const panels = [['pq', VG.q, 4, 14, 70], ['pe', VG.e, 86, 14, 62], ['pd', VG.d, 4, 46, 10], ['ph', VG.h, 86, 46, 50]];
    let pn = `<text class="label vl" x="6" y="9" font-size="7" letter-spacing="1">${VG.title}</text>`;
    for (const [id, lb, x, y] of panels)
      pn += `<g id="vigia-${id}" class="vpn"><rect class="face glass hot" x="${x}" y="${y}" width="80" height="26" rx="2"/>
        <text class="scr" x="${x + 5}" y="${y + 10}" font-size="8.6">${api.iso.esc(lb)}</text>
        <rect class="detail" x="${x + 5}" y="${y + 16}" width="70" height="4"/>
        <rect id="vigia-b${id}" class="bar" x="${x + 5}" y="${y + 16}" width="${panels.find(p => p[0] === id)[4]}" height="4"/></g>`;
    svg += `<g transform="${FRONT(100, 26, PZ + 76)}">${pn}</g>`;
    svg += `<g transform="${TOP(100, 12, PZ + 76)}">${slits(10, 160, 10, 3, 11)}</g>`;

    // cables: consola al gestor, servidor a los casos
    const dM = path([[100, 19, PZ + .5], [60, 19, PZ + .5], [60, 66, PZ + .5]]);
    svg += `<path class="wire-under" d="${dM}"/><path id="vigia-wm" class="wire" d="${dM}"/><path id="vigia-pm" class="pulse" pathLength="1000" d="${dM}"/>`;
    const rutas = CX.map(cy => path([[54, 134, PZ + .5], [150, 134, PZ + .5], [150, cy, PZ + .5], [236, cy, PZ + .5]]));
    rutas.forEach((d, i) => { svg += `<path class="wire-under" d="${d}"/><path class="wire hot vigia-wc" d="${d}"/><path id="vigia-pc${i}" class="pulse" pathLength="1000" d="${d}"/>`; });

    // servidor del modelo con chip encendido
    svg += box(10, 112, PZ, 44, 44, 56, 3);
    svg += `<g transform="${FRONT(10, 156, PZ + 56)}">${slits(6, 38, 4, 6, 26)}<text class="label" x="5" y="38" font-size="6.5" letter-spacing=".6">${VG.model}</text>
      <circle class="led hot" cx="38" cy="45" r="1.8"/></g>`;
    svg += `<g transform="${SIDE(54, 156, PZ + 56)}">${slits(6, 38, 4, 6, 26, false)}</g>`;
    const L = [[13, [13, 22, 31]], [22, [11, 18.3, 25.6, 33]], [31, [16, 28]]];
    let nn = '', nd = '';
    for (let a = 0; a < 2; a++) for (const v0 of L[a][1]) for (const v1 of L[a + 1][1]) nn += `<line class="nn" x1="${L[a][0]}" y1="${v0}" x2="${L[a + 1][0]}" y2="${v1}"/>`;
    L.forEach(([u, vs]) => vs.forEach(v => { nd += `<circle class="led hot nd" cx="${u}" cy="${v}" r="1.5"/>`; }));
    svg += `<g transform="${TOP(10, 112, PZ + 56)}"><rect class="face glass hot" x="5" y="5" width="34" height="34" rx="2"/>${nn}${nd}</g>`;

    // gestor
    svg += `<g id="vigia-mgr" class="vm">${person(60, 72, PZ, 2.1, 'vmp')}</g>`;
    // casos
    CX.forEach((cy, i) => {
      svg += box(240, cy - 9, PZ, 22, 18, 3, 2);
      svg += person(251, cy, PZ + 3, 1.6, 'vc').replace('class="vc"', `class="vc" id="vigia-c${i}"`);
    });
    svg += `<g transform="${FRONT(0, 196, PZ)}"><text class="label" x="14" y="5.2" font-size="4.4" letter-spacing=".6">${EN ? 'CASES' : 'CASOS'}</text></g>`;

    stage.setAttribute('viewBox', K.viewBox); stage.innerHTML = svg;

    // estado
    const st = { alert: false, fix: false, n: 0, auto: true };
    const $ = id => stage.querySelector('#' + id);
    const wm = $('vigia-wm'), pm = $('vigia-pm'), mgr = $('vigia-mgr'), bd = $('vigia-bpd'), bh = $('vigia-bph');
    const cases = CX.map((_, i) => $('vigia-c' + i)), pcs = CX.map((_, i) => $('vigia-pc' + i));
    let timer = null, model = null;

    function render() {
      stage.classList.toggle('alert', st.alert && !st.fix);
      wm.classList.toggle('hot', st.alert);
      mgr.classList.toggle('act', st.fix);
      bd.setAttribute('width', st.alert && !st.fix ? 70 : 10);
      bh.setAttribute('width', st.fix ? 70 : 50);
      api.power(true);
      api.readout(st.fix ? VG.fx : st.alert ? VG.al : VG.ok);
    }
    function send(i) {
      api.replay(pcs[i]);
      api.after(750, () => { cases[i].classList.add('hit'); api.after(700, () => cases[i].classList.remove('hit')); });
    }
    function drift() { if (st.alert) return; st.alert = true; st.fix = false; render(); api.replay(pm); }
    function override() {
      if (!st.alert || st.fix) { if (!st.alert) api.readout(VG.no); api.flash(mgr); return; }
      st.fix = true; render(); api.flash(mgr);
      api.after(1500, () => { st.alert = false; st.fix = false; render(); });
    }
    function reset() { st.alert = false; st.fix = false; render(); }
    function stopAuto() { if (st.auto) { st.auto = false; clearInterval(timer); } }

    // el modelo decide siempre; el ciclo de deriva y override va aparte y se para con la primera interacción
    model = api.every(1500, () => { send(st.n++ % 3); if (st.alert && !st.fix) api.replay(pm); });
    function cycle() {
      if (!st.auto) return;
      const m = st.cycleN = ((st.cycleN || 0) + 1) % 10;
      if (m === 4) drift(); else if (m === 8) override();
    }
    timer = api.every(1500, cycle);

    stage.addEventListener('pointerdown', stopAuto, true);
    $('vigia-pd').addEventListener('click', drift);
    mgr.addEventListener('click', override);
    render();
    const capture = /still/.test(location.search);
    if (capture && /alerta|alert/.test(location.search)) { stopAuto(); st.alert = true; render(); }

    return {
      key(e) {
        if (e.repeat) return false;
        const k = e.key.toLowerCase();
        if (k !== 'd' && k !== 'o' && k !== 'r') return false;
        stopAuto();
        if (k === 'd') drift(); else if (k === 'o') override(); else reset();
        return true;
      },
      unmount() { clearInterval(timer); clearInterval(model); },
      demo() { if (!capture) api.after(300, () => send(0)); },
    };
  },
});
