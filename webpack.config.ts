import path from 'path'
import { Configuration, DllReferencePlugin, ProgressPlugin } from 'webpack'
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'
import { WebpackManifestPlugin } from 'webpack-manifest-plugin'
import { baseURL, IS_DEV } from './resources/webpack/common_config'
import ESLintWebpackPlugin from 'eslint-webpack-plugin'

const resolve = (...paths: string[]): string => path.resolve(__dirname, ...paths)

type WebpackConfig = Configuration & { devServer?: DevServerConfiguration }

const webpack_config: WebpackConfig = {
  devtool: 'source-map',
  entry: {
    client: resolve('./resources/app/client/index.ts')
  },
  output: {
    path: resolve('public'),
    filename: 'js/[name].[fullhash:5].js',
    publicPath: baseURL('/')
  },
  devServer: {
    liveReload: true,
    host: '0.0.0.0',
    port: 3000,
    compress: true,
    hot: true,
    client: {
      logging: 'verbose',
      overlay: true,
      progress: true
    },
    static: {
      publicPath: '/public/'
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        loader: 'ts-loader',
        include: resolve('./resources/app')
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
        include: resolve('./resources/app')
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': resolve('./resources/app')
    }
  },
  plugins: [
    new WebpackManifestPlugin({
      fileName: 'manifest.json',
      writeToFileEmit: true
    }),
    new DllReferencePlugin({
      manifest: resolve('public/vendors/vendor-manifest.json')
    }),
    new ESLintWebpackPlugin({
      context: resolve('./resources/app/[name]'),
      extensions: ['ts', 'tsx'],
      fix: true,
      threads: true
    }),
    new ProgressPlugin()
  ]
}

module.exports = () => {
  if (!IS_DEV) {
    webpack_config.mode = 'production'
  } else {
    webpack_config.mode = 'development'
  }
  return webpack_config
}
