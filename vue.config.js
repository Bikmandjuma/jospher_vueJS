// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

// const { defineConfig } = require('@vue/cli-service');
// const webpack = require('webpack');

// module.exports = defineConfig({
//   transpileDependencies: true,

//   configureWebpack: {
//     plugins: [
//       new webpack.DefinePlugin({
//         __VUE_PROD_DEVTOOLS__: false,
//         __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
//       }),
//     ],
//   },
// });

const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_DEVTOOLS__: false,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
      }),
    ],
  },

  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.0.82:8000', // Forward all `/api` requests to this backend server
        changeOrigin: true, // Enable cross-origin requests
        pathRewrite: { '^/api': '' }, // Optionally remove `/api` from the forwarded URL
        logLevel: 'debug', // For detailed logging (optional, useful for debugging)
      },
    },
  },
});
