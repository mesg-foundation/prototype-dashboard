<template>
  <v-list-tile>
    <v-list-tile-content>
      <v-list-tile-title>
        {{ signature }}
      </v-list-tile-title>
      <v-list-tile-sub-title>
        <v-text-field
          style="float: left; width: auto;"
          class="mr-2 pa-0"
          v-for="(input, i) in inputs"
          :key="i"
          v-model="input.value"
          :label="input.label"
          solo hide-details>
        </v-text-field>
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
        result: 'loading...',
        inputs: this.value.inputs
          .map(x => ({ value: '', label: x.name }))
      }
    },
    methods: {
      async refresh () {
        this.result = 'loading...'
        try {
          const contract = await Blockchain.contract({
            chain: this.contract.chain,
            address: this.contract.address,
            abi: [this.value]
          })
          console.log(this.inputs)
          this.result = await Blockchain.constant(this.value.name)(contract, this.inputs.map(x => x.value))
        } catch (e) {
          this.result = '-'
        }
      }
    },
    mounted () {
      this.refresh()
    }
  }
</script>

<style>
  .list__tile__sub-title .input-group {
    padding: 0;
    float: left;
    min-height: auto;
    border: solid 1px rgba(0,0,0,0.13);
  }
  .list__tile__sub-title .input-group label {
    top: 0;
    font-size: 1em;
    left: 0.5em;
    padding: 0;
    line-height: 1.5em;
  }
  .list__tile__sub-title .input-group .input-group__input {
    padding: 0 .5em;
    font-size: 1em;
    min-height: auto;
  }
  .list__tile__sub-title .input-group .input-group__input input {
    font-size: 1em;
    height: 1.5em;
  }
</style>
