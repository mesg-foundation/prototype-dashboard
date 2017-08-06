import allInvitations from '@/graphql/invitations/queries/allInvitations.graphql'
import createInvitation from '@/graphql/invitations/mutations/create.graphql'
import Subscription from '@/graphql/invitations/subscription.graphql'
import { collection, subscription, merge } from '@/store/helpers'

export default merge({},
  collection({
    fetchAll: { allInvitations },
    create: { createInvitation }
  }),
  subscription('Invitation', Subscription),
  {
    namespaced: true
  }
)
