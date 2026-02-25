-- ApexORCA.io Purchases Table (2026)
-- session_id UNIQUE for Stripe webhook idempotency (duplicate events do not duplicate rows)
CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id TEXT NOT NULL,
  user_email TEXT NOT NULL,
  session_id TEXT NOT NULL UNIQUE,
  amount DECIMAL(10,2) NOT NULL,
  purchased_at TIMESTAMP DEFAULT NOW()
);

-- Index for fast lookups
CREATE INDEX idx_purchases_product_id ON purchases(product_id);
CREATE INDEX idx_purchases_user_email ON purchases(user_email);
CREATE INDEX idx_purchases_session_id ON purchases(session_id);
CREATE INDEX idx_purchases_purchased_at ON purchases(purchased_at);
