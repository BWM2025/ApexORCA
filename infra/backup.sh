#!/bin/bash
# © 2026 ApexORCA.io — All rights reserved. Founder: B.W. Moore

echo "Backing up ApexORCA purchases..."
mkdir -p backups
pg_dump "$DATABASE_URL" > "backups/purchases_$(date +%Y%m%d).sql" 2>/dev/null || echo "Set DATABASE_URL for pg_dump"
echo "Backup complete."
