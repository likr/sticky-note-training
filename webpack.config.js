const path = require('path')

const options = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
        include: [path.resolve(__dirname, 'src')]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          }
        ]
      }
    ]
  },
  entry: {
    bundle: './src/index'
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js'
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'public'),
    port: 8080
  },
  mode: process.env.NODE_ENV || 'development'
}

if (process.env.NODE_ENV !== 'production') {
  Object.assign(options, {
    devtool: 'inline-source-map'
  })
}

module.exports = options
