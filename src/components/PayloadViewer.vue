<template>
  <v-data-table
    v-if="signature.length"
    :headers="headers"
    :items="signature"
    :custom-sort="a => a"
    hide-actions>
    <template slot="items" scope="props">
      <td>
        <strong>{{ props.item.name }}</strong>
      </td>
      <td>
        {{ props.item.type }}
      </td>
      <td v-if="editable">
        <v-text-field
          class="ma-0 pl-0"
          placeholder="..."
          hide-details
          full-width
          :value="payload[props.item.name]"
          @input="e => updateValue(props.item.name, e)">
        </v-text-field>
      </td>
    </template>
  </v-data-table>
</template>

<i18n>
  en:
    noParameters: "No parameters"
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
      },
      editable: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        payload: {}
      }
    },
    computed: {
      headers () {
        return [
          { text: this.$t('header.name'), align: 'left', sortable: false },
          { text: this.$t('header.type'), align: 'left', sortable: false },
          this.editable ? { text: this.$t('header.value'), align: 'left', sortable: false } : null
        ].filter(x => x)
      }
    },
    methods: {
      updateValue (item, value) {
        if (!this.editable) { return }
        this.payload[item] = value
        this.$emit('input', JSON.stringify(this.payload))
      }
    }
  }
</script>
