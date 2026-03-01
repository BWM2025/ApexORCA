import { getTreasuryBalance } from "@/lib/base";

export const dynamic = "force-dynamic";

/** Set TREASURY_ADDRESS (or NEXT_PUBLIC_TREASURY_ADDRESS) in env when Biggie activates post-launch. */
const TREASURY_ADDRESS = process.env.TREASURY_ADDRESS || process.env.NEXT_PUBLIC_TREASURY_ADDRESS;

export async function GET() {
  if (!TREASURY_ADDRESS || TREASURY_ADDRESS.length < 10) {
    return Response.json({ eth: "0", usdc: "0" }, { status: 200 });
  }
  try {
    const treasury = await getTreasuryBalance(TREASURY_ADDRESS);
    return Response.json(treasury);
  } catch {
    return Response.json({ eth: "0", usdc: "0" }, { status: 200 });
  }
}
