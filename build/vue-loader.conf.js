var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

const cssLoaders = utils.cssLoaders({
  sourceMap: isProduction
    ? config.build.productionSourceMap
    : config.dev.cssSourceMap,
  extract: isProduction
})

module.exports = {
  preLoaders: {
    i18n: 'yaml-loader'
  },
  loaders: Object.assign({}, cssLoaders, { i18n: '@kazupon/vue-i18n-loader' }),
}
