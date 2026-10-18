// Vigía: una sonda enchufada a un modelo; el monitor de Vigía muestra con símbolos equidad, calidad, deriva y uso;
// una persona decide desde un terminal y un asistente de IA habla con el monitor por MCP.
// Composición sobre el plano SIDE (cara abajo a la derecha): persona, terminal, modelo con sonda, monitor, asistente.
const EN = new URLSearchParams(location.search).get('lang') === 'en';
const VG_T = EN
  ? { model: 'MODEL', mon: 'VIGÍA', ass: 'ASSISTANT', name: 'Vigía probe', hint: 'Runs on its own',
      aria: 'Isometric figure: an AI model with a Vigía probe plugged in; a monitor shows fairness, quality, drift and use as symbols. A person decides from a terminal and an AI assistant talks to the monitor over MCP. Press a for the assistant, c to correct, d for drift, r to reset.' }
  : { model: 'MODELO', mon: 'VIGÍA', ass: 'ASISTENTE', name: 'La sonda de Vigía', hint: 'Va sola',
      aria: 'Isométrico: un modelo de IA con una sonda de Vigía enchufada; un monitor muestra con símbolos equidad, calidad, deriva y uso. Una persona decide desde un terminal y un asistente de IA habla con el monitor por MCP. a asistente, c corrige, d deriva, r reinicia.' };
const VG_ICO = {
  equidad: '<path d="M12 3v18M6 21h12M5 7h14M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0z"/>',
  calidad: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 12l3 3 5-6"/>',
  deriva: '<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/>',
  persona: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
  sigue: '<path d="M4 12l5 5 11-11"/>',
  corrige: '<path d="M6 6l12 12M18 6L6 18"/>',
  chat: '<path d="M3 4h18v12H11l-5 4v-4H3z"/><path d="M7 8h10M7 12h6"/>',
};
const vgIco = (n, x, y, s, extra = '') => `<g class="ico ${extra}" transform="translate(${x} ${y}) scale(${s / 24})">${VG_ICO[n]}</g>`;

FIGS.push({
  id: 'vigia', name: VG_T.name, hint: VG_T.hint, aria: VG_T.aria,
  css: `
    [data-fig="vigia"] .trace { fill:none; stroke:var(--line); stroke-width:1.4; vector-effect:non-scaling-stroke; stroke-linejoin:round; }
    [data-fig="vigia"].on .trace { stroke:var(--accent-hi); }
    [data-fig="vigia"] .ico { fill:none; stroke:var(--line); stroke-width:1.5; vector-effect:non-scaling-stroke; stroke-linecap:round; stroke-linejoin:round; }
    [data-fig="vigia"].on .ico.mon, [data-fig="vigia"] .ico.vivo.on, [data-fig="vigia"] .ico.vivo { stroke:var(--accent-hi); }
    [data-fig="vigia"] .mal .trace, [data-fig="vigia"] .mal .led.hot { animation:blink .8s steps(1) infinite; }
    [data-fig="vigia"] .tick { fill:var(--line); }
    [data-fig="vigia"].on .tick { fill:var(--accent); }
    [data-fig="vigia"].on .tick.corr { fill:var(--accent-hi); }
    [data-fig="vigia"] #vg-probe { transition:transform .45s cubic-bezier(.2,.9,.3,1); }
    [data-fig="vigia"] .nn { stroke:var(--detail); stroke-width:.7; vector-effect:non-scaling-stroke; }
    [data-fig="vigia"] .nd.go { animation:vg-nd .9s ease-out; }
    [data-fig="vigia"] #vg-user, [data-fig="vigia"] #vg-ass { cursor:pointer; }
    [data-fig="vigia"] .persona { stroke-width:1.2; stroke-linejoin:round; }
    [data-fig="vigia"] .oculto { display:none; }
    [data-fig="vigia"] .wire { stroke-width:2; }
    [data-fig="vigia"] .pulse { stroke-width:3.2; }
    [data-fig="vigia"] .pulse.go { animation-duration:.9s; }
    [data-fig="vigia"] #vg-ass .ico { stroke:var(--line); }
    [data-fig="vigia"] #vg-ass.act .ico, [data-fig="vigia"] #vg-ass.act #vg-at { stroke:var(--accent); filter:url(#soft); }
    [data-fig="vigia"] #vg-ass.act #vg-at { fill:var(--accent); stroke:none; }
    [data-fig="vigia"] .label { fill:var(--ink-hi); font-weight:600; }
    [data-fig="vigia"] #vg-at.vivo { fill:var(--accent); }
    @keyframes vg-nd { 0% { fill:var(--accent-hi); } 100% { fill:var(--detail); } }
    :root[data-theme="light"] [data-fig="vigia"].on .trace, :root[data-theme="light"] [data-fig="vigia"].on .ico.mon, :root[data-theme="light"] [data-fig="vigia"] .ico.vivo { stroke:var(--accent); }
    :root[data-theme="light"] [data-fig="vigia"] .glass.hot { fill:color-mix(in srgb, var(--accent) 7%, var(--panel)); stroke-width:1.3; }
    @media (prefers-reduced-motion:reduce) { [data-fig="vigia"] #vg-probe { transition:none; } [data-fig="vigia"] .mal .trace, [data-fig="vigia"] .mal .led.hot, [data-fig="vigia"] .nd.go { animation:none; } }
  `,
  mount(stage, api) {
    /*  cajas                x    y    z    w    d    h   (cara con detalle = SIDE, x máximo)
        asistente           36    6    7   44   48   40   rótulo y chat
        monitor             80   60    7   16   84   84   pieza principal
        modelo              24  156    7   60   84   64   puerto en SIDE (x=84)
        sonda               84  196   26   22   12   10
        terminal            30  262    7   24   32   28
        persona             pies en (46, 312)                                            */
    const PZ = 7, MZ = PZ + 84, OZ = PZ + 64;
    const K = api.iso.frame([[0,-24,0],[140,-24,0],[0,330,0],[140,330,0],[36,-16,50],[80,60,MZ],[24,156,OZ],[46,312,95],[116,296,7]], .05);
    const { P, D, TOP, SIDE, box, path } = K, slits = api.iso.slits;
    let svg = '';
    svg += box(0, -24, 0, 140, 354, PZ, 12);
    svg += `<g transform="${TOP(0, -24, PZ)}"><rect class="detail" x="7" y="7" width="126" height="340" rx="8"/></g>`;

    // El halo blanco (wire-under) se recorta 3 unidades en cada punta para no borrar el contorno de la caja a la que llega
    const recorta = (pts, r = 3) => {
      const q = pts.map(p => [...p]);
      const mueve = (a, b) => { const v = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], n = Math.hypot(...v) || 1; return a.map((c, k) => c + v[k] / n * Math.min(r, n / 2)); };
      q[0] = mueve(q[0], q[1]); q[q.length - 1] = mueve(q[q.length - 1], q[q.length - 2]);
      return q;
    };
    const cable = (id, pts) => { const d = path(pts); return `<path class="wire-under" d="${path(recorta(pts))}"/><path id="${id}" class="wire" d="${d}"/><path id="${id}-p" class="pulse" pathLength="1000" d="${d}"/>`; };
    // asistente de IA (MCP)
    svg += `<g id="vg-ass">${box(36, -16, PZ, 44, 48, 40, 3)}
      <g transform="${SIDE(80, 32, PZ + 40)}"><rect id="vg-ag" class="face glass" x="3" y="3" width="42" height="22" rx="2"/>${vgIco('chat', 6, 6, 15)}
      <text id="vg-at" class="label" x="23" y="19.5" font-size="9.5" letter-spacing=".4">MCP</text>
      <text class="label" x="5" y="35" font-size="6.4" letter-spacing=".5">${VG_T.ass}</text></g></g>`;

    // cable asistente -> monitor: va por detrás del monitor, se pinta antes que él
    svg += cable('vg-wa', [[80, 8, PZ + .5], [88, 8, PZ + .5], [88, 60, PZ + .5]]);

    // monitor de Vigía: tres constantes con símbolo, trazo y piloto; debajo, el uso
    svg += box(80, 60, PZ, 16, 84, 84, 4);
    const RY = [15, 29, 43];
    let filas = '';
    ['equidad', 'calidad', 'deriva'].forEach((n, i) => {
      filas += `<g id="vg-f${i}">${vgIco(n, 7, RY[i] - 6, 12, 'mon')}<path id="vg-t${i}" class="trace" d="M24 ${RY[i]}H66"/>
        <circle id="vg-e${i}" class="led" cx="74" cy="${RY[i]}" r="2.8"/></g>`;
    });
    svg += `<g transform="${SIDE(96, 144, MZ)}">
      <rect id="vg-glass" class="face glass" x="3" y="3" width="78" height="66" rx="3"/>${filas}
      <path class="detail" d="M7 52H77"/>${vgIco('persona', 7, 54, 11, 'mon')}<g id="vg-ticks"></g>
      <text class="label" x="6" y="78" font-size="7.4" letter-spacing="1.2">${VG_T.mon}</text>
      <circle id="vg-alarm" class="led" cx="52" cy="75" r="2.6"/></g>`;

    // modelo con red neuronal en la tapa y puerto en la cara
    svg += box(24, 156, PZ, 60, 84, 64, 5);
    svg += `<g transform="${SIDE(84, 240, OZ)}">${slits(6, 76, 5, 6, 22)}
      <text class="label" x="8" y="48" font-size="7.4" letter-spacing=".8">${VG_T.model}</text>
      <rect class="face recess" x="52" y="30" width="14" height="12" rx="1.5"/></g>`;
    const L = [[14, [16, 30, 44]], [30, [12, 23, 34, 45, 56]], [46, [24, 44]]];
    let nn = '', nd = '';
    for (let a = 0; a < 2; a++) for (const v0 of L[a][1]) for (const v1 of L[a + 1][1])
      nn += `<line class="nn" x1="${L[a][0]}" y1="${v0}" x2="${L[a + 1][0]}" y2="${v1}"/>`;
    L.forEach(([u, vs], li) => vs.forEach(v => { nd += `<circle class="led nd" cx="${u}" cy="${v}" r="2.4" style="animation-delay:${li * 120}ms"/>`; }));
    svg += `<g transform="${TOP(24, 156, OZ)}"><rect class="face recess" x="5" y="8" width="50" height="68" rx="3"/>
      <g transform="translate(0 8) scale(1 1)">${nn}${nd}</g></g>`;

    // terminal de la persona
    svg += box(30, 262, PZ, 24, 32, 28, 3);
    svg += `<g transform="${SIDE(54, 294, PZ + 28)}"><rect id="vg-tg" class="face glass hot" x="3" y="3" width="26" height="18" rx="2"/>
      <g id="vg-dsig">${vgIco('sigue', 8, 4, 16, 'vivo')}</g><g id="vg-dcor" class="oculto">${vgIco('corrige', 8, 4, 16, 'vivo')}</g></g>`;

    // cables (sobre el suelo, por delante de las cajas)
    // modelo -> terminal: sale lejos de la esquina redondeada del modelo
    svg += cable('vg-wr', [[84, 224, PZ + .5], [90, 224, PZ + .5], [90, 270, PZ + .5], [54, 270, PZ + .5]]);
    // sonda -> monitor: llega entre el rótulo VIGÍA y el piloto, sin pisar el texto
    svg += cable('vg-w', [[106, 180, 31], [106, 180, PZ + .5], [106, 99, PZ + .5], [96, 99, PZ + .5]]);
    svg += cable('vg-wu', [[54, 288, PZ + .5], [118, 288, PZ + .5], [118, 88, PZ + .5], [96, 88, PZ + .5]]);

    // sonda (pulsable)
    svg += `<g class="press" id="vg-probe">${box(84, 174, 26, 22, 12, 10, 2)}
      <g transform="${TOP(84, 174, 36)}"><rect id="vg-ring" class="led" x="5" y="2" width="12" height="8" rx="2"/></g>
      <g transform="${SIDE(106, 186, 36)}">${slits(1.5, 10.5, 3, 1.5, 8.5)}</g></g>`;

    // persona (pulsable)
    const [fx, fy] = P(46, 312, PZ);
    const CUERPO = 'M-4 -43C-9 -43 -12.5 -41.5 -13.5 -37L-15.5 -24Q-16 -19.5 -12.8 -19.5Q-10.6 -19.8 -10.8 -23L-10.4 -31Q-10 -32.5 -9 -32' +
      'L-8.4 -20L-8.6 -2.5Q-8.8 0 -5.8 0L-2 0Q-.6 0 -.8 -2.5L-.8 -17Q0 -18.5 .8 -17L.8 -2.5Q.6 0 2 0L5.8 0Q8.8 0 8.6 -2.5' +
      'L8.4 -20L9 -32Q10 -32.5 10.4 -31L10.8 -23Q10.6 -19.8 12.8 -19.5Q16 -19.5 15.5 -24L13.5 -37C12.5 -41.5 9 -43 4 -43Z';
    svg += `<g class="press" id="vg-user"><g transform="translate(${fx.toFixed(2)} ${fy.toFixed(2)}) scale(1.6)">
      <ellipse class="detail" cx="0" cy="0" rx="12" ry="3.5"/>
      <path class="face persona" d="${CUERPO}"/><circle class="face persona" cx="0" cy="-52" r="8.5"/>
      <circle id="vg-ubadge" class="led" cx="3.5" cy="-35" r="1.6"/></g></g>`;

    stage.setAttribute('viewBox', K.viewBox); stage.innerHTML = svg;
    const $ = id => stage.querySelector('#' + id);
    const probe = $('vg-probe'), nodes = [...stage.querySelectorAll('.nd')];
    const fuera = D(18, 0, 0);
    const st = { ass: false, on: false, mal: false, hist: [], ultima: false };
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
    function trazo(i, ms) {
      const y0 = RY[i], mal = st.mal && i === 2;
      let d = '';
      for (let x = 24; x <= 66.01; x += .8) {
        const u = x + ms / 1000 * 20 + i * 11;
        let y = 1.8 * Math.sin(u * .45) + .6 * Math.sin(u * 1.4);
        if (mal) y = y * 1.5 + 3.4 * (hash(Math.floor(u * 1.2)) - .5) - (x - 24) * .05;
        d += (d ? 'L' : 'M') + x.toFixed(1) + ' ' + (y0 - y).toFixed(2);
      }
      return d;
    }
    function ticks() {
      const h = st.on ? st.hist.slice(-16) : [];
      $('vg-ticks').innerHTML = h.map((c, k) => `<rect class="tick${c ? ' corr' : ''}" x="${24 + k * 3.3}" y="${c ? 54 : 58}" width="2" height="${c ? 9 : 5}" rx=".6"/>`).join('');
    }
    function render() {
      stage.classList.toggle('on', st.on);
      probe.setAttribute('transform', st.on ? '' : `translate(${fuera[0].toFixed(2)} ${fuera[1].toFixed(2)})`);
      ['vg-w', 'vg-wu', 'vg-wa'].forEach(id => $(id).classList.toggle('hot', st.on));
      $('vg-wr').classList.add('hot');
      $('vg-ass').classList.toggle('act', st.on && st.ass);
      $('vg-ring').classList.toggle('hot', st.on); nodes.forEach(n => n.classList.toggle('hot', st.on));
      $('vg-glass').classList.toggle('hot', st.on);
      $('vg-alarm').classList.toggle('hot', st.on && st.mal);
      [0, 1, 2].forEach(i => {
        $('vg-f' + i).classList.toggle('mal', st.on && st.mal && i === 2);
        $('vg-e' + i).classList.toggle('hot', st.on);
        if (!st.on) $('vg-t' + i).setAttribute('d', `M24 ${RY[i]}H66`);
      });
      $('vg-dsig').classList.toggle('oculto', st.ultima);
      $('vg-dcor').classList.toggle('oculto', !st.ultima);
      ticks();
      api.power(st.on);
      api.readout(!st.on ? '' : st.mal ? (EN ? 'drift · alert' : 'deriva · alerta') : (EN ? 'stable' : 'estable'));
    }
    function decide(corrige) {
      st.ultima = corrige; render();
      if (st.on) api.replay($('vg-wu-p'));
      if (corrige) api.flash($('vg-ubadge'));
      api.after(700, () => { if (!st.on) return; st.hist.push(corrige); render(); });
    }
    const latido = () => {
      nodes.forEach(n => api.replay(n));
      api.after(300, () => api.replay($('vg-wr-p')));
      api.after(900, () => decide(hash(st.hist.length + 3) < .2));
      if (st.on) api.after(500, () => api.replay($('vg-w-p')));
    };
    const conectar = () => { api.flash(probe); st.on = !st.on; if (!st.on) { st.mal = false; st.hist = []; st.ass = false; } render(); };
    const corregir = () => decide(true);
    const deriva = () => { if (!st.on) { api.flash(probe); return; } st.mal = !st.mal; render(); };
    const reiniciar = () => { st.on = false; st.mal = false; st.ass = false; st.hist = []; st.ultima = false; render(); };
    function asistente() {
      if (!st.on) return;
      st.ass = true; render(); api.replay($('vg-wa-p'));
      api.after(1000, () => { st.ass = false; render(); });
    }
    let auto = true, n = 0;
    const stopAuto = () => { auto = false; };
    api.every(2000, latido);
    api.every(2000, () => {
      if (!auto) return;
      const m = n++ % 10;
      if (m === 0 && !st.on) conectar();
      if (m === 2 || m === 6) asistente();
      if (m === 4 && st.on && !st.mal) deriva();
      if (m === 8 && st.mal) { st.mal = false; render(); }
    });
    stage.addEventListener('pointerdown', stopAuto, true);
    api.loop(ts => { if (st.on) [0, 1, 2].forEach(i => $('vg-t' + i).setAttribute('d', trazo(i, still ? 900 : ts))); });
    stage.addEventListener('click', e => {
      if (e.target.closest('#vg-ass')) asistente();
      else if (e.target.closest('#vg-probe')) conectar();
      else if (e.target.closest('#vg-user')) corregir();
    });
    render();
    if (/still/.test(location.search)) {
      auto = false; st.on = true; st.mal = /alerta/.test(location.search); st.ass = /asist/.test(location.search);
      st.hist = [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0].map(Boolean);
      render(); [0, 1, 2].forEach(i => $('vg-t' + i).setAttribute('d', trazo(i, 900)));
    }
    return {
      key(e) {
        stopAuto();
        if (e.key === 'a') { asistente(); return true; }
        if (e.key === ' ' || e.key === 'Enter') { conectar(); return true; }
        if (e.key === 'c') { corregir(); return true; }
        if (e.key === 'd') { deriva(); return true; }
        if (e.key === 'r') { reiniciar(); return true; }
        return false;
      },
      demo: () => { api.after(400, () => { if (!st.on) conectar(); }); },
    };
  },
});
