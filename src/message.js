import fetch from "cross-fetch";

export async function sendMessages(fromUser, uri, message) {
  return fetch(`${uri}/message`, {
    method: "POST",
    body: JSON.stringify({
      fromUser,
      message,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}
