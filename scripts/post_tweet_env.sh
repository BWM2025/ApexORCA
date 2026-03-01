#!/bin/bash
# Post a tweet using X (Twitter) API. Keys must be in environment variables only.
# Set: TWITTER_API_KEY, TWITTER_API_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_SECRET
# Usage: TWEET_TEXT="Your message" ./scripts/post_tweet_env.sh
# Or: ./scripts/post_tweet_env.sh "Your message"

CONSUMER_KEY="${TWITTER_API_KEY:?Set TWITTER_API_KEY}"
CONSUMER_SECRET="${TWITTER_API_SECRET:?Set TWITTER_API_SECRET}"
ACCESS_TOKEN="${TWITTER_ACCESS_TOKEN:?Set TWITTER_ACCESS_TOKEN}"
ACCESS_SECRET="${TWITTER_ACCESS_SECRET:?Set TWITTER_ACCESS_SECRET}"

TWEET_TEXT="${1:-$TWEET_TEXT}"
if [ -z "$TWEET_TEXT" ]; then
  echo "Usage: TWEET_TEXT=\"...\" $0   OR   $0 \"...\"" >&2
  exit 1
fi

OAUTH_TIMESTAMP=$(date +%s)
# macOS: no sha256sum (use shasum -a 256); no date +%s%N (use openssl rand for nonce)
if command -v sha256sum >/dev/null 2>&1; then
  OAUTH_NONCE=$(echo -n "$(date +%s).$RANDOM" | sha256sum | cut -c1-32)
else
  OAUTH_NONCE=$(openssl rand -hex 16 2>/dev/null || echo "$(date +%s).$RANDOM" | shasum -a 256 2>/dev/null | cut -c1-32)
fi
OAUTH_SIGNATURE_METHOD="HMAC-SHA1"
OAUTH_VERSION="1.0"

url_encode() {
  echo -n "$1" | perl -p -e 's/([^-_.~a-zA-Z0-9])/sprintf("%%%02X", ord($1))/seg'
}

BASE_STRING="POST&https%3A%2F%2Fapi.twitter.com%2F1.1%2Fstatuses%2Fupdate.json&oauth_consumer_key=$(url_encode $CONSUMER_KEY)&oauth_nonce=$(url_encode $OAUTH_NONCE)&oauth_signature_method=$(url_encode $OAUTH_SIGNATURE_METHOD)&oauth_timestamp=$(url_encode $OAUTH_TIMESTAMP)&oauth_token=$(url_encode $ACCESS_TOKEN)&oauth_version=$(url_encode $OAUTH_VERSION)&status=$(url_encode "$TWEET_TEXT")"
SIGNING_KEY="$CONSUMER_SECRET&$ACCESS_SECRET"
OAUTH_SIGNATURE=$(echo -n "$BASE_STRING" | openssl dgst -sha1 -hmac "$SIGNING_KEY" -binary | base64)
AUTH_HEADER="OAuth oauth_consumer_key=\"$CONSUMER_KEY\",oauth_nonce=\"$OAUTH_NONCE\",oauth_signature=\"$(url_encode $OAUTH_SIGNATURE)\",oauth_signature_method=\"$OAUTH_SIGNATURE_METHOD\",oauth_timestamp=\"$OAUTH_TIMESTAMP\",oauth_token=\"$ACCESS_TOKEN\",oauth_version=\"$OAUTH_VERSION\""

curl -sS --request POST \
  --url "https://api.twitter.com/1.1/statuses/update.json?status=$(url_encode "$TWEET_TEXT")" \
  --header "Authorization: $AUTH_HEADER" \
  --header "Content-Type: application/x-www-form-urlencoded"
