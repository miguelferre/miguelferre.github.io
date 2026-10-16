const EN = new URLSearchParams(location.search).get('lang') === 'en';
const PM_T = EN
  ? { name: 'Beach or hills', hint: 'Click the sun or the cloud · ←→ change the weather · space next',
      aria: 'Isometric split plate: coast on one side, hill with a trail on the other, a signpost between them. The weather changes and the signpost lights the better choice. Click the sun or cloud, or use arrow keys and space.',
      beach: 'BEACH', hike: 'HIKE', win: ['beach', 'hike'],
      w: ['sun · calm sea', 'clouds · calm sea', 'wind · rough sea', 'sun · light chop'] }
  : { name: 'Praia ou montaña', hint: 'Clic en el sol o la nube · ←→ cambian el tiempo · espacio siguiente',
      aria: 'Placa isométrica partida: costa a un lado, monte con una senda al otro y un poste indicador en medio. El tiempo cambia y el poste ilumina la mejor opción. Clic en el sol o la nube, o flechas y espacio.',
      beach: 'PRAIA', hike: 'MONTE', win: ['praia', 'monte'],
      w: ['sol · mar en calma', 'nubes · mar en calma', 'viento · mar picado', 'sol · mar rizado'] };

FIGS.push({
  id: 'praia-ou-montana', name: PM_T.name, hint: PM_T.hint, aria: PM_T.aria,
  css: `
[data-fig="praia-ou-montana"] .pm-hit{cursor:pointer}
[data-fig="praia-ou-montana"] .pm-sun .core{fill:none;stroke:var(--line);stroke-width:1.4;vector-effect:non-scaling-stroke}
[data-fig="praia-ou-montana"] .pm-sun .ray{stroke:var(--line);stroke-width:1.2;vector-effect:non-scaling-stroke}
[data-fig="praia-ou-montana"] .pm-sun.on .core{fill:var(--accent);stroke:var(--accent-hi);filter:url(#glow)}
[data-fig="praia-ou-montana"] .pm-sun.on .ray{stroke:var(--accent-hi)}
[data-fig="praia-ou-montana"] .pm-cloud{opacity:.22;transition:opacity .5s}
[data-fig="praia-ou-montana"] .pm-cloud.on{opacity:1}
[data-fig="praia-ou-montana"] .pm-wind{opacity:0;transition:opacity .5s}
[data-fig="praia-ou-montana"] .pm-wind.on{opacity:1}
[data-fig="praia-ou-montana"] .pm-wind path{fill:none;stroke:var(--ink);stroke-width:1.4;stroke-linecap:round;vector-effect:non-scaling-stroke;stroke-dasharray:26 14}
[data-fig="praia-ou-montana"] .pm-wave{fill:none;stroke:var(--line);stroke-width:1.3;vector-effect:non-scaling-stroke;transition:stroke .4s}
[data-fig="praia-ou-montana"] .pm-waves.lit .pm-wave{stroke:var(--accent-hi);filter:url(#soft)}
[data-fig="praia-ou-montana"] .pm-sand{fill:var(--accent);fill-opacity:0;transition:fill-opacity .5s}
[data-fig="praia-ou-montana"] .pm-sand.lit{fill-opacity:.55;filter:url(#soft)}
[data-fig="praia-ou-montana"] .pm-trail{fill:none;stroke:var(--line);stroke-width:1.6;stroke-linejoin:round;vector-effect:non-scaling-stroke;transition:stroke .4s}
[data-fig="praia-ou-montana"] .pm-trails.lit .pm-trail{stroke:var(--accent-hi);stroke-width:2.6;filter:url(#glow)}
[data-fig="praia-ou-montana"] .pm-board text{font-weight:700;letter-spacing:.06em}
[data-fig="praia-ou-montana"] .pm-board.hot .face{fill:var(--accent);stroke:var(--accent-hi)}
[data-fig="praia-ou-montana"] .pm-board.hot{filter:url(#glow)}
[data-fig="praia-ou-montana"] .pm-board.hot text{fill:var(--panel)}`,
  mount(stage, api) {
    const K = api.iso.frame([[0,0,0],[240,0,0],[0,150,0],[240,150,0],[120,75,150],[190,10,196],[30,110,196]]);
    const { P, TOP, FRONT, SIDE, rect, box } = K;
    const ID = 'praia-ou-montana';
    const zig = (u0, u1, v0, v1, n) => {          // zigzag local (u,v), v grows downward
      let d = `M${u0} ${v1}`; const du = (u1 - u0) / n;
      for (let i = 1; i <= n; i++) d += ` L${(u0 + du * i).toFixed(1)} ${i % 2 ? v0 : v1}`;
      return d;
    };
    const sunP = P(190, 10, 184), cloudP = P(30, 110, 184);
    let rays = '';
    for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; rays += `<line class="ray" x1="${(Math.cos(a) * 21).toFixed(1)}" y1="${(Math.sin(a) * 21).toFixed(1)}" x2="${(Math.cos(a) * 29).toFixed(1)}" y2="${(Math.sin(a) * 29).toFixed(1)}"/>`; }

    let svg = box(0, 0, 0, 240, 150, 8, 12);
    svg += `<g transform="${TOP(0, 0, 8)}"><rect class="detail" x="8" y="8" width="224" height="134" rx="8"/>
      <line class="detail" x1="8" y1="78" x2="232" y2="78"/></g>`;
    // costa: arena + mar con olas
    svg += `<g transform="${TOP(0, 0, 8)}"><rect class="pm-sand" id="${ID}-sand" x="12" y="82" width="216" height="26" rx="4"/>
      <rect class="face recess" x="12" y="110" width="216" height="32" rx="4"/>
      <clipPath id="${ID}-clip"><rect x="12" y="110" width="216" height="32"/></clipPath>
      <g clip-path="url(#${ID}-clip)"><g id="${ID}-waves" class="pm-waves"></g></g></g>`;
    // monte: tres escalones y senda en zigzag
    svg += box(14, 4, 8, 212, 68, 32, 3) + box(46, 12, 40, 148, 52, 30, 3) + box(88, 20, 70, 64, 36, 26, 3);
    svg += `<g id="${ID}-trails" class="pm-trails">
      <g transform="${FRONT(14, 72, 40)}"><path class="pm-trail" d="${zig(24, 120, 6, 28, 6)}"/></g>
      <g transform="${FRONT(46, 64, 70)}"><path class="pm-trail" d="${zig(30, 110, 5, 26, 5)}"/></g>
      <g transform="${FRONT(88, 56, 96)}"><path class="pm-trail" d="${zig(8, 52, 4, 22, 4)}"/></g></g>`;
    // poste y brazos
    svg += box(116, 71, 8, 8, 8, 136, 2);
    svg += `<g class="pm-board" id="${ID}-bm">${box(114, 19, 120, 12, 60, 16, 2)}
      <g transform="${SIDE(126, 79, 136)}"><text class="label" x="12" y="12" style="font-size:12px">${PM_T.hike}</text></g></g>`;
    svg += `<g class="pm-board" id="${ID}-bp">${box(114, 71, 98, 12, 60, 16, 2)}
      <g transform="${SIDE(126, 131, 114)}"><text class="label" x="6" y="12" style="font-size:12px">${PM_T.beach}</text></g></g>`;
    // cielo
    svg += `<g class="pm-hit pm-sun" id="${ID}-sun" transform="translate(${sunP[0].toFixed(1)} ${sunP[1].toFixed(1)})">
      <circle class="core" r="14"/>${rays}<circle r="32" style="fill:var(--panel);fill-opacity:0;pointer-events:all"/></g>`;
    svg += `<g class="pm-hit pm-cloud" id="${ID}-cloud" transform="translate(${cloudP[0].toFixed(1)} ${cloudP[1].toFixed(1)}) scale(1.35)">
      <path class="face" d="M-26 8 a10 10 0 0 1 4 -18 a14 14 0 0 1 26 -4 a11 11 0 0 1 18 8 a9 9 0 0 1 -2 14 z"/>
      <rect x="-34" y="-26" width="68" height="42" style="fill:var(--panel);fill-opacity:0;pointer-events:all"/></g>`;
    svg += `<g class="pm-wind" id="${ID}-wind" transform="translate(${(cloudP[0] + 52).toFixed(1)} ${(cloudP[1] - 6).toFixed(1)})">
      <path d="M0 0 h60 q9 0 9 -7"/><path d="M-10 14 h74 q9 0 9 7"/><path d="M6 28 h46 q8 0 8 -6"/></g>`;

    stage.setAttribute('viewBox', K.viewBox); stage.innerHTML = svg;
    const q = s => stage.querySelector('#' + ID + '-' + s);
    const sun = q('sun'), cloud = q('cloud'), wind = q('wind'), waves = q('waves'), sand = q('sand'),
      trails = q('trails'), bm = q('bm'), bp = q('bp');
    // [sol, nube, viento, amplitud ola, gana praia]
    const W = [[1, 0, 0, 1.5, 1], [0, 1, 0, 1.5, 0], [0, 1, 1, 6, 0], [1, 0, 0, 3.5, 1]];
    const st = { i: 0, auto: false };
    const wavePath = A => { let s = ''; for (let r = 0; r < 4; r++) { const y = 116 + r * 8; s += `<path class="pm-wave" d="M-20 ${y} q10 ${-A} 20 0` + ' t20 0'.repeat(13) + '"/>'; } return s; };
    function render() {
      const [s, c, w, A, praia] = W[st.i];
      sun.classList.toggle('on', !!s); cloud.classList.toggle('on', !!c); wind.classList.toggle('on', !!w);
      waves.innerHTML = wavePath(A);
      waves.classList.toggle('lit', !!praia); sand.classList.toggle('lit', !!praia);
      trails.classList.toggle('lit', !praia);
      bp.classList.toggle('hot', !!praia); bm.classList.toggle('hot', !praia);
      api.power(true);
      api.readout(PM_T.w[st.i] + ' → ' + PM_T.win[praia ? 0 : 1]);
    }
    const go = d => { st.i = (st.i + d + W.length) % W.length; render(); };
    const user = () => { st.auto = false; };
    sun.addEventListener('click', () => { user(); go(1); });
    cloud.addEventListener('click', () => { user(); go(1); });
    stage.addEventListener('pointerdown', user);
    const stopLoop = api.loop(t => {
      const A = W[st.i], sp = A[2] ? 0.03 : 0.008;
      waves.setAttribute('transform', `translate(${((t * sp) % 20).toFixed(2)} 0)`);
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
