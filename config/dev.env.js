var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // GRAPHQL_ENDPOINT: '"https://api.graph.cool/simple/v1/cj7r0r8d10gk801492n12dv4a"',
  // GRAPHQL_SOCKET: '"wss://subscriptions.graph.cool/v1/cj7r0r8d10gk801492n12dv4a"',
  GRAPHQL_ENDPOINT: '"http://localhost:60000/simple/v1/cj8qs7zou00050165jd1nwwau"',
  GRAPHQL_SOCKET: '"ws://localhost:60000/subscriptions/v1/cj8qs7zou00050165jd1nwwau"',
})
