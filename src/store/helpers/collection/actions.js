import Utils from '@/utils'
import client from '@/graphql'

const generateGraphQlMethod = name => {
  const methodName = {
    create: 'mutate',
    update: 'mutate'
  }[name] || 'query'
  return client()[methodName]
}

const generateGraphQlMethodParams = (name, query) => {
  const methodQueryName = {
    create: 'mutation',
    update: 'mutation'
  }[name] || 'query'
  return {
    [methodQueryName]: query
  }
}

const isSingleResource = name => ['fetch'].indexOf(name) >= 0

const extractResultFunction = (singleResource, resource) => ({ data }) => singleResource
  ? data[`all${Utils.toHuman(resource)}s`]
  : data[resource]

const generateAction = (name, queries) => {
  if (Object.keys(queries).length !== 1) { throw new Error('queries need to contains 1 query') }
  const resource = Object.keys(queries)[0]
  const method = generateGraphQlMethod(name)
  const methodQuery = generateGraphQlMethodParams(name, queries[resource])
  const extractResult = extractResultFunction(isSingleResource(name), resource)
  return ({ commit }, variables) => method({
    ...methodQuery,
    variables
  })
    .then(extractResult)
    .then(data => {
      if (Array.isArray(data)) {
        commit('updateCollection', { collection: data })
        commit('updateCollectionList', { variables, data })
      } else {
        commit('replaceItem', { item: data })
      }
      return data
    })
}

export default actions => Object.keys(actions)
  .reduce((acc, value) => ({
    ...acc,
    [value]: generateAction(value, actions[value])
  }), {})
