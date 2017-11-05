const type = {
  ETHEREUM_CONTRACT: 'ethereumContract',
  ETHEREUM_TRANSACTION: 'ethereumTransaction',
  ETHEREUM_TOKEN: 'ethereumToken'
}

export default ({ connector }) => {
  const data = connector[type[connector.connectorType]]
  return data.chain || data.contract.chain
}
