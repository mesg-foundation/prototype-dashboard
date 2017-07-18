<template>
  <form @submit.prevent="submit()">
    <v-card>
      <v-card-title>
        {{ title || $t('title') }}
      </v-card-title>
      <v-card-text>
        <v-text-field
          :label="$t('labels.address')"
          v-model="address"
          placeholder="0x12345678901234567890123456789012"
          autofocus
          required>
        </v-text-field>

        <v-text-field
          :label="$t('labels.abi')"
          :rules="abiValidations"
          v-model="abi"
          :rows="6"
          multi-line
          required>
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn
          primary dark
          type="submit">
          {{ submitLabel || $t('submit') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </form>
</template>

<i18n>
  en:
    title: "Add a contract"
    submit: "Save the contract"
    labels:
      address: "Address"
      abi: "ABI"
</i18n>
<script>
  import { mapActions } from 'vuex'
  import abi from '@/mixins/abi'
  export default {
    mixins: [abi],
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
        abi: null
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
