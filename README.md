# Skyline Estates — independent redesign

A standalone international edition of Skyline Estates, based on the owner's existing game. The rules engine, 18 countries, 31 cities, local currencies, tokens, characters, progression and local multiplayer are retained.

## Run

Serve `public/` using any static web server. Open `/skyline-estates/` (the root redirects there). No build or package installation is needed. `npm run check` checks scripts, assets and isolation.

## Implemented

- Navy, ivory and brass interface, responsive landscape/portrait layouts and Daylight theme.
- Individual original illustrations for all 31 cities; compressed WebP assets with lightweight vector recovery if an image fails to load.
- Searchable country/city browser, city passports, the existing 15 awards and Champion rewards.
- Guided player/rule/review setup with a persistent match summary.
- Character gallery, earned frames, token workshop and side-by-side upgrade comparison.
- Focused Daily goals, completion bonus and free spin; leagues and actual online-ranking loading/error states.
- Item detail/preview screens with actual prices and balance calculations.
- Organised Settings, larger text, reduced interface motion and help.
- Interactive 2D board fallback when WebGL cannot initialise; this uses the original game state and rules.
- Grouped portfolio with explicit property selection, build eligibility reasons and cash-impact preview.
- Muted district accents, new civic corner artwork and limestone/glass development models in 3D.

## Isolation

This repository is independent from `p2rmy5ks88-design/a2-guide`. It never pushes to the original repository. Preferences and saved games use `skylineRedesignPrefsV1` and `skylineRedesignSaveV1`, so the original GitHub Pages save is not overwritten even if both projects share the same domain.

The original Firebase configuration is deliberately not copied. Solo and pass-and-play work without it. To activate online rooms and rankings, configure a **separate** Firebase project in `public/eko-estates/firebase-config.js`, using the existing adapter's schema and the supplied `public/skyline-estates/database.rules.json`. Do not paste private service-account keys into browser files.

## GitHub Pages

The included workflow deploys only this repository's `public/` directory. In the new repository choose **Settings → Pages → Source: GitHub Actions**. Existing websites are not changed. A private repository may require a GitHub plan supporting Pages.

## Files

- `public/skyline-estates/index.html`: retained game engine plus isolated startup hook.
- `public/skyline-estates/redesign/redesign.js`: implemented interface, fallback and architectural changes.
- `public/skyline-estates/redesign/redesign.css`: visual system and responsive layouts.
- `public/skyline-estates/redesign/art/`: original city illustrations.
- `public/skyline-estates/lib/` and `riders/`: retained renderer/models and their credits.
- `public/eko-estates/audio/fm/`: the owner's existing Kenstylez tracks.

## Evidence and limits

Design images were concept references, not screenshots of finished functionality. Their illustrative rankings or balances are not seeded into this game. Actual progress starts from this edition's separate save. Browser verification and remaining limitations are recorded in `VALIDATION.md`.

Upstream snapshot: `a2-guide` main tree `7ef6fc04bc720e07c13231fcdff4d9ceef5c7290`, game blob `6c27defdfc14f9e002a0f83645acd2639bfcb326` (24 October 2026). Existing third-party credits are preserved. No new blanket license is asserted over the owner's code, music or bundled assets.

## Revision 2: reference-led visual pass

The newer visual layer is `public/skyline-estates/redesign/visual-v2.js` with its matching stylesheet. It adds country-first navigation, a Frames tab, a Buildings gallery, rotatable model previews including the selected rider, illustrated Home/Shop presentation and paged season rewards. Existing native game meshes are projected into menu canvases, so the previews also work without WebGL. The bus and taxi meshes have more detail and finish colours apply to their bodies. Five architectural styles use planted roofs, balconies, terracotta and limestone; ownership is marked on their bases.

Serve the WebP artwork in `redesign/art/`; high-resolution generated PNG working sources are excluded from new commits. `scripts/prepare-art.py` can regenerate WebP copies when Pillow is available. This is an optional asset-preparation command, not a runtime dependency.

The source still needs final browser/device validation as described in `VALIDATION.md`. The eight-sided 3D outer frame surrounds the retained forty-square circuit. Full high-poly city-centre scenery and high-poly character/token assets from the concept art are not included.
