# Railway — Step-by-step (do this next)

**What you’re deploying:** The **Next.js site** (`apps/web`). Same app as on Vercel. The OpenClaw gateway runs locally (or on a machine where you install the OpenClaw CLI); it is not deployed to Railway.

---

## 1. Open Railway

1. In your browser go to **https://railway.app**.
2. Click **Login** (or **Start a new project**).
3. Sign in with **GitHub** (recommended). Authorize Railway if prompted.

---

## 2. New project from GitHub

1. Click **New Project**.
2. Choose **Deploy from GitHub repo**.
3. If asked, connect your GitHub account and allow Railway to access repos.
4. Select the **ApexORCA** repo (the one that contains this codebase).
5. Choose branch **main** (or the branch you deploy from). Click **Deploy** or **Continue**.

---

## 3. Configure the service

Railway will create a service. Before the first deploy succeeds, set:

1. Open the new service (click it).
2. Go to **Settings** (or the **Settings** tab).
3. **Root directory**
   - Set to: **`apps/web`**
   - (So Railway builds and runs the Next.js app, not the repo root.)
4. **Build command** (if there is one)
   - Leave default or set to: **`npm install && npm run build`**
5. **Start command**
   - Set to: **`npm run start`**  
   - (Or **`npm start`** — same thing.)
6. **Watch paths** (if present): leave default so it watches `apps/web`.

Save if there’s a Save button.

---

## 4. Add environment variables

Railway needs the same vars as your live site (same as in **env.vercel.txt** / **CREDENTIALS_VAULT.txt**).

1. In the service, open the **Variables** tab (or **Environment** / **Env Variables**).
2. Add each of these **one by one** (name = key, value = from your vault or env.vercel.txt):

| Variable | Where to get it |
|----------|------------------|
| `NEXT_PUBLIC_URL` | `https://apexorca.io` (or your Railway URL first, then change after custom domain) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | CREDENTIALS_VAULT.txt → STRIPE_PUBLISHABLE_KEY |
| `STRIPE_SECRET_KEY` | CREDENTIALS_VAULT.txt → STRIPE_SECRET_KEY |
| `STRIPE_WEBHOOK_SECRET` | CREDENTIALS_VAULT.txt → STRIPE_WEBHOOK_SECRET |
| `SUPABASE_URL` | CREDENTIALS_VAULT.txt → SUPABASE_URL |
| `SUPABASE_SERVICE_ROLE_KEY` | CREDENTIALS_VAULT.txt → SUPABASE_SERVICE_ROLE_KEY |
| `RESEND_API_KEY` | CREDENTIALS_VAULT.txt → RESEND_API_KEY |
| `EMAIL_FROM` | CREDENTIALS_VAULT.txt → EMAIL_FROM (e.g. `noreply@apexorca.io`) |
| `NEXT_PUBLIC_SENTRY_DSN` | CREDENTIALS_VAULT.txt → NEXT_PUBLIC_SENTRY_DSN |

3. Paste **values** from **CREDENTIALS_VAULT.txt** (or **env.vercel.txt**). Do not commit these; they’re only in the vault and in Railway’s UI.

---

## 5. Deploy

1. Trigger a deploy if it didn’t start automatically (e.g. **Deploy** or push a commit to the branch Railway watches).
2. Wait for the build to finish (Build → Starting → Deploy).
3. When it’s live, Railway will show a URL like **https://your-service.up.railway.app** (or under a custom subdomain). Open it to confirm the site loads.

---

## 6. Custom domain (apexorca.io)

Do these in order.

**Step 6a — Add the domain in Railway**

1. In Railway, open your **ApexORCA** service.
2. Click the **Settings** tab.
3. In the right-hand list, click **Networking** (or scroll to the **Networking** section).
4. Under **Public Networking**, find **Custom Domain**.
5. Click **+ Custom Domain** (or **Add Custom Domain**).
6. In the field, type: **`apexorca.io`** (no `https://`, no `www`). Add it / Save.
7. Railway will show a **DNS target** (e.g. something like `your-service.up.railway.app` or a CNAME value). **Leave this tab open** or copy that target — you need it for the next step.
8. (Optional) Add **www.apexorca.io** the same way: **+ Custom Domain** → type **`www.apexorca.io`** → note the target Railway gives you.

**Step 6b — Point apexorca.io at Railway in your DNS**

9. Open the place where **apexorca.io** DNS is managed (e.g. Vercel Domains, Cloudflare, Namecheap, GoDaddy, Google Domains — wherever the domain is registered or delegated).
10. Add a **CNAME** record (or follow what Railway shows):
    - **Name / Host:** `@` (for apex) or `apexorca` or leave blank — depends on the provider; it must mean “apexorca.io”.
    - **Value / Target / Points to:** the exact value Railway showed you in step 6a (e.g. `something.up.railway.app`).
    - If your provider does **not** allow CNAME on the apex (`@`), use the **A record** or **ALIAS/ANAME** instructions Railway shows instead (they often give an IP or alternate method).
11. If you added **www.apexorca.io** in step 6a, add another record:
    - **Name / Host:** `www`
    - **Value / Target:** the target Railway gave for www (often the same as the apex).
12. Save the DNS changes.

**Step 6c — Wait and set NEXT_PUBLIC_URL**

13. Wait 5–15 minutes (sometimes up to 48 hours) for DNS to propagate.
14. In Railway, open the **Variables** tab for ApexORCA.
15. Find **NEXT_PUBLIC_URL**. If it exists, edit it. If not, add a new variable.
16. Set **NEXT_PUBLIC_URL** to: **`https://apexorca.io`** (no trailing slash). Save.
17. Trigger a **redeploy** (Deployments tab → three dots on latest deployment → **Redeploy**, or push a small commit). That makes the app use `https://apexorca.io` for links and redirects.

**Step 6d — Verify**

18. In a browser, open **https://apexorca.io**. The ApexORCA site should load.
19. If you added www, open **https://www.apexorca.io** and confirm it works (or redirects to apexorca.io).

---

## Done

- **Root directory:** `apps/web`
- **Start command:** `npm run start`
- **Variables:** All of the list in §4, from CREDENTIALS_VAULT.txt (or env.vercel.txt).

If something fails: check the **Deploy logs** in Railway for build or runtime errors; fix the issue and redeploy.

---

## OpenClaw gateway on Railway?

The **OpenClaw gateway** is started locally with `bash scripts/start-openclaw-gateway-with-env.sh` and requires the OpenClaw CLI (installed via the official installer, not in the repo). It is not set up as a Railway service in this codebase. To run the gateway in the cloud you’d need a server or image where OpenClaw is installed and env vars are set (e.g. from CREDENTIALS_VAULT / openclaw.env). For “deploy to Railway,” the intended deployable is the **web app** above.
