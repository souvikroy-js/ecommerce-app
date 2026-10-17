import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth/auth";

export async function requireAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/sign-in");
  if (session.user.role !== "admin") redirect("/customer");

  return { user: session.user };
}
