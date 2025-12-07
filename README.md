# Malayalam letter flash cards

A tiny React + Vite experience that turns the poster you shared into an interactive set of flash cards. Each card shows the Malayalam glyph, transliteration, the matching word from the chart (അമ്മ, ആന, …), a short English meaning, and the visual cue (“pink lotus”, “temple bells”, “chenda drum”…).

## Data source

`docs/poster-notes.md` lists every mapping I transcribed from the poster. The deck that powers the UI lives in `src/data/cards.ts`. Each card object contains:

- `letter`: Malayalam glyph
- `word` / `wordTransliteration`: the Malayalam word under the picture and its Latin helper
- `meaning` + `hint`: English description so a parent/older sibling knows what to say
- `type`: `vowel` or `consonant` so the filter buttons work

If you want to tweak spellings or swap an image description, edit the object in `cards.ts` and the UI will instantly reflect it.

## Running locally

```bash
npm install
npm run dev
```

Open the shown URL (usually <http://localhost:5173>) to see the flash cards. `npm run build` produces the production bundle inside `dist/`.

## Deploying to GitHub Pages

1. Create a GitHub repository (for example `murali/malayalam`) and push this project there.
2. In the repo settings → **Pages**, set the source to “GitHub Actions”.  
3. Every push to the default branch triggers `.github/workflows/deploy.yml`, which:
   - runs `npm ci && npm run build`
   - uploads the `dist/` folder as a Pages artifact
   - publishes it to the `github-pages` environment automatically.

The Vite config reads `GITHUB_REPOSITORY` during the workflow so assets are served from `https://<user>.github.io/<repo>/`. If you later move to a custom domain, set `VITE_BASE=/` (or another path) before building to override the default.

## Features

- Filter between all letters, only vowels, or only consonants
- Shuffle/reset deck order while keeping the poster mappings intact
- Auto-play toggle (advances every 4.5 s) for hands-free practice
- Quick jump grid so a kid can tap a favourite glyph
- Optional speech synthesis button (desktop Chrome/Safari) that reads the letter, word, and meaning out loud

## Customising further

- Change colours/spacing inside `src/App.css`
- Update fonts by editing `src/index.css`
- Replace card data or add more than the poster offers in `src/data/cards.ts`

Have fun practising! Let me know if you want audio files or to attach real cropped photos from the poster later.
