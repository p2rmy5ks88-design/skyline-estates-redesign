from pathlib import Path
import re,json
root=Path(__file__).resolve().parents[1]
p=root/'public/skyline-estates/index.html'
s=p.read_text()
s=s.replace("const SKEY='skylineSave'", "const SKEY='skylineRedesignSaveV1'").replace("const PKEY='skylinePrefs'", "const PKEY='skylineRedesignPrefsV1'")
s=s.replace("const PRIVACY_URL='https://p2rmy5ks88-design.github.io/a2-guide/skyline-estates/privacy.html'", "const PRIVACY_URL='privacy.html'")
old="try{const h=window.claude?.hot;if(h&&h.ready)h.ready(boot);else boot(h?.data??{})}catch(e){boot({})}"
assert old in s
s=s.replace(old,'/* Startup is handled by the standalone redesign layer below. */')
s=s.replace('</head>', '<link rel="stylesheet" href="redesign/redesign.css"></head>',1)
s=s.replace('</body></html>', '<script src="redesign/redesign.js"></script>\n</body></html>')
p.write_text(s)
(root/'public/index.html').write_text('<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url=skyline-estates/"><title>Skyline Estates</title><a href="skyline-estates/">Open Skyline Estates</a></html>')
(root/'public/.nojekyll').touch()
(root/'.openai/hosting.json').write_text(json.dumps({'static':{'directory':'public'}},indent=2))
# A separate experiment must not sweep or write to the original multiplayer database.
(root/'public/eko-estates/firebase-config.js').write_text('/* Standalone redesign: configure a separate Firebase project to enable online play. */\nwindow.SKYLINE_CONFIG = window.SKYLINE_CONFIG || {};\n')
(root/'public/skyline-estates/game.html').unlink(missing_ok=True)
print('Standalone source prepared; saves and online configuration are isolated.')
