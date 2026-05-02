# Handoff: Attend — Interactive Attention Textbook

## Overview

**Attend** is a production-grade interactive textbook teaching the attention mechanism from Vaswani et al. (2017) "Attention Is All You Need". It progresses from a single dot product through to the full Transformer block, with live, interactive math figures on every page.

This handoff is for taking the prototype to production: pushing to GitHub, deploying to Vercel, and continuing development locally with Claude Code.

## About the design files

The files in this bundle are a **fully working prototype** built in HTML/CSS/vanilla JS plus a typed TypeScript math core with Vitest tests. Unlike most handoffs, this is not just a design reference — the math module (`src/math/`) is production-ready and the HTML pages are the actual deliverable. Your job is to:

1. Get the project pushed to GitHub
2. Deploy to Vercel
3. Optionally migrate the inline `<script>` blocks in chapter HTMLs to import the typed `src/math/` module via Vite

## Fidelity

**Hi-fi.** Final colors, typography, spacing, and interactions. Pixel-perfect.

## Tech stack

- **Vite 5** + **TypeScript 5.4** (strict mode)
- **React 18.3** (only used for `KaTeXSpan`, `Sidenote`, `Search` components — chapter pages are vanilla JS for performance)
- **KaTeX** for typeset equations
- **Vitest** for unit tests (40+ tests passing)
- **ESLint + Prettier + EditorConfig** + husky pre-commit
- **GitHub Actions CI** (lint → typecheck → test → build)
- **Vercel** for hosting (config in `vercel.json`)

## Step-by-step deployment with Claude Code

Open Claude Code in the project root and run these prompts in order:

### 1. Initialize git and push to GitHub

```
Initialize git in this folder, set the remote to
https://github.com/rafilovestosuffer/Attention-is-all-my-need.git,
add all files, commit with message "feat: production-grade Attend
interactive attention textbook", and force-push to main.
```

### 2. Install dependencies and verify everything works

```
Run npm install. Then run npm run typecheck, npm test, and npm run build.
Fix any errors that come up. Report back when all three pass.
```

### 3. Deploy to Vercel

```
Install the Vercel CLI globally if not present. Run `vercel login` —
prompt me for the email. Then run `vercel --prod` from this folder
to deploy. Report back the live URL.
```

### 4. Set up auto-deploy on every push

```
Connect this repo to Vercel for automatic deployments. Use the Vercel
dashboard link or the CLI's `vercel link` then `vercel git connect`.
```

## Project structure

```
attend/
├── index.html                    ← Chapter home page
├── src/
│   ├── math/                     ← Typed math core (production)
│   │   ├── types.ts
│   │   ├── linalg.ts             ← matmul, transpose, dot, norm, fmt
│   │   ├── probability.ts        ← softmax, entropy, randn
│   │   ├── attention.ts          ← scaledDotProductAttention, multiHeadAttention
│   │   ├── positional.ts         ← peEntry, positionalEncoding
│   │   ├── index.ts
│   │   └── *.test.ts             ← 40+ Vitest tests
│   ├── components/               ← React components
│   │   ├── KaTeXSpan.tsx
│   │   ├── Sidenote.tsx
│   │   ├── Search.tsx
│   │   ├── KeyboardNav.ts
│   │   ├── DarkMode.ts
│   │   └── Progress.ts
│   └── styles/
│       ├── dark.css
│       └── a11y.css
├── ui_kits/reader/
│   ├── chapter.css
│   ├── shell.js                  ← sidebar/topbar/footer renderer
│   ├── ch0-prerequisites.html
│   ├── ch1-dot-product.html
│   ├── ch2-softmax.html
│   ├── ch3-scale.html
│   ├── index.html                ← §4.3 flagship: type-your-own-sentence
│   ├── ch4-multihead.html
│   ├── ch5-positional.html
│   └── ch6-transformer.html
├── colors_and_type.css           ← design tokens
├── assets/brand/                 ← logomark, wordmark, softmax curve
├── preview/                      ← 24 design-system cards
├── vite.config.ts
├── tsconfig.json
├── package.json
├── vercel.json
└── .github/workflows/ci.yml
```

## Design tokens (already in `colors_and_type.css`)

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `--paper` | `#FAF7F1` | `#1A1C22` | page background |
| `--ink` | `#1A1F2B` | `#EDE8DC` | primary text |
| `--query` | `#C2410C` | `#E8601A` | Q vectors, accents |
| `--key` | `#0F766E` | `#15A88F` | K vectors |
| `--value` | `#7C3AED` | `#9B6FCC` | V vectors |
| `--heat-0…5` | warm gradient | amber gradient | attention heatmaps |

Typography: **Fraunces** (display, italic for hero), **Inter** (sans), **JetBrains Mono** (code/math).

## Future work for Claude Code

After the deploy works:

1. **Migrate chapter inline JS to use `src/math/`** — currently each chapter HTML duplicates `matmul`, `softmax`, etc. Refactor to `import { scaledDotProductAttention } from '@attend/math'` via Vite.
2. **Real attention head visualizer** — load tiny pretrained weights as JSON, attend over user-typed sentences with real learned Q/K/V projections.
3. **Search + Cmd+K** wiring — the `Search.tsx` component exists but isn't mounted yet.
4. **OG images per chapter** — auto-generate via Satori.
5. **Pagefind** for full-text search across chapter prose.

## Reference paper

Vaswani et al. (2017). *Attention Is All You Need*. NeurIPS 30.
https://arxiv.org/abs/1706.03762

## License

MIT — see LICENSE.
