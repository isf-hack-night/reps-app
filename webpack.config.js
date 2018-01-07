const path = require('path');

module.exports = {
  entry: {
    app: ['./src/index.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
         test: /\.css$|.less$/,
         use: [
           'style-loader',
           'css-loader',
           'less-loader'
         ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: 'babel-loader',
            options: {
            presets: ['env', 'react']
          }
        }
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    // contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    headers: {
        "Access-Control-Allow-Origin": "*"
    },
    allowedHosts: [
        '.state-strong.org'
    ]
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules'),
    ],
  }
};
