import chain from '@/utils/extractBlockchainInfo'

export default data => {
  const dataChain = chain(data)
  if (!dataChain) { return null }
  const blockchain = dataChain.toLowerCase()
  const url = blockchain === 'testnet'
    ? `https://kovan.etherscan.io`
    : `https://etherscan.io`
  const resource = type => id => [url, type, id].join('/')
  return {
    block: resource('block'),
    transaction: resource('tx'),
    address: resource('address')
  }
}
