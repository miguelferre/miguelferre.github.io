"""Monta las figuras iso-glow del portfolio como páginas incrustables.

Uso: python -I scripts/figuras.py [id ...]
Lee figuras/<id>.js (un FIGS.push por fichero) y escribe public/figuras/<id>.html
a partir de la plantilla de la skill iso-glow, en tema claro, sin barra, sin
selector de color y con la demo arrancada. La portada las carga en un iframe:
/figuras/<id>.html?lang=es|en
"""
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
PLANTILLA = Path.home() / ".claude" / "skills" / "iso-glow" / "assets" / "gallery.html"
FUENTES = RAIZ / "figuras"
SALIDA = RAIZ / "public" / "figuras"

# Un solo acento: el violeta tinta del sitio (#614bc1) y su versión para fondo oscuro
PALETA = "[['Tinta', '#9d8cf0', '#c9bfff', '#614bc1', '#7d68d8']]"

# La figura se integra en el crema del sitio: sin marco, sin barra, sin pie
EMBED_CSS = """
  /* --- incrustada en el portfolio --- */
  :root[data-theme="light"] { --bg:#f6f4ef; --panel:#f6f4ef; --edge:#ddd8ce; }
  body { padding:0; background:transparent; overflow:hidden; }
  .wrap { max-width:none; gap:0; }
  /* .wrap > .top es la barra de la plantilla; .face.top son las caras superiores y no se tocan */
  .wrap > .top, #nav, .made-with { display:none !important; }
  .layout { display:block; }
  figure { border:0; border-radius:0; background:transparent; padding:4px 8px 6px; }
  /* Sin pies: ni número de figura, ni pista de teclas, ni readout */
  .cap { display:none !important; }
  figure { padding:0; }
  /* ?compacto: tarjeta de exploración; la figura llena el marco y no lleva pie */
  html.compacto, html.compacto body, html.compacto .wrap, html.compacto .layout, html.compacto figure { height:100%; }
  html.compacto figure { padding:0; display:block; }
  html.compacto .cap { display:none; }
  html.compacto #stageHolder { aspect-ratio:auto; height:100%; }
</style>
<script>if (/compacto/.test(location.search)) document.documentElement.classList.add('compacto');</script>
<style>
"""


def monta(fig: Path) -> Path:
    s = PLANTILLA.read_text(encoding="utf-8")
    nombre = fig.stem
    cambios = [
        ('<html lang="en">', '<html lang="es" data-theme="light">'),
        ("<title>Iso Figures</title>", f"<title>{nombre}</title>"),
        ("palette: 'ember', autoDemo: false", f"palette: {PALETA}, autoDemo: true"),
        ("/* paste figure scripts here (see examples/) */", fig.read_text(encoding="utf-8")),
        ("</style>\n</head>", EMBED_CSS + "</style>\n</head>"),
    ]
    for a, b in cambios:
        assert a in s, f"no encuentro en la plantilla: {a[:50]}"
        s = s.replace(a, b, 1)
    SALIDA.mkdir(parents=True, exist_ok=True)
    destino = SALIDA / f"{nombre}.html"
    destino.write_text(s, encoding="utf-8")
    return destino


def main() -> None:
    ids = sys.argv[1:]
    figs = [FUENTES / f"{i}.js" for i in ids] if ids else sorted(FUENTES.glob("*.js"))
    for fig in figs:
        print("escrito", monta(fig).relative_to(RAIZ))


if __name__ == "__main__":
    main()
