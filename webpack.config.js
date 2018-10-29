const path = require('path');

module.exports = {
  mode: 'none',
  entry: './scripts/app.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'build.js'
  },

  devtool: 'source-map',
  // watch: true,

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          }
        }
      },
      {
        test: /\.hbs$/,
        loader: "handlebars-loader"
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 9000
  }
};





// const webpack = require('webpack');
// const path = require('path');
// const isProd = process.env.NODE_ENV === 'production'
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
//
// let plugins = [
//   new webpack.DefinePlugin({
//     API_URL: isProd
//       ? "'https://mgrinko.github.io/js-20180614/api/'"
//       : "'http://localhost:3000/api/'",
//   })
// ];
//
// if (isProd) {
//   plugins.push(
//     new UglifyJsPlugin({
//       sourceMap: isProd ? false : true,
//     })
//   )
// }
//
// module.exports = {
//   mode: 'none',
//
//   entry: './scripts/app.js',
//   output: {
//     path: path.resolve(__dirname, 'public'),
//     filename: 'build.js'
//   },
//
//   devtool: isProd ? false : 'source-map',
//
//   module: {
//     rules: [
//       {
//         test: /\.hbs$/,
//         loader: "handlebars-loader"
//       },
//       {
//         test: /\.css$/,
//         use: [ 'style-loader', 'css-loader' ]
//       },
//       {
//         test: /\.js$/,
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env'],
//             plugins: ['@babel/plugin-transform-runtime'],
//           }
//         }
//       }
//     ]
//   },
//
//   plugins: plugins,
//
//   devServer: {
//     contentBase: './public'
//   }
// };
