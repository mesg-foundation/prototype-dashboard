<template>
  <v-card flat>
    <form @submit.prevent="submit()">
      <v-toolbar card class="secondary">
        <v-toolbar-title class="headline">{{ title || $t('title') }}</v-toolbar-title>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-text-field
          :label="$t('labels.address')"
          :error-messages="errors.address"
          v-model="address"
          @input="$v.address.$touch()"
          placeholder="0x12345678901234567890123456789012"
          autofocus
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
          primary dark
          :disabled="!isValid"
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
    labels:
      address: "Address"
      abi: "ABI"
      chain: "Blockchain"
</i18n>

<script>
  import withValidation from '@/mixins/withValidation'
  import { mapActions } from 'vuex'
  import {
    required,
    includedIn,
    minLength,
    maxLength,
    alphaNum,
    jsonValid,
    withEvents,
    validEvents
  } from '@/validators'
  import abi from '@/mixins/abi'
  import ChainSelector from '@/components/ChainSelector.vue'
  export default {
    components: {
      ChainSelector
    },
    mixins: [
      abi,
      withValidation
    ],
    props: {
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
        address: null,
        abi: null,
        chain: null
      }
    },
    validations: {
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
        withEvents,
        validEvents
      }
    },
    methods: {
      ...mapActions({
        createContract: 'contracts/create'
      }),
      submit () {
        this.createContract({
          address: this.address,
          abi: this.abiObject
        })
          .then(contract => this.$emit('saved', contract))
      }
    }
  }
</script>
