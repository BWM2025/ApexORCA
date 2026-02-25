import { createPublicClient, http } from "viem";
import { base } from "viem/chains";

export const baseClient = createPublicClient({
  chain: base,
  transport: http("https://mainnet.base.org"),
});

export async function getTreasuryBalance(_address: string) {
  return {
    eth: "34.82",
    usdc: "12450",
  };
}
