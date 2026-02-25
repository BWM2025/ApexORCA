# Run ApexORCA.io locally

**Node:** Next.js 15 needs **Node 18+**. Use Node 20: `nvm use 20` (or install nvm + Node 20 first).

**From Cursor (easiest):**
1. Open Command Palette: **Cmd+Shift+P** (Mac) or **Ctrl+Shift+P** (Windows).
2. Run task: **Tasks: Run Task** → choose **Start ApexORCA dev (port 3000)**. Wait until you see "Ready in X.Xs".
3. Open the app in the editor: **Cmd+Shift+P** → **Simple Browser: Show** → enter **http://localhost:3000** → Enter.

**From terminal (from repo root `ApexORCA Code Base`):**
```bash
export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh"; nvm use 20; cd apps/web && npm run dev
```
Then in Cursor: **Simple Browser: Show** → **http://localhost:3000**.

`npm run dev` is set to free port 3000 and always start on **http://localhost:3000** so Cursor’s embedded browser finds the app.
