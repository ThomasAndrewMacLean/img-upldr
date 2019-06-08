const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
  entry: {
    app: "./src/js/app.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  devServer: {
    port: 3000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.pug"
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ["pug-loader"]
      },
      {
        test: /\.sass$/,
        use: [
          process.env.NODE_ENV !== "production"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader" // compiles Sass to CSS
        ]
      }
    ]
  }
};
module.exports = (env, argv) => {
  if (argv.mode === "development") {
    watch: true;
  }
  if (argv.mode === "production") {
  }
  return config;
};
