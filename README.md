# Attend · The attention mechanism, from scratch

[![CI](https://github.com/rafilovestosuffer/Attention-is-all-my-need/actions/workflows/ci.yml/badge.svg)](https://github.com/rafilovestosuffer/Attention-is-all-my-need/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tests](https://img.shields.io/badge/tests-40%2B%20passing-2F7D4F)](src/math)
[![License: MIT](https://img.shields.io/badge/License-MIT-C2410C.svg)](LICENSE)

> A patient, step-by-step interactive walk through the one idea behind every modern language model — from a single dot product all the way to the full Transformer block, with **live math on every page**.

**[→ Live demo](https://attend.vercel.app)** &nbsp;·&nbsp; [§4.3 Flagship playground](ui_kits/reader/index.html) &nbsp;·&nbsp; [Design system](preview/)

---

## What it is

Most explanations of attention either hand-wave the math or dump you into a wall of equations. Attend does neither. Every claim is:

- **Verified** — 40+ Vitest unit tests confirm every number against the paper
- **Interactive** — sliders, type-your-own sentences, hover-to-inspect heatmaps
- **Honest** — citations link directly to Vaswani et al. §§ so you can check

---

## The chapters

| # | Title | Key interactive |
|---|-------|----------------|
| §0 | Prerequisites | Self-assessment quiz — are you ready? |
| §1 | A vector, a dot product | Drag a key vector, watch the score update |
| §2 | From similarity to attention | Temperature slider on softmax |
| §3.2 | Why we scale by √dₖ | Variance explosion demo, toggle the fix |
| §4.3 | Splitting Q, K, V | **Type any sentence → live attention heatmap** |
| §4.4 | Per-head attention | 8 heads side-by-side, hover to inspect |
| §5 | Positional encodings | Sinusoid heatmap + per-dimension trace |
| §6 | The full Transformer block | Click any wire to see what flows through it |

---

## Architecture

```
attend/
├── index.html                    ← Chapter home page
├── src/
│   ├── math/
│   │   ├── types.ts              ← Vec, Matrix, HeadOutput types
│   │   ├── linalg.ts             ← matmul, transpose, dot, norm, fmt
│   │   ├── probability.ts        ← softmax, entropy, randn
│   │   ├── attention.ts          ← scaledDotProductAttention, multiHeadAttention
│   │   ├── positional.ts         ← peEntry, positionalEncoding
│   │   ├── index.ts              ← re-exports everything
│   │   └── *.test.ts             ← 40+ Vitest tests (one per module)
│   ├── components/
│   │   ├── KaTeXSpan.tsx         ← inline/block KaTeX renderer
│   │   ├── Sidenote.tsx          ← hover citation popover
│   │   ├── Search.tsx            ← Cmd+K fuzzy search overlay
│   │   ├── KeyboardNav.ts        ← j/k chapter nav, ? cheatsheet
│   │   ├── DarkMode.ts           ← dark/light toggle + localStorage
│   │   └── Progress.ts           ← per-chapter visited tracking
│   └── styles/
│       ├── dark.css              ← dark mode token overrides
│       └── a11y.css              ← focus rings, skip link, reduced-motion
├── ui_kits/reader/
│   ├── chapter.css               ← shared reader shell styles
│   ├── shell.js                  ← sidebar, topbar, footer nav renderer
│   ├── ch0-prerequisites.html    ← §0 self-assessment + quizzes
│   ├── ch1-dot-product.html      ← §1 interactive vector diagram
│   ├── ch2-softmax.html          ← §2 temperature playground
│   ├── ch3-scale.html            ← §3.2 variance demo
│   ├── index.html                ← §4.3 flagship (type-your-sentence)
│   ├── ch4-multihead.html        ← §4.4 8-head grid
│   ├── ch5-positional.html       ← §5 sinusoid heatmap
│   └── ch6-transformer.html      ← §6 clickable block diagram
├── colors_and_type.css           ← design tokens (paper, ink, Q/K/V, heat)
├── assets/brand/                 ← logomark, wordmark, softmax curve SVGs
├── preview/                      ← 24 design-system cards
├── vite.config.ts
├── tsconfig.json
├── package.json
└── .github/workflows/ci.yml      ← lint → typecheck → test → build
```

---

## Run locally

```bash
git clone https://github.com/rafilovestosuffer/Attention-is-all-my-need.git
cd Attention-is-all-my-need
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

```bash
npm test          # run all 40+ unit tests
npm run build     # production build → dist/
npm run typecheck # TypeScript check
npm run lint      # ESLint
```

---

## Contributing

Found a mistake in the math? Want to add a chapter?

1. Fork the repo and create a branch: `git checkout -b feat/your-chapter`
2. Write your chapter page using the template in `ui_kits/reader/chapter.css` + `shell.js`
3. Add any new math to `src/math/` with a corresponding `.test.ts`
4. Run `npm test` — all tests must pass
5. Open a PR with a clear description of what you changed and why

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide.

---

## Reference

This project is built on:

> Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł., & Polosukhin, I. (2017). **Attention Is All You Need**. *Advances in Neural Information Processing Systems*, 30. [https://arxiv.org/abs/1706.03762](https://arxiv.org/abs/1706.03762)

BibTeX:
```bibtex
@inproceedings{vaswani2017attention,
  title     = {Attention Is All You Need},
  author    = {Vaswani, Ashish and Shazeer, Noam and Parmar, Niki and
               Uszkoreit, Jakob and Jones, Llion and Gomez, Aidan N and
               Kaiser, {\L}ukasz and Polosukhin, Illia},
  booktitle = {Advances in Neural Information Processing Systems},
  volume    = {30},
  year      = {2017},
  url       = {https://arxiv.org/abs/1706.03762}
}
```

---

## License

MIT © 2025 — see [LICENSE](LICENSE).
