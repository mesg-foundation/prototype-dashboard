<template>
  <v-container fluid class="pa-4">
    <v-card class="mb-4">
      <v-card-text>
        <v-layout row>
          <QrCode class="mr-3" size="125" :value="address"></QrCode>
          <div>
            <h1 class="headline">Anthony</h1>
            <v-text-field
              style="width:400px"
              prepend-icon="content_copy"
              :value="address"
              readonly 
              hide-details
              full-width>
            </v-text-field>
            <h4 class="subheading mt-2">Balance: <strong>123 MESG</strong></h4>
          </div>
        </v-layout>
      </v-card-text>
    </v-card>
    <h2 class="subheading mb-3">Transactions</h2>
    <v-card flat>
      <v-data-table
        :headers="headers"
        :items="transactions"
        hide-actions
        class="elevation-1">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.date.toString() }}</td>
          <td>{{ props.item.from }}</td>
          <td>{{ props.item.to }}</td>
          <td>{{ props.item.amount }} MESG</td>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import QrCode from '~/components/QrCode'
export default {
  computed: {
    address () { return 'D9XudzQXYsSoP5regqkimRWM1WbjjRY6kt' },
    transactions () {
      const DAYS = 1000 * 60 * 60 * 60
      return [
        { date: new Date(Date.now() - 50 * DAYS), id: '394871948613413', from: 'Anthony', to: 'Nicolas', amount: 200 },
        { date: new Date(Date.now() - 100 * DAYS), id: '394871948613413', from: 'Nicolas', to: 'Anthony', amount: 300 }
      ]
    },
    headers () {
      return [
        { text: 'Date', align: 'left', sortable: true, value: 'date' },
        { text: 'From', align: 'left', sortable: true, value: 'from' },
        { text: 'To', align: 'left', sortable: true, value: 'to' },
        { text: 'Amount', align: 'left', sortable: true, value: 'amount' }
      ]
    }
  },
  components: {
    QrCode
  }
}
</script>
