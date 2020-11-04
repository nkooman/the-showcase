const path = require('path');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/the-showcase/' : '/',
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, './src')
      },
      extensions: ['.js', '.vue', '.json']
    }
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      const newArgs = [{ ...args[0], title: 'The Showcase' }];

      return newArgs;
    });
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/styles/prepend";'
      }
    }
  }
};
