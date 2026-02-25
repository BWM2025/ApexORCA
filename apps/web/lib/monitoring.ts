// © 2026 ApexORCA.io — All rights reserved. Founder: B.W. Moore

export function logEvent(event: string, data: Record<string, unknown> = {}) {
  console.log(`[ApexORCA Monitor] ${event}`, data);
  // In production: send to monitoring service
}

export function trackPurchase(productId: string, amount: number) {
  logEvent("PURCHASE", { productId, amount });
}
