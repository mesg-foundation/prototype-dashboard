import { ApolloClient, createNetworkInterface } from 'apollo-client'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'
import Cookie from 'js-cookie'

let apolloClient = null

export default (ws = null) => {
  if (apolloClient) { return apolloClient }
  const networkInterface = createNetworkInterface({
    uri: process.env.GRAPHQL_ENDPOINT,
    transportBatching: true
  })

  networkInterface.use([
    {
      applyMiddleware: (req, next) => {
        if (!req.options.headers) { req.options.headers = {} }
        const token = Cookie.get(process.env.AUTH_COOKIE_NAME_TOKEN)
        if (token) {
          req.options.headers.authorization = `Bearer ${token}`
        }
        next()
      }
    }
  ])

  const wsClient = new SubscriptionClient(process.env.GRAPHQL_SOCKET, {
    reconnect: true,
    connectionParams: () => ({
      Authorization: `Bearer ${Cookie.get(process.env.AUTH_COOKIE_NAME_TOKEN)}`
    })
  }, ws)

  const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient
  )
  apolloClient = new ApolloClient({
    networkInterface: networkInterfaceWithSubscriptions,
    connectToDevTools: true
  })
  return apolloClient
}
