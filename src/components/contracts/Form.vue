<template>
  <v-card flat>
    <form novalidate @submit.prevent="submit()">
      <v-toolbar card class="secondary">
        <MenuToggle></MenuToggle>
        <v-toolbar-title class="headline">{{ title || $t('title') }}</v-toolbar-title>
      </v-toolbar>
      <v-divider></v-divider>
      <QuotaWarning feature="contracts"></QuotaWarning>
      <v-card-text>
        <v-text-field
          :label="$t('labels.name')"
          :error-messages="errors.name"
          v-model="name"
          @input="$v.name.$touch()"
          placeholder="Set a name for your contract"
          autofocus
          required>
        </v-text-field>

        <v-text-field
          :label="$t('labels.address')"
          :error-messages="errors.address"
          v-model="address"
          @input="$v.address.$touch()"
          placeholder="0x12345678901234567890123456789012"
          required>
        </v-text-field>

        <ChainSelector
          :label="$t('labels.chain')"
          :error-messages="errors.chain"
          v-model="chain"
          @input="$v.chain.$touch()"
          required>
        </ChainSelector>

        <v-text-field
          :label="$t('labels.abi')"
          :error-messages="errors.abi"
          v-model="abi"
          @input="$v.abi.$touch()"
          :rows="6"
          multi-line
          required>
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary" dark block
          type="submit">
          {{ submitLabel || $t('submit') }}
        </v-btn>
      </v-card-actions>
    </form>
  </v-card>
</template>

<i18n>
  en:
    title: "Add a contract"
    submit: "Save the contract"
    cancel: "Cancel"
    labels:
      name: "Name"
      address: "Address"
      abi: "ABI"
      chain: "Blockchain"
</i18n>

<script>
  import { mapActions } from 'vuex'
  import withValidation from '@/mixins/withValidation'
  import withCurrentProject from '@/mixins/withCurrentProject'
  import {
    required,
    includedIn,
    minLength,
    maxLength,
    alphaNum,
    jsonValid,
    validEvents
  } from '@/validators'
  import abi from '@/mixins/abi'
  import QuotaWarning from '@/components/QuotaWarning'
  import ChainSelector from '@/components/ChainSelector'
  import MenuToggle from '@/components/MenuToggle'
  export default {
    components: {
      ChainSelector,
      QuotaWarning,
      MenuToggle
    },
    mixins: [
      withCurrentProject,
      abi,
      withValidation
    ],
    props: {
      contract: {
        type: Object,
        default: () => ({})
      },
      title: {
        type: String,
        default: null
      },
      submitLabel: {
        type: String,
        default: null
      }
    },
    data () {
      return {
        name: this.contract.name,
        address: this.contract.address,
        abi: JSON.stringify(this.contract.abi, null, 2),
        chain: this.contract.chain
      }
    },
    validations: {
      name: {
        required,
        minLength: minLength(3)
      },
      address: {
        required,
        alphaNum,
        minLength: minLength(process.env.CONTRACT_ADDRESS_LENGTH),
        maxLength: maxLength(process.env.CONTRACT_ADDRESS_LENGTH)
      },
      chain: {
        required,
        includedIn: includedIn(process.env.CHAINS.map(x => x.key))
      },
      abi: {
        required,
        jsonValid,
        validEvents
      }
    },
    methods: {
      ...mapActions({
        create: 'contracts/create',
        update: 'contracts/update'
      }),
      submit () {
        const method = this.contract.id ? this.update : this.create
        if (!this.validate()) { return }
        method({ variables: {
          id: this.contract.id,
          projectId: this.currentProjectId,
          name: this.name,
          address: this.address,
          abi: this.abiObject,
          chain: this.chain,
          public: this.contract.public || false
        }})
          .then(contract => this.$emit('saved', contract))
      }
    }
  }
</script>
