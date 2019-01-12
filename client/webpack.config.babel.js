import webpack from "webpack"
import path from "path"
import HtmlWebPackPlugin from "html-webpack-plugin"
import CopyWebpackPlugin from "copy-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"

const BUILD_DIR = path.resolve(__dirname, "build")
const APP_DIR = path.resolve(__dirname, "src")

export default {
  entry:   APP_DIR + "/index.jsx",
  output:  {
    path:       BUILD_DIR,
    filename:   "js/main.[hash:6].js",
    publicPath: "/"
  },
  module:  {
    rules: [
      {
        test:    /\.mjs$/,
        include: /node_modules/,
        type:    "javascript/auto"
      },
      {
        test:    /\.js?/,
        include: APP_DIR,
        exclude: /node_modules/,
        use:     {
          loader: "babel-loader"
        }
      },
      {
        test:    /\.(less)$/,
        exclude: /(assets|node_modules)/,
        use:     [
          {
            loader:  MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../"
            }
          },
          {
            loader:  "css-loader",
            options: {
              modules: true
            }
          },
          "less-loader"
        ]
      },
      {
        test: /\.html$/,
        use:  [
          {
            loader:  "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use:  [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  resolve: {
    alias:      {
      src: path.resolve(APP_DIR)
    },
    extensions: [".webpack.js", ".jsx", ".js", ".json"]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./templates/index.html",
      filename: "./index.html",
      inject:   "head",
      hash:     true
    }),
    new MiniCssExtractPlugin({
      filename:      "css/[name].css",
      chunkFilename: "css/[hash:6].css"
    }),
    // Copy things directly from /public
    new CopyWebpackPlugin([
      { from: "assets" }
    ]),
    new webpack.DefinePlugin({
      "process.env": {
        API_HOST: JSON.stringify(process.env.API_HOST || "http://localhost:8080")
      }
    })
  ]
}
