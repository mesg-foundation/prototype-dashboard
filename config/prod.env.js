module.exports = {
  NODE_ENV: '"production"',
  AUTH_COOKIE_NAME_TOKEN: '"AUTH_TOKEN"',
  AUTH_COOKIE_NAME_PROJECT: '"PROJECT_ID"',
  GRAPHQL_ENDPOINT: '"https://api.graph.cool/simple/v1/eth-hook"',
  GRAPHQL_SOCKET: '"wss://subscriptions.graph.cool/v1/eth-hook"',
  CONTRACT_ADDRESS_LENGTH: '42',
  CHAINS: JSON.stringify([
    { key: 'KOVAN', name: 'Kovan' },
    { key: 'MAINNET', name: 'Mainnet' },
  ]),
  HEADER_SECRET_KEY: '"X-ETHHOOK-SECRET"'
}
