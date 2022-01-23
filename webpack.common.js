const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const globals = require('./globals.js');

// ======================
// const fs = require('fs');

// function generateHtmlPlugins(templateDir) {
//   const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
//   return templateFiles.map((item) => {
//     const parts = item.split('.');
//     const name = parts[0];
//     const extension = parts[1];
//     return new HtmlWebpackPlugin({
//       filename: `${name}.html`,
//       template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
//       inject: false,
//     });
//   });
// }

// const htmlPlugins = generateHtmlPlugins('./src/html/views');
// ======================

module.exports = {
  target: 'web',
  context: path.resolve(__dirname, 'src'),
  entry: ['./js/index.js', './css/style.css'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    publicPath: '',
  },
  optimization: {
    // chunkIds: 'named',
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return path.relative(path.dirname(resourcePath), context) + '/';
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
      // {
      //   test: /\.(html)$/,
      //   use: 'html-loader',
      // },
      {
        test: /\.html$/,
        // include: path.resolve(__dirname, 'src/html/includes'),
        // use: ['raw-loader'],
        use: 'html-loader',
        // use: ['html-loader'],
        // use: {
        //   loader: 'html-loader',
        //   options: {
        //     interpolate: true,
        //   },
        // },
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset',
        generator: {
          filename: '[path][name]-[hash][ext]',
        },
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        type: 'asset',
        generator: {
          // filename: '[path][name]-[hash][ext]',
          filename: '[path][name][ext]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/img/favicon'),
          to: path.resolve(__dirname, 'dist/img/favicon'),
        },
      ],
    }),
    ...glob.sync('./src/*.html').map((htmlFile) => {
      return new HtmlWebpackPlugin({
        inject: true,
        filename: path.basename(htmlFile),
        template: path.basename(htmlFile),
        templateParameters: globals,
      });
    }),
    // new HtmlWebpackPlugin({
    //   template: './src/404.html',
    // }),
    // new HtmlWebpackPlugin({
    //   title: 'webpack Boilerplate',
    //   template: path.resolve(__dirname, './src/index.html'), // шаблон
    //   filename: 'index.html', // название выходного файла
    //   // templateParameters: globals,
    // }),
  ],
  // ].concat(htmlPlugins),
};
