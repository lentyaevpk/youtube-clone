const path = require("path");

const resolve = dir => path.join(__dirname, dir);

module.exports = {
  outputDir: path.resolve(__dirname, "../public"),
  configureWebpack: {
    resolve: {
      alias: {
        "@images": resolve("./src/assets/images"),
        "@fonts": resolve("./src/assets/fonts")
      }
    }
  }
};
