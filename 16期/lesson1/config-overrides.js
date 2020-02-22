//根目录创建config-overrides.js
const {
  override,
  fixBabelImports,
  addDecoratorsLegacy
} = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
    //antd按需加载
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css"
  }),
  addDecoratorsLegacy() //配置装饰器
);
