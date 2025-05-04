import { addNode } from "../server.js";

export function register(req, res) {
  const { user, uri } = req.body;

  addNode({
    user,
    uri,
  });

  res.json({ message: "successfully registering the user to nodes" });
}
