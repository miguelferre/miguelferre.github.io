// Portada de Vigía: una sonda enchufada a un modelo mide sus constantes; la persona que usa el modelo
// también habla con el monitor (capa humana). Pantallas con símbolos, no con texto.
const EN = new URLSearchParams(location.search).get('lang') === 'en';
const VG_T = EN ? { model:'MODEL', mon:'VIGÍA · VITALS', ass:'ASSISTANT · MCP', name:'Vigía probe', hint:'Probe, assistant and drift run on their own', aria:'Isometric figure: an AI model with a Vigía probe plugged in; a monitor shows fairness, quality, drift and use as symbols. A person decides from a terminal and an AI assistant talks to the monitor over MCP. Press a for the assistant, c to correct, d for drift, r to reset.' }
  : { model:'MODELO', mon:'VIGÍA · CONSTANTES', ass:'ASISTENTE · MCP', name:'La sonda de Vigía', hint:'La sonda, el asistente y la deriva van solos', aria:'Isométrico: un modelo de IA con una sonda de Vigía enchufada; un monitor muestra con símbolos equidad, calidad, deriva y uso. Una persona decide desde un terminal y un asistente de IA habla con el monitor por MCP. a asistente, c corrige, d deriva, r reinicia.' };
const VG_ICO = {
  equidad: '<path d="M12 3v18M6 21h12M5 7h14M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0z"/>',
  calidad: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 12l3 3 5-6"/>',
  deriva: '<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/>',
  persona: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
  modelo: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
  sigue: '<path d="M4 12l5 5 11-11"/>',
  corrige: '<path d="M6 6l12 12M18 6L6 18"/>',
  chat: '<path d="M4 5h16v11H11l-5 4v-4H4z"/><path d="M8 9h8M8 12h5"/>',
  flecha: '<path d="M3 12h16M14 7l5 5-5 5"/>',
};
const vgIco = (n, x, y, s, extra = '') => `<g class="ico ${extra}" transform="translate(${x} ${y}) scale(${s / 24})">${VG_ICO[n]}</g>`;

FIGS.push({
  id: 'vigia', name: VG_T.name, hint: VG_T.hint,
  aria: VG_T.aria,
  css: `
    [data-fig="vigia"] .trace { fill:none; stroke:var(--line); stroke-width:1.2; vector-effect:non-scaling-stroke; stroke-linejoin:round; }
    [data-fig="vigia"].on .trace { stroke:var(--accent-hi); }
    [data-fig="vigia"] .ico { fill:none; stroke:var(--line); stroke-width:1.3; vector-effect:non-scaling-stroke; stroke-linecap:round; stroke-linejoin:round; }
    [data-fig="vigia"].on .ico.mon, [data-fig="vigia"] .ico.vivo { stroke:var(--accent-hi); }
    [data-fig="vigia"] .mal .trace, [data-fig="vigia"] .mal .led.hot { animation:blink .8s steps(1) infinite; }
    [data-fig="vigia"] .tick { fill:var(--line); }
    [data-fig="vigia"].on .tick { fill:var(--accent); }
    [data-fig="vigia"].on .tick.corr { fill:var(--accent-hi); }
    [data-fig="vigia"] #vg-probe { transition:transform .45s cubic-bezier(.2,.9,.3,1); }
    [data-fig="vigia"] .nn { stroke:var(--detail); stroke-width:.6; vector-effect:non-scaling-stroke; }
    [data-fig="vigia"] .nd.go { animation:vg-nd .9s ease-out; }
    [data-fig="vigia"] #vg-user { cursor:pointer; }
    [data-fig="vigia"] .persona { stroke-width:1.2; stroke-linejoin:round; }
    [data-fig="vigia"] .oculto { display:none; }
    @keyframes vg-nd { 0% { fill:var(--accent-hi); } 100% { fill:var(--detail); } }
    :root[data-theme="light"] [data-fig="vigia"].on .trace, :root[data-theme="light"] [data-fig="vigia"].on .ico.mon, :root[data-theme="light"] [data-fig="vigia"] .ico.vivo { stroke:var(--accent); }
    @media (prefers-reduced-motion:reduce) { [data-fig="vigia"] #vg-probe { transition:none; } [data-fig="vigia"] .mal .trace, [data-fig="vigia"] .mal .led.hot, [data-fig="vigia"] .nd.go { animation:none; } }
  `,
  mount(stage, api) {
    /*  cajas                x    y    z    w    d    h
        modelo              28   34    7   84   84   66   puerto en FRONT (y=118)
        sonda               92  118   26   10   32   10   punta, collar y mango
        persona              2  146    7   17   10   61   maniquí: pies, piernas, cadera, torso, brazos, cuello, cabeza
        terminal            24  138    7   44   14   30   cara FRONT (y=152): recomendación y decisión
        monitor            160  128    7   86   16   78   cara FRONT (y=144): constantes y uso   */
    const PZ = 7, UX = 4, UY = 146;   // pies de la persona en (UX, UY + 4)
    const K = api.iso.frame([[28,34,73],[28,34,7],[112,34,73],[112,34,7],[28,118,7],[160,128,85],[246,144,85],[130,16,35],[186,32,7],[0,146,7],[0,155,7],[4,150,75],[58,182,7],[176,182,7]], .08);
    const { P, D, TOP, FRONT, SIDE, box, path } = K, slits = api.iso.slits;
    let svg = '';

    // modelo con red neuronal en la tapa
    svg += box(28, 34, PZ, 84, 84, 66, 5);
    svg += `<g transform="${FRONT(28,118,73)}">${slits(8, 76, 4, 8, 34)}
      <text class="label" x="8" y="46" font-size="4.6" letter-spacing=".7">${VG_T.model}</text>
      <rect class="face recess" x="60" y="38" width="16" height="11" rx="1.5"/></g>`;
    svg += `<g transform="${SIDE(112,118,73)}">${slits(8, 76, 6, 8, 58)}</g>`;
    const L = [[18, [18, 32, 46, 60]], [42, [14, 28, 42, 56, 70]], [66, [30, 50]]];
    let nn = '', nd = '';
    for (let a = 0; a < 2; a++) for (const v0 of L[a][1]) for (const v1 of L[a + 1][1])
      nn += `<line class="nn" x1="${L[a][0]}" y1="${v0}" x2="${L[a + 1][0]}" y2="${v1}"/>`;
    L.forEach(([u, vs], li) => vs.forEach(v => { nd += `<circle class="led nd" cx="${u}" cy="${v}" r="2.2" style="animation-delay:${li * 120}ms"/>`; }));
    svg += `<g transform="${TOP(28,34,73)}"><rect class="face recess" x="8" y="8" width="68" height="68" rx="3"/>${nn}${nd}</g>`;

    // cables por detrás: modelo -> terminal (recomendación) y sonda -> monitor (constantes)
    const dr = path([[46,118,PZ + .5],[46,138,PZ + .5]]);
    const dw = path([[97,150,31],[97,166,31],[97,166,PZ + .5],[200,166,PZ + .5],[200,144,PZ + .5]]);
    const du = path([[58,152,PZ + .5],[58,182,PZ + .5],[176,182,PZ + .5],[176,144,PZ + .5]]);
    const cable = (id, d) => `<path class="wire-under" d="${d}"/><path id="${id}" class="wire" d="${d}"/><path id="${id}-p" class="pulse" pathLength="1000" d="${d}"/>`;
    svg += cable('vg-wr', dr) + cable('vg-w', dw);

    // asistente de IA (MCP): terminal con globo de chat, cable al monitor
    const dA = path([[176,32,PZ + .5],[176,128,PZ + .5]]);
    svg += cable('vg-wa', dA);
    svg += `<g id="vg-ass">${box(130, 16, PZ, 56, 16, 28, 3)}
      <g transform="${FRONT(130,32,PZ + 28)}"><rect id="vg-ah" class="halo" x="0" y="0" width="56" height="28" filter="url(#bloom)"/>
      <rect id="vg-ag" class="face glass" x="3" y="3" width="50" height="14" rx="1.5"/>${vgIco('chat', 6, 4, 12, 'vivo')}
      <text id="vg-at" class="label" x="22" y="12.6" font-size="4.2" letter-spacing=".3">MCP</text>
      <text class="label" x="4" y="24" font-size="3.9" letter-spacing=".3">${VG_T.ass}</text></g></g>`;

    // persona (pulsable): pictograma de una pieza (cabeza redonda, brazos separados, pies redondeados)
    const [fx, fy] = P(UX, UY + 4, PZ);
    const CUERPO = 'M-4 -43C-9 -43 -12.5 -41.5 -13.5 -37L-15.5 -24Q-16 -19.5 -12.8 -19.5Q-10.6 -19.8 -10.8 -23L-10.4 -31Q-10 -32.5 -9 -32' +
      'L-8.4 -20L-8.6 -2.5Q-8.8 0 -5.8 0L-2 0Q-.6 0 -.8 -2.5L-.8 -17Q0 -18.5 .8 -17L.8 -2.5Q.6 0 2 0L5.8 0Q8.8 0 8.6 -2.5' +
      'L8.4 -20L9 -32Q10 -32.5 10.4 -31L10.8 -23Q10.6 -19.8 12.8 -19.5Q16 -19.5 15.5 -24L13.5 -37C12.5 -41.5 9 -43 4 -43Z';
    svg += `<g class="press" id="vg-user"><g transform="translate(${fx.toFixed(2)} ${fy.toFixed(2)})">
      <ellipse class="detail" cx="0" cy="0" rx="12" ry="3.5"/>
      <path class="face persona" d="${CUERPO}"/>
      <circle class="face persona" cx="0" cy="-52" r="8.5"/>
      <circle id="vg-ubadge" class="led" cx="3.5" cy="-35" r="1.6"/></g></g>`;

    // terminal de la persona: recomendación del modelo y decisión, en símbolos
    svg += box(24, 138, PZ, 44, 14, 30, 3);
    svg += `<g transform="${FRONT(24,152,PZ + 30)}"><rect id="vg-tg" class="face glass hot" x="3" y="3" width="38" height="19" rx="1.5"/>
      <g id="vg-dsig">${vgIco('sigue', 14, 4.5, 16, 'vivo')}</g><g id="vg-dcor" class="oculto">${vgIco('corrige', 14, 4.5, 16, 'vivo')}</g></g>`;
    svg += cable('vg-wu', du);

    // sonda (pulsable)
    svg += `<g class="press" id="vg-probe">
      ${box(94, 118, 28, 6, 6, 6, 1)}${box(92, 124, 26, 10, 8, 10, 2)}
      <g transform="${TOP(92,124,36)}"><rect id="vg-ring" class="led" x="1.5" y="1.5" width="7" height="5" rx="2"/></g>
      ${box(93, 132, 27, 8, 18, 8, 3)}<g transform="${SIDE(101,150,35)}">${slits(2, 16, 3, 1.5, 6.5)}</g></g>`;

    // monitor de Vigía: tres constantes con símbolo, trazo y piloto; debajo, el uso
    svg += box(160, 128, PZ, 86, 16, 78, 4);
    let filas = '';
    ['equidad', 'calidad', 'deriva'].forEach((n, i) => {
      const y = 15 + i * 13;
      filas += `<g id="vg-f${i}">${vgIco(n, 7, y - 6, 10, 'mon')}<path id="vg-t${i}" class="trace" d="M22 ${y - 1}H68"/>
        <circle id="vg-e${i}" class="led" cx="76" cy="${y - 1}" r="2.6"/></g>`;
    });
    svg += `<g transform="${FRONT(160,144,85)}">
      <rect id="vg-halo" class="halo" x="0" y="2" width="86" height="58" filter="url(#bloom)"/>
      <rect id="vg-glass" class="face glass" x="3" y="4" width="80" height="54" rx="2.5"/>${filas}
      <path class="detail" d="M7 46H79"/>${vgIco('persona', 7, 47, 10, 'mon')}<g id="vg-ticks"></g>
      <text class="label" x="5" y="68" font-size="3.8" letter-spacing=".6">${VG_T.mon}</text>
      <circle id="vg-alarm" class="led" cx="78" cy="66.6" r="2.4"/></g>`;
    svg += `<g transform="${SIDE(246,144,85)}">${slits(4, 12, 4, 8, 70)}</g>`;

    stage.setAttribute('viewBox', K.viewBox); stage.innerHTML = svg;
    const $ = id => stage.querySelector('#' + id);
    const probe = $('vg-probe'), ass = $('vg-ass'), nodes = [...stage.querySelectorAll('.nd')];
    const fuera = D(0, 16, 0);
    const st = { ass: false, on: false, mal: false, hist: [], ultima: false };
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
    function trazo(i, ms) {
      const y0 = 14 + i * 13, mal = st.mal && i === 2;
      let d = '';
      for (let x = 22; x <= 68.01; x += .8) {
        const u = x + ms / 1000 * 20 + i * 11;
        let y = 1.4 * Math.sin(u * .45) + .5 * Math.sin(u * 1.4);
        if (mal) y = y * 1.5 + 3 * (hash(Math.floor(u * 1.2)) - .5) - (x - 22) * .05;
        d += (d ? 'L' : 'M') + x.toFixed(1) + ' ' + (y0 - y).toFixed(2);
      }
      return d;
    }
    function ticks() {
      const h = st.on ? st.hist.slice(-16) : [];
      $('vg-ticks').innerHTML = h.map((c, k) => `<rect class="tick${c ? ' corr' : ''}" x="${21 + k * 3.6}" y="${c ? 47.5 : 51}" width="2" height="${c ? 8 : 4.5}" rx=".6"/>`).join('');
    }
    function render() {
      ['vg-ag', 'vg-ah'].forEach(id => $(id).classList.toggle('hot', st.on && st.ass));
      $('vg-at').setAttribute('class', st.on && st.ass ? 'label vivo' : 'label');
      $('vg-wa').classList.toggle('hot', st.on);
      stage.classList.toggle('on', st.on);
      probe.setAttribute('transform', st.on ? '' : `translate(${fuera[0].toFixed(2)} ${fuera[1].toFixed(2)})`);
      ['vg-w', 'vg-wu'].forEach(id => $(id).classList.toggle('hot', st.on));
      $('vg-wr').classList.add('hot');
      $('vg-ring').classList.toggle('hot', st.on); nodes.forEach(n => n.classList.toggle('hot', st.on));
      $('vg-glass').classList.toggle('hot', st.on); $('vg-halo').classList.toggle('hot', st.on);
      $('vg-alarm').classList.toggle('hot', st.on && st.mal);
      [0, 1, 2].forEach(i => {
        $('vg-f' + i).classList.toggle('mal', st.on && st.mal && i === 2);
        $('vg-e' + i).classList.toggle('hot', st.on);
        if (!st.on) $('vg-t' + i).setAttribute('d', `M22 ${14 + i * 13}H68`);
      });
      $('vg-dsig').classList.toggle('oculto', st.ultima);
      $('vg-dcor').classList.toggle('oculto', !st.ultima);
      ticks();
      const corr = st.hist.filter(Boolean).length;
      api.power(st.on);
      api.readout(!st.on ? 'sonda desenchufada · clic en la sonda'
        : st.mal ? 'deriva fuera de rango · alerta' : `conectada · ${st.hist.length} decisiones · ${corr} correcciones`);
    }
    // la persona decide: sigue al modelo o lo corrige; la decisión viaja al monitor
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
    const conectar = () => { api.flash(probe); st.on = !st.on; if (!st.on) { st.mal = false; st.hist = []; } render(); };
    const corregir = () => decide(true);
    const deriva = () => { if (!st.on) { api.readout('enchufa antes la sonda'); api.flash(probe); return; } st.mal = !st.mal; render(); };
    const reiniciar = () => { st.on = false; st.mal = false; st.hist = []; st.ultima = false; render(); };
    function asistente() {
      if (!st.on) return;
      st.ass = true; render(); api.replay($('vg-wa-p'));
      api.after(1500, () => { st.ass = false; render(); });
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
