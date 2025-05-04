import { addNode, findNodeByUser, getSeedServers, lookupUser } from "../server.js";
import { logging } from "../utils.js";
import { v4 as uuidv4 } from "uuid";

const alreadyExploredSeed = new Set();

export async function lookup(req, res) {
  const { user } = req.query;

  const requestId = req.get("x-request-id") ?? uuidv4();

  if (alreadyExploredSeed.has(requestId)) {
    return res.status(404).json({ nodeOfUser: null });
  }

  alreadyExploredSeed.add(requestId); // Every request through seed server, set requestId

  // Search on current nodes
  let nodeOfUser = findNodeByUser(user) || null;

  // If it is null, search on seed servers
  if (!nodeOfUser) {
    logging("info", "🤔 nodeOfUser is null, try to search on another server");

    const lookupPromises = getSeedServers().map((seedServer) =>
      lookupUser(user, seedServer.uri, requestId)
        .then((data) => {
          return data.nodeOfUser;
        })
        .catch(() => null)
    );

    const results = await Promise.all(lookupPromises);
    nodeOfUser = results.find((result) => result !== null) || null;

    if(nodeOfUser) {
      addNode(nodeOfUser); // Add founded node from seed server to current nodes [Cache]
    }
  }

  return res.status(200).json({ nodeOfUser });
}
