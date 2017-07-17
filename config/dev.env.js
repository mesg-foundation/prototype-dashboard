var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  GRAPHQL_ENDPOINT: '"https://api.graph.cool/simple/v1/eth-hook"',
  GRAPHQL_SOCKET: '"wss://subscriptions.graph.cool/v1/eth-hook"'
})
