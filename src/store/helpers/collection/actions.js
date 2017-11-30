import client from '@/graphql'

const isDeletion = name => !!name.match(/[Dd]elete/)

const isMutation = name => !!name.match(/[Cc]reate|[Uu]pdate/) || isDeletion(name)

const generateGraphQlMethod = name => client()[isMutation(name) ? 'mutate' : 'query']

const generateGraphQlMethodParams = (name, query) => ({
  [isMutation(name) ? 'mutation' : 'query']: query
})

const paginate = gqlConfig => ({
  ...gqlConfig,
  variables: {
    ...gqlConfig.variables,
    ...(gqlConfig.variables || {}).itemPerPage
      ? {
        first: (gqlConfig.variables || {}).itemPerPage,
        skip: (gqlConfig.variables || {}).itemPerPage * ((gqlConfig.variables || {}).page - 1)
      }
      : null
  }
})

const generateAction = (name, queries) => {
  if (Object.keys(queries).length !== 1) { throw new Error('queries need to contains 1 query') }
  const resource = Object.keys(queries)[0]
  const method = generateGraphQlMethod(name)
  const methodQuery = generateGraphQlMethodParams(name, queries[resource])
  return ({ commit }, gqlConfig = {}) => method(paginate({
    ...methodQuery,
    fetchPolicy: 'network-only',
    ...gqlConfig
  }))
    .then(({ data }) => {
      return [data[resource], (data[`_${resource}Meta`] || {}).count]
    })
    .then(([data, total]) => {
      if (Array.isArray(data)) {
        commit('updateCollection', { variables: gqlConfig.variables, data, total })
      } else {
        isDeletion(name)
          ? commit('deleteItem', data.id)
          : commit('replaceItem', { item: data })
      }
      return data
    })
}

export default actions => Object.keys(actions)
  .reduce((acc, value) => ({
    ...acc,
    [value]: generateAction(value, actions[value])
  }), {})
