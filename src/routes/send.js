import { CURRENT_URI, CURRENT_USER_NAME } from "../../index.js";
import { lookupUser } from "../server.js";
import { v4 as uuidv4 } from "uuid";
import { logging } from "../utils.js";
import { sendMessages } from "../message.js";

export async function send(req, res) {
  const { to, message } = req.body;
  
  try {
    const foundedUser = await lookupUser(to, CURRENT_URI, uuidv4());

    logging("info", `found user ${JSON.stringify(foundedUser)}`);

    const response = await sendMessages(CURRENT_USER_NAME, foundedUser.nodeOfUser.uri, message);

    return res.status(200).json(response);
  } catch(err) {
    logging("error", `❌ Error: ${err}`);
    return res.status(404).json({ message: 'user not found' });
  }
}
