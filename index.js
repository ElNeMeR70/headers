#!/usr/bin/env node
const urlArg = process.argv[2];
if (!urlArg || urlArg === "-h" || urlArg === "--help") {
  console.log("Usage: headers <url>");
  console.log("Example: headers https://example.com");
  process.exit(urlArg ? 0 : 1);
}
const url = urlArg.startsWith("http") ? urlArg : "https://" + urlArg;
(async () => {
  try {
    const res = await fetch(url, { redirect: "follow" });
    console.log(`\x1b[36m=== HTTP Response: ${res.status} ${res.statusText} ===\x1b[0m\n`);
    const secHeaders = ["content-security-policy", "strict-transport-security", "x-frame-options", "x-content-type-options", "referrer-policy"];
    console.log("\x1b[33m[Security Headers]\x1b[0m");
    secHeaders.forEach(h => {
      const v = res.headers.get(h);
      if (v) console.log(`  \x1b[32m✔ ${h}:\x1b[0m ${v}`);
      else console.log(`  \x1b[31m✖ ${h}:\x1b[0m missing`);
    });
    console.log("\n\x1b[33m[All Response Headers]\x1b[0m");
    for (const [k, v] of res.headers.entries()) {
      console.log(`  ${k}: ${v}`);
    }
  } catch (e) {
    console.error("\x1b[31mError fetching headers: " + e.message + "\x1b[0m");
    process.exit(1);
  }
})();
