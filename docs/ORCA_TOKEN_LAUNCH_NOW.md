# $ORCA Token — Do This Now

One list. Four steps. Execute in order.

**Naming:** Name **ApexORCA**, symbol **APEX** or **APEXO** (not ORCA). See `docs/ORCA_TOKEN_NAMING_LEGAL_MEMO.md`.  
**Model:** Prefer **community/third-party launch** (FELIX-style); ApexORCA associates (tracks, narrative), doesn’t claim to issue. See `docs/APEXORCA_TOKEN_PLAN_FELIX_MODEL_AND_LEGAL.md`.

---

## Step 1 — Chain + wallet (≈5 min)

1. Open **https://base.org** — get a wallet (MetaMask or Coinbase Wallet) if you don’t have one.
2. Add **Base** network to the wallet (Base.org has “Add to wallet”).
3. Get a small amount of ETH on Base for gas (bridge from mainnet or buy on an exchange and withdraw to Base).

**Done when:** Wallet is on Base and has enough ETH for gas.

---

## Step 2 — Deploy the token contract (≈15–30 min)

**Option A — Launchpad (easiest)**  
- Go to **https://www.coinbase.com/launchpad** (or search “Base token launchpad”).  
- Connect wallet, create token (name: **ApexORCA**; symbol: **APEX** or **APEXO** — not ORCA; see legal memo).  
- Follow the flow; **copy and save the contract address** when it’s deployed.

**Option B — Remix (you own the code)**  
- Go to **https://remix.ethereum.org**.  
- Use an ERC‑20 template or paste a simple token contract.  
- Compile → Deploy (Injected Provider = your wallet, network = Base).  
- **Copy and save the deployed contract address.**

**Done when:** You have a contract address on Base. Put it somewhere safe (e.g. CREDENTIALS_VAULT.txt or a note: `ORCA_CONTRACT_ADDRESS=0x...`).

---

## Step 3 — Add liquidity (≈10 min)

1. Open **https://app.uniswap.org**.  
2. Switch network to **Base** (top of the app).  
3. Connect your wallet.  
4. Go to **Pool** → **New position** (or “Add liquidity”).  
5. Select your **ApexORCA (APEX/APEXO)** token (paste contract address if it doesn’t show) and **ETH** (or USDC).  
6. Set amount and fee tier; add liquidity. Confirm in wallet.

**Done when:** You have an APEX/ETH (or APEX/USDC) pool and see your position.

---

## Step 4 — Listing (when ready)

- **DEX:** Uniswap already has it once liquidity is there; you can add to basescan/token lists so it shows up in UIs.  
- **CEX / aggregators:** Each has its own “list a token” or “submit” process — do that when you want broader listing.

**Done when:** Token is tradeable and you’ve submitted anywhere else you care about.

---

## Quick links

| Step | Link |
|------|------|
| Chain / Base | https://base.org |
| Deploy (launchpad) | https://www.coinbase.com/launchpad |
| Deploy (Remix) | https://remix.ethereum.org |
| Liquidity (Uniswap on Base) | https://app.uniswap.org (switch to Base) |

---

*After Step 2, save the contract address. After Step 3, you’re live. Then tick **1g** in `MASTER_SETUP_AND_COMPLETION_CHECKLIST.md`.*
