#!/bin/bash
# © 2026 ApexORCA.io — All rights reserved. Founder: B.W. Moore
# Verify all critical fixes are working

echo "🔍 Verifying ApexORCA.io Setup..."
echo ""

# Check if .env exists
if [ ! -f "apps/web/.env" ]; then
  echo "❌ Missing apps/web/.env file"
  echo "   Copy env.example and set required variables"
  exit 1
fi

echo "✅ .env file exists"

# Check required env variables
source apps/web/.env 2>/dev/null || true

REQUIRED_VARS=(
  "NEXT_PUBLIC_URL"
  "STRIPE_SECRET_KEY"
  "STRIPE_WEBHOOK_SECRET"
  "SUPABASE_URL"
  "SUPABASE_SERVICE_ROLE_KEY"
)

MISSING=0
for var in "${REQUIRED_VARS[@]}"; do
  if [ -z "${!var}" ]; then
    echo "❌ Missing: $var"
    MISSING=1
  else
    echo "✅ $var is set"
  fi
done

if [ $MISSING -eq 1 ]; then
  echo ""
  echo "⚠️  Some environment variables are missing"
  echo "   Update apps/web/.env with all required values"
  exit 1
fi

echo ""
echo "📋 Next Steps:"
echo "1. Apply schema: Run infra/supabase-schema.sql in Supabase SQL Editor"
echo "2. Test purchase: Make a test purchase with Stripe test card"
echo "3. Verify dashboard: Check /dashboard shows real data"
echo ""
echo "See infra/test-purchase-flow.md for detailed instructions"
