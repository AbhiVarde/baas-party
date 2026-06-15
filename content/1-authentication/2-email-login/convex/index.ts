import { useAuthActions } from "@convex-dev/auth/react";

async function SignInForm() {
  const { signIn } = useAuthActions();

  await signIn("password", {
    email: "user@example.com",
    password: "password123",
    flow: "signIn",
  });
}
