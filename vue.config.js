module.exports={
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'common': 'components/common',
        'views': '@/views',
      }
    }
  }
}