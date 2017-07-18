<template>
  <v-select
    :disabled="events.length === 0"
    :label="label"
    :items="events"
    :required="required"
    :input="event"
    @input="e => $emit('input', e)"
    item-text="name"
    item-value="name"
    autocomplete>
    <template slot="item" scope="data">
      <v-list-tile-content>
        <v-list-tile-title>
          {{ data.item.name }}
        </v-list-tile-title>
        <v-list-tile-sub-title>
          {{ inputs(data.item) }}
        </v-list-tile-sub-title>
      </v-list-tile-content>
    </template>
  </v-select>
</template>

<script>
  export default {
    props: {
      contract: {
        type: Object,
        required: true
      },
      input: {
        type: String,
        default: ''
      },
      required: {
        type: Boolean,
        default: false
      },
      label: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        event: this.input
      }
    },
    computed: {
      events () {
        return this.contract.abi
          .filter(event => event.type === 'event')
      }
    },
    methods: {
      inputs (event) {
        return (event.inputs || [])
          .map(e => [e.name, e.type].join(': '))
          .join(', ')
      }
    }
  }
</script>
