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
            {{ item.title }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action v-if="item.action">
          <v-btn
            :icon="!!item.action.icon"
            :to="item.action.to"
            :href="item.action.href"
            :target="item.action.href ? '_blank' : 'none'">
            <v-icon v-if="item.action.icon">{{ item.action.icon }}</v-icon>
            {{ item.action.text }}
          </v-btn>
        </v-list-tile-action>
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
      triggers: "Connected triggers"
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
      abi () { return this.contract.abi },
      items () {
        return [{
          key: 'name',
          title: this.$t('labels.name'),
          value: this.contract.name
        }, {
          key: 'address',
          title: this.$t('labels.address'),
          value: this.contract.address,
          action: {
            icon: 'open_in_new',
            href: `https://etherscan.io/address/${this.contract.address}`
          }
        }, {
          key: 'chain',
          title: this.$t('labels.chain'),
          value: this.contract.chain.toLowerCase()
        }, {
          key: 'triggers',
          title: this.$t('labels.triggers'),
          value: this.contract._triggersMeta.count
        }]
      }
    }
  }
</script>
