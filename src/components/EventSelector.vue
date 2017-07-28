<template>
  <v-select
    :disabled="events.length === 0"
    :label="label"
    :items="events"
    :required="required"
    :error-messages="errorMessages"
    :value="event"
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
  import input from '@/mixins/input'
  export default {
    mixins: [input],
    props: {
      contract: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        event: this.value
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
