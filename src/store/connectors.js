import allConnectors from '@/graphql/connectors/queries/allConnectors.graphql'
import connector from '@/graphql/connectors/queries/connector.graphql'
import createConnector from '@/graphql/connectors/mutations/create.graphql'
import updateConnector from '@/graphql/connectors/mutations/update.graphql'
import Subscription from '@/graphql/connectors/subscription.graphql'
import { collection, subscription, merge } from '@/store/helpers'

import updateOrCreateWebhookConnector from '@/graphql/connectors/mutations/updateWebook.graphql'
import updateOrCreateEthereumTransactionConnector from '@/graphql/connectors/mutations/updateEthereumTransaction.graphql'
import updateOrCreateEthereumContractConnector from '@/graphql/connectors/mutations/updateEthereumContract.graphql'
import updateOrCreateEthereumTokenConnector from '@/graphql/connectors/mutations/updateEthereumToken.graphql'

const update = async ({ dispatch }, gqlParams) => {
  const { variables } = gqlParams

  const connectorType = process.env.CONNECTORS
    .map(x => x.fieldName)
    .filter(x => !!variables[x])[0]
  const connector = await dispatch(`${connectorType}Update`, {
    ...gqlParams,
    variables: {
      ...variables[connectorType],
      id: variables[connectorType].id || 'hack_for_update_or_create'
    }
  })
  delete variables[connectorType]
  const res = await dispatch('_update', {
    ...gqlParams,
    variables: {
      ...variables,
      ethereumContractId: null,
      ethereumTokenId: null,
      ethereumTransactionId: null,
      webhookId: null,
      [`${connectorType}Id`]: connector.id
    }
  })
  return res
}

export default merge({},
  collection({
    fetchAll: { allConnectors },
    fetch: { connector },
    create: { createConnector },
    _update: { updateConnector },

    webhookUpdate: { updateOrCreateWebhookConnector },
    ethereumTransactionUpdate: { updateOrCreateEthereumTransactionConnector },
    ethereumContractUpdate: { updateOrCreateEthereumContractConnector },
    ethereumTokenUpdate: { updateOrCreateEthereumTokenConnector }
  }),
  subscription('Connector', Subscription),
  {
    namespaced: true,
    actions: {
      update
    }
  }
)
