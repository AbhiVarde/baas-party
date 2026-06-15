import { useAuthActions } from "@convex-dev/auth/react";

async function GoogleSignIn() {
  const { signIn } = useAuthActions();

  await signIn("google", {
    redirectTo: "/dashboard",
  });
}
