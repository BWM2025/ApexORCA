export const dynamic = "force-dynamic";

export async function GET() {
  throw new Error("Sentry test error — if you see this in Sentry Issues, setup is done.");
}
