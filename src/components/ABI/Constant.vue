<template>
  <v-list-tile>
    <v-list-tile-content>
      <v-list-tile-title>
        {{ signature }}
      </v-list-tile-title>
      <v-list-tile-sub-title>
        {{ result }}
      </v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
  import Web3 from 'web3'
  import abiView from '@/mixins/abiView'
  export default {
    mixins: [abiView],
    data () {
      return {
        result: 'loading...'
      }
    },
    mounted () {
      const web3 = new Web3(new Web3.providers.HttpProvider(`https://${this.contract.chain.toLowerCase()}.infura.io`))
      const contract = new web3.eth.Contract(
        JSON.parse(JSON.stringify([this.value])),
        this.contract.address
      )
      try {
        const method = contract.methods[this.value.name]()
        if (method.arguments.length === 0) {
          method.call()
            .then(x => (this.result = x))
            .catch(x => (this.result = '-'))
        }
      } catch (e) {
        this.result = '-'
      }
    }
  }
</script>
