import client from '@/graphql'

const isDeletion = name => !!name.match(/delete/)

const isMutation = name => !!name.match(/create|update/) || isDeletion(name)

const generateGraphQlMethod = name => client()[isMutation(name) ? 'mutate' : 'query']

const generateGraphQlMethodParams = (name, query) => ({
  [isMutation(name) ? 'mutation' : 'query']: query
})

const generateAction = (name, queries) => {
  if (Object.keys(queries).length !== 1) { throw new Error('queries need to contains 1 query') }
  const resource = Object.keys(queries)[0]
  const method = generateGraphQlMethod(name)
  const methodQuery = generateGraphQlMethodParams(name, queries[resource])
  return ({ commit }, gqlConfig = {}) => method({
    ...methodQuery,
    ...gqlConfig
  })
    .then(({ data }) => data[resource])
    .then(data => {
      if (Array.isArray(data)) {
        commit('updateCollection', { variables: gqlConfig.variables, data })
      } else {
        if (!isDeletion(name)) {
          commit('replaceItem', { item: data })
        }
      }
      return data
    })
}

export default actions => Object.keys(actions)
  .reduce((acc, value) => ({
    ...acc,
    [value]: generateAction(value, actions[value])
  }), {})
