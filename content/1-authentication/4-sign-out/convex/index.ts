import { useAuthActions } from "@convex-dev/auth/react";

async function SignOutButton() {
  const { signOut } = useAuthActions();

  await signOut();
}
