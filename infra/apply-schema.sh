#!/bin/bash
# © 2026 ApexORCA.io — All rights reserved. Founder: B.W. Moore
# Apply updated schema to Supabase

echo "Applying ApexORCA purchases table schema to Supabase..."
echo ""
echo "Option 1: Run via Supabase Dashboard"
echo "1. Go to your Supabase project dashboard"
echo "2. Navigate to SQL Editor"
echo "3. Copy and paste the contents of infra/supabase-schema.sql"
echo "4. Click 'Run'"
echo ""
echo "Option 2: Run via Supabase CLI (if installed)"
echo "supabase db push"
echo ""
echo "Option 3: Run via psql (if you have connection string)"
echo "psql \$DATABASE_URL -f infra/supabase-schema.sql"
echo ""
echo "The schema includes:"
echo "- purchases table with session_id and amount columns"
echo "- Indexes for performance"
echo ""
echo "After running, verify with:"
echo "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'purchases';"
