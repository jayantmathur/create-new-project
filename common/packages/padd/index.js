#!/usr/bin/env node

const packages = require("./packageslist.json");
const { execSync, exec } = require("child_process");
const { readFileSync, writeFileSync } = require("fs");
const merge = require("deepmerge");
const args = require("yargs").argv;

const appendJson = async (filename, data) => {
  const file = readFileSync(filename);

  //check if file is empty
  if (file.length == 0) writeFileSync(filename, JSON.stringify(data));
  else {
    const result = merge.all([JSON.parse(file.toString()), data]);
    writeFileSync(filename, JSON.stringify(result));
  }
};

(async () => {
  if (args?.packs && args?.path) {
    const categories = args?.packs?.split(/\,|\s/);

    categories?.forEach(async (category) => {
      const depsList = packages[category]["dependencies"]
        ?.toString()
        .replaceAll(",", " ");

      if (depsList?.length > 1)
        execSync(`yarn add -W ${depsList}`, {
          stdio: "ignore",
          cwd: `${args?.path}`,
        });
      console.log(`Added dependencies [${depsList}] to ${args?.path}`);

      const devDepsList = packages[category]["devDependencies"]
        ?.toString()
        .replaceAll(",", " ");

      if (devDepsList?.length > 1)
        execSync(`yarn add -DW ${devDepsList}`, {
          stdio: "ignore",
          cwd: `${args?.path}`,
        });

      console.log(`Added devDependencies [${devDepsList}] to ${args?.path}`);

      const scriptsList = packages[category]["scripts"];

      if (JSON.stringify(scriptsList) !== "{}") {
        await appendJson(`${args?.path}/package.json`, {
          scripts: scriptsList || {},
        });
        console.log(`Added necessary scripts package.json`);
      }

      const postinstall = packages[category]["postinstall"];

      if (postinstall?.length > 1)
        exec(`${postinstall}`, { cwd: `${args?.path}` }, (err) => {
          if (err) throw err;
          console.log(`Ran postinstall script`);
        });
    });
  }
})();
