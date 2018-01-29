<template>
  <v-expansion-panel class="mt-3">
    <v-expansion-panel-content v-for="action in actions" :key="action.id">
      <div slot="header">
        {{ action.title }}
        <span class="ml-3 caption" v-if="includePrice">
          Average price: 
          {{ Math.random() * 100 }} MESG
        </span>
      </div>
      <v-divider></v-divider>
      <v-card class="grey lighten-5">
        <v-card-text>
          <h4 class="subheading mb-4">Description</h4>
          <p class="mb-4">{{ action.description }}</p>
          <h4 class="subheading mb-4">{{ paramKey }}</h4>
          <v-data-table
            :headers="headers"
            :items="params(action)"
            hide-actions
            class="elevation-1 mt-4">
          <template slot="items" slot-scope="props">
            <td><strong>{{ props.item.title }}</strong></td>
            <td>{{ props.item.description }}</td>
            <td><code>{{ props.item.type }}</code></td>
            <td><code>{{ props.item.required }}</code></td>
          </template>
        </v-data-table>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  props: {
    actions: {
      type: Array,
      required: true
    },
    paramKey: {
      type: String,
      required: true
    },
    includePrice: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    headers () {
      return [
        { text: 'Name', align: 'left', sortable: false, value: 'title' },
        { text: 'Description', align: 'left', sortable: false, value: 'description' },
        { text: 'Type', align: 'left', sortable: false, value: 'type' },
        { text: 'Required', align: 'left', sortable: false, value: 'required' }
      ]
    }
  },
  methods: {
    params (action) {
      return action[this.paramKey]
    }
  }
}
</script>
