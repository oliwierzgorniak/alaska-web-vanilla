const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const LicenseWebpackPlugin =
  require("license-webpack-plugin").LicenseWebpackPlugin;
const CopyPlugin = require("copy-webpack-plugin");

const minifyOptions = {
  // https://github.com/jantimon/html-webpack-plugin/blob/main/LICENSE
  removeComments: false,
  collapseWhitespace: true,
  keepClosingSlash: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
};

module.exports = {
  // devtool: "source-map",
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: MiniCssExtractPlugin.loader,
      },
      {
        test: /\.css$/,
        loader: "css-loader",
        options: {
          url: false,
        },
      },
      {
        test: /\.css$/,
        loader: "postcss-loader",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
      minify: minifyOptions,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "en", "index.html"),
      minify: minifyOptions,
      filename: "en/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new LicenseWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public", "**", "*"),
          to: path.resolve(__dirname, "dist"),
          context: path.resolve(__dirname, "public"),
        },
        {
          from: path.resolve(__dirname, "note.md"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: true,
            },
          ],
        },
      }),
      new TerserPlugin({
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        parallel: true,
        extractComments: false,
      }),
    ],
  },
};
