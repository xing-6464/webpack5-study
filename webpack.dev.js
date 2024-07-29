const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "test", // 网页title名
      filename: "app.html", // 文件名输出
      template: path.resolve(__dirname, "./index.html"), // html模板路径
      templateParameters: {
        // html模板替换
        titleName: "test2",
      },
      publicPath: "https://a.b.c/assets/", // 配置打包之后的引用路径
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].css",
    }),
  ],
  optimization: {
    minimizer: [
      // css压缩插件
      new CssMinimizerPlugin({
        // test: /index\.css$/, // 匹配到的文件名
        include: /\.css$/, // 匹配到的文件类型
        exclude: /\.min\.css$/, // 排除的文件类型
      }),
    ],
  },
};
