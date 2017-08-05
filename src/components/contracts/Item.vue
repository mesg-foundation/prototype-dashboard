<template>
  <v-card flat>
    <v-toolbar card>
      <v-toolbar-title class="heading">
        {{ contract.address }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <PopupPageButton primary dark outline :title="$t('update')">
        <ContractForm :contract="contract"></ContractForm>
      </PopupPageButton>
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
    update: "Update"
    labels:
      address: "Contract address"
      chain: "Blockchain"
      webhooks: "Connected webhooks"
</i18n>

<script>
  import item from '@/mixins/item'
  import Abi from '@/components/ABI'
  import PopupPageButton from '@/components/PopupPageButton'
  import ContractForm from './Form'
  export default {
    components: {
      Abi,
      PopupPageButton,
      ContractForm
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
