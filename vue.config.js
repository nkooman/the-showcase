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
      .loader('raw-loader');
    config.module
      .rule('scss')
      .oneOf('vue')
      .use('sass-loader')
      .tap(opts => ({
        ...opts,
        // eslint-disable-next-line global-require
        implementation: require('sass'),

        // See https://github.com/webpack-contrib/sass-loader/issues/804
        // webpackImporter: false,

        sassOptions: {
          includePaths: ['./node_modules', './src']
        }
      }));
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/styles/prepend";'
      }
    }
  }
};
