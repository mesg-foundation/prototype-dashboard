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
          {{ data.item.inputs }}
        </v-list-tile-sub-title>
      </v-list-tile-content>
    </template>
  </v-select>
</template>

<script>
  export default {
    props: {
      abi: {
        type: Array,
        default: () => []
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
        return this.abi
          .filter(e => e.type === 'event')
          .map(event => ({
            ...event,
            inputs: this.inputs(event)
          }))
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
