import fetch from "cross-fetch";
import { logging } from "./utils.js";
import { PORT, USER } from "../index.js";

const nodes = [];
const seedServers = [
  {
    uri: 'http://localhost:3000',
    user: 'Ruby'
  },
  {
    uri: 'http://localhost:4000',
    user: 'Shiki'
  },
  {
    uri: 'http://localhost:5000',
    user: 'Ayuma'
  },
];

export function getSeedServers() {
  return [...seedServers];
}

export function getRandomSeedServer() {
  const seedServersLength = seedServers.length;
  const randomIdx = Math.floor(Math.random() * seedServersLength);

  logging("info", `idx from random seed ${randomIdx}`);

  return seedServers[randomIdx];
}

/**
 * @param {string} ip
 * @returns {Promise}
 * */
export async function registerWithSeedServer(node) {
  logging("info", "register seed server");

  return fetch(`${node.uri}/register`, {
    method: "POST",
    body: JSON.stringify({
      uri: `http://localhost:${PORT}`,
      user: USER[PORT.toString()],
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}

export function getNodes() {
  return [...nodes];
}

export function addNode(newNode) {
  const isExists = nodes.find((node) => newNode.user === node.user);

  if (!isExists) {
    logging("info", `✅ New node: ${newNode.user}@${newNode.uri} on ${PORT}`);

    nodes.push(newNode);
  } else {
    logging('info', `⚠️ Node for ${newNode.user} already exists on ${PORT}`);

    return;
  }
}

export function findNodeByUser(user) {
  return nodes.find((node) => node.user === user);
}

export async function lookupUser(user, uri, requestId) {
  logging("info", `Call: ${uri}, lookup for user: ${user}`);

  return fetch(`${uri}/lookup?user=${user}`, {
    headers: {
      'x-request-id': requestId
    }
  }).then((response) => {
    if(response.ok) return response.json();
    throw new Error("Node not found");
  });
}
