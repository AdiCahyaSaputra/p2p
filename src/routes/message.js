import { logging } from "../utils.js";

export async function message(req, res) {
  const { fromUser, message } = req.body;

  logging("info", `💬 Message received from ${fromUser}: ${message}`);

  return res.status(200).json({ message: `${fromUser}: ${message}` });
}
