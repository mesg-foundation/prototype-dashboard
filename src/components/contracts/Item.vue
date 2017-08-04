<template>
  <v-card flat>
    <v-toolbar card>
      <v-toolbar-title class="heading">
        {{ contract.address }}
      </v-toolbar-title>
    </v-toolbar>
    <v-list two-line>
      <v-list-tile v-for="item in items" :key="item.key">
        <v-list-tile-content>
          <v-list-tile-title>
            {{ item.value }}
          </v-list-tile-title>
          <v-list-tile-sub-title>
            {{ $t(`labels.${item.key}`) }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <Abi :value="abi"></Abi>
  </v-card>
</template>

<i18n>
  en:
    labels:
      address: "Contract address"
      chain: "Blockchain"
      webhooks: "Connected webhooks"
</i18n>

<script>
  import item from '@/mixins/item'
  import Abi from '@/components/ABI'
  export default {
    components: {
      Abi
    },
    mixins: [
      item('contract')
    ],
    props: {
      id: {
        type: String,
        required: true
      }
    },
    computed: {
      address () { return this.contract.address },
      chain () { return this.contract.chain },
      webhooks () { return this.contract._webhooksMeta.count },
      abi () { return this.contract.abi },
      items () {
        return ['address', 'chain', 'webhooks']
          .map(x => ({
            key: x,
            value: this[x]
          }))
      }
    }
  }
</script>
