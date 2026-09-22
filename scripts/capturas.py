"""Capturas de los proyectos live para las tarjetas del portfolio.

Uso: python scripts/capturas.py
Escribe public/capturas/<slug>.png a 1280x800 (dispositivo 1x).
Las que no tienen URL live (Praia) no se capturan: la tarjeta usa un marcador.
"""
from pathlib import Path

from playwright.sync_api import sync_playwright

SALIDA = Path(__file__).resolve().parent.parent / "public" / "capturas"
BRAVE = r"C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe"

# slug -> (url, espera extra en ms tras networkidle; mapas y WebAssembly tardan)
OBJETIVOS = {
    "storymap-incendios": ("https://miguelferre.github.io/STORYMAP_INCENDIOS_GALICIA_2025/", 6000),
    "madrid-hli": ("https://miguelferre.github.io/Madrid_HLI/", 20000),
    "climatch": ("https://climatch.app/", 5000),
}


def main() -> None:
    SALIDA.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        # Brave en vez del Chromium de Playwright: ya está instalado y no hay que descargar nada.
        navegador = p.chromium.launch(executable_path=BRAVE)
        for slug, (url, espera) in OBJETIVOS.items():
            pagina = navegador.new_page(viewport={"width": 1280, "height": 800}, device_scale_factor=1)
            try:
                pagina.goto(url, wait_until="networkidle", timeout=90_000)
            except Exception as exc:  # networkidle no llega en mapas con tiles: seguimos igual
                print(f"{slug}: {type(exc).__name__}, capturo lo que haya")
            pagina.wait_for_timeout(espera)
            destino = SALIDA / f"{slug}.png"
            pagina.screenshot(path=str(destino))
            print(f"{slug}: {destino.stat().st_size // 1024} KB")
            pagina.close()
        navegador.close()


if __name__ == "__main__":
    main()
