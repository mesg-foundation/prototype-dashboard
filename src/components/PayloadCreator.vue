<template>
  <v-data-table
    :headers="headers"
    :items="signature"
    :custom-sort="a => a"
    hide-actions>
    <template slot="items" scope="props">
      <td>
        {{ props.item.name }}
      </td>
      <td>
        {{ props.item.type }}
      </td>
      <td>
        <v-text-field
          class="ma-0 pl-0"
          placeholder="..."
          hide-details
          full-width
          :value="params[props.item.name]"
          @input="e => updateValue(props.item.name, e)">
        </v-text-field>
      </td>
    </template>
  </v-data-table>
</template>

<i18n>
  en:
    header:
      name: "Parameter"
      type: "Type"
      value: "Value"
</i18n>

<script>
  import input from '@/mixins/input'
  export default {
    mixins: [input],
    props: {
      signature: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        params: {}
      }
    },
    computed: {
      headers () {
        return [
          { text: this.$t('header.name'), align: 'left', sortable: false },
          { text: this.$t('header.type'), align: 'left', sortable: false },
          { text: this.$t('header.value'), align: 'left', sortable: false }
        ]
      }
    },
    methods: {
      convert (type, value) {
        if (type === 'bool') { return value === 'true' }
        if (type.match(/u?int.*/)) { return parseFloat(value) }
        return value
      },
      updateValue (item, value) {
        const convertedValue = this.convert(this.signature.find(e => e.name === item).type, value)
        this.params = {
          ...this.params,
          [item]: convertedValue
        }
        this.$emit('input', this.params)
      }
    }
  }
</script>
