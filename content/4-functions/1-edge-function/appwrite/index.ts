import { Client } from "node-appwrite";

export default async ({ req, res, log }) => {
  const { name } = JSON.parse(req.body ?? "{}");

  log(`Hello ${name}!`);

  return res.json({ message: `Hello ${name}!` });
};
