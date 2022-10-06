// Black magic
const LINE =
  /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/gm;

function dotenvToJson(text) {
  let match;
  let result = {};
  while ((match = LINE.exec(text)) !== null) {
    // Get key and value
    let key = match[1];
    let value = (match[2] || "").trim();

    // Handle double quoted value
    let isDoubledQuoted = value.startsWith('"') && value.endsWith('"');
    if (isDoubledQuoted) {
      value = value.replace(/\\n/g, "\n");
    }

    // Remove surrounding quotes
    value = value.replace(/^(['"`])([\s\S]*)\1$/gm, "$2");

    result[key] = value;
  }
  return JSON.stringify(result, null, 2);
}

document.addEventListener("alpine:init", () => {
  Alpine.data("global", () => ({
    dotenvText: `LISTEN_ADDR=:8080
ENV=production`,
    dotenvToJson,
  }));
});
