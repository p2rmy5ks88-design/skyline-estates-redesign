# Validation

## Passed

- `npm run check`: JavaScript compilation, local dependencies, all four city artworks, 18 countries / 31 cities, independent save keys and isolated Firebase configuration.
- Browser: Home; World country filtering (Sweden: five cities); Stockholm passport; Collection Characters and Tokens; Progress Season, Leagues, Awards and Daily; all six Shop categories and item detail; all five Settings categories.
- Guided match setup: Players → Rules → Review → Start.
- 2D gameplay: save/resume, AI turns, dice rolling and movement, property purchase, portfolio eligibility message, mortgage and redemption, Save & exit.
- Correct local property names and currency after fixing city initialisation without WebGL.
- Fixed country-filter flex clipping and profile header clipping.

## Limits

The cloud browser cannot initialise WebGL. The 3D building geometry and board materials are implemented but need visual/device validation on WebGL hardware. Portrait and short-landscape CSS rules are included but have not been device-tested. Online rooms/rankings require a separate Firebase project; no requests are sent to the original game's database. Purchases involving real money, online multiplayer and full-game completion were not tested. The original rules engine and its bundled third-party assets are retained; this redesign is not a legal clearance of the game.

## Revision 2

Implemented the recovered design direction in `visual-v2.js` and `visual-v2.css`: illustrated Home modes and harbour banner, country-first destination browsing, character-and-token model previews with rotation and pose controls, separate Frames and Buildings tabs, larger paged Season rewards, illustrated Daily goals, actual token/dice/surround product previews and an illustrated starter bundle. Architectural tiers now include limestone walls, terracotta details, emerald glass, balconies, rooftop planting and ownership plaques on bases. The 3D outer frame has eight sides with brass inlay; the original forty-square playing circuit and mechanics are retained. The original city-centre scene models remain; they have not been rebuilt to the detail level of the concept images.

Browser observations before the usage limit: Home with new illustrated mode icons and harbour banner; country cards for Nigeria, Sweden, US, UK, France and Germany; Sweden's five cities and Stockholm passport; token and rider models; Buildings gallery; Shop product models and bundle artwork; Season pages 1–4 and 5–8; Daily goals. These screenshots were inspected during development. No browser warnings were reported for model generation in those observations.

Additional automated verification exercises the actual software projection code against native mesh/matrix code, checks finite projected coordinates, different viewing angles, all five architectural tiers and restoration of the gameplay renderer after previews.

Final browser verification was interrupted by automatic approval review reporting a usage limit. The latest Home layout adjustment, WebP asset switch, portfolio illustration, rotation/pose button interactions and Frames interactions have not received a final browser pass. WebGL frame/building integration and portrait/short-landscape layouts remain unverified on hardware. Model previews are software projections of the actual game meshes; they are not the high-poly renders in the early concept images. Product surround previews are material/layout illustrations, not a full rendered board capture.

Automated frame checks also verify that the eight-sided frame preserves unrelated city-scene nodes. CSS block/function delimiters and local stylesheet artwork paths are checked. All eight premium surround previews are exercised against their actual game palettes and feature data. Daylight/larger-text corrections and the added portfolio illustration remain source-verified rather than browser-verified. A later preview-recovery attempt encountered a connection-refused page, then the browser URL policy prevented observing that error page; no alternate browser-control method was used.

Final asset validation: all 31 destination WebP files decode successfully and have distinct content hashes. New city artwork was reviewed in contact sheets. All code/model/frame checks pass. This does not replace the pending browser/device checks above.
