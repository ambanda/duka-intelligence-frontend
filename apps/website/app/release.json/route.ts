export const dynamic = "force-static";

export function GET() {
  return Response.json({ status: "ok", service: "duka-website", release: process.env.DUKA_RELEASE_SHA });
}
