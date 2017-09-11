import client from './client'

export default ({ chain, abi, address }) => client(chain)
  .then(web3 => web3.eth.contract(abi))
  .then(contract => contract.at(address))
