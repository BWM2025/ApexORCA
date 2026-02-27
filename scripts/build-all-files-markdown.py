#!/usr/bin/env python3
"""Build a single markdown file containing all project files (relative to repo root)."""
import os
from pathlib import Path

# Script is at: ApexORCA Code Base/scripts/build-all-files-markdown.py
# Need to go up 2 levels to get to: ApexORCA Code Base
CODEBASE_ROOT = Path(__file__).resolve().parent.parent
# Output goes to workspace root (ApexORCA.io FEB 2026)
WORKSPACE_ROOT = CODEBASE_ROOT.parent
OUT = WORKSPACE_ROOT / "APEXORCA_ALL_FILES_IN_ONE.md"

LANG = {
    ".tsx": "tsx", ".ts": "ts", ".js": "js", ".mjs": "javascript",
    ".json": "json", ".css": "css", ".md": "markdown", ".mdx": "mdx",
    ".sql": "sql", ".sh": "shell", ".py": "python", ".svg": "xml",
}

def lang(path: Path) -> str:
    return LANG.get(path.suffix.lower(), "text")

def main():
    parts = [
        "# ApexORCA.io — All Files in One Markdown\n",
        "Every file in the workspace, with contents. Paths are relative to **ApexORCA.io FEB 2026**.\n",
        "---\n",
    ]
    # Only scan ApexORCA Code Base directory
    files = sorted(CODEBASE_ROOT.rglob("*"))
    for f in files:
        if not f.is_file():
            continue
        # Path relative to workspace root (ApexORCA.io FEB 2026)
        rel = f.relative_to(WORKSPACE_ROOT)
        if "node_modules" in rel.parts or ".next" in rel.parts or ".git" in rel.parts:
            continue
        if rel.name == OUT.name or rel.name == ".DS_Store":
            continue
        if rel.name == ".env" or str(rel).endswith("/.env"):
            continue
        try:
            raw = f.read_bytes()
            try:
                text = raw.decode("utf-8")
            except UnicodeDecodeError:
                text = "(binary file — skipped)\n"
            code_lang = lang(f)
            fence = "````" if "```" in text else "```"
            parts.append(f"\n## `{rel.as_posix()}`\n\n")
            parts.append(f"{fence}{code_lang}\n")
            parts.append(text)
            if not text.endswith("\n"):
                parts.append("\n")
            parts.append(f"{fence}\n\n")
        except Exception as e:
            parts.append(f"\n## `{rel.as_posix()}`\n\n*Error reading: {e}*\n")
    OUT.write_text("".join(parts), encoding="utf-8")
    print("Wrote", OUT)

if __name__ == "__main__":
    main()
