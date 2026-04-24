---
name: attend-design
description: Use this skill to generate well-branded interfaces and assets for Attend — an interactive learning tool for teaching the attention mechanism from the paper "Attention Is All You Need" (Vaswani et al., 2017). Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping scholarly, paper-aesthetic interfaces with interactive math visualizations.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick reference

- **Look:** warm paper cream `#F6F1E7` + ink navy `#1A1F2B`. Never pure white chrome; never bluish-purple gradients.
- **Accent system:** Q = burnt-orange `#C2410C`, K = emerald-teal `#0E7C6B`, V = aubergine `#7A4BA8`. Semantic — always mean Query/Key/Value.
- **Heat scale:** `--heat-0` through `--heat-5` for attention-weight visualizations. Only use here.
- **Type:** Source Serif 4 (display + italic), Inter (UI + body), JetBrains Mono (code + math + tensor shapes).
- **Icons:** Lucide (1.5px stroke, 20px default, stroke-only — never filled).
- **Tone:** patient teacher. "We" for derivations, "you" for actions. Sentence case. No emoji. Use `§ † ≈ → ∑` as typographic accents.
- **Math:** render `Q, K, V` as colored italic serif glyphs. Equation numbers in small-caps `(Eq. N)`.

## Files in this skill

- `README.md` — full content fundamentals, visual foundations, iconography
- `colors_and_type.css` — drop-in tokens (`--paper`, `--ink`, `--query`, `--heat-*`, `--font-display`, etc.)
- `assets/brand/` — logomark, wordmark, softmax curve, matrix glyph SVGs
- `ui_kits/reader/` — the flagship interactive lesson reader with live scaled dot-product attention playground (real math, temperature slider, hover-to-trace flow, step-through mode)
- `preview/` — 24 small design-system cards showing tokens and component states in isolation
