const path = require('path');

module.exports = {
  publicPath: '/the-showcase/',
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, './src')
      },
      extensions: ['.js', '.vue', '.json']
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => [{ ...args[0], title: 'The Showcase' }])
      .end();
    config.module
      .rule('markdown')
      .test(/\.md$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end();
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/styles/prepend";'
      }
    }
  }
};
