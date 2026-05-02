# Attend — Design System

A scholarly-but-warm design system for **Attend**, an interactive learning tool that teaches the attention mechanism from the ground up, built around the paper *Attention Is All You Need* (Vaswani et al., 2017).

The tool takes a beginner from "what is a vector?" through "why softmax of QKᵀ / √dₖ?" all the way to multi-head, cross-attention, and modern variants — with step-by-step visualizations, hands-on matrix playgrounds, and readable math.

---

## Product context

**What Attend is.** An interactive textbook + playground. The primary surface is a chaptered lesson reader with live, draggable diagrams: you can hover a query token and watch attention weights flow to every key; you can tweak a temperature slider and see softmax sharpen; you can step a matrix multiplication cell-by-cell. Sections interleave prose, math, code, and "scratchpads" (small editable cells).

**Audience.** Primarily self-taught learners and CS/ML students. Secondary: educators who want to embed these visualizations. The tone assumes curiosity, not expertise — everything builds.

**Differentiator.** Most explanations of attention are either too hand-wavy (blog posts with cartoons) or too terse (the paper itself). Attend is rigorous but patient — every symbol is grounded before it's used, every diagram is interactive, and the reader can always "peek under the hood" at the actual tensor shapes.

**Sources used to build this system.**
- GitHub repo: `rafilovestosuffer/Attention-is-all-my-need` — placeholder repo with just a stub README. No existing design or code materials; this system is therefore built from scratch against the described product concept.
- Design inspiration (as references only, not copied): Distill.pub article typography, 3Blue1Brown color palettes, the Transformer paper's own diagrams, classic math textbook design (Knuth, Strang).

---

## Index

Root files:
- **`README.md`** — this file
- **`colors_and_type.css`** — all design tokens (colors, type, spacing, radii, shadows, motion)
- **`SKILL.md`** — cross-compatible Agent Skill definition

Folders:
- **`assets/brand/`** — logomark, wordmark, softmax curve, matrix glyph (SVG)
- **`fonts/`** — placeholder; fonts load via Google Fonts CDN import in `colors_and_type.css`
- **`preview/`** — 24 design system cards surfaced in the Design System tab: brand, colors (paper / ink / Q·K·V / heat / semantic), type (display / body / code / math), spacing (scale / radii / shadows), components (buttons / inputs / cards / chips / heatmap / callouts / progress / scratchpad / sidebar / topbar), iconography
- **`ui_kits/reader/`** — the flagship UI kit: the Attend lesson reader with a fully-interactive scaled dot-product attention playground (live math, temperature slider, √dₖ toggle, hover-to-trace flow, step-through mode, running stats)

---

## Content fundamentals

**Voice.** A patient, curious teacher who respects the reader. Think *Distill.pub* × *A Programmer's Introduction to Mathematics* × a good office-hours TA.

**Person.** Default to **"we"** when walking through a derivation together ("we'll compute Q · Kᵀ, then scale by √dₖ"). Use **"you"** sparingly, when directly addressing the reader's action ("hover any query to see its attention pattern"). Avoid "I."

**Casing.** Sentence case everywhere — headings, buttons, menu items, page titles. Title Case is reserved for proper nouns (names of papers, architectures, algorithms: *Attention Is All You Need*, Transformer, Multi-Head Attention).

**Capitalization of symbols.** When naming the matrices in prose, use italic uppercase (**Q, K, V**) rendered with the serif display face, colored by role (burnt-orange query, teal key, aubergine value). Dimensions are italic lowercase (**dₖ, dᵥ, dₘₒdₑₗ**).

**Jargon.** Every technical term is introduced inline with a short definition the first time it appears, e.g. *"a **tensor** — a multi-dimensional array of numbers."* After introduction, the term stands alone. Never use an undefined acronym.

**Tone examples.**
- ✅ "Before we can talk about attention, we need three vectors for every token. We'll call them the query, the key, and the value — and by the end of this chapter you'll know exactly why."
- ✅ "Scaling by √dₖ seems arbitrary. Let's see what breaks if we don't."
- ❌ "Unlock the power of attention with this game-changing architecture!"
- ❌ "As an AI, I can tell you that the attention mechanism is a crucial component…"
- ❌ "🚀 Let's dive into transformers!"

**Emoji.** Never in UI chrome or prose. Rarely in a playful aside (e.g. a celebratory cell after the reader completes all exercises). Default: **no emoji**. Use typographic characters instead — **§** for sections, **†** for footnotes, **→** for flow, **≈** for approximation.

**Math rendering.** Inline math uses the serif italic face; display math is centered, a little larger, with a right-aligned equation number in small-caps: *`(Eq. 1)`*. Subscripts/superscripts render with proper metrics — never `dk` when `dₖ` is possible.

**Button copy.** Verbs, sentence case, short. "Continue", "Run this cell", "Reset diagram", "Show solution". Avoid "Click here", "Learn more", or marketing fluff.

**Error copy.** State what happened, then what to do. "This matrix has 3 columns but the next expects 4. Try reshaping or dropping a head." Never blame the user.

**Empty states.** Invitational. "No attention head selected yet — pick one from the grid above to see its pattern."

---

## Visual foundations

**Overall feel.** Warm paper. Restrained color. Type does most of the work. The system takes cues from printed math books (generous margins, clear hierarchy, dignified serifs) and from web papers like Distill (precise alignment, annotated figures, interactive affordances that don't shout).

**Backgrounds.**
- Primary canvas is a warm cream, **`--paper` #F6F1E7`** — never pure white. Pure white is reserved for cards *inside* playground panels where we want a "fresh sheet" contrast.
- Secondary plane is **`--paper-2` #EFE7D6`** — used for inset quotes, code cell backdrops, and the sidebar.
- A third darker cream **`--paper-3`** is only used for rules, quiet borders, and table stripes.
- **Full-bleed imagery** is rare. When used (chapter opener illustrations), it's a single-color or duotone diagram, never a photo.
- **Patterns** are limited to one: a faint 1px dotted grid (paper-3 on paper) behind interactive diagram areas, to signal "this is a canvas you can interact with." No gradients anywhere on chrome — gradients only appear inside heatmaps (attention-weight visualizations).

**Color.** Two pillars plus three accent roles.
- **Paper** (cream tones) and **Ink** (near-black navy-grays) carry the interface.
- **Query / Key / Value** is the only accent system: **burnt-orange** `#C2410C`, **deep teal** `#1D6F6A`, **aubergine** `#7A4BA8`. These three colors are *semantic* — they always mean Q, K, V respectively. They never decorate freely.
- The **heat scale** (`--heat-0` → `--heat-5`) is derived from the query orange and is used exclusively for attention-weight heatmaps and softmax visualizations.
- Semantic status colors (ok / warn / err) exist but are muted, book-friendly — never bright reds or greens.
- We **explicitly avoid** bluish-purple gradients, the "generic AI" palette, and any neon accents.

**Typography.** A three-face system.
- **Display: Source Serif 4** (variable, optical-sizing) — all headings, display math, italicized emphasis. Warm, scholarly, still unmistakably modern.
- **Body: Inter** — UI chrome, body prose, captions. Set at generous line-height (`--lh-prose: 1.65`) for long-form reading.
- **Mono: JetBrains Mono** — code blocks, tensor-shape annotations, inline code, keyboard shortcuts.
- Numerals use tabular figures in tables and matrices (so columns align) and proportional figures in prose.

**Layout rules.**
- The lesson reader uses a **three-column** layout at wide widths: a fixed left sidebar (table of contents + progress), a centered prose column capped at **`--measure` 68ch**, and a right margin reserved for footnotes, figure captions, and annotations (Tufte-style).
- Interactive diagrams **break out** into a wider "figure" band that extends a little past the prose column — signaling "zoom in, this is the interactive part."
- Sticky chapter title + progress rail at the top, only visible once the reader scrolls past the first paragraph.
- Spacing uses an 8pt grid with a 4pt half-step.

**Corner radii.** Modest. `--r-3: 8px` is the workhorse for cards and buttons. `--r-4: 12px` for large panels. `--r-pill` only for tag chips and progress pills. Sharp `--r-0` or `--r-1` is used for matrix cells (they should look like grid cells, not pills).

**Cards.** Cards are quiet. Default card = paper-2 background, 1px paper-3 border, `--shadow-1`. Hover card = `--shadow-2`. Active / selected card = 1px ink border (no color fill). Never a colored left-border accent — that's a trope we avoid.

**Shadows.** A three-step scale, all warm-ink and soft (no hard black, no pure gray).
- `--shadow-1` for resting chrome.
- `--shadow-2` for hovered cards and the sidebar's right edge.
- `--shadow-3` for modals and floating tooltips.
- There's also `--shadow-inset` for pressed buttons and inset fields.

**Borders.** `--border-1` (paper-3) for quiet separators; `--border-2` (paper-edge) for something that should feel more "cut"; `--border-ink` for focus rings and selection.

**Transparency & blur.** Used sparingly — only on the sticky chapter bar (paper at 85% with a 12px backdrop-blur) and on tooltips (ink at 95%). Never decorative.

**Hover states.** Subtle. Links deepen their underline from paper-edge to query-orange. Buttons lighten or darken by one shade step. Cards lift from `--shadow-1` → `--shadow-2`. Never a scale-up; we don't bounce.

**Press states.** Scale **0.98** on primary buttons, with `--shadow-inset`. 120ms, `--ease-out`. Matrix cells flash the heat-3 color for 180ms on click.

**Focus.** A 2px `--ink` outline with 2px offset. No glow, no color ring.

**Motion.** Calm and reading-paced. Default durations: `--dur-2` 220ms for most transitions, `--dur-3` 360ms for larger layout changes. Easing: `--ease-paper` (a soft settle-in) for panels arriving; `--ease-out` for everything else. **No bounces.** Diagram morphs (attention weights recomputing) use `--dur-4` 600ms with ease-in-out so the reader can follow the change.

**Imagery vibe.** Warm, slightly grainy, never glossy. Illustrations when used are duotone — ink on paper, or ink + one accent. No photo-realistic AI-generated people. No generic tech-y abstract 3D shapes. Diagrams and math *are* the imagery.

**Fixed elements.**
- Sidebar (left, 280px, scrolls independently).
- Sticky sub-header (top, 56px) appearing past the first screen.
- A floating "table of contents" disclosure button appears in the left margin for pages with ≥4 sub-sections.

**What we never do.**
- Bluish-purple gradients.
- Emoji cards or emoji-as-iconography.
- Drop shadows that look "Material" (dark, directional, deep).
- Colored left-border accent cards.
- Rainbow code syntax (we use a muted, ink-based palette).
- `text-transform: uppercase` on body paragraphs.

---

## Iconography

**Primary icon set.** **Lucide** (via CDN) — chosen for its consistent 1.5px stroke, minimal feel, and excellent coverage of UI + editor primitives. It pairs cleanly with Source Serif without clashing.

**Stroke & size.** All icons render at **1.5px** stroke, **20px** default size in UI chrome, **16px** inside buttons with text, **24px** for standalone icon buttons. Never fill icons; we are a stroke-only system.

**Custom marks.** A small set of bespoke SVGs lives in `assets/` for concepts Lucide can't represent:
- The Attend logomark (a lowercase **a** with a single attention arc).
- The Q, K, V tokens (colored serif glyphs used in diagrams).
- A softmax curve mark, a matrix-grid mark, and a transformer-block diagram.
These are authored directly (not drawn procedurally at runtime) and live in `assets/brand/`.

**Emoji / unicode.** Emoji is **not** part of the system. A small set of typographic characters is allowed in prose as a visual accent:
- `§` for section references
- `†` `‡` for footnotes
- `→` `⇒` for flow / implication
- `≈` `≤` `≥` `∑` for math in plain text
- `·` for middle-dot separators in metadata rows

**Iconography substitution.** If the user later has a preferred icon set (e.g. Phosphor, Radix), swap Lucide at the CDN level — every icon we use is named in `assets/ICONS.md` so the migration is one-to-one.

**Flag (to user).** The bespoke brand marks (logo, softmax curve) in this initial pass are authored as simple one-color SVGs; they're legible but not final. If you have existing brand marks, drop them into `assets/brand/` and they'll replace these.

---

## Font substitution flag

The system specifies three Google Fonts that load automatically through `colors_and_type.css`: **Source Serif 4**, **Inter**, and **JetBrains Mono**. These are the intended faces — no local `.ttf` files are bundled because the CDN is the canonical delivery. If you want to self-host (offline / production), download from Google Fonts and place the `.woff2` files in `fonts/`, then replace the `@import` with a local `@font-face` block.

---

## Asks for you (the user)

I had no existing brand materials to work from — the attached repo is empty. So I've made design decisions I want you to review:

- **Product name.** I used **"Attend"** as a working name for the learning tool. Happy to rename (e.g. *Softmax*, *QKV*, *Notebook on Attention*).
- **Aesthetic.** I chose a warm scholarly direction (cream paper, ink navy, three-color semantic accent). If you'd prefer a darker "research notebook" or a brighter "modern textbook" direction, say the word.
- **Product scope.** I assumed a chaptered reader + playground. If you have a different primary surface in mind (e.g. a notebook plugin, a CLI, a video course), the UI kit will pivot.
