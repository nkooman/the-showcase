const path = require('path');
const RemarkHTML = require('remark-html');

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
    config
      .plugin('html')
      .tap(args => [{ ...args[0], title: 'The Showcase' }])
      .end();
    config.module
      .rule('markdown')
      .test(/\.md$/)
      .use('html-loader')
      .loader('html-loader')
      .end()
      .use('remark-loader')
      .loader('remark-loader')
      .tap(options => ({
        ...options,
        remarkOptions: {
          plugins: [RemarkHTML]
        }
      }))
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
