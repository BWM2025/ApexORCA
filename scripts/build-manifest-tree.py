#!/usr/bin/env python3
"""Generate directory tree for APEXORCA_FULL_MANIFEST_AND_TREE.md. Same exclusions as build-all-files-markdown.py."""
from pathlib import Path
from datetime import date

CODEBASE_ROOT = Path(__file__).resolve().parent.parent
WORKSPACE_ROOT = CODEBASE_ROOT.parent

def should_skip(rel_parts: tuple, name: str) -> bool:
    if "node_modules" in rel_parts or ".next" in rel_parts or ".git" in rel_parts:
        return True
    if name == ".DS_Store" or name == "APEXORCA_ALL_FILES_IN_ONE.md":
        return True
    if name == ".env" or name.endswith("/.env"):
        return True
    return False

def build_tree_under(base: Path, prefix: str, rel_prefix: tuple) -> list[str]:
    lines = []
    try:
        entries = sorted(base.iterdir(), key=lambda e: (not e.is_dir(), e.name.lower()))
    except PermissionError:
        return lines
    dirs = [e for e in entries if e.is_dir() if not should_skip(rel_prefix + (e.name,), e.name)]
    files = [e for e in entries if e.is_file() if not should_skip(rel_prefix + (e.name,), e.name)]
    ordered = dirs + files
    for i, entry in enumerate(ordered):
        is_last = i == len(ordered) - 1
        branch = "└── " if is_last else "├── "
        lines.append(prefix + branch + entry.name + ("/" if entry.is_dir() else ""))
        if entry.is_dir() and not should_skip(rel_prefix + (entry.name,), entry.name):
            ext = "    " if is_last else "│   "
            lines.extend(build_tree_under(entry, prefix + ext, rel_prefix + (entry.name,)))
    return lines

def main():
    # Tree for workspace: root line + 3 root files + ApexORCA Code Base/
    out_lines = [
        "ApexORCA.io FEB 2026/",
        "├── APEXORCA_FULL_MANIFEST_AND_TREE.md",
        "├── APEXORCA_ALL_FILES_IN_ONE.md",
        "├── APEXORCA_v1_Launch_Spec.md",
        "└── ApexORCA Code Base/",
    ]
    out_lines.extend(build_tree_under(CODEBASE_ROOT, "│   ", ("ApexORCA Code Base",)))
    tree_text = "\n".join(out_lines)

    manifest_path = WORKSPACE_ROOT / "APEXORCA_FULL_MANIFEST_AND_TREE.md"
    if not manifest_path.exists():
        print("Manifest not found at", manifest_path)
        return
    content = manifest_path.read_text(encoding="utf-8")
    start_marker = "## Directory tree (full layout)"
    end_marker = "---\n\n## Full manifest (every file listed)"
    start_idx = content.find(start_marker)
    end_idx = content.find(end_marker)
    if start_idx == -1 or end_idx == -1:
        print("Could not find tree section markers")
        return
    new_section = start_marker + "\n\n```\n" + tree_text + "\n```\n\n" + end_marker
    new_content = content[:start_idx] + new_section + content[end_idx + len(end_marker):]

    # Update "Last sync" in first paragraph (first line after # title)
    today = date.today().isoformat()
    old_sync = "Last sync: all-in-one regenerated; manifest tree + table updated to match codebase."
    new_sync = f"Last sync: {today} — all-in-one and manifest tree regenerated from codebase (scripts/build-all-files-markdown.py + build-manifest-tree.py)."
    if old_sync in new_content:
        new_content = new_content.replace(old_sync, new_sync, 1)
    else:
        # Replace any "Last sync: ..." up to " **" so we don't leave trailing garbage (e.g. ".py + build-manifest-tree.py).")
        import re
        new_content = re.sub(r"Last sync: [^*]+(?=\s+\*\*)", new_sync, new_content, count=1)

    manifest_path.write_text(new_content, encoding="utf-8")
    print("Updated", manifest_path, "with new tree and Last sync", today)

if __name__ == "__main__":
    main()
