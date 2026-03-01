#!/usr/bin/env bash
# Append one line to the file-based audit log. Usage: ./audit-log-append.sh "message"
# Log file: memory/audit.log (create dir if missing). No account, no service.

set -e
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LOG_DIR="${ROOT}/memory"
LOG_FILE="${LOG_DIR}/audit.log"
mkdir -p "$LOG_DIR"
echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) $*" >> "$LOG_FILE"
