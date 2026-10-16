const EN = new URLSearchParams(location.search).get('lang') === 'en';
const CURSO_NAMES = EN
  ? ['foundations', 'risks', 'security engineering', 'complex systems', 'robustness', 'technical monitoring', 'production monitoring', 'alignment', 'machine ethics', 'collective action', 'governance', 'formal foundations', 'closing']
  : ['fundamentos', 'riesgos', 'ingeniería de seguridad', 'sistemas complejos', 'robustez', 'monitorización técnica', 'monitorización en producción', 'alineamiento', 'ética de máquinas', 'acción colectiva', 'gobernanza', 'fundamentos formales', 'cierre'];

FIGS.push({
  id: 'curso',
  name: EN ? 'AI safety course' : 'Curso de seguridad de la IA',
  hint: EN ? 'Space or → next · ← back · r restart · click a step' : 'Espacio o → avanza · ← retrocede · r reinicia · clic en un peldaño',
  aria: EN
    ? 'Isometric staircase of 13 course modules, numbered 0 to 12. A marker climbs one step at a time and each finished module lights up. Module 6 has a small console, the monitoring lab. Space or right arrow advance, left arrow goes back, r restarts, click a step to jump.'
    : 'Escalera isométrica de 13 módulos de curso, numerados de 0 a 12. Un marcador sube peldaño a peldaño y cada módulo completado se enciende. El módulo 6 tiene una consola pequeña, el laboratorio de monitorización. Espacio o flecha derecha avanzan, flecha izquierda retrocede, r reinicia, clic en un peldaño salta a él.',
  mount(stage, api) {
    const N = 13, DX = 34, W = 80, RISE = 22, LAB = 6;
    const K = api.iso.frame([[0, 0, 0], [N * DX, 0, 0], [0, W, 0], [N * DX, W, 0], [0, 0, N * RISE + 60]]);
    const { P, TOP, FRONT, box } = K;
    const x0 = i => (N - 1 - i) * DX;
    const topZ = i => (i + 1) * RISE;
    let svg = box(-10, -10, -6, N * DX + 20, W + 20, 6, 8);
    // halo del laboratorio, detrás de la consola
    const lx = x0(LAB) + 3, lz = topZ(LAB);
    for (let i = N - 1; i >= 0; i--) {
      const x = x0(i), z = topZ(i);
      svg += `<g class="press" id="curso-s${i}" style="cursor:pointer">${box(x, 0, 0, DX, W, z, 2)}`;
      svg += `<g transform="${TOP(x, 0, z)}"><rect id="curso-t${i}" class="glass" x="2" y="2" width="${DX - 4}" height="${W - 4}" rx="2"/></g>`;
      svg += `<g transform="${FRONT(x, W, z)}"><rect id="curso-b${i}" class="glass" x="2" y="2" width="${DX - 4}" height="${RISE - 6}" rx="2"/>`;
      svg += `<text id="curso-n${i}" class="label" x="${DX / 2}" y="${RISE - 7}" text-anchor="middle" style="font-size:15px;font-weight:700;fill:var(--ink)">${i}</text></g></g>`;
      if (i === LAB) {
        svg += `<ellipse id="curso-halo" class="halo" filter="url(#bloom)" cx="${P(lx + 14, 30, lz + 10)[0]}" cy="${P(lx + 14, 30, lz + 10)[1]}" rx="30" ry="22"/>`;
        svg += `<g id="curso-lab">${box(lx, 12, lz, 28, 32, 16, 2)}`;
        svg += `<g transform="${FRONT(lx, 44, lz + 16)}"><rect id="curso-scr" class="glass" x="3" y="2" width="22" height="10" rx="1.5"/>`;
        svg += `<g id="curso-lines" class="scr" style="opacity:0"><rect x="5" y="4" width="14" height="1.6"/><rect x="5" y="7" width="9" height="1.6"/><rect x="16" y="7" width="6" height="1.6"/></g></g>`;
        svg += `<g transform="${TOP(lx, 12, lz + 16)}"><rect class="detail" x="3" y="3" width="22" height="26" rx="1.5"/></g></g>`;
      }
    }
    // marcador: peón pequeño, se coloca por JS
    svg += `<g id="curso-pawn" style="pointer-events:none"><ellipse cx="0" cy="0" rx="8" ry="3.5" class="face"/>`
      + `<path d="M-6 0 L-3 -17 L3 -17 L6 0 Z" style="fill:var(--accent);stroke:var(--accent-hi)" vector-effect="non-scaling-stroke" filter="url(#soft)"/>`
      + `<circle cx="0" cy="-22" r="5.5" style="fill:var(--accent-hi);stroke:var(--accent)" vector-effect="non-scaling-stroke" filter="url(#soft)"/></g>`;
    const lab = P(lx + 14, 28, lz + 16);
    svg += `<path class="detail" d="M${lab[0] + 4} ${lab[1] - 6} L${lab[0] + 46} ${lab[1] - 52}" vector-effect="non-scaling-stroke"/>`;
    svg += `<text class="label" x="${lab[0] + 50}" y="${lab[1] - 56}" style="font-size:14px;font-weight:700;fill:var(--ink-hi)">${EN ? 'Vigía lab' : 'laboratorio Vigía'}</text>`;
    stage.setAttribute('viewBox', K.viewBox); stage.innerHTML = svg;

    const $ = id => stage.querySelector('#curso-' + id);
    const st = { m: 0, pos: 0, auto: false, last: 0 };
    const pawn = $('pawn');
    const place = () => {
      const a = Math.floor(st.pos), b = Math.min(N - 1, a + 1), f = st.pos - a;
      const i = a + (b - a) * f;
      const x = x0(a) + (x0(b) - x0(a)) * f + DX / 2;
      const z = topZ(a) + (topZ(b) - topZ(a)) * f + Math.sin(f * Math.PI) * 14;
      const p = P(x, W * 0.45, z);
      pawn.setAttribute('transform', `translate(${p[0]} ${p[1]})`);
    };
    function render() {
      for (let i = 0; i < N; i++) {
        const on = i <= st.m, cur = i === st.m;
        $('t' + i).classList.toggle('hot', on);
        $('b' + i).classList.toggle('hot', on);
        $('n' + i).style.fill = on ? 'var(--ink-hi)' : 'var(--ink)';
        $('s' + i).classList.toggle('lit', cur);
      }
      const lab = st.m === LAB;
      $('scr').classList.toggle('hot', lab);
      $('halo').classList.toggle('hot', lab);
      $('lines').style.opacity = lab ? 1 : 0;
      api.power(lab);
      api.readout(`${EN ? 'module' : 'módulo'} ${st.m} · ${CURSO_NAMES[st.m]}`);
    }
    const go = n => { st.m = Math.max(0, Math.min(N - 1, n)); render(); };
    const stopAuto = () => { st.auto = false; };
    const next = () => go(st.m >= N - 1 ? 0 : st.m + 1);
    const back = () => go(st.m - 1);
    for (let i = 0; i < N; i++) $('s' + i).addEventListener('click', () => { stopAuto(); go(i); });
    stage.addEventListener('pointerdown', stopAuto);
    // movimiento suave del peón hacia el módulo actual
    api.loop(t => {
      const dt = Math.min(0.05, (t - (st.last || t)) / 1000); st.last = t;
      const d = st.m - st.pos;
      if (st.m === 0 && st.pos > 1.5) st.pos += (0 - st.pos) * Math.min(1, dt * 8);
      else st.pos += Math.sign(d) * Math.min(Math.abs(d), dt * 3.2);
      place();
    });
    render(); place();
    return {
      key(e) {
        const k = e.key; stopAuto();
        if (k === ' ' || k === 'ArrowRight' || k === 'Enter') { next(); return true; }
        if (k === 'ArrowLeft') { back(); return true; }
        if (k === 'r' || k === 'R') { go(0); return true; }
        return false;
      },
      demo() {
        st.auto = true; go(0);
        api.every(1300, () => {
          if (!st.auto) return;
          if (st.m >= N - 1) { go(0); return; }
          go(st.m + 1);
        });
      },
    };
  },
});
