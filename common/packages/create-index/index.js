#!/usr/bin/env node

const { readdirSync, writeFile, appendFile } = require("fs");
const args = require("yargs").argv;

String.prototype.toSentenceCase = function () {
  return this.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
};

const getFileList = (dirName) => {
  let files = [];
  const items = readdirSync(dirName, { withFileTypes: true });

  for (const item of items) {
    if (item.isDirectory()) {
      files = [...files, ...getFileList(`${dirName}/${item.name}`)];
    } else {
      if (
        !item.name.startsWith("index") &&
        (item.name.endsWith(".tsx") || item.name.endsWith(".jsx"))
      ) {
        const path = `${dirName}/${item.name}`;
        files.push(path.replaceAll("\\", "/").replaceAll("//", "/"));
      }
    }
  }

  return files;
};

(async () => {
  if (args?.path) {
    const directory = args?.path?.replaceAll(/\\/g, "/");

    const files = getFileList(args?.path);
    const trimmed = files.map((element) => element.replaceAll(directory, "./"));

    trimmed?.forEach((element, index) => {
      const path = element.split(/\./).slice(0, -1).join(".");
      const component = element
        .split(/\/|\.|\\/)
        .slice(-2)[0]
        .toSentenceCase();

      if (index > 0) {
        appendFile(
          `${args?.path}/index.tsx`,
          `export {default as ${component}} from "${path}";\n`,
          () => console.log(`Added element ${element}`)
        );
        return;
      } else {
        writeFile(
          `${args?.path}/index.tsx`,
          `export {default as ${component}} from "${path}";\n`,
          () => console.log(`Created index.tsx and added element ${element}`)
        );

        return;
      }
    });
  }
})();
