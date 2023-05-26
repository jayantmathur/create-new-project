#!/usr/bin/env node

const { execSync } = require("child_process");
const args = require("yargs").argv;

(async () => {
  if (args?.port)
    execSync(
      `ssh -p 443 -R0:localhost:${args?.port} -L4300:localhost:4300 a.pinggy.io`,
      { stdio: "inherit" }
    );
  else console.log("Expose failed, please provide port");
})();
