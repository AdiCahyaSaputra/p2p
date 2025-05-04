export function logging(type, msg) {
  return console.log(`🤖 ${new Date().toLocaleString()} | [${type.toUpperCase()}] | ${msg}`);
}

