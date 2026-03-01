import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/** Placeholder until AI-CEO activates Biggie post-launch. Biggie will update with on-chain read via viem/Base. */
export async function GET() {
  return NextResponse.json({
    eth: "0",
    usdc: "0",
    yieldThisMonth: "0",
  });
}
