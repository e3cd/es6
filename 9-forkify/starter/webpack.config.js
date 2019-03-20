const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: ["babel-polyfill", "./src/js/index.js"],
  //save bundle file
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/bundle.js"
  },
  devServer: {
    contentBase: "./dist"
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html"
    }),
    new Dotenv({
      path: "./.env"
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/, //all js files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
