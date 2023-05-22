// https://gist.github.com/ahaywood/66044d7d2c61821a96ba5a56232094c7

const svgrConfig = {
  // ext: "tsx",
  typescript: true,
  jsxRuntime: "automatic",
  // native: true,
  svgProps: {
    fill: "var(--r-main-color)",
  },
  replaceAttrValues: {
    "#fff": "var(--r-background-color)",
    "#000": "var(--r-main-color)",
  },
  index: false,
  // svgo: false,
  icon: "100%",

  jsx: {
    babelConfig: {
      plugins: [
        // For an example, this plugin will remove "id" attribute from "svg" tag
        [
          "@svgr/babel-plugin-remove-jsx-attribute",
          {
            elements: ["svg", "text", "tspan", "g"],
            attributes: ["fontFamily", "fontSize"],
          },
        ],
      ],
    },
  },
};

module.exports = svgrConfig;
