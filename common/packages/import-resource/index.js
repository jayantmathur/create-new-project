#!/usr/bin/env node

const dree = require("dree");
const { copySync } = require("fs-extra");
const args = require("yargs").argv;

const findDirectory = (name, type) => {
  if (!name || !type) return;

  let result = undefined;

  if (type == "resource")
    dree.scan(
      "./resources",
      {
        depth: 3,
      },
      () => {},
      (dir) => {
        if (dir.name == name)
          result = `./resources/${String(dir.relativePath)}`;
      }
    );

  if (type == "workspace") {
    dree.scan(
      "./apps",
      {
        depth: 3,
      },
      () => {},
      (dir) => {
        if (dir.name == name) result = `./apps/${String(dir.relativePath)}`;
      }
    );

    if (!result)
      dree.scan(
        "./docs",
        {
          depth: 3,
        },
        () => {},
        (dir) => {
          if (dir.name == name) result = `./docs/${String(dir.relativePath)}`;
        }
      );
  }

  return result;
};

(async () => {
  const { src, dest } = args;

  if (!src || !dest) {
    console.log("Please provide both --src and --dest paths");
    return;
  }

  copySync(findDirectory(src, "resource"), findDirectory(dest, "workspace"), {
    overwrite: true | false,
  });
})();
