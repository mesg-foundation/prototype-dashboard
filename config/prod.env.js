module.exports = {
  NODE_ENV: '"production"',
  AUTH_COOKIE_NAME_TOKEN: '"AUTH_TOKEN"',
  AUTH_COOKIE_NAME_PROJECT: '"PROJECT_ID"',
  GRAPHQL_ENDPOINT: '"https://api.graph.cool/simple/v1/cj7ri5z8d0x5m0149sskbwe15"',
  GRAPHQL_SOCKET: '"wss://subscriptions.us-west-2.graph.cool/v1/cj7ri5z8d0x5m0149sskbwe15"',
  CONTRACT_ADDRESS_LENGTH: '42',
  CHAINS: JSON.stringify([
    { key: 'TESTNET', name: 'Testnet (Kovan)' },
    { key: 'MAINNET', name: 'Mainnet (Foundation)' },
  ]),
  CONNECTORS: JSON.stringify([
    { id: 'ETHEREUM_CONTRACT', fieldName: 'ethereumContract', name: 'Ethereum Contract', picture: 'https://www.ethereum.org/images/logos/ETHEREUM-ICON_Black.png', description: 'Execute an action in Real Time every time this event is triggers from your contract' },
    { id: 'ETHEREUM_TRANSACTION', fieldName: 'ethereumTransaction', name: 'Ethereum Transaction', picture: 'https://www.ethereum.org/images/logos/ETHEREUM-ICON_Black.png', description: 'Execute an action in Real Time every a transaction happen on an Ethereum address' },
    { id: 'ETHEREUM_TOKEN', fieldName: 'ethereumToken', name: 'ERC 20', picture: 'https://cdn-images-1.medium.com/max/1200/1*FD2cH_XiSw8oIlT2ojfPdQ.png', description: 'Execute an action in Real Time every time an ERC20 token emits an event' },
    { id: 'WEBHOOK', fieldName: 'webhook', name: 'Webhook', picture: 'https://files.graph.cool/cj7ri5z8d0x5m0149sskbwe15/cja9uv49u03th0133knbxq9uz', description: 'Execute an action every time the endpoint is reached' },
    // { id: 'BITCOIN_TRANSACTION', fieldName: 'bitcoinTransaction', name: 'Bitcoin Transaction', picture: 'https://bitcoin.org/img/icons/opengraph.png', description: 'Execute an action in Real Time every time you receive a transaction on Bitcoin' }
  ]),
  WEBHOOK_BASE_ADDRESS: '"http://webhook.mesg.tech/triggers"'
}
