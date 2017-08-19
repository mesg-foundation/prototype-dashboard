<template>
  <v-card flat>
    <v-toolbar card>
      <MenuToggle></MenuToggle>
      <v-toolbar-title class="headline">
        {{ contract.name }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <PopupPageButton
        primary dark outline
        :to="{ name: 'EditContract', params: { id: contract.id } }"
        :title="$t('update')"
        v-model="popup">
        <ContractForm
          :title="$t('edit')"
          :contract="contract"
          @saved="popup = false">
        </ContractForm>
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
    <Abi :contract="contract" :value="abi"></Abi>
  </v-card>
</template>

<i18n>
  en:
    update: "Update"
    edit: "Edit contract"
    labels:
      name: "Name"
      address: "Contract address"
      chain: "Blockchain"
      webhooks: "Connected webhooks"
</i18n>

<script>
  import item from '@/mixins/item'
  import Abi from '@/components/ABI'
  import PopupPageButton from '@/components/PopupPageButton'
  import MenuToggle from '@/components/MenuToggle'
  import ContractForm from './Form'
  export default {
    components: {
      Abi,
      MenuToggle,
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
    data () {
      return {
        popup: false
      }
    },
    computed: {
      name () { return this.contract.name },
      address () { return this.contract.address },
      chain () { return this.contract.chain },
      webhooks () { return this.contract._webhooksMeta.count },
      abi () { return this.contract.abi },
      items () {
        return ['name', 'address', 'chain', 'webhooks']
          .map(x => ({
            key: x,
            value: this[x]
          }))
      }
    }
  }
</script>
