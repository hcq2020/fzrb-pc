module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    open: true,
    proxy: {
      '/dev-api': {
        target: 'http://47.101.209.229:7788/api',
        changeOrigin: true,
        pathRewrite: {
          '^/dev-api':''
        }
      },
      '/api': {
        target: 'http://47.101.209.229:7788/api',
        changeOrigin: true,
        pathRewrite: {
        }
      },
    },
    disableHostCheck: true
  },
}
