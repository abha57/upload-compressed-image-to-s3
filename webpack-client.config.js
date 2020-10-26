const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

// The plugin will generate an HTML5 file for you that includes all your webpack bundles in the body using script tags.
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const sourcePath = path.join(__dirname, './src/client');
const staticsPath = path.join(__dirname, './dist/static');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const appDirectory = fs.realpathSync(process.cwd());
const srcDirectory = path.resolve(appDirectory, 'src');

const plugins = [
  // ExtractCSS,
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css'
  }),
  new webpack.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly
  new CaseSensitivePathsPlugin(),
  new DuplicatePackageCheckerPlugin(),
  // new BundleAnalyzerPlugin({
  //     analyzerMode: 'static',
  //     reportFilename: 'report.html',
  //     openAnalyzer: true,
  //     statsFilename: 'stats.json',
  //     logLevel: 'info',
  // }),
  // new AssetsPlugin({
  // path: staticsPath,
  //   filename: 'assets.json'
  // }),
  new HtmlWebpackPlugin({
    template: `${sourcePath}/index.html`,
    filename: 'index.html'
  }),
  // new CopyWebpackPlugin([
  //   { from: 'images', to: 'images' },
  // ])
  new webpack.HotModuleReplacementPlugin(),
  // ignores the locales in moment. Reduced the parsed moment bundle from 1.5 MB => 406 KB.
//   new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ja|it/)
];

module.exports = {
  mode: 'development',
  entry: {
    main: [`${sourcePath}/index`]
  },
  output: {
    path: staticsPath,
    filename: '[name].[hash].js',
    // filename: '[name].js',
    publicPath: '/'
  },
  // context: sourcePath,
  // for debugging  in browser's source tab
  // eval-source-map gives original source.You see the code before transpilation, as you authored it.
  devtool: 'eval-source-map',
  target: 'web',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpg|jpeg|ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: 'file-loader'
      },
      {
        test: /\.(s*)css$/,
        loaders: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              // CSS Loader https://github.com/webpack/css-loader
              // importLoaders: 1 means that it also applies CSS modules on @imported resources.
              importLoaders: 1,
              sourceMap: true,
              context: sourcePath,
              // CSS Modules https://github.com/css-modules/css-modules

              // // :global(in local scss files) switches to global scope for the current selector respective identifier. This is done to
              // replace the global styling for the current selector.
              modules: true,

              localIdentName: '[path]-[name]-[local]-[hash:base64:5]'
            }
          },
          'sass-loader'
        ],
        include: [/src\/client\/(.*\/)?@(.*)?\/.*/]
      },
      {
        test: /\.scss$/,
        exclude: [/src\/client\/(.*\/)?@(.*)?\/.*/],
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
    modules: [sourcePath, 'node_modules'],
    alias: {
        client: path.resolve(srcDirectory, 'client'),
        components: path.resolve(srcDirectory, 'client/components'),
        axiosInternal: path.resolve(srcDirectory, 'client/axios'),
        services: path.resolve(srcDirectory, 'client/services'),
        utils:  path.resolve(srcDirectory, 'client/utils')
      }
  },
  plugins
};