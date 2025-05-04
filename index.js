import express from "express";
import { getRandomSeedServer, registerWithSeedServer } from "./src/server.js";
import { register } from "./src/routes/register.js";
import { logging } from "./src/utils.js";
import { lookup } from "./src/routes/lookup.js";
import { send } from "./src/routes/send.js";
import { message } from "./src/routes/message.js";

const app = express();
export const PORT = process.env.PORT ?? 3000;
export const CURRENT_URI = `http://localhost:${PORT}`;
export const USER = {
  3000: "Ruby",
  4000: "Shiki",
  5000: "Ayumu",
};
export const CURRENT_USER_NAME = USER[PORT];

app.use(express.json());

app.post("/register", register);
app.get("/lookup", lookup);
app.post("/send", send);
app.post("/message", message);

app.listen(PORT, () => {
  logging("info", `Listening on PORT: ${PORT}`);
});

// Initialize functions
setTimeout(() => {
  (async function () {
    // for(const seedServer of getSeedServers()) {
    //   addNode(seedServer);
    // }

    const randomSeedServerUri = getRandomSeedServer();
    logging('info', `Random seed server ${randomSeedServerUri.uri}`);

    await registerWithSeedServer(randomSeedServerUri);
  })();
}, 500);
