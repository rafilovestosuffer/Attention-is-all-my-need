# Contributing to Attend

Thank you for wanting to improve this project. Every contribution — math corrections, new chapters, accessibility fixes, typo hunts — is welcome.

## Setup

```bash
git clone https://github.com/rafilovestosuffer/Attention-is-all-my-need.git
cd Attention-is-all-my-need
npm install
npm run dev
```

## Adding a chapter

1. Copy `ui_kits/reader/ch1-dot-product.html` as a starting point
2. Set the `data-screen-label` attribute on `.app` to match your §-number
3. Call `AttendShell.mount(...)` with your chapter's section, progress %, and activeId
4. Add your chapter to `shell.js` CHAPTERS array
5. Add it to the landing `index.html` TOC
6. Write an interactive figure — every chapter needs at least one live element

## Math contributions

All math lives in `src/math/`. Every function must:
- Have a JSDoc comment citing the equation number from Vaswani et al.
- Have a corresponding test in `*.test.ts`
- Be exported from `src/math/index.ts`

Run `npm test` before opening a PR.

## Code style

- TypeScript strict mode — no `any` without a comment explaining why
- Prettier + ESLint — run `npm run format && npm run lint` before committing
- Pre-commit hook runs automatically via husky

## Math corrections

If you find a number that doesn't match the paper, open an issue with:
- The equation number from Vaswani et al.
- What the page shows
- What it should show
- A NumPy snippet reproducing the correct answer

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(ch3): add side-by-side variance comparison
fix(math): correct softmax numerical stability
docs(readme): add deployment instructions
test(attention): add symmetric weights test case
```
