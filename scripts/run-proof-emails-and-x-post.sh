#!/usr/bin/env bash
# Run IMMEDIATE PROOF TESTS: 3 proof emails to founder + 1 X post.
# Usage: from ApexORCA Code Base root, run: bash scripts/run-proof-emails-and-x-post.sh
# Requires: openclaw.env in repo root with RESEND_API_KEY, EMAIL_FROM, TWITTER_* set.
# Big Sur (11.7): Load nvm first so Node 18 is used (avoid /usr/local/bin/node crash):
#   export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && nvm use 18
#   Then: bash scripts/run-proof-emails-and-x-post.sh

CODEBASE_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$CODEBASE_ROOT"

if [ ! -f "openclaw.env" ]; then
  echo "ERROR: openclaw.env not found in $CODEBASE_ROOT"
  exit 1
fi
source openclaw.env
echo "Env loaded from openclaw.env"

# Pre-flight: show what's set and which Node we use (Big Sur: must be nvm's node, not /usr/local/bin/node)
echo "--- Pre-flight ---"
echo "Node: $(command -v node) ($(node -v 2>&1))"
echo -n "RESEND_API_KEY: "; [ -n "$RESEND_API_KEY" ] && echo "set" || echo "NOT SET"
echo -n "EMAIL_FROM: "; [ -n "$EMAIL_FROM" ] && echo "set" || echo "NOT SET"
echo -n "TWITTER_API_KEY: "; [ -n "$TWITTER_API_KEY" ] && echo "set" || echo "NOT SET"
echo -n "TWITTER_ACCESS_TOKEN: "; [ -n "$TWITTER_ACCESS_TOKEN" ] && echo "set" || echo "NOT SET"

# Fail fast if using system Node (dyld crash on Big Sur)
if [ -n "$(command -v node)" ] && [ "$(command -v node)" = "/usr/local/bin/node" ]; then
  echo "ERROR: Using /usr/local/bin/node (crashes on Big Sur). Run: nvm use 18   then run this script again."
  exit 1
fi

# Use plain Node.js script (no npx/tsx — avoids Big Sur npx failures)
TO="thinkconceptsinc@gmail.com"
ERRFILE=$(mktemp)
trap 'rm -f "$ERRFILE"' EXIT

run_email() {
  local name="$1"
  local subj="$2"
  local body="$3"
  : >"$ERRFILE"
  export EMAIL_TO="$TO" EMAIL_SUBJECT="$subj" EMAIL_BODY="$body" RESEND_ERROR_FILE="$ERRFILE"
  node scripts/send_email_resend.js 2>&1 | tee "$ERRFILE"
  local r=${PIPESTATUS[0]}
  if [ $r -eq 0 ]; then
    echo "${name} email: SENT"
  else
    echo "${name} email: FAILED (exit code $r)"
    local errout=""
    [ -s "$ERRFILE" ] && errout="$(cat "$ERRFILE")"
    if [ -z "$errout" ] && [ -s "scripts/.last-resend-error.txt" ]; then
      errout="$(cat scripts/.last-resend-error.txt)"
    fi
    if [ -n "$errout" ]; then
      echo "  Output: $errout"
    else
      echo "  (No output captured. Often this is npm cache EPERM — fix with: sudo chown -R \$(whoami):staff ~/.npm)"
      echo "  Or run manually: EMAIL_TO=$TO EMAIL_SUBJECT=\"$subj\" EMAIL_BODY=\"$body\" node scripts/send_email_resend.js"
    fi
    if echo "$errout" | grep -q "EPERM\|root-owned\|Your cache folder" 2>/dev/null; then
      echo "  >>> Fix npm cache (run once): sudo chown -R \$(whoami):staff ~/.npm"
    fi
  fi
  return $r
}

echo "--- 1. Apex proof email ---"
run_email "Apex" "[Apex] Proof — ApexORCA agent email test" "This is Apex. Email capability verified. ApexORCA launch in progress."
sleep 1
echo "--- 2. Echo proof email ---"
run_email "Echo" "[Echo] Proof — ApexORCA agent email test" "This is Echo. Email capability verified. Marketing launch in progress."
sleep 1
echo "--- 3. Sonar proof email ---"
run_email "Sonar" "[Sonar] Proof — ApexORCA agent email test" "This is Sonar. Email capability verified. Outreach launch in progress."

echo "--- 4. X post ---"
TWEET_TEXT="ApexORCA is live. Governed AI agents. Zero drift, full traceability. https://apexorca.io #AI #Agents #Autonomy"
if bash scripts/post_tweet_env.sh "$TWEET_TEXT" >"$ERRFILE" 2>&1; then
  echo "X post: SENT"
else
  echo "X post: FAILED"
  echo "  Output: $(cat "$ERRFILE")"
fi

echo "--- DONE. Check $TO inbox and your X account. ---"
