const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const paths = {
  output: path.resolve(__dirname, "..", "lib"),
  source: path.resolve(__dirname),
  common: path.resolve(__dirname, "..", "common"),
  node_modules: path.resolve(__dirname, "..", "node_modules"),
  htmlTemplate: path.resolve(__dirname, "..", "index.html"),
  babelConfig: path.join(__dirname, ".babelrc")
};

module.exports = {
  mode: "development",
  context: paths.source,
  target: "electron-renderer",
  entry: {
    app: "./index.tsx"
  },
  output: {
    filename: "[name].js",
    path: paths.output
  },
  devtool: "source-map",
  devServer: {
    contentBase: paths.output,
    compress: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        options: {
          extends: paths.babelConfig
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.htmlTemplate
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: [".ts", ".js", ".tsx"]
  }
};
