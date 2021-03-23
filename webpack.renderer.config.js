const rules = require("./webpack.rules");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
rules.push(
  {
    test: /\.scss$/,
    use: [
      { loader: "style-loader" },
      // MiniCssExtractPlugin.loader,
      { loader: "css-loader" },
      { loader: "sass-loader" },
    ],
  },
  {
    test: /\.(ttf|otf|eot|svg|woff2|woff)$/,
    use: [
      {
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
          // outputPath: "",
          publicPath: "../",
        },
      },
    ],
  }
);

module.exports = {
  // Put your normal webpack config below here
  plugins: [
    // new MiniCssExtractPlugin({ filename: "[name].css" }),
    // new CleanWebpackPlugin(),
  ],
  module: {
    rules,
  },
};
