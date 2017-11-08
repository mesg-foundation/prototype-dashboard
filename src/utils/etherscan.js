import chain from '@/utils/extractBlockchainInfo'

export default data => {
  const blockchain = chain(data).toLowerCase()
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
