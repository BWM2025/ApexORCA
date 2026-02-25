# Testing Purchase Flow — ApexORCA.io

© 2026 ApexORCA.io — All rights reserved. Founder: B.W. Moore

## Step 1: Apply Database Schema

Run the updated schema in Supabase:

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the entire contents of `infra/supabase-schema.sql`
4. Paste and click **Run**
5. Verify the table was created with all columns:
   ```sql
   SELECT column_name, data_type 
   FROM information_schema.columns 
   WHERE table_name = 'purchases';
   ```
   Should show: `id`, `product_id`, `user_email`, `session_id`, `amount`, `purchased_at`

## Step 2: Test with Stripe Test Payments

### Using Stripe Test Mode:

1. **Set up Stripe test keys** in your `.env`:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

2. **Create test products in Stripe Dashboard**:
   - Go to Products → Create product
   - Create prices matching your `priceMap` in `lib/stripe.ts`:
     - `price_1QTestPlaybook123` → $39
     - `price_1QTestCEOPod456` → $129
     - `price_1QTestMarketingPod457` → $59
     - etc.

3. **Set up webhook endpoint**:
   - Go to Stripe Dashboard → Developers → Webhooks
   - Add endpoint: `https://your-domain.com/api/stripe/webhook`
   - Select event: `checkout.session.completed`
   - Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

4. **Test a purchase**:
   - Go to your site: `http://localhost:3000/marketplace`
   - Click "Buy Now" on any product
   - Use Stripe test card: `4242 4242 4242 4242`
   - Any future expiry, any CVC
   - Complete checkout

5. **Verify webhook fired**:
   - Check Stripe Dashboard → Webhooks → Latest events
   - Should see `checkout.session.completed` event
   - Status should be "Succeeded"

6. **Verify purchase saved**:
   - Go to Supabase Dashboard → Table Editor → `purchases`
   - Should see a new row with:
     - `product_id`: The product slug (e.g., "playbook")
     - `user_email`: The test email you used
     - `session_id`: The Stripe session ID
     - `amount`: The purchase amount
     - `purchased_at`: Timestamp

## Step 3: Verify Dashboard Shows Real Data

1. **Check dashboard API**:
   - Visit: `http://localhost:3000/api/dashboard/stats`
   - Should return JSON with real revenue numbers (not hardcoded)
   - `revenue.sevenDay`, `revenue.thirtyDay`, `revenue.lifetime` should reflect actual Stripe sessions
   - `decisions` array should show your test purchase

2. **Check dashboard page**:
   - Visit: `http://localhost:3000/dashboard`
   - Revenue numbers should match what you see in Stripe
   - Recent decisions should show your test purchase
   - Numbers should update when you make new test purchases

3. **Check live revenue component**:
   - Should fetch from `/api/dashboard/stats` every 30 seconds
   - Should show real numbers, not fake increments
   - Check browser console for any errors

## Troubleshooting

**If purchases aren't saving:**
- Check webhook logs in Stripe Dashboard
- Check server logs for errors
- Verify `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set
- Verify schema was applied correctly

**If dashboard shows zeros:**
- Verify Stripe API key is correct
- Check if Stripe sessions exist with status 'complete'
- Check browser console for API errors
- Verify `STRIPE_SECRET_KEY` is set

**If webhook fails:**
- Verify `STRIPE_WEBHOOK_SECRET` matches Stripe dashboard
- Check webhook URL is accessible (not localhost for production)
- Use Stripe CLI for local testing: `stripe listen --forward-to localhost:3000/api/stripe/webhook`

## Stripe CLI for Local Testing

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Trigger test event
stripe trigger checkout.session.completed
```
