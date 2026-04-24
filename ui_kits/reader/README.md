# Attend · Reader UI Kit

The primary surface of Attend: an interactive lesson reader for teaching the attention mechanism. Includes the sidebar, sticky chapter header, prose flow with annotated diagrams, and — centerpiece — a **live attention playground** with:

- A real scaled dot-product computation (`softmax(QKᵀ/√dₖ)V`) running against a small 6-token example.
- A **temperature slider** that resharpens the softmax in real time.
- A **√dₖ scaling toggle** (see what actually breaks without it).
- **Hover-to-highlight**: hover any query row and watch its attention weights light up across the heatmap, with the contributing value rows highlighted.
- A **step-through** mode that walks Q · Kᵀ → scale → softmax → weighted sum, one frame at a time.
- Runnable (simulated) code cells that show the tensor shapes at each stage.

All math is real, not decorative. The playground recomputes on every tweak.

## Files

- `index.html` — the reader itself (sidebar + chapter + playground)
- `components.jsx` — Sidebar, ChapterHeader, ProseBlock, Figure, MathBlock, Callout, Scratchpad
- `AttentionPlayground.jsx` — the interactive heart: Q/K/V matrices, heatmap, softmax, temperature, step mode
- `attention-math.js` — plain-JS matrix ops (matmul, softmax, scale) — no dependencies

## How to use

Open `index.html`. Every value is wired: change temperature, hover rows, toggle √dₖ, step through. Refresh preserves nothing — this is a reading surface, not a save-state.
