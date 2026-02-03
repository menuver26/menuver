export async function GET() {
  return Response.json({
    mongo: process.env.MONGODB_URI || "NOT LOADED",
  });
}
