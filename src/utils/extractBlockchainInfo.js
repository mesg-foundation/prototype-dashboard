const type = {
  ETHEREUM_CONTRACT: 'ethereumContract',
  ETHEREUM_TRANSACTION: 'ethereumTransaction',
  ETHEREUM_TOKEN: 'ethereumToken'
}

export default data => {
  if (!data) { return null }
  if (data.chain) { return data.chain }
  if (data.connector) {
    const connector = data.connector[type[data.connector.connectorType]]
    return connector && (connector.chain || connector.contract.chain)
  }
  throw new Error('This kind of object is not supported')
}
