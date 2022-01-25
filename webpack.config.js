const path = require('path')
const fs = require('fs')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))
  return templateFiles.map((item) => {
    const parts = item.split('.')
    const name = parts[0]
    const extension = parts[1]
    return new HtmlWebpackPlugin({
      base: 'http://localhost:5500/',
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      inject: false,
    })
  })
}

const htmlPlugins = generateHtmlPlugins('./src/html/views')

const config = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname),
    filename: './js/bundle.js',
  },
  devServer: {
    open: true,
    port: 5500,
  },
  devtool: 'source-map',
  // mode: 'production',
  mode: 'development',
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
      new TerserPlugin({
        extractComments: true,
      }),
    ],
  },
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      // ==============================
      // {
      //   test: /\.css$/,
      //   include: path.resolve(__dirname, 'src/css'),
      //   use: [
      //     {
      //       loader: MiniCssExtractPlugin.loader,
      //       options: {},
      //     },
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         sourceMap: true,
      //         url: false,
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return path.relative(path.dirname(resourcePath), context) + '/'
              },
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      // ==============================
      {
        test: /\.html$/,
        include: path.resolve(__dirname, 'src/html/includes'),
        use: ['raw-loader'],
        // use: 'html-loader',
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset',
        generator: {
          filename: '[path][name][ext]',
        },
      },
      {
        test: /\.svg$/i,
        type: 'asset/resource',
        generator: {
          filename: '[path][name][ext][fragment]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/style.bundle.css',
    }),
    new CopyPlugin({
      patterns: [
        // {
        //   from: './src/fonts',
        //   to: './fonts',
        // },
        {
          from: './src/favicon',
          to: './favicon',
        },
        {
          from: './src/img',
          to: './img',
        },
        {
          from: './src/image',
          to: './image',
        },
        {
          from: './src/sprite',
          to: './sprite',
        },
      ],
    }),
  ].concat(htmlPlugins),
}

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    // config.plugins.push(new CleanWebpackPlugin())
  }
  return config
}
