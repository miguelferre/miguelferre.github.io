const EN = new URLSearchParams(location.search).get('lang') === 'en';
FIGS.push({
  id: 'climatch',
  name: EN ? 'Climate match' : 'Clima que encaja',
  hint: EN ? 'Space toggles today / 2050 · 1 2 3 pick the climate you want' : 'Espacio alterna hoy / 2050 · 1 2 3 eligen el clima que quieres',
  aria: EN
    ? 'Isometric figure: three small cities, each with a temperature column and an uncertainty band. A switch moves from today to 2050, the columns rise, the bands widen and the match beacon moves to another city. Space toggles, keys 1 to 3 pick the preferred climate, click the switch to toggle.'
    : 'Figura isométrica: tres ciudades pequeñas, cada una con una columna de temperatura y una banda de incertidumbre. Un interruptor pasa de hoy a 2050, las columnas suben, las bandas se ensanchan y la baliza de coincidencia salta a otra ciudad. Espacio alterna, las teclas 1 a 3 eligen el clima preferido, clic en el interruptor alterna.',
  mount(stage, api) {
    const K = api.iso.frame([[0,0,0],[310,0,0],[0,160,0],[310,160,0],[0,0,104]]);
    const { P, D, TOP, FRONT, box } = K;
    const L = EN ? { now: 'TODAY', fut: '2050', match: 'match' } : { now: 'HOY', fut: '2050', match: 'match' };
    const NAMES = ['A', 'B', 'C'];
    const TODAY = [0.30, 0.52, 0.78];
    const FUT = [0.58, 0.72, 0.95];
    const UNC = [0.05, 0.15];
    const H = 76, ZB = 10;
    const X0 = [18, 118, 218];
    const TARGET = [0.30, 0.52, 0.78];

    const items = [];
    items.push({ s: -1, svg: box(0,0,0, 310,160,8, 12) + `<g transform="${TOP(0,0,8)}"><rect class="detail" x="6" y="6" width="298" height="148" rx="8"/></g>` });
    const wins = [[], [], []];
    let wid = 0;
    X0.forEach((x0, i) => {
      const blocks = [[x0, 50, 24, 30, 30], [x0 + 32, 50, 26, 26, 44], [x0 + 8, 86, 30, 24, 22]];
      blocks.forEach(([x, y, w, d, h]) => {
        let s = box(x, y, 8, w, d, h, 3);
        let g = `<g transform="${FRONT(x, y + d, 8 + h)}">`;
        for (let c = 0; c < Math.floor((w - 6) / 8); c++) for (let r = 0; r < Math.floor((h - 6) / 10); r++) {
          const id = `climatch-w${wid++}`; wins[i].push(id);
          g += `<rect id="${id}" class="led" x="${5 + c * 8}" y="${5 + r * 10}" width="4" height="5"/>`;
        }
        items.push({ s: x + y, svg: s + g + '</g>' });
      });
      const tx = x0 + 66, ty = 56;
      items.push({ s: tx + ty, svg:
        box(tx, ty, 8, 14, 14, 84, 3) +
        `<g transform="${FRONT(tx + 2, ty + 14, ZB + H)}"><rect class="face recess" x="0" y="0" width="10" height="${H}" rx="2"/></g>` +
        `<g id="climatch-band${i}" ><rect id="climatch-bandr${i}" fill="var(--accent-hi)" fill-opacity=".45" stroke="var(--accent)" stroke-width="1" vector-effect="non-scaling-stroke" x="0" y="0" width="10" height="10"/></g>` +
        `<g id="climatch-bar${i}"><rect id="climatch-barr${i}" class="led hot" filter="url(#soft)" x="0" y="0" width="10" height="10"/></g>` +
        `<g id="climatch-tick${i}"><rect fill="var(--ink-hi)" x="0" y="0" width="14" height="1.6"/></g>` });
      items.push({ s: x0 + 117, svg: `<g transform="${TOP(x0 + 12, 114, 8)}"><text class="label" id="climatch-lab${i}" x="0" y="11" font-size="13" font-weight="700">${NAMES[i]}</text></g>` });
    });
    // interruptor
    const SW = 100, KX = 100;
    items.push({ s: 400, svg:
      `<g id="climatch-switch" style="cursor:pointer"><g transform="${TOP(KX, 138, 8)}"><rect class="face recess" x="-4" y="-2" width="${SW + 20}" height="18" rx="9"/></g>` +
      `<g id="climatch-knobg" class="press">${box(KX, 140, 8, 18, 14, 12, 4)}</g>` +
      `<g transform="${TOP(KX - 4, 140, 8)}"><rect x="-4" y="-4" width="${SW + 24}" height="22" fill="transparent"/></g></g>` +
      `<g transform="${TOP(40, 138, 8)}"><text class="label" id="climatch-lnow" x="0" y="11" font-size="12" font-weight="700">${L.now}</text></g>` +
      `<g transform="${TOP(228, 138, 8)}"><text class="label" id="climatch-lfut" x="0" y="11" font-size="12" font-weight="700">${L.fut}</text></g>` });
    // balizas (encima de todo)
    X0.forEach((x0, i) => items.push({ s: 900 + i, svg:
      `<g id="climatch-bc${i}" opacity="0"><path id="climatch-beam${i}" class="wire hot" stroke-dasharray="3 3"/>` +
      `<g id="climatch-ringg${i}"><circle class="halo hot" filter="url(#bloom)" cx="0" cy="0" r="17"/><circle class="wire hot" fill="none" cx="0" cy="0" r="15" stroke-width="5"/></g></g>` }));
    items.sort((a, b) => a.s - b.s);
    stage.setAttribute('viewBox', K.viewBox);
    stage.innerHTML = items.map(o => o.svg).join('');

    const $ = id => stage.querySelector('#' + id);
    const st = { era: 0, pref: 1, cur: [...TODAY], unc: UNC[0], op: [0, 0, 0], match: -1, auto: true };
    const target = () => (st.era ? FUT : TODAY);
    const matchOf = () => { const t = target(); let b = 0; t.forEach((v, i) => { if (Math.abs(v - TARGET[st.pref]) < Math.abs(t[b] - TARGET[st.pref])) b = i; }); return b; };
    const sw = $('climatch-switch');

    function readout() { api.readout(`${st.era ? '2050' : (EN ? 'today' : 'hoy')} · ${L.match}: ${NAMES[st.match]}`); }
    function discrete() {
      st.match = matchOf();
      wins.forEach((ids, i) => ids.forEach(id => $(id).classList.toggle('hot', i === st.match)));
      X0.forEach((x0, i) => { $(`climatch-tick${i}`).setAttribute('transform', FRONT(x0 + 66, 70, ZB + TARGET[st.pref] * H + 0.8)); });
      $('climatch-lnow').style.fill = st.era ? '' : 'var(--accent)';
      $('climatch-lfut').style.fill = st.era ? 'var(--accent)' : '';
      NAMES.forEach((_, i) => { $(`climatch-lab${i}`).style.fill = i === st.match ? 'var(--accent)' : ''; });
      $('climatch-knobg').classList.toggle('latched', !!st.era);
      api.power(true);
      readout();
    }
    function frame(dt, t) {
      const k = 1 - Math.pow(0.0015, dt / 1000);
      const tg = target();
      const tu = UNC[st.era];
      for (let i = 0; i < 3; i++) {
        st.cur[i] += (tg[i] - st.cur[i]) * k;
        const h = Math.max(1, st.cur[i] * H), u = st.unc;
        $(`climatch-barr${i}`).setAttribute('height', h);
        $(`climatch-bar${i}`).setAttribute('transform', FRONT(X0[i] + 68, 70, ZB + h));
        $(`climatch-bar${i}`).style.opacity = i === st.match ? 1 : 0.55;
        const top = Math.min(1, st.cur[i] + u) * H, bot = Math.max(0, st.cur[i] - u) * H;
        $(`climatch-bandr${i}`).setAttribute('height', Math.max(2, top - bot));
        $(`climatch-band${i}`).setAttribute('transform', FRONT(X0[i] + 67, 70.5, ZB + top));
        $(`climatch-bandr${i}`).setAttribute('width', 12);
        st.op[i] += ((i === st.match ? 1 : 0) - st.op[i]) * k;
        const bc = $(`climatch-bc${i}`), z = 64 + 3 * Math.sin(t / 380 + i);
        bc.setAttribute('opacity', st.op[i].toFixed(3));
        $(`climatch-ringg${i}`).setAttribute('transform', TOP(X0[i] + 28, 66, z));
        const a = P(X0[i] + 28, 66, z), b = P(X0[i] + 28, 66, z - 14);
        $(`climatch-beam${i}`).setAttribute('d', `M${a[0]} ${a[1]}L${b[0]} ${b[1]}`);
      }
      st.unc += (tu - st.unc) * k;
      const dx = (st.era ? 1 : 0), cx = (st.kx ??= 0);
      st.kx += (dx - cx) * k;
      $('climatch-knobg').setAttribute('transform', `translate(${D(st.kx * (SW - 18), 0, 0).join(' ')})`);
    }
    // bucle de animacion
    let last = 0;
    api.loop(ts => { frame(last ? Math.min(60, ts - last) : 16, ts); last = ts; });

    const setEra = e => { st.era = e; discrete(); };
    const toggle = () => setEra(st.era ? 0 : 1);
    const human = () => { st.auto = false; };
    stage.addEventListener('pointerdown', human);
    sw.addEventListener('click', () => { human(); toggle(); });
    discrete();
    frame(16, 0);
    st.op[st.match] = 1;

    return {
      key(e) {
        if (e.key === ' ' || e.key === 'Enter') { human(); toggle(); return true; }
        if (e.key >= '1' && e.key <= '3') { human(); st.pref = +e.key - 1; discrete(); return true; }
        return false;
      },
      demo() { api.every(3600, () => { if (st.auto) toggle(); }); },
    };
  },
});
