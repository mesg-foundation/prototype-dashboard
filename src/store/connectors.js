import allConnectors from '@/graphql/connectors/queries/allConnectors.graphql'
import connector from '@/graphql/connectors/queries/connector.graphql'
import createConnector from '@/graphql/connectors/mutations/create.graphql'
import updateConnector from '@/graphql/connectors/mutations/update.graphql'
import Subscription from '@/graphql/connectors/subscription.graphql'
import { collection, subscription, merge } from '@/store/helpers'

export default merge({},
  collection({
    fetchAll: { allConnectors },
    fetch: { connector },
    create: { createConnector },
    update: { updateConnector }
  }),
  subscription('Connector', Subscription),
  {
    namespaced: true
  }
)
