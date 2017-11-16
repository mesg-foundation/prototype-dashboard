import Web3 from 'web3'

const clients = {}

const chains = {
  mainnet: 'https://mainnet.infura.io',
  testnet: 'https://kovan.infura.io'
}

export default chain => new Promise((resolve, reject) => {
  if (clients[chain.toLowerCase()]) { return resolve(clients[chain.toLowerCase()]) }
  const httpProvider = new Web3.providers.HttpProvider(chains[chain.toLowerCase()])
  const web3 = new Web3(httpProvider)
  clients[chain.toLowerCase()] = web3
  resolve(web3)
})
