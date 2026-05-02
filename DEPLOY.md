## Deploy to Vercel (2 minutes, free)

### Step 1 — Push to GitHub

Download this project as a ZIP, then:

```bash
git clone https://github.com/rafilovestosuffer/Attention-is-all-my-need.git
cd Attention-is-all-my-need
# copy all downloaded files into this folder, then:
git add .
git commit -m "feat: production-grade Attend interactive attention textbook"
git push origin main
```

### Step 2 — Deploy on Vercel

1. Go to **[vercel.com](https://vercel.com)** and sign in with GitHub
2. Click **"Add New Project"**
3. Import **`rafilovestosuffer/Attention-is-all-my-need`**
4. Vercel auto-detects Vite. Settings are already correct in `vercel.json`:
   - Build command: `npm run build`
   - Output dir: `dist`
5. Click **Deploy** — done in ~30 seconds

Your live URL will be:
```
https://attention-is-all-my-need.vercel.app
```

Or set a custom domain in Vercel → Project → Settings → Domains.

### Step 3 — Every future push auto-deploys

Once connected, every `git push origin main` triggers a new deploy automatically.
CI runs first (lint → test → build), then Vercel deploys only if CI passes.

### Alternative: Cloudflare Pages (also free)

1. Go to **[pages.cloudflare.com](https://pages.cloudflare.com)**
2. Connect GitHub → select the repo
3. Build command: `npm run build`
4. Output: `dist`
5. Deploy

---

## Your URLs after deploy

| Page | Path |
|------|------|
| Home | `/` |
| §0 Prerequisites | `/ui_kits/reader/ch0-prerequisites.html` |
| §4.3 Flagship | `/ui_kits/reader/index.html` |
| §6 Transformer | `/ui_kits/reader/ch6-transformer.html` |
