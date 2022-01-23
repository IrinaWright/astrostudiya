const path = require('path')
const fs = require('fs')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/test.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  // mode: 'development',
  // devServer: {
  //   historyApiFallback: true,
  //   contentBase: path.resolve(__dirname, './dist'),
  //   open: true,
  //   compress: true,
  //   hot: true,
  //   port: 8080,
  // },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      base: 'Base Content',
      template: path.resolve(__dirname, './src/template.html'), // шаблон
      filename: 'index.html', // название выходного файла
    }),
    new CleanWebpackPlugin(),
    // применять изменения только при горячей перезагрузке
    // new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      // ==============================
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
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
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
