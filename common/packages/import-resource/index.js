#!/usr/bin/env node

const fse = require("fs-extra");
const args = require("yargs").argv;

(async () => {
  const { src, dest } = args;
  if (src && dest) {
    try {
      fse.copySync(src, dest, { overwrite: true | false });
    } catch (err) {
      console.error(err);
    }
  } else console.log("Please provide both --src and --dest paths");
})();
