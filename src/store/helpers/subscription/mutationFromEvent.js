const transformMutation = x => [
  x.toLowerCase().slice(0, -1),
  'Item'
].join('')

export default (item, event) => transformMutation(event[item].mutation)
