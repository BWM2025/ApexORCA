export async function GET() {
  return Response.json({
    activeUsers: 42,
    purchasesToday: 17,
    status: "healthy",
  });
}
