const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const version = require("./package.json").version;
const webpack = require("webpack");

module.exports = {
  mode: "development",
  context: path.resolve(__dirname),
  entry: path.resolve(__dirname, "index.tsx"),
  target: "electron-renderer",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "../.lib/app"),
    publicPath: "/"
  },
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        options: {
          extends: path.join(__dirname, "/.babelrc")
        }
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [
    new webpack.DefinePlugin({ VERSION: JSON.stringify(version) }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../index.html")
    })
  ]
};
