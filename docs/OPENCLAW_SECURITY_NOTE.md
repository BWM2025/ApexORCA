# OpenClaw Security — Note for ApexORCA Customers

ApexORCA sells **personas and skills** (files) for use with **OpenClaw**. We do **not** operate or host OpenClaw. Your security when using OpenClaw is determined by your own deployment and the OpenClaw project.

## Recommended practices

1. **Use OpenClaw v2026.1.29 or later.**  
   A critical RCE (CVE-2026-25253, CVSS 8.8) was fixed in that release. Earlier versions can be compromised via crafted links that exfiltrate gateway tokens.

2. **Enable authentication** and do not expose the OpenClaw gateway to the public internet unless you have hardened it (e.g. auth on, origin checks).

3. **Install skills only from trusted sources.**  
   Our products (ORCA personas and skills) are delivered as files you add to your OpenClaw workspace. Do not install arbitrary skills from untrusted registries.

4. **Rotate gateway and API keys** after any suspected compromise or after upgrading from a vulnerable version.

## Where to read more

- **Full spec (legal, compliance, security, scale):** `docs/APEXORCA_MASTER_SPEC.md` and `docs/APEXORCA_MASTER_SPEC.json`.
- **OpenClaw security:** [OpenClaw Security Overview](https://clawdocs.org/security/overview) and the project’s security advisories (e.g. GitHub).

This is not legal or security advice. You are responsible for your own deployment and compliance.
