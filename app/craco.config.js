// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack');

// https://github.com/facebook/create-react-app/blob/v4.0.1/packages/react-scripts/config/webpack.config.js
module.exports = {
  webpack: {
    configure: {
      output: {
        filename: 'static/js/[name].js',
        chunkFilename: 'static/js/[name]-chunk.js',
      },
      optimization: {
        runtimeChunk: false,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // vendor chunk
          },
        },
      },
      plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1,
        }),
      ],
    },
  },
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          webpackConfig.plugins[5].options.filename = 'static/css/[name].css';
          return webpackConfig;
        },
      },
      options: {},
    },
  ],
};
