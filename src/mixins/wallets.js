import client from '@/blockchain/client'
import collection from '@/mixins/collection'
import withCurrentProject from '@/mixins/withCurrentProject'

export default {
  mixins: [
    withCurrentProject,
    collection('addresses')
  ],
  data () {
    return {
      balance: {}
    }
  },
  computed: {
    wallets () {
      return this.addresses
    },
    addressesParams () {
      return {
        projectId: this.currentProjectId
      }
    }
  },
  methods: {
    async updateBalance ({ chain, id, address }) {
      client(chain)
        .then(api => {
          api.eth.getBalance(address, (err, balance) => {
            if (err) { console.error(err) }
            this.balance = {
              ...this.balance,
              [id]: {
                amount: parseFloat(api.fromWei(balance, 'ether')),
                unit: 'Ξ'
              }
            }
          })
        })
    }
  },
  watch: {
    addresses () {
      this.addresses.forEach(this.updateBalance)
    }
  }
}
