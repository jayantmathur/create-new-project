#!/usr/bin/env node

const { readFile, writeFile } = require("fs");
const args = require("yargs").argv;

// Reference https://stackoverflow.com/questions/23036918/in-node-js-how-to-read-a-file-append-a-string-at-a-specified-line-or-delete-a

(async () => {
  if (args?.path && args?.input) {
    const file = args?.path,
      input = args?.input,
      line = args?.line || 0;

    let body = await readFile(file).toString();

    if (body.indexOf(input) < 0) {
      body = body.split("\n");
      body.splice(line + 1, 0, input);
      body = body.filter(function (str) {
        return str;
      }); // remove empty lines
      const output = body.join("\n");
      writeFile(file, output);
    }
  }
})();
