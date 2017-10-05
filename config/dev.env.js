var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  GRAPHQL_ENDPOINT: '"https://api.graph.cool/simple/v1/cj7r0r8d10gk801492n12dv4a"',
  GRAPHQL_SOCKET: '"wss://subscriptions.ap-northeast-1.graph.cool/v1/cj7r0r8d10gk801492n12dv4a"',
})
