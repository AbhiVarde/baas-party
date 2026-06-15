export default async (context) => {
  const { req, res, log } = context;

  // Safe parsing that scales across both string and auto-parsed body configurations
  const { name } =
    typeof req.body === "string"
      ? JSON.parse(req.body || "{}")
      : (req.body ?? {});

  log(`Hello ${name}!`);

  return res.json({ message: `Hello ${name}!` });
};
