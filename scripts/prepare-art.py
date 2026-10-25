"""Encode project artwork as WebP; source images remain untouched."""
from pathlib import Path
from PIL import Image
root = Path(__file__).resolve().parents[1] / 'public/skyline-estates/redesign/art'
for source in root.glob('*.png'):
    target = source.with_suffix('.webp')
    if target.exists() and target.stat().st_mtime >= source.stat().st_mtime:
        continue
    with Image.open(source) as image:
        image = image.convert('RGB')
        image.thumbnail((1680, 1050))
        image.save(target, 'WEBP', quality=84, method=6)
    print(target.name, target.stat().st_size)
