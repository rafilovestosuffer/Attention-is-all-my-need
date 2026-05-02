# Claude Code prompts — copy/paste in order

## 0. Open Claude Code in the project root

```bash
cd /path/to/Attend-Design-System
claude
```

## 1. Push to GitHub

```
Initialize git in this folder. Set remote origin to
https://github.com/rafilovestosuffer/Attention-is-all-my-need.git.
Stage all files, commit with message:

  feat: production-grade Attend — interactive attention textbook

  - 8 interactive chapter pages (§0–§6)
  - Typed math module: src/math/ with 40+ Vitest tests
  - §4.3 flagship: type-your-own-sentence playground
  - Vite + TypeScript + ESLint + Prettier + husky
  - Dark mode, keyboard shortcuts, KaTeX equations
  - GitHub Actions CI + Vercel config
  - MIT licensed, full README + CONTRIBUTING + CHANGELOG

Then push to main with --force-with-lease (the repo may have an
initial README to overwrite).
```

## 2. Verify everything works

```
Run npm install. Then run these three commands and fix any errors:
- npm run typecheck
- npm test
- npm run build

Report back when all three pass cleanly.
```

## 3. Deploy to Vercel

```
Install Vercel CLI if missing: npm i -g vercel.
Run vercel login and prompt me for my email.
Then run `vercel --prod` from this folder.
The vercel.json config is already correct.
Report back the live URL when done.
```

## 4. Connect repo for auto-deploy on push

```
Run `vercel link` to connect this folder to the Vercel project,
then `vercel git connect` so every push to main auto-deploys.
```

## 5. (Optional) Refactor chapter HTMLs to use typed math module

```
Each chapter HTML in ui_kits/reader/ currently has inline JS with
duplicated math (matmul, softmax, etc.). Refactor them to import
from src/math/ via Vite. Make sure all chapters still work after the
refactor — open each one in the dev server and verify the heatmaps,
sliders, and animations still respond.
```
