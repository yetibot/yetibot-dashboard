const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const packageJson = require('./package.json')
const vendorDependencies = Object.keys(packageJson['dependencies'])

const threadLoader = {
  loader: 'thread-loader',
  options: {
    // there should be 1 cpu for the fork-ts-checker-webpack-plugin
    workers: require('os').cpus().length - 1
  }
}

const babelLoader = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
  }
}

module.exports = {
  cache: true,
  entry: {
    main: './src/index.tsx',
    vendor: vendorDependencies
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      use: [
        { loader: 'cache-loader' },
        threadLoader,
        babelLoader
      ]
    },
    {
      test: /\.(sass|scss)$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }, {
        loader: "sass-loader",
      }]
    },
    {
      test: /\.(css)$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }]
    },
    {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
          loader: 'file-loader',
          options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
          }
      }]
    },

    {
      test: /\.svg$/,
      exclude: /node_modules/,
      use: [
        'svg-react-loader'
      ]
    }]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
      tslint: true,
      watch: ['./src'] // optional but improves performance (less stat calls)
    }),
    new HtmlWebpackPlugin({
      title: 'Yetibot Dashboard'
    })
  ],
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js']
  }
}
