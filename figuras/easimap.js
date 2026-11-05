const EA_EN = new URLSearchParams(location.search).get('lang') === 'en';
const EA_T = {
  name: EA_EN ? 'Sky of an enzyme' : 'Cielo de una enzima',
  hint: EA_EN ? 'Click or space: next view · r restarts' : 'Clic o espacio: siguiente vista · r reinicia',
  aria: EA_EN
    ? 'Isometric dome of stars over a small figure standing on a sugar. Each star is an amino acid: the closer to the sugar, the brighter. Three views: the sky, the two catalytic residues, and the double star of position 333. Click, space or r.'
    : 'Cúpula isométrica de estrellas sobre una personita de pie en un azúcar. Cada estrella es un aminoácido: cuanto más cerca del azúcar, más brilla. Tres vistas: el cielo, los dos residuos catalíticos y la doble estrella de la posición 333. Clic, espacio o r.',
  pills: EA_EN ? ['The sky', 'Catalytic pair', 'Position 333'] : ['El cielo', 'Pareja catalítica', 'Posición 333'],
  read: EA_EN
    ? ['You stand on the sugar · every star is an amino acid', 'Glu 165 and Glu 360 · about 4.6 Å from the sugar', 'Position 333 · eukaryotes (lit) and bacteria (outline)']
    : ['Estás sobre el azúcar · cada estrella es un aminoácido', 'Glu 165 y Glu 360 · a unos 4,6 Å del azúcar', 'Posición 333 · eucariotas (iluminadas) y bacterias (contorno)'],
  A: EA_EN ? 'Eukaryotes' : 'Eucariotas',
  B: EA_EN ? 'Bacteria' : 'Bacterias',
};

FIGS.push({
  id: 'easimap', name: EA_T.name, hint: EA_T.hint, aria: EA_T.aria,
  css: `
    [data-fig="easimap"] .ea-pill { transition: fill .3s, stroke .3s; }
    [data-fig="easimap"] .ea-pt { transition: fill .3s; font-weight: 600; }
    [data-fig="easimap"] .ea-tag { transition: opacity .35s; }
    [data-fig="easimap"] .ea-beam { opacity: 0; transition: opacity .4s; stroke-width: 2.2; }
    [data-fig="easimap"] .ea-beam.on { opacity: 1; }
    [data-fig="easimap"] .ea-arc { fill: none; }
    [data-fig="easimap"] .ea-per { stroke-width: 1.7; stroke-linejoin: round; stroke-linecap: round; }
    [data-fig="easimap"] .ea-arm { fill: none; stroke: var(--ink-hi); stroke-width: 2.6; stroke-linecap: round; vector-effect: non-scaling-stroke; }
    [data-fig="easimap"] .ea-pulse { stroke-width: 3; }
  `,
  mount(stage, api) {
    const N = 200, CX = 100, CY = 100, R = 96, RAD = Math.PI / 180;
    const K = api.iso.frame([[0,0,0],[N,N,0],[0,N,0],[N,0,0],[CX,CY,R + 6]]);
    const { P, TOP, box } = K;
    const at = (th, ph, r) => [CX + r * Math.sin(th * RAD) * Math.cos(ph * RAD), CY + r * Math.sin(th * RAD) * Math.sin(ph * RAD), r * Math.cos(th * RAD)];

    // stars on the dome: th from the zenith, ph around, r distance to the sugar (closer = brighter)
    let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const stars = [];
    const add = (th, ph, r, kind) => stars.push({ th, ph, r, kind, p: at(th, ph, r), cur: .5, tgt: .5, pend: null, at: 0, tw: rnd() * 6 });
    add(50, 180, 0.62 * R, 'cat'); add(50, 0, 0.6 * R, 'cat');
    for (let i = 0; i < 5; i++) { add(56 + (i % 3) * 5, 128 + i * 4, (0.72 + 0.04 * i) * R, 'a'); add(56 + (i % 3) * 5, 308 + i * 4, (0.72 + 0.04 * i) * R, 'b'); }
    const free = (th, ph, r) => stars.every(s => Math.hypot(...s.p.map((v, i) => v - at(th, ph, r)[i])) > 16);
    let tries = 0;
    while (stars.length < 64 && tries++ < 6000) {
      const th = Math.acos(1 - rnd() * 0.97) / RAD, ph = rnd() * 360, r = (0.5 + 0.5 * Math.pow(rnd(), 0.8)) * R;
      if (th > 84) continue;
      if (free(th, ph, r)) add(th, ph, r, 'r');
    }
    const near = s => 1 - (s.r / R - 0.5) / 0.5;           // 0 far .. 1 near

    // base plate and the sugar the figure stands on
    let svg = box(0, 0, -8, N, N, 8, 12);
    svg += `<g transform="${TOP(0,0,0)}"><circle class="detail" cx="${CX}" cy="${CY}" r="${R}"/><circle class="detail" cx="${CX}" cy="${CY}" r="${R * 0.55}" style="stroke-dasharray:2 5"/></g>`;
    svg += box(CX - 12, CY - 12, 0, 24, 24, 4, 3);
    svg += `<g transform="${TOP(CX-12, CY-12, 4)}"><rect id="easimap-sugar" class="face led" filter="url(#soft)" x="3" y="3" width="18" height="18" rx="3"/></g>`;

    // dome wireframe, split into back and front halves so the figure sits inside it
    const arcs = { back: '', front: '' };
    const seg = (a, b) => { const m = (a[0] + a[1] + b[0] + b[1]) / 2; const k = m < CX + CY ? 'back' : 'front'; const A = P(...a), B = P(...b); arcs[k] += `M${A[0].toFixed(1)} ${A[1].toFixed(1)}L${B[0].toFixed(1)} ${B[1].toFixed(1)}`; };
    for (const th of [30, 60, 90]) for (let ph = 0; ph < 360; ph += 6) seg(at(th, ph, R), at(th, ph + 6, R));
    for (let ph = 0; ph < 360; ph += 45) for (let th = 0; th < 90; th += 6) seg(at(th, ph, R), at(th + 6, ph, R));
    svg += `<path class="detail ea-arc" d="${arcs.back}" style="opacity:.8"/>`;

    // the small person: legs, bell body, two arms that move, a head whose eyes follow the sky
    const f = P(CX, CY, 4), SC = 1.5;
    const person = `<g transform="translate(${f[0].toFixed(1)} ${f[1].toFixed(1)}) scale(${SC})" pointer-events="none">
      <ellipse cx="0" cy="1" rx="10" ry="3" style="fill:var(--ink-hi);opacity:.12"/>
      <path class="ea-arm" d="M-3 -7V0M3 -7V0" style="stroke-width:2.2"/>
      <g id="easimap-body">
        <path class="face ea-per" d="M-7 -6 C-7 -14 -5 -18 0 -18 C5 -18 7 -14 7 -6 Z"/>
        <path id="easimap-armL" class="ea-arm" d=""/><path id="easimap-armR" class="ea-arm" d=""/>
        <circle class="face ea-per" cx="0" cy="-23.5" r="6.2"/>
        <path d="M-6.2 -24.5 C-6 -30.5 6 -30.5 6.2 -24.5 C3 -27.2 -3 -27.2 -6.2 -24.5Z" style="fill:var(--ink-hi)"/>
        <g id="easimap-eyes"><circle id="easimap-eL" cx="-2.3" cy="-23.4" r="1"  style="fill:var(--ink-hi)"/><circle id="easimap-eR" cx="2.3" cy="-23.4" r="1" style="fill:var(--ink-hi)"/></g>
        <path id="easimap-closed" d="M-3.6 -23.4Q-2.3 -22.4 -1 -23.4M1 -23.4Q2.3 -22.4 3.6 -23.4" style="fill:none;stroke:var(--ink-hi);stroke-width:.9;stroke-linecap:round"/>
        <path id="easimap-smile" d="M-2.2 -20.6Q0 -18.8 2.2 -20.6" style="fill:none;stroke:var(--ink-hi);stroke-width:1;stroke-linecap:round"/>
        <ellipse id="easimap-oh" cx="0" cy="-20.2" rx="1.2" ry="1.6" style="fill:var(--ink-hi)"/>
      </g></g>`;

    // order: stars behind the person, rays, the person, the front half of the dome, stars in front
    const srt = stars.map((s, i) => ({ s, i })).sort((u, v) => (u.s.p[0] + u.s.p[1]) - (v.s.p[0] + v.s.p[1]));
    const dot = ({ s, i }) => { const q = P(...s.p); return `<circle id="easimap-star${i}" class="face" cx="${q[0].toFixed(1)}" cy="${q[1].toFixed(1)}" r="${(s.kind === 'r' ? 1.6 + 3.2 * near(s) : 4.2).toFixed(1)}"/>`; };
    const mid = CX + CY;
    svg += srt.filter(o => o.s.p[0] + o.s.p[1] < mid).map(dot).join('');
    const c0 = P(CX, CY, 14);
    stars.forEach((s, i) => {
      if (s.kind !== 'cat') return;
      const t = P(...s.p), d = `M${c0[0].toFixed(1)} ${c0[1].toFixed(1)}L${t[0].toFixed(1)} ${t[1].toFixed(1)}`;
      svg += `<path id="easimap-beam${i}" class="wire hot ea-beam" d="${d}" filter="url(#soft)" pointer-events="none"/>`;
      svg += `<path id="easimap-pulse${i}" class="pulse ea-pulse" pathLength="1000" d="${d}" pointer-events="none"/>`;
    });
    svg += person;
    svg += `<path class="detail ea-arc" d="${arcs.front}" style="opacity:.8"/>`;
    svg += srt.filter(o => o.s.p[0] + o.s.p[1] >= mid).map(dot).join('');

    // labels above the two groups
    const grp = k => stars.filter(s => s.kind === k);
    const cen = k => { const g = grp(k); return [0, 1, 2].map(i => g.reduce((a, s) => a + s.p[i], 0) / g.length); };
    const tagAt = k => { const c = cen(k); return P(c[0], c[1], c[2] + 16); };
    const la = tagAt('a'), lb = tagAt('b');
    const tag = (id, p, t) => `<text id="easimap-tag${id}" class="label ea-tag" x="${p[0].toFixed(1)}" y="${p[1].toFixed(1)}" text-anchor="middle" style="font-size:15px;opacity:0;fill:var(--ink-hi);font-weight:600;stroke:var(--panel);stroke-width:5px;paint-order:stroke">${t}</text>`;
    svg += tag('A', la, EA_T.A) + tag('B', lb, EA_T.B);

    // phase pills below the plate
    const pcx = P(N / 2, N / 2, 0)[0], py = P(N, N, -8)[1] + 14, PW = [120, 178, 150], pg = 14;
    for (let k = 0; k < 3; k++) {
      const pw = PW[k], x = pcx - (PW[0] + PW[1] + PW[2] + 2 * pg) / 2 + PW.slice(0, k).reduce((a, b) => a + b + pg, 0);
      svg += `<g pointer-events="none"><rect id="easimap-pill${k}" class="face led ea-pill" x="${x}" y="${py}" width="${pw}" height="32" rx="16"/>`
           + `<text id="easimap-pt${k}" class="label ea-pt" x="${x + pw / 2}" y="${py + 22}" text-anchor="middle" style="font-size:15px">${EA_T.pills[k]}</text></g>`;
    }
    const vt = P(CX, CY, R + 6)[1] - 10, vH = py + 32 + 8 - vt, vW = Math.max(vH * 1.6, PW[0] + PW[1] + PW[2] + 2 * pg + 40);
    stage.setAttribute('viewBox', `${pcx - vW / 2} ${vt} ${vW} ${vH}`);
    stage.innerHTML = svg;

    const $ = id => stage.querySelector('#easimap-' + id);
    const els = stars.map((_, i) => $('star' + i));
    const catIdx = stars.map((s, i) => s.kind === 'cat' ? i : -1).filter(i => i >= 0);
    const st = { phase: 0 };
    let auto = false;

    // body-local screen vector from the shoulder to a point of the dome (the person is scaled by SC)
    const sh = { L: [-6, -14.5], R: [6, -14.5] };
    const toward = (side, p) => { const q = P(...p); const v = [(q[0] - f[0]) / SC - sh[side][0], (q[1] - f[1]) / SC - sh[side][1]]; const n = Math.hypot(...v) || 1; return [v[0] / n, v[1] / n]; };
    const unit = (a) => [Math.cos(a * RAD), Math.sin(a * RAD)];
    const arm = { L: unit(112), R: unit(68) }, armT = { L: unit(112), R: unit(68) };
    const look = { x: 0, y: 0 }, lookT = { x: 0, y: 0 };
    let eyes = 'closed', mouth = 'flat';

    function pose() {
      const ph = st.phase;
      if (ph === 0) { armT.L = unit(112); armT.R = unit(68); lookT.x = 0; lookT.y = 0; eyes = 'closed'; mouth = 'flat'; }
      if (ph === 1) { armT.L = unit(-125); armT.R = unit(-55); lookT.x = 0; lookT.y = -1.1; eyes = 'open'; mouth = 'oh'; }
      if (ph === 2) { armT.L = toward('L', stars[catIdx[0]].p); armT.R = toward('R', stars[catIdx[1]].p); eyes = 'open'; mouth = 'smile'; }
      if (ph === 3) { armT.L = toward('L', cen('a')); armT.R = toward('R', cen('b')); eyes = 'open'; mouth = 'smile'; }
    }
    let lookSwing = 0;

    function render() {
      const ph = st.phase;
      $('sugar').classList.toggle('hot', ph >= 1);
      const now = performance.now();
      stars.forEach((s, i) => {
        let hot = false, line = false, op = 1, delay = 0;
        if (ph === 0) op = .5;
        if (ph === 1) { hot = true; op = .35 + .65 * near(s); delay = (1 - near(s)) * 900; }
        if (ph === 2) { hot = s.kind === 'cat'; op = hot ? 1 : .3; }
        if (ph === 3) {
          if (s.kind === 'a') hot = true;
          else if (s.kind === 'b') line = true;
          op = s.kind === 'a' || s.kind === 'b' ? 1 : .28;
        }
        s.tgt = op; s.pend = { hot, line }; s.at = now + delay;
      });
      for (const i of catIdx) $('beam' + i).classList.toggle('on', ph === 2);
      $('tagA').style.opacity = $('tagB').style.opacity = ph === 3 ? 1 : 0;
      for (let k = 0; k < 3; k++) {
        const on = ph === k + 1;
        $('pill' + k).setAttribute('class', 'face led ea-pill' + (on ? ' hot' : ''));
        $('pt' + k).style.fill = on ? 'var(--panel)' : 'var(--ink-hi)';
      }
      pose();
      $('closed').style.display = eyes === 'closed' ? '' : 'none';
      $('eyes').style.display = eyes === 'open' ? '' : 'none';
      $('smile').style.display = mouth === 'smile' ? '' : 'none';
      $('oh').style.display = mouth === 'oh' ? '' : 'none';
      if (ph === 2) pulses();
      api.power(ph >= 1);
      api.readout(ph === 0 ? (EA_EN ? 'A dome of residues, still dark' : 'Una cúpula de residuos, aún apagada') : EA_T.read[ph - 1]);
    }
    const pulses = () => catIdx.forEach((i, k) => api.after(k * 350, () => api.replay($('pulse' + i), 'go')));
    api.every(1500, () => { if (st.phase === 2) pulses(); });

    // one frame loop: stars fade towards their target (near ones first), twinkle in the sky view, arms and eyes ease to their pose
    const step = (v, t, k) => { v[0] += (t[0] - v[0]) * k; v[1] += (t[1] - v[1]) * k; const n = Math.hypot(v[0], v[1]) || 1; v[0] /= n; v[1] /= n; };
    api.loop(ts => {
      const ph = st.phase;
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i], el = els[i];
        if (s.pend && performance.now() >= s.at) {
          el.setAttribute('class', 'face' + (s.pend.hot ? ' led hot' : ''));
          el.style.fill = s.pend.line ? 'none' : '';
          el.style.stroke = s.pend.line ? 'var(--ink-hi)' : '';
          el.style.strokeWidth = s.pend.line ? '2' : '';
          s.pend = null;
        }
        s.cur += (s.tgt - s.cur) * .12;
        const tw = ph === 1 && !s.pend ? 1 + .22 * Math.sin(ts / 420 + s.tw) * (0.4 + near(s)) : 1;
        el.style.opacity = Math.max(.12, Math.min(1, s.cur * tw)).toFixed(3);
      }
      // the person breathes, and in the sky view the head sweeps slowly across the dome
      $('body').setAttribute('transform', `scale(1 ${(1 + .012 * Math.sin(ts / 700)).toFixed(4)})`);
      if (ph === 1) { lookT.x = Math.sin(ts / 1300) * 1.1; lookT.y = -1.1 + Math.cos(ts / 1900) * .3; }
      if (ph === 2) { const t = Math.sin(ts / 900); lookT.x = t * 1.1; lookT.y = -.7; }
      if (ph === 3) { const t = Math.sin(ts / 1500); lookT.x = t * 1.2; lookT.y = -.8; }
      step(arm.L, armT.L, .1); step(arm.R, armT.R, .1);
      look.x += (lookT.x - look.x) * .1; look.y += (lookT.y - look.y) * .1;
      const hand = (side, v) => { const s0 = sh[side], len = 10.5, hx = s0[0] + v[0] * len, hy = s0[1] + v[1] * len, ex = s0[0] + v[0] * len * .55 + (side === 'L' ? -.8 : .8) * 0, ey = s0[1] + v[1] * len * .55; return `M${s0[0]} ${s0[1]}L${ex.toFixed(2)} ${ey.toFixed(2)}L${hx.toFixed(2)} ${hy.toFixed(2)}`; };
      $('armL').setAttribute('d', hand('L', arm.L)); $('armR').setAttribute('d', hand('R', arm.R));
      $('eL').setAttribute('cx', (-2.3 + look.x * 1.1).toFixed(2)); $('eR').setAttribute('cx', (2.3 + look.x * 1.1).toFixed(2));
      $('eL').setAttribute('cy', (-23.4 + look.y * 1.3).toFixed(2)); $('eR').setAttribute('cy', (-23.4 + look.y * 1.3).toFixed(2));
    });

    const go = n => { st.phase = ((n % 4) + 4) % 4; render(); };
    const next = () => go(st.phase + 1);
    stage.addEventListener('click', () => { auto = false; next(); });
    api.every(3400, () => { if (auto) next(); });
    render();
    return {
      key(e) {
        if (e.key === ' ' || e.key === 'Enter') { auto = false; next(); return true; }
        if (e.key === 'r' || e.key === 'R') { auto = false; go(0); return true; }
        return false;
      },
      demo() { auto = true; go(1); },
    };
  },
});
