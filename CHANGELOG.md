# Changelog

All notable changes to Attend are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added
- 8 interactive chapter pages (§0 prerequisites through §6 full Transformer block)
- Typed math module: `src/math/` — linalg, probability, attention, positional
- 40+ Vitest unit tests verifying every equation against Vaswani et al. (2017)
- §4.3 flagship: type-your-own-sentence attention playground with 4-step walk-through
- Dark mode with localStorage persistence + `prefers-color-scheme` detection
- Keyboard navigation: j/k chapters, ←/→ steps, ? cheatsheet
- KaTeX for typeset equations on every page
- Citation sidenotes linking to Vaswani et al. §§
- §0 prerequisites self-assessment with interactive quizzes
- Cmd+K search overlay across all chapters and key terms
- GitHub Actions CI: lint → typecheck → test → build
- Vercel deployment config with security headers + asset caching
- Pre-commit hooks via husky + lint-staged
- Design system: 25 token/component preview cards
- Brand assets: logomark, wordmark, softmax curve, matrix glyph (SVG)
- Production README with architecture diagram and BibTeX citation
- MIT License
- CONTRIBUTING.md guide

### Technical
- Vite 5 + React 18.3 + TypeScript 5.4 (strict mode)
- ESLint + Prettier + EditorConfig
- Dark mode CSS token overrides (zero component changes required)
- Accessibility: focus-visible rings, skip link, aria-labels, reduced-motion
