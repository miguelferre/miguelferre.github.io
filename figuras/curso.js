const EN = new URLSearchParams(location.search).get('lang') === 'en';
// 13 módulos agrupados en 8 edificios: [rótulo, módulos, alto, columna, fila]
const CURSO_B = EN
  ? [['Foundations', '0', 64, 0, 0], ['Risks', '1', 70, 1, 0], ['Engineering', '2-4', 76, 2, 0], ['Monitoring', '5-6', 84, 3, 0],
     ['Alignment', '7', 50, 3, 1], ['Ethics', '8-9', 52, 2, 1], ['Governance', '10', 56, 1, 1], ['Wrap-up', '11-12', 48, 0, 1]]
  : [['Fundamentos', '0', 64, 0, 0], ['Riesgos', '1', 70, 1, 0], ['Ingeniería', '2-4', 76, 2, 0], ['Monitorización', '5-6', 84, 3, 0],
     ['Alineamiento', '7', 50, 3, 1], ['Ética', '8-9', 52, 2, 1], ['Gobernanza', '10', 56, 1, 1], ['Cierre', '11-12', 48, 0, 1]];
const CURSO_FOOT = EN ? '13 modules · 57 lessons · 40 h' : '13 módulos · 57 lecciones · 40 h';

FIGS.push({
  id: 'curso',
  name: EN ? 'AI safety course campus' : 'Campus del curso de seguridad de la IA',
  hint: EN ? 'Click a building · space next · r restart' : 'Clic en un edificio · espacio avanza · r reinicia',
  aria: EN
    ? 'Isometric campus with eight buildings, one per group of course modules. A marker walks the roads and visits each building; visited buildings light their windows. The Monitoring building is the lab and its screen glows when the marker arrives. Click a building to jump to it, space advances, r restarts.'
    : 'Campus isométrico con ocho edificios, uno por grupo de módulos del curso. Un marcador recorre los caminos y visita cada edificio; los visitados encienden las ventanas. El edificio de Monitorización es el laboratorio y su pantalla brilla cuando llega el marcador. Clic en un edificio salta a él, espacio avanza, r reinicia.',
  mount(stage, api) {
    const CW = 102, BW = 82, BD = 50, YB = 0, YF = 92;   // columnas, anchos y filas
    const RA = YB + BD, RAW = 42, RB = YF + BD, RBW = 34;                    // caminos A (entre filas) y B (delante)
    const K = api.iso.frame([[-14, -10, 0], [4 * CW + 14, -10, 0], [-14, 196, 0], [4 * CW + 14, 196, 0], [0, 0, 100]]);
    const { P, TOP, FRONT, SIDE, box } = K;
    const bx = b => b[3] * CW, by = b => (b[4] ? YF : YB);
    let svg = box(-14, -10, -6, 4 * CW + 28, 206, 6, 10);
    svg += `<g transform="${TOP(-14, -10, 0)}"><rect class="detail" x="6" y="6" width="${4 * CW + 16}" height="194" rx="8"/></g>`;
    // caminos
    const road = (x, y, w, h) => `<g transform="${TOP(x, y, 0)}"><rect class="face recess" x="0" y="0" width="${w}" height="${h}" rx="2"/></g>`;
    svg += road(-12, RA + 2, 4 * CW + 12, RAW - 4) + road(-12, RB + 2, 4 * CW + 12, RBW - 4) + road(4 * CW - 16, RA + 2, 26, RB - RA);
    for (let x = -4; x < 4 * CW; x += 22) svg += `<g transform="${TOP(x, RA + RAW / 2 - 0.5, 0)}"><rect class="detail" width="10" height="1"/></g><g transform="${TOP(x, RB + RBW / 2 - 0.5, 0)}"><rect class="detail" width="10" height="1"/></g>`;
    // edificios, de atrás hacia delante
    const order = CURSO_B.map((b, i) => i).sort((a, b) => (bx(CURSO_B[a]) + by(CURSO_B[a])) - (bx(CURSO_B[b]) + by(CURSO_B[b])));
    for (const i of order) {
      const b = CURSO_B[i], x = bx(b), y = by(b), h = b[2], lab = i === 3;
      const wins = (plane, cols, cw, gx, w0) => {
        let s = '';
        for (let v = 24; v + 8 <= h - 6; v += 14) for (let c = 0; c < cols; c++)
          s += `<rect data-b="${i}" class="glass" x="${gx + c * cw}" y="${v}" width="${w0}" height="8" rx="1"/>`;
        return `<g transform="${plane}">${s}</g>`;
      };
      svg += `<g class="press" id="curso-g${i}" style="cursor:pointer">${box(x, y, 0, BW, BD, h, 3)}`;
      svg += `<g transform="${TOP(x - 3, y - 3, h)}"><rect class="face top" width="${BW + 6}" height="${BD + 6}" rx="3"/><rect class="detail" x="8" y="8" width="${BW - 10}" height="${BD - 10}" rx="2"/></g>`;
      svg += `<g transform="${FRONT(x, y + BD, h)}"><rect class="detail" x="0" y="${h - 8}" width="${BW}" height="1"/>`
        + `<text id="curso-l${i}" class="label" x="${BW / 2}" y="13" text-anchor="middle" style="font-size:9px;font-weight:700;fill:var(--ink-hi)">${b[0]}</text>`
        + `<text class="label" x="${BW / 2}" y="${h - 11}" text-anchor="middle" style="font-size:8px;fill:var(--ink)">${EN ? 'mod.' : 'mód.'} ${b[1]}</text></g>`;
      svg += lab
        ? `<g transform="${FRONT(x, y + BD, h)}"><rect data-b="${i}" id="curso-scr" class="glass" x="8" y="22" width="${BW - 16}" height="${h - 44}" rx="3"/>`
          + `<g id="curso-lines" class="scr" style="opacity:0"><rect x="14" y="30" width="38" height="3"/><rect x="14" y="38" width="26" height="3"/><rect x="44" y="38" width="20" height="3"/><rect x="14" y="46" width="50" height="3"/></g></g>`
        : wins(FRONT(x, y + BD, h), 5, 15, 5, 11);
      svg += wins(SIDE(x + BW, y + BD, h), 3, 15, 5, 11) + `</g>`;
      if (lab) svg += `<ellipse id="curso-halo" class="halo" filter="url(#bloom)" cx="${P(x + 40, y + BD, 40)[0]}" cy="${P(x + 40, y + BD, 40)[1]}" rx="46" ry="34" style="pointer-events:none"/>`;
    }
    svg += `<g transform="${TOP(0, 178, 0)}"><text class="label" x="0" y="12" style="font-size:12px;font-weight:700;fill:var(--ink-hi)">${CURSO_FOOT}</text></g>`;
    // recorrido del peón: puertas de la fila de atrás por el camino A, vuelta por el este y fila de delante por el camino B
    const yA = RA + RAW / 2, yB = RB + RBW / 2, ex = 4 * CW - 4;
    const WP = [];
    for (let c = 0; c < 4; c++) WP.push([c * CW + BW / 2, yA]);
    WP.push([ex, yA], [ex, yB]);
    for (let c = 3; c >= 0; c--) WP.push([c * CW + BW / 2, yB]);
    const MAP = [0, 1, 2, 3, 6, 7, 8, 9];
    svg += `<g id="curso-pawn" style="pointer-events:none"><ellipse rx="9" ry="3.5" class="face"/>`
      + `<path d="M-7 0 L-3.5 -20 L3.5 -20 L7 0 Z" style="fill:var(--accent);stroke:var(--accent-hi)" vector-effect="non-scaling-stroke" filter="url(#soft)"/>`
      + `<circle cy="-26" r="6.5" style="fill:var(--accent-hi);stroke:var(--accent)" vector-effect="non-scaling-stroke" filter="url(#soft)"/></g>`;
    stage.setAttribute('viewBox', K.viewBox); stage.innerHTML = svg;

    const $ = id => stage.querySelector('#curso-' + id);
    const st = { m: 0, pos: 0, auto: false, last: 0 };
    const pawn = $('pawn');
    const place = () => {
      const a = Math.min(WP.length - 2, Math.floor(st.pos)), f = st.pos - a;
      const x = WP[a][0] + (WP[a + 1][0] - WP[a][0]) * f, y = WP[a][1] + (WP[a + 1][1] - WP[a][1]) * f;
      const p = P(x, y, 0);
      pawn.setAttribute('transform', `translate(${p[0]} ${p[1]}) scale(1.15)`);
    };
    function render() {
      stage.querySelectorAll('[data-b]').forEach(e => e.classList.toggle('hot', +e.dataset.b <= st.m));
      CURSO_B.forEach((b, i) => $('g' + i).classList.toggle('lit', i === st.m));
      CURSO_B.forEach((b, i) => { $('l' + i).style.fill = i === st.m ? 'var(--panel)' : 'var(--ink-hi)'; });
      const lab = st.m === 3;
      $('halo').classList.toggle('hot', lab);
      $('lines').style.opacity = lab ? 1 : 0;
      api.power(lab);
      api.readout(`${EN ? 'module' : 'módulo'} ${CURSO_B[st.m][1]} · ${CURSO_B[st.m][0].toLowerCase()}`);
    }
    const go = n => { st.m = Math.max(0, Math.min(CURSO_B.length - 1, n)); render(); };
    const stopAuto = () => { st.auto = false; };
    CURSO_B.forEach((b, i) => $('g' + i).addEventListener('click', () => { stopAuto(); go(i); }));
    api.loop(t => {
      const dt = Math.min(0.05, (t - (st.last || t)) / 1000); st.last = t;
      const d = MAP[st.m] - st.pos, sp = d < -4 ? 12 : 3.6;
      st.pos += Math.sign(d) * Math.min(Math.abs(d), dt * sp);
      place();
    });
    render(); place();
    return {
      key(e) {
        const k = e.key; stopAuto();
        if (k === ' ' || k === 'ArrowRight' || k === 'Enter') { go(st.m >= CURSO_B.length - 1 ? 0 : st.m + 1); return true; }
        if (k === 'ArrowLeft') { go(st.m - 1); return true; }
        if (k === 'r' || k === 'R') { go(0); return true; }
        return false;
      },
      demo() {
        st.auto = true; go(0);
        api.every(1700, () => {
          if (!st.auto) return;
          go(st.m >= CURSO_B.length - 1 ? 0 : st.m + 1);
        });
      },
    };
  },
});
