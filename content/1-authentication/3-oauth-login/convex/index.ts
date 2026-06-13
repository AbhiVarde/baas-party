import { useAuthActions } from "@convex-dev/auth/react";

function GoogleSignIn() {
  const { signIn } = useAuthActions();

  await signIn("google", {
    redirectTo: "/dashboard",
  });
}
