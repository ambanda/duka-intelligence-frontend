import { redirect } from "next/navigation";

import { getServerSession } from "@/lib/auth/session";

export default async function HomePage() {
  const session = await getServerSession();
  const workspace = session?.memberships[0];
  redirect(workspace ? `/w/${workspace.workspaceSlug}/overview` : "/sign-in");
}
