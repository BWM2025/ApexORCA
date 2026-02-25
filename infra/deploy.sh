#!/bin/bash
cd apps/web
npm run build
git add .
git commit -m "Deploy" || true
git push || true
vercel --prod
