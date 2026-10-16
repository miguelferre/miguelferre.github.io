const EN = new URLSearchParams(location.search).get('lang') === 'en';
// 5 edificios del campus, en el orden del curso: [rótulo, módulos]
const CURSO_B = EN
  ? [['Foundations|& risks', '0-1'], ['Safe|engineering', '2-4'], ['Monitoring lab', '5-6'], ['Alignment', '7'], ['Ethics &|governance', '8-12']]
  : [['Fundamentos|y riesgos', '0-1'], ['Ingeniería|segura', '2-4'], ['Monitorización', '5-6'], ['Alineamiento', '7'], ['Ética y|gobernanza', '8-12']];

FIGS.push({
  id: 'curso',
  name: EN ? 'AI safety course campus' : 'Campus del curso de seguridad de la IA',
  hint: EN ? 'Click a building · space next · r restart' : 'Clic en un edificio · espacio avanza · r reinicia',
  aria: EN
    ? 'Isometric university campus: faculty hall, clock tower, monitoring lab, library and great hall around a lawn courtyard. A student walks the paths and visits each building in course order; visited buildings light up. The lab screen glows when the student arrives. Click a building to jump to it, space advances, r restarts.'
    : 'Campus universitario isométrico: facultad, torre del reloj, laboratorio de monitorización, biblioteca y aula magna alrededor de un patio de césped. Un estudiante recorre los caminos y visita cada edificio en el orden del curso; los visitados se encienden. La pantalla del laboratorio brilla cuando llega. Clic en un edificio salta a él, espacio avanza, r reinicia.',
  mount(stage, api) {
    const XL = 90, XR = 280, YT = 72, YB = 190, RW = 16;                     // camino en anillo (ejes centrales)
    // La escena se dibuja en coordenadas (x,y) y se gira 90 grados al mundo: la fachada principal cae en el plano SIDE (abajo a la derecha)
    const WT = 364, W2 = (x, y) => [y, WT - x];
    const K = api.iso.frame([[-8, -8, 0], [206, -8, 0], [-8, 372, 0], [206, 372, 0], [29, 295, 150], [26, 74, 120], [206, 372, -44]]);
    const { P, TOP, FRONT, SIDE } = K, slits = api.iso.slits;
    const nbox = K.box;
    const box = (x, y, z, w, d, h, r) => nbox(y, WT - x - w, z, d, w, h, r);
    const FR = (x, y, z) => SIDE(y, WT - x, z);        // cara principal (y máx)
    const BK = (x, y, z) => FRONT(y, WT - x, z);       // cara x mín, abajo a la izquierda
    const tr = (x, y, z, w, h, cls, rx = 0) => `<g transform="${TOP(y, WT - x - w, z)}"><rect class="${cls}" width="${h}" height="${w}" rx="${rx}"/></g>`;
    const Pw = (x, y, z) => P(y, WT - x, z);
    const road = (x, y, w, h) => tr(x, y, 0, w, h, 'face recess', 1.5);
    let svg = box(-8, -8, -6, 380, 214, 6, 10);
    svg += tr(-4, -4, 0, 372, 206, 'detail', 8);
    // patio de césped y caminos
    svg += `<g transform="${TOP(YT + 8, WT - (XR - 8), 0)}"><rect class="face" width="${YB - YT - 16}" height="${XR - XL - 16}" rx="4"/>${slits(3, YB - YT - 19, 8, 3, XR - XL - 19, true, 'detail')}</g>`;
    svg += road(XL - RW / 2, YT - RW / 2, XR - XL + RW, RW) + road(XL - RW / 2, YB - RW / 2, XR - XL + RW, RW)
      + road(XL - RW / 2, YT - RW / 2, RW, YB - YT + RW) + road(XR - RW / 2, YT - RW / 2, RW, YB - YT + RW)
      + road(177, YT + 8, 12, YB - YT - 16) + road(XL + 8, 125, XR - XL - 16, 12)
      + road(172, YT - RW / 2 - 12, 12, 12) + road(XL - 6, 52, 12, 12) + road(XR - 6, 52, 12, 12)
      + road(XL - 22, 125, 14, 12);
    svg += box(171, 125, 0, 16, 16, 5, 7) + tr(174, 128, 5, 10, 10, 'detail', 5);

    const items = [];      // {key, svg, x0,y0,x1,y1}
    const add = (a0, b0, a1, b1, s) => { const x0 = b0, x1 = b1, y0 = WT - a1, y1 = WT - a0; items.push({ x0, y0, x1, y1, s, key: x0 + x1 + y0 + y1 }); };
    const wins = (plane, b, u0, v0, cols, rows, cw, ch, gx, gy) => {
      let s = '';
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++)
        s += `<rect data-b="${b}" class="glass" x="${u0 + c * gx}" y="${v0 + r * gy}" width="${cw}" height="${ch}" rx="1"/>`;
      return `<g transform="${plane}">${s}</g>`;
    };
    const tree = (x, y) => add(x - 6, y - 6, x + 9, y + 9, box(x, y, 0, 3, 3, 10, 1) + box(x - 6, y - 6, 10, 15, 15, 16, 7));
    [[120, 98], [236, 98], [120, 160], [236, 160]].forEach(t => tree(...t));

    // 0 Facultad: columnas y frontón (x112-236, y0-58)
    {
      const x = 112, y = 0, w = 124, d = 58, h = 46;
      let s = `<g id="curso-g0" style="cursor:pointer">${box(x, y, 0, w, d, h, 2)}`;
      s += wins(FR(x, y + d, h), 0, 6, 8, 2, 2, 11, 9, 14, 17) + wins(FR(x, y + d, h), 0, 87, 8, 2, 2, 11, 9, 14, 17);
      s += wins(BK(x, y, h), 0, 8, 8, 3, 2, 11, 9, 15, 17);
      for (let i = 0; i < 6; i++) s += box(150 + i * 11.5, 58, 0, 5, 5, 36, 1);
      s += box(147, 56, 36, 68 - 8 + 4, 9, 5, 1);
      s += `<g transform="${FR(147, 65, 41)}"><rect data-b="0" class="glass" x="29" y="22" width="12" height="19" rx="6"/></g>`;
      s += `<g transform="${FR(147, 65, 59)}"><path class="face" d="M0 18 L32 0 L64 18 Z"/><path class="detail" d="M6 15 L32 4 L58 15"/></g></g>`;
      add(x, y, x + w, y + d + 9, s);
    }
    // 1 Torre del reloj (x48-90, y8-50)
    {
      const x = 48, y = 8, w = 42, d = 42, h = 104;
      let s = `<g id="curso-g1" style="cursor:pointer">${box(x, y, 0, w, d, h, 2)}`;
      s += box(x + 3, y + 3, h, w - 6, d - 6, 8, 1) + box(x + 11, y + 11, h + 8, w - 22, d - 22, 9, 1) + box(x + 17, y + 17, h + 17, 8, 8, 15, 1);
      s += `<g transform="${FR(x, y + d, h)}"><circle data-b="1" class="glass" cx="${w / 2}" cy="26" r="13"/><path class="detail" d="M${w / 2} 26 L${w / 2} 17 M${w / 2} 26 L${w / 2 + 7} 29"/>`
        + `<rect data-b="1" class="glass" x="${w / 2 - 4}" y="${h - 22}" width="8" height="16" rx="4"/><rect data-b="1" class="glass" x="6" y="52" width="6" height="12" rx="3"/><rect data-b="1" class="glass" x="${w - 12}" y="52" width="6" height="12" rx="3"/></g>`;
      s += `<g transform="${BK(x, y, h)}"><rect data-b="1" class="glass" x="${d / 2 - 3}" y="14" width="6" height="14" rx="3"/><rect data-b="1" class="glass" x="${d / 2 - 3}" y="50" width="6" height="14" rx="3"/></g></g>`;
      add(x, y, x + w, y + d, s);
    }
    // 2 Laboratorio (x296-360, y86-146): pantalla grande
    {
      const x = 296, y = 86, w = 64, d = 60, h = 44;
      let s = `<ellipse id="curso-halo" class="halo" filter="url(#bloom)" cx="${Pw(x + 32, y + d, 26)[0]}" cy="${Pw(x + 32, y + d, 26)[1]}" rx="34" ry="22" style="pointer-events:none"/>`;
      s += `<g id="curso-g2" style="cursor:pointer">${box(x, y, 0, w, d, h, 2)}`;
      s += box(x + 24, y + 22, h, 8, 8, 16, 1) + box(x + 20, y + 20, h + 16, 16, 12, 2, 1);
      s += `<g transform="${FR(x, y + d, h)}"><rect id="curso-scr" data-b="2" class="glass" x="5" y="5" width="${w - 10}" height="26" rx="2"/>`
        + `<g id="curso-lines" class="scr" style="opacity:0"><rect x="10" y="10" width="34" height="3"/><rect x="10" y="17" width="22" height="3"/><rect x="36" y="17" width="14" height="3"/><rect x="10" y="24" width="44" height="3"/></g>`
        + `<rect data-b="2" class="glass" x="${w / 2 - 5}" y="${h - 10}" width="10" height="10" rx="1"/></g>`;
      s += wins(BK(x, y, h), 2, 9, 8, 3, 2, 11, 10, 17, 18) + `</g>`;
      add(x, y, x + w, y + d, s);
    }
    // 3 Biblioteca (x14-76, y96-166): ventanales en la cara que da al patio
    {
      const x = 14, y = 96, w = 62, d = 70, h = 36;
      let s = `<g id="curso-g3" style="cursor:pointer">${box(x, y, 0, w, d, h, 2)}${box(x + 8, y + 10, h, w - 16, d - 20, 6, 1)}`;
      s += wins(BK(x, y, h), 3, 7, 7, 4, 1, 10, 20, 16, 0) + wins(FR(x, y + d, h), 3, 7, 7, 3, 1, 10, 20, 17, 0);
      s += `<g transform="${BK(x, y, h)}"><rect data-b="3" class="glass" x="${d / 2 - 6}" y="${h - 12}" width="12" height="12" rx="1"/></g></g>`;
      add(x, y, x + w, y + d, s);
    }
    // 4 Aula magna (x240-340, y0-52): cúpula y entrada
    {
      const x = 240, y = 0, w = 100, d = 52, h = 34;
      let s = `<g id="curso-g4" style="cursor:pointer">${box(x, y, 0, w, d, h, 2)}${box(x + 28, y + 8, h, 44, 36, 8, 7)}${box(x + 36, y + 14, h + 8, 28, 24, 8, 6)}`;
      s += wins(FR(x, y + d, h), 4, 8, 8, 2, 1, 11, 18, 15, 0) + wins(FR(x, y + d, h), 4, 62, 8, 2, 1, 11, 18, 15, 0);
      s += `<g transform="${FR(x, y + d, h)}"><rect data-b="4" class="glass" x="${w / 2 - 8}" y="10" width="16" height="24" rx="8"/></g>`;
      s += wins(BK(x, y, h), 4, 8, 8, 3, 1, 11, 18, 14, 0) + `</g>`;
      add(x, y, x + w, y + d, s);
    }
    items.sort((a, b) => a.key - b.key);
    items.forEach((it, n) => { svg += `<g id="curso-it${n}">${it.s}</g>`; });

    // peón (estudiante): se coloca entre los edificios según su profundidad, en cada fotograma
    svg += `<g id="curso-pawn" style="pointer-events:none"><ellipse rx="10" ry="4" class="face"/>`
      + `<path d="M-7 0 L-3.5 -19 L3.5 -19 L7 0 Z" style="fill:var(--accent);stroke:var(--accent-hi)" vector-effect="non-scaling-stroke" filter="url(#soft)"/>`
      + `<circle cy="-25" r="6.5" style="fill:var(--accent-hi);stroke:var(--accent)" vector-effect="non-scaling-stroke" filter="url(#soft)"/></g>`;
    // rótulos flotantes (no se inclinan con el plano)
    const TAGS = [[174, 24, 84, 6, -60], [69, 29, 150, 0, -60], [328, 116, 56, 8, -42], [45, 131, 0, -40, 16], [290, 26, 56, 0, -60]];
    TAGS.forEach(([tx, ty, tz, dx, dy], i) => {
      const p = Pw(tx, ty, tz), L = CURSO_B[i][0].split('|'), n = Math.max(...L.map(l => l.length), 8), W = Math.round(n * 7.6 + 18), H = 14 * L.length + 17;
      svg += `<g id="curso-tag${i}" transform="translate(${p[0] + dx - W / 2} ${p[1] + dy})" style="cursor:pointer"><rect class="glass" width="${W}" height="${H}" rx="5"/>`
        + L.map((l, k) => `<text class="label" x="${W / 2}" y="${14 + 14 * k}" text-anchor="middle" style="font-size:12px;font-weight:700;fill:var(--ink-hi)">${l}</text>`).join('')
        + `<text class="label" x="${W / 2}" y="${H - 5}" text-anchor="middle" style="font-size:10px;fill:var(--ink)">${EN ? 'mod.' : 'mód.'} ${CURSO_B[i][1]}</text></g>`;
    });
    const cp = P(206, 372, 0), vb = K.viewBox.split(/[ ,]+/).map(Number);
    svg += `<text class="label" x="${vb[0] + vb[2] / 2}" y="${cp[1] + 30}" text-anchor="middle" style="font-size:18px;font-weight:700;fill:var(--ink-hi)">${EN ? 'AI safety and governance course' : 'Curso de seguridad y gobernanza de la IA'}</text>`;
    stage.setAttribute('viewBox', K.viewBox); stage.innerHTML = svg;

    const $ = id => stage.querySelector('#curso-' + id);
    const pawn = $('pawn');
    // anillo de caminos: perímetro y posición de cada puerta
    const LT = XR - XL, LR = YB - YT, PER = 2 * (LT + LR);
    const ringPt = s => {
      s = ((s % PER) + PER) % PER;
      if (s < LT) return [XL + s, YT];
      if (s < LT + LR) return [XR, YT + s - LT];
      if (s < 2 * LT + LR) return [XR - (s - LT - LR), YB];
      return [XL, YB - (s - 2 * LT - LR)];
    };
    const DOOR = [174 - XL, 0, LT, 2 * LT + LR + (YB - 131), LT - 90 + 0];
    DOOR[1] = 0; DOOR[2] = LT + 88; DOOR[3] = 2 * LT + LR + (YB - 131); DOOR[4] = LT;
    const st = { m: 0, s: DOOR[0], auto: false, last: 0 };
    const place = () => {
      const [xo, yo] = ringPt(st.s), p = Pw(xo, yo, 0), [x, y] = W2(xo, yo);
      pawn.setAttribute('transform', `translate(${p[0]} ${p[1]}) scale(1.2)`);
      // orden de pintado: tras todo lo que queda por detrás, antes de lo que queda delante
      let after = -1;
      items.forEach((it, n) => { if (x > it.x1 || y > it.y1) after = n; });
      const ref = $('it' + (after + 1));
      if (ref) { if (pawn.nextElementSibling !== ref) ref.parentNode.insertBefore(pawn, ref); }
      else if (pawn.nextElementSibling && pawn.nextElementSibling.id.indexOf('curso-tag') !== 0) stage.insertBefore(pawn, $('tag0'));
    };
    function render() {
      stage.querySelectorAll('[data-b]').forEach(e => { e.classList.toggle('hot', +e.dataset.b <= st.m); if (+e.dataset.b === st.m) e.setAttribute('filter', 'url(#soft)'); else e.removeAttribute('filter'); });
      CURSO_B.forEach((b, i) => { $('tag' + i).firstChild.classList.toggle('hot', i <= st.m); });
      const lab = st.m === 2;
      $('halo').classList.toggle('hot', lab);
      $('lines').style.opacity = lab ? 1 : 0;
      api.power(lab);
      api.readout(`${EN ? 'module' : 'módulo'} ${CURSO_B[st.m][1]} · ${CURSO_B[st.m][0].replace('|', ' ').toLowerCase()}`);
    }
    const go = n => { st.m = Math.max(0, Math.min(CURSO_B.length - 1, n)); render(); };
    const stopAuto = () => { st.auto = false; };
    CURSO_B.forEach((b, i) => { const f = () => { stopAuto(); go(i); }; $('g' + i).addEventListener('click', f); $('tag' + i).addEventListener('click', f); });
    api.loop(t => {
      const dt = Math.min(0.05, (t - (st.last || t)) / 1000); st.last = t;
      let d = ((DOOR[st.m] - st.s) % PER + PER) % PER; if (d > PER / 2) d -= PER;   // camino más corto por el anillo
      st.s += Math.sign(d) * Math.min(Math.abs(d), dt * 120);
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
        api.every(3000, () => { if (st.auto) go(st.m >= CURSO_B.length - 1 ? 0 : st.m + 1); });
      },
    };
  },
});
