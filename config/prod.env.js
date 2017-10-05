module.exports = {
  NODE_ENV: '"production"',
  AUTH_COOKIE_NAME_TOKEN: '"AUTH_TOKEN"',
  AUTH_COOKIE_NAME_PROJECT: '"PROJECT_ID"',
  GRAPHQL_ENDPOINT: '"https://api.graph.cool/simple/v1/cj7r0r8d10gk801492n12dv4a"',
  GRAPHQL_SOCKET: '"wss://subscriptions.ap-northeast-1.graph.cool/v1/cj7r0r8d10gk801492n12dv4a"',
  CONTRACT_ADDRESS_LENGTH: '42',
  CHAINS: JSON.stringify([
    { key: 'KOVAN', name: 'Kovan' },
    { key: 'MAINNET', name: 'Mainnet' },
  ]),
  CONNECTORS: JSON.stringify([
    { id: 'ETHEREUM_CONTRACT', fieldName: 'ethereumContract', name: 'Ethereum Contract', picture: 'https://www.ethereum.org/images/logos/ETHEREUM-ICON_Black.png', description: 'Execute an action in Real Time every time this event is triggers from your contract' },
    { id: 'ETHEREUM_TRANSACTION', fieldName: 'ethereumTransaction', name: 'Ethereum Transaction', picture: 'https://www.ethereum.org/images/logos/ETHEREUM-ICON_Black.png', description: 'Execute an action in Real Time every time your balance change on Ethereum' }
    // { id: 'BITCOIN_TRANSACTION', fieldName: 'bitcoinTransaction', name: 'Bitcoin Transaction', picture: 'https://bitcoin.org/img/icons/opengraph.png', description: 'Execute an action in Real Time every time you receive a transaction on Bitcoin' }
  ])
}
