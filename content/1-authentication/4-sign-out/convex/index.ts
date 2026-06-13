import { useAuthActions } from "@convex-dev/auth/react";

function SignOutButton() {
  const { signOut } = useAuthActions();

  await signOut();
}
