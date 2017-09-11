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
    <v-list-tile-action>
      <v-btn icon @click.stop="refresh()">
        <v-icon>cached</v-icon>
      </v-btn>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
  import abiView from '@/mixins/abiView'
  import Blockchain from '@/blockchain'
  export default {
    mixins: [abiView],
    data () {
      return {
        result: 'loading...'
      }
    },
    methods: {
      refresh () {
        this.result = 'loading...'
        Blockchain.contract({
          chain: this.contract.chain,
          address: this.contract.address,
          abi: [this.value]
        })
          .then(Blockchain.constant(this.value.name))
          .then(x => (this.result = x))
          .catch(x => (this.result = '-'))
      }
    },
    mounted () {
      this.refresh()
    }
  }
</script>
