# Deploy ApexORCA — do these in order

## 1. Fix your GitHub token

1. Go to: https://github.com/settings/tokens?type=beta
2. Click your token (e.g. "vercel deploy").
3. Under **Repository access**, select **All repositories**.
4. Under **Repository permissions**, set **Contents** to **Read and write**.
5. Click **Update token**.

---

## 2. Push code to GitHub

Open Terminal. Run these two lines (replace `paste_your_token_here` with your actual token):

```bash
cd "/Users/RECESS1/Desktop/ApexORCA.io FEB 2026/ApexORCA Code Base"
export GITHUB_TOKEN=paste_your_token_here
./push-to-github.sh
```

---

## 3. Deploy on Vercel

1. Go to: https://vercel.com/new
2. Click **Import** next to **BWM2025/ApexORCA**.
3. Click **Edit** next to Root Directory. Type: **apps/web**. Click **Continue**.
4. Under **Environment Variables**, add (use the same values as in your `apps/web/.env`):
   - **NEXT_PUBLIC_URL** — use `https://your-project-name.vercel.app` for now
   - **STRIPE_SECRET_KEY**
   - **STRIPE_WEBHOOK_SECRET**
   - **SUPABASE_URL**
   - **SUPABASE_SERVICE_ROLE_KEY**
5. Click **Deploy**. Wait for the build. Your site is live at the URL Vercel shows.
