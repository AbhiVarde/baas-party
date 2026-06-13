import { Client, Account, OAuthProvider } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const account = new Account(client);

account.createOAuth2Session(
  OAuthProvider.Google,
  "https://yourapp.com/auth/callback",
  "https://yourapp.com/auth/failure",
);
