# LLM Provider Setup Guide — ApexORCA Site & Agents

## How OpenClaw + WhatsApp/Telegram Works

OpenClaw is the agent runtime.  
You connect WhatsApp or Telegram as the chat interface (scan QR once).  
You add **one API key** for your chosen LLM provider.  
When you message in WhatsApp/Telegram, OpenClaw sends the message to that provider's API and returns the response in the same chat.

You can use WhatsApp on the move and the desktop interface at home — same agents.

## Ranked Options (Feb 26, 2026)

| Provider          | Monthly Cost (approx)          | Best For                     | Notes / Warnings |
|-------------------|--------------------------------|------------------------------|------------------|
| Grok (xAI)        | SuperGrok $30 + token usage    | Best performance             | Recommended for this site builder |
| Claude (Anthropic)| Pro ~$20 + API                 | Strong reasoning             | Pro accounts may restrict third-party tools |
| ChatGPT (OpenAI)  | Plus $20 + API                 | Reliable ecosystem           | Very stable |
| Local (Ollama)    | $0                             | Privacy, zero cost           | Requires good hardware |
| Gemini / Others   | Free tier with limits          | Testing                      | Strict daily limits |

## For the Site Builder (you)

Recommended: Grok via xAI API + your existing SuperGrok.  
1. Go to console.x.ai → create API key.  
2. Run `openclaw configure` and add the Grok API key.  
Expected cost: SuperGrok $30/month + $10–40/month token usage for moderate development (short mandates keep it low).

## For End Users

Choose any provider above. Full setup steps are in the sections below.

## Important Warnings

- Free tiers have strict daily limits and throttling.  
- Paid tiers have rate limits (tokens per minute). Heavy use can hit caps.  
- Never share your API keys. Revoke immediately if compromised.  
- Short mandates = lower cost and better performance.

## Quick Setup Commands

`openclaw configure` → add your LLM API key  
`openclaw channels --channel whatsapp` → scan QR  
`openclaw channels --channel telegram` → scan QR

## Remote LLM on iMac (Ollama — zero cost)

Use an iMac (or other Mac) as a local LLM server so the pod uses zero API cost.

1. **On the iMac:** Install Ollama from ollama.com. In Terminal: `ollama pull qwen2.5-coder:32b-instruct-q5_K_M` (or a smaller model if needed). Then `ollama serve` (or run Ollama app so it serves by default).
2. **Get IP:** System Settings → Network → Wi-Fi → Details → IP (e.g. 192.168.1.x). For remote access use Tailscale and the Tailscale IP (100.x.x.x).
3. **Keep iMac on:** Battery/Energy → prevent automatic sleeping; turn display off only if desired.
4. **On the machine running OpenClaw:** Run `openclaw configure` (or edit config). Add provider with `baseUrl`: `http://[iMac-IP]:11434/v1`, `api`: openai-completions, `apiKey`: "" (empty). Add model id/name for the Ollama model you pulled. Set as primary. Restart gateway: `openclaw gateway stop && openclaw gateway --port 18789 &`.
5. **Test:** Message Apex e.g. "Test local LLM: what's 2+2?" — should hit iMac, no cloud tokens.

---

## Biggie Treasury Integration

Biggie (Treasury Lead) uses the same LLM provider as the rest of the pod. Ensure Grok or chosen provider has Base on-chain read access for live balances when Biggie activates post-launch. **Final handoff copy:** docs/BIGGIE_HANDOFF.md; see also docs/BIGGIE_ACTIVATION_ROADMAP.md.
