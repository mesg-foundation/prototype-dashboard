<template>
  <v-card>
    <v-card-title class="headline">Executions</v-card-title>
    <v-divider></v-divider>
    <v-data-table
      :headers="headers"
      :items="executions"
      hide-actions>
      <template slot="items" slot-scope="props">
        <td>
          <nuxt-link :to="`/execution/${props.item.id}`">
            #{{ props.item.id }}
          </nuxt-link>
        </td>
        <td>
          <v-progress-linear :color="props.item.error ? 'error' : 'primary'" :value="props.item.progress"></v-progress-linear>
        </td>
        <td class="text-xs-right">{{ props.item.duration }} ms</td>
        <td class="text-xs-right">{{ props.item.cost }} MESG</td>
        <td class="text-xs-right">{{ props.item.executedAt }}</td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  computed: {
    headers () {
      return [
        { text: 'ID', align: 'left', sortable: false, value: 'id' },
        { text: 'Progress', align: 'left', sortable: false, value: 'progress' },
        { text: 'Duration (ms)', align: 'right', sortable: false, value: 'duration' },
        { text: 'Cost (MESG)', align: 'right', sortable: false, value: 'cost' },
        { text: 'Date', align: 'right', sortable: false, value: 'executedAt' }
      ]
    },
    executions () {
      const daysAgo = x => new Date(Date.now() - x * 1000 * 60 * 60).toString()
      return [...new Array(10)]
        .map(_ => Math.random() * 50)
        .map((x, i) => ({
          id: i + 1,
          duration: parseInt(x, 10),
          executedAt: daysAgo(i + Math.random()),
          cost: parseInt(x * 0.2, 10),
          progress: parseInt(Math.random() * 100, 10),
          error: Math.random() > 0.8
        }))
    }
  }
}
</script>
