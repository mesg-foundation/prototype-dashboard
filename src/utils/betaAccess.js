import Cookie from 'js-cookie'
import gql from 'graphql-tag'
import client from '@/graphql'

const error = 'The dashboard is in private access, contact us at contact@etherstellar.io to request an invitation'

const check = () => client()
  .query({
    fetchPolicy: 'network-only',
    query: gql`query(
      $id: ID!
    ) {
      BetaCustomer(id: $id) {
        name
      }
    }`,
    variables: { id: Cookie.get('BETA_ACCESS_ID') }
  })
  .then(({ data }) => {
    if ((data.BetaCustomer || {}).name !== Cookie.get('BETA_ACCESS_NAME')) {
      throw new Error('INVALID_BETA_ACCESS')
    }
  })
  .catch(() => Promise.reject(error))

export default {
  check
}
