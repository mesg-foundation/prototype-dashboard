import Web3 from 'web3'

const clients = {}

export default chain => new Promise((resolve, reject) => {
  if (clients[chain.toLowerCase()]) { return resolve(clients[chain.toLowerCase()]) }
  const httpProvider = new Web3.providers.HttpProvider(`https://${chain.toLowerCase()}.infura.io`)
  const web3 = new Web3(httpProvider)
  clients[chain.toLowerCase()] = web3
  resolve(web3)
})
