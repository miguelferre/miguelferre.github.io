/* Vigía en el portfolio: parte de hospital-monitor-ia.js (skill iso-glow), con textos ES/EN y la deriva en ciclo. */
const VG_EN = new URLSearchParams(location.search).get('lang') === 'en';
const VG = (es, en) => VG_EN ? en : es;
/* Hospital con tres pacientes dormidos, un chip de modelo de IA y un monitor de constantes del modelo. El modelo atiende a
   un paciente por turno y el monitor dibuja su rendimiento; `d` provoca una deriva y el monitor da la alarma.
   Autocontenido (no necesita people.js). Con ?still se abre ya encendido y quieto; con ?still&alerta, con la alarma puesta. */
FIGS.push({
  id: 'hmon',
  name: VG('Vigía · monitor del modelo', 'Vigía · model monitor'),
  hint: 'Pulsa el chip · clic en una cama · d deriva · r detiene',
  aria: VG_EN ? 'Isometric hospital ward with three patients, an AI model chip and Vigía monitoring the model: performance, drift and fairness. Press d for drift.' : 'Hospital isométrico con una sala de tres camas con pacientes, un chip de modelo de IA y un monitor de constantes del modelo. Pulsa el chip o la barra espaciadora para poner el modelo en marcha: los datos de cada paciente viajan por un cable hasta el modelo y del modelo al monitor, que dibuja un trazo vivo. La tecla d provoca una deriva y el monitor da la alarma. La tecla r detiene el modelo.',
  css: `
    [data-fig="hmon"] .pn { fill:var(--recess); stroke:var(--detail); stroke-width:.6; vector-effect:non-scaling-stroke; }
    [data-fig="hmon"] .pt { cursor:pointer; }
    [data-fig="hmon"] .pt .blk .face { transition:stroke .3s, fill .3s; }
    [data-fig="hmon"] .pt.on .blk .face { stroke:var(--accent); }
    [data-fig="hmon"] .pt.on .blk .face.top { fill:var(--accent-dim); }
    [data-fig="hmon"] .pt.on .halo { opacity:.34; }
    [data-fig="hmon"] .hw .glass.hot { filter:url(#soft); }
    [data-fig="hmon"] .nn { fill:none; stroke:var(--detail); stroke-width:.7; vector-effect:non-scaling-stroke; transition:stroke .4s; }
    [data-fig="hmon"].on .nn { stroke:var(--accent); }
    [data-fig="hmon"] .nd.go { animation:hmon-pk .45s ease-out; }
    @keyframes hmon-pk { 0% { fill:var(--accent-hi); r:2.8; } 100% { r:1.7; } }
    [data-fig="hmon"] .trace { fill:none; stroke:var(--line); stroke-width:1.1; vector-effect:non-scaling-stroke; stroke-linejoin:round; }
    [data-fig="hmon"].on .trace { stroke:var(--accent-hi); }
    [data-fig="hmon"] .bar { fill:var(--detail); transition:width .8s, fill .3s; }
    [data-fig="hmon"].on .bar { fill:var(--accent); }
    [data-fig="hmon"].alert #hmon-drift { animation:blink .8s steps(1) infinite; }
    [data-fig="hmon"].alert #hmon-alarm { fill:var(--accent-hi); animation:blink .8s steps(1) infinite; }
    [data-fig="hmon"] .scr-off { fill:var(--ink); }
    [data-fig="hmon"] .hair { fill:var(--line); }
    [data-fig="hmon"] .silh { fill:none; stroke:var(--line); stroke-width:1; vector-effect:non-scaling-stroke; stroke-linejoin:round; transition:stroke .3s; }
    [data-fig="hmon"] .pt.on .silh { stroke:var(--accent); }
    [data-fig="hmon"] .tube { fill:none; stroke:var(--line); stroke-width:1; vector-effect:non-scaling-stroke; stroke-linecap:round; }
    [data-fig="hmon"] .tube.thin { stroke-width:.7; }
    [data-fig="hmon"] .cross { fill:none; stroke:var(--line); stroke-width:1; vector-effect:non-scaling-stroke; }
    [data-fig="hmon"] .pulse.go { animation-duration:.85s; }
    :root[data-theme="light"] [data-fig="hmon"].on .trace { stroke:var(--accent); stroke-width:1.25; filter:none; }
    :root[data-theme="light"] [data-fig="hmon"] .scr { fill:var(--ink-hi); }
    :root[data-theme="light"] [data-fig="hmon"] #hmon-st.scr { fill:var(--accent); }
    :root[data-theme="light"] [data-fig="hmon"] .glass.hot { fill:color-mix(in srgb, var(--accent) 3%, var(--panel)); stroke-width:1.1; }
    :root[data-theme="light"] [data-fig="hmon"] .pt.on .halo { opacity:.5; }
    :root[data-theme="light"] [data-fig="hmon"] .pt.on .blk .face.top { fill:color-mix(in srgb, var(--accent) 22%, var(--panel)); }
    :root[data-theme="light"] [data-fig="hmon"] .hw .halo.hot { opacity:.45; }
    :root[data-theme="light"] [data-fig="hmon"] .wire.hot { stroke-width:1.5; }
    @media (prefers-reduced-motion:reduce) { [data-fig="hmon"] .bar, [data-fig="hmon"] .nn { transition:none; } [data-fig="hmon"] .nd.go, [data-fig="hmon"].alert #hmon-drift, [data-fig="hmon"].alert #hmon-alarm { animation:none; } }
  `,
  mount(stage, api) {
    /*  cajas                 x    y    z    w    d    h
        parcela               0    0    0  264  250    7
        hospital (torre)     12   90    7   40  150   74   -> cara larga = SIDE x=52 (sala abajo, ventanas arriba)
        sala (losa)          52   90    7   72  150    3   -> tres camas, abierta al frente y a la derecha
        monitor (pantalla)  150   14   27  100   12   60   -> cara FRONT y=26 con el trazo
        peana del chip      150  120    7   64   64    5
        chip (modelo IA)    158  128   12   48   48    8                                            */
    const PZ = 7;
    const K = api.iso.frame([[0,0,0],[264,0,0],[0,250,0],[264,250,0],[12,90,81],[52,90,81],[12,240,81],[52,240,81],[150,14,87],[250,14,87],[250,26,87]], 0.06);
    const { P, TOP, FRONT, SIDE, box, path } = K, slits = api.iso.slits;
    const T = { x: 12, y: 90, w: 40, d: 150, h: 74 };
    const TZ = PZ + T.h;                         // 81
    const BEDS = [104, 148, 192];                // y de cada cama (ancho 32)
    const WARD = 10;                             // cota de la losa de la sala

    let svg = '';
    // ---- parcela ----
    svg += box(0, 0, 0, 264, 250, PZ, 12);
    svg += `<g transform="${TOP(0, 0, PZ)}">
      <rect class="detail" x="7" y="7" width="250" height="236" rx="8"/>
      ${slits(214, 250, 9, 200, 236)}
    </g>`;
    svg += `<g transform="${FRONT(0, 250, PZ)}"><text class="label" x="16" y="5.2" font-size="4" letter-spacing=".6">${VG('VIGÍA · MONITOR DEL MODELO', 'VIGÍA · MODEL MONITOR')}</text></g>`;
    svg += `<g transform="${SIDE(264, 250, PZ)}">${slits(190, 238, 3, 2, 5)}</g>`;

    // ---- torre del hospital ----
    svg += box(T.x, T.y, PZ, T.w, T.d, T.h, 2);
    let win = '';
    for (let r = 0; r < 3; r++) for (let c = 0; c < 12; c++)
      win += `<rect class="pn" x="${5 + c * 12}" y="${5 + r * 13}" width="8" height="8"/>`;
    const head = BEDS.map((by, i) => {
      const u = 240 - (by + 16);
      return `<g class="hw" data-p="${i}"><rect class="halo" x="${u - 13}" y="47" width="26" height="14" filter="url(#bloom)"/>
        <rect class="face glass" x="${u - 9}" y="49" width="18" height="8" rx="1"/>
        <circle class="led" cx="${u + 7}" cy="53" r="1.2"/></g>`;
    }).join('');
    svg += `<g transform="${SIDE(52, 240, TZ)}">${win}<line class="detail" x1="0" y1="44" x2="150" y2="44"/>${head}</g>`;
    svg += `<g transform="${FRONT(T.x, 240, TZ)}">
      <path class="cross" d="M16 6h8v6h6v8h-6v6h-8v-6h-6v-8h6z"/>
      <text class="label" x="20" y="36" font-size="4" text-anchor="middle" letter-spacing=".5">${VG('HOSPITAL', 'HOSPITAL')}</text>
      ${slits(6, 34, 4, 44, 70)}
    </g>`;
    svg += `<g transform="${TOP(T.x, T.y, TZ)}"><rect class="detail" x="3" y="3" width="${T.w - 6}" height="${T.d - 6}" rx="1"/></g>`;

    // ---- sala: losa, pared del fondo, camas y cable de datos ----
    svg += box(52, 90, PZ, 72, 150, WARD - PZ, 0);
    svg += `<g transform="${TOP(52, 90, WARD)}">${slits(10, 70, 10, 6, 146, false)}</g>`;
    svg += box(52, 90, WARD, 72, 4, 20, 0);
    // paciente tumbado: cabeza en la almohada y manta con pliegue (primera versión, elegida por Miguel)
    const f2 = n => n.toFixed(2);
    const headAt = (x, y, z, R) => {
      const c = P(x, y, z);
      const hair = `M${f2(c[0] - R)} ${f2(c[1] + .4)}A${R} ${R} 0 0 1 ${f2(c[0] + R * .55)} ${f2(c[1] - R * .95)}A${R * 1.25} ${R * 1.25} 0 0 0 ${f2(c[0] - R)} ${f2(c[1] + .4)}Z`;
      return `<circle class="face" cx="${f2(c[0])}" cy="${f2(c[1])}" r="${R}"/><path class="hair" d="${hair}"/>`;
    };
    const bed = (by, i) => {
      const c = P(63, by + 16, 25);
      const body = `${box(58, by + 5, WARD + 8, 9, 22, 3, 1.5)}
        <circle class="face" cx="${f2(c[0])}" cy="${f2(c[1])}" r="4.3"/>
        <g class="blk">${box(69, by + 3, WARD + 8, 29, 26, 4, 2.5)}</g>
        <g transform="${TOP(69, by + 3, WARD + 12)}"><line class="detail" x1="5" y1="2" x2="5" y2="24"/></g>`;
      const pole = [P(60, by + 37, WARD), P(60, by + 37, 47)], hook = [P(57, by + 37, 47), P(63, by + 37, 47)];
      return `<g class="pt" data-p="${i}">
        <g transform="${TOP(54, by - 3, WARD)}"><rect class="halo" width="50" height="38" rx="4" filter="url(#bloom)"/></g>
        ${box(56, by, WARD, 44, 32, 8, 1.5)}
        ${body}
        ${box(98, by, WARD + 8, 2, 32, 6, 0)}
        <path class="tube" d="M${pole[0].join(' ')}L${pole[1].join(' ')}M${hook[0].join(' ')}L${hook[1].join(' ')}"/>
        <g transform="${FRONT(58, by + 37, 46)}"><rect class="face" width="4" height="7" rx="1"/></g>
      </g>`;
    };
    svg += bed(BEDS[0], 0);
    const r1 = [[52, 142, WARD + .5], [124, 142, WARD + .5], [124, 142, PZ + .5], [150, 142, PZ + .5]];
    const d1 = path(r1);
    svg += `<path class="wire-under" d="${d1}"/><path id="hmon-w1" class="wire" d="${d1}"/><path id="hmon-p1" class="pulse" pathLength="1000" d="${d1}"/>`;
    svg += bed(BEDS[1], 1) + bed(BEDS[2], 2);

    // ---- monitor de constantes del modelo ----
    svg += box(174, 6, PZ, 52, 30, 3, 3);
    svg += box(192, 16, PZ + 3, 16, 8, 17, 0);
    svg += box(150, 14, 27, 100, 12, 60, 2);
    svg += `<g transform="${FRONT(150, 26, 87)}">
      <defs><clipPath id="hmon-clip"><rect x="7" y="16.5" width="86" height="14"/></clipPath></defs>
      <rect id="hmon-glass" class="face glass" x="4" y="4" width="92" height="44" rx="1.5"/>
      <text id="hmon-t1" class="scr-off" x="7" y="10.5" font-size="3.4" letter-spacing=".3">VIGÍA</text>
      <text id="hmon-st" class="scr-off" x="93" y="10.5" font-size="3.4" text-anchor="end" letter-spacing=".3">${VG('EN ESPERA', 'STANDBY')}</text>
      <text id="hmon-t2" class="scr-off" x="7" y="15.5" font-size="2.6" letter-spacing=".3">${VG('RENDIMIENTO', 'PERFORMANCE')}</text>
      <line class="detail" x1="7" y1="27" x2="93" y2="27"/>
      <path id="hmon-trace" class="trace" clip-path="url(#hmon-clip)" d="M7 27H93"/>
      <text id="hmon-t3" class="scr-off" x="7" y="36" font-size="2.6" letter-spacing=".3">${VG('DERIVA', 'DRIFT')}</text>
      <rect class="detail" x="26" y="33.4" width="67" height="2.8"/>
      <rect id="hmon-drift" class="bar" x="26" y="33.4" width="0" height="2.8"/>
      <text id="hmon-t4" class="scr-off" x="7" y="43" font-size="2.6" letter-spacing=".3">${VG('EQUIDAD', 'FAIRNESS')}</text>
      <rect class="detail" x="26" y="40.4" width="67" height="2.8"/>
      <rect id="hmon-eq" class="bar" x="26" y="40.4" width="0" height="2.8"/>
      <text class="label" x="5" y="55" font-size="3" letter-spacing=".4">${VG('MONITOR DEL MODELO', 'MODEL MONITOR')}</text>
      ${slits(52, 80, 3, 52, 57)}
      <circle id="hmon-alarm" class="led" cx="91" cy="54" r="2"/>
    </g>`;
    svg += `<g transform="${SIDE(250, 26, 87)}">${slits(6, 54, 4, 2, 10, false)}</g>`;

    // ---- cable del modelo al monitor (sale por debajo de la peana) ----
    const r2 = [[196, 128, PZ + .5], [196, 36, PZ + .5], [196, 36, PZ + 3.5], [196, 24, PZ + 3.5], [196, 24, 26.5]];
    const d2 = path(r2);
    svg += `<path class="wire-under" d="${d2}"/><path id="hmon-w2" class="wire" d="${d2}"/><path id="hmon-p2" class="pulse" pathLength="1000" d="${d2}"/>`;

    // ---- modelo de IA: peana y chip (pulsable) ----
    svg += box(150, 120, PZ, 64, 64, 5, 6);
    svg += `<g transform="${FRONT(150, 184, PZ + 5)}"><text class="label" x="5" y="3.7" font-size="3.1" letter-spacing=".5">${VG('MODELO DE IA', 'AI MODEL')}</text></g>`;
    const L = [[14, [14, 24, 34]], [24, [12, 19.3, 26.6, 34]], [34, [19, 29]]];
    let nn = '', nd = '';
    for (let a = 0; a < 2; a++) for (const v0 of L[a][1]) for (const v1 of L[a + 1][1])
      nn += `<line class="nn" x1="${L[a][0]}" y1="${v0}" x2="${L[a + 1][0]}" y2="${v1}"/>`;
    L.forEach(([u, vs], li) => vs.forEach(v => { nd += `<circle class="led nd" cx="${u}" cy="${v}" r="1.7" style="animation-delay:${li * 110}ms"/>`; }));
    svg += `<g class="press" id="hmon-chip">${box(158, 128, 12, 48, 48, 8, 4)}
      <g transform="${FRONT(158, 176, 20)}">${slits(4, 44, 4, 1.5, 6.5)}</g>
      <g transform="${SIDE(206, 176, 20)}">${slits(4, 44, 4, 1.5, 6.5)}</g>
      <g transform="${TOP(158, 128, 20)}">
        <g id="hmon-die-g"><rect id="hmon-die" class="face glass" x="8" y="8" width="32" height="32" rx="2"/>${nn}${nd}</g>
      </g>
    </g>`;

    stage.setAttribute('viewBox', K.viewBox);
    stage.innerHTML = svg;

    // ---- estado ----
    const st = { on: false, alert: false, cur: -1 };
    const $ = id => stage.querySelector('#' + id);
    const pts = [...stage.querySelectorAll('.pt')], hws = [...stage.querySelectorAll('.hw')];
    const chip = $('hmon-chip'), die = $('hmon-die'), nodes = [...stage.querySelectorAll('.nd')];
    const w1 = $('hmon-w1'), w2 = $('hmon-w2'), p1 = $('hmon-p1'), p2 = $('hmon-p2');
    const glass = $('hmon-glass'), trace = $('hmon-trace'), stx = $('hmon-st');
    const scr = ['hmon-t1', 'hmon-t2', 'hmon-t3', 'hmon-t4', 'hmon-st'].map($);
    const drift = $('hmon-drift'), eq = $('hmon-eq');
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let tick = null;

    function render() {
      stage.classList.toggle('on', st.on);
      stage.classList.toggle('alert', st.on && st.alert);
      pts.forEach((p, i) => p.classList.toggle('on', st.on && i === st.cur));
      hws.forEach((h, i) => {
        h.querySelector('.glass').classList.toggle('hot', st.on && i === st.cur);
        h.querySelector('.halo').classList.toggle('hot', st.on && i === st.cur);
        h.querySelector('.led').classList.toggle('hot', st.on);
      });
      die.classList.toggle('hot', st.on);
      nodes.forEach(n => n.classList.toggle('hot', st.on));
      w1.classList.toggle('hot', st.on); w2.classList.toggle('hot', st.on);
      glass.classList.toggle('hot', st.on);
      scr.forEach(t => t.setAttribute('class', st.on ? 'scr' : 'scr-off'));
      stx.textContent = !st.on ? VG('EN ESPERA', 'STANDBY') : st.alert ? VG('ALERTA · DERIVA', 'ALERT · DRIFT') : VG('ESTABLE', 'STABLE');
      drift.setAttribute('width', st.on ? (st.alert ? 52 : 8) : 0);
      eq.setAttribute('width', st.on ? (st.alert ? 30 : 55) : 0);
      api.power(st.on);
      api.readout(!st.on ? 'modelo detenido · pulsa el chip'
        : `modelo activo · paciente ${st.cur + 1}/3 · ${st.alert ? 'alerta: deriva' : 'constantes estables'}`);
    }
    function step() {
      if (!st.on) return;
      st.cur = (st.cur + 1) % 3; render();
      api.replay(p1);
      api.after(560, () => { if (st.on) nodes.forEach(n => api.replay(n)); });
      api.after(820, () => { if (st.on) api.replay(p2); });
    }
    function start() {
      api.flash(chip);
      if (st.on) return;
      st.on = true; st.cur = -1; step();
      tick = api.every(1700, step);
    }
    function stop() {
      if (!st.on) return;
      clearInterval(tick); tick = null;
      st.on = false; st.alert = false; render(); drawTrace(0);
    }
    function toggleDrift() {
      if (!st.on) { api.readout('primero pon el modelo en marcha'); api.flash(chip); return; }
      st.alert = !st.alert; render();
    }
    function pick(i) {
      if (!st.on) start();
      st.cur = (i + 2) % 3; step();
    }

    // trazo tipo electrocardiograma: rendimiento del modelo; con deriva se vuelve irregular
    const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
    function ecg(p) {
      if (p > .10 && p < .18) return 1.2 * Math.sin(Math.PI * (p - .10) / .08);
      if (p >= .26 && p < .29) return -1.5 * (p - .26) / .03;
      if (p >= .29 && p < .33) return -1.5 + 9.5 * (p - .29) / .04;
      if (p >= .33 && p < .37) return 8 - 10.5 * (p - .33) / .04;
      if (p >= .37 && p < .40) return -2.5 + 2.5 * (p - .37) / .03;
      if (p > .52 && p < .66) return 2 * Math.sin(Math.PI * (p - .52) / .14);
      return 0;
    }
    function drawTrace(ms) {
      if (!st.on) { trace.setAttribute('d', 'M7 27H93'); return; }
      const off = ms / 1000 * 30, BW = 28;
      let d = '';
      for (let x = 7; x <= 93.01; x += .7) {
        const u = x + off, k = Math.floor(u / BW), p = (u / BW) - k;
        let y = ecg(p);
        if (st.alert) y = y * (.35 + .9 * hash(k)) + 1.6 * (hash(Math.floor(u * 1.6)) - .5) + 1.4 * Math.sin(u * .17);
        d += (d ? 'L' : 'M') + x.toFixed(1) + ' ' + (27 - y).toFixed(2);
      }
      trace.setAttribute('d', d);
    }
    api.loop(ts => { if (st.on) drawTrace(still ? 900 : ts); });

    stage.addEventListener('click', e => {
      if (e.target.closest('#hmon-chip')) { st.on ? stop() : start(); return; }
      const p = e.target.closest('.pt');
      if (p) pick(+p.dataset.p);
    });
    render();
    // vista estática (?still): estado encendido sin esperar a temporizadores ni animación
    const capture = /still/.test(location.search);
    if (capture) {
      st.on = true; st.cur = 1; st.alert = /alerta/.test(location.search);
      render(); drawTrace(900);
    }
    return {
      key(e) {
        if (e.repeat) return false;
        if (e.key === ' ' || e.key === 'Enter') { st.on ? stop() : start(); return true; }
        if (e.key === 'd' || e.key === 'D') { toggleDrift(); return true; }
        if (e.key === 'r' || e.key === 'R') { stop(); return true; }
        if (/^[1-3]$/.test(e.key)) { pick(+e.key - 1); return true; }
        return false;
      },
      unmount() { clearInterval(tick); },
      demo() { if (capture) return; api.after(200, start); if (/alerta/.test(location.search)) api.after(1400, toggleDrift); api.every(7000, toggleDrift); },
    };
  },
});
