<template>
  <v-layout column>
    <form novalidate @submit.prevent="submit()">
      <div>
        <v-toolbar card class="secondary">
          <MenuToggle></MenuToggle>
          <v-toolbar-title class="headline">{{ $t('title') }}</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
      </div>
      <div class="full-content-height scrollable">
        <TriggerDetailList
          :trigger="trigger">
        </TriggerDetailList>
        <v-divider></v-divider>
        <v-data-table
          :headers="headers"
          :items="items"
          :custom-sort="a => a"
          hide-actions>
          <template slot="items" scope="props">
            <td>
              <strong>{{ $t(`keys.${props.item.key}`) }}</strong>
            </td>
            <td>
              <PayloadViewer
                v-if="props.item.type === 'payload'"
                :contractId="ethereumContractConnector.contract.id"
                type="event"
                :name="ethereumContractConnector.eventName"
                v-model="params[props.item.key]"
                editable>
              </PayloadViewer>
              <v-text-field
                v-else
                class="ma-0 pl-0 elevation-0"
                placeholder="..."
                solo
                v-model="params[props.item.key]"
                :type="props.item.type">
              </v-text-field>
            </td>
          </template>
        </v-data-table>
        <v-card-actions>
          <v-btn
            color="primary" dark block
            type="submit">
            {{ $t('submit') }}
          </v-btn>
        </v-card-actions>
      </div>
    </form>
  </v-layout>
</template>

<i18n>
  en:
    title: "Test the trigger"
    submit: "Send test event"
    header:
      key: "Key"
      value: "Value"
    keys:
      transactionId: 'transactionId'
      blockId: 'blockId'
      from: 'from'
      to: 'to'
      value: 'value'
      fees: 'fees'
      payload: 'payload'
</i18n>

<script>
  import { mapActions } from 'vuex'
  import uuidv4 from 'uuid/v4'
  import TriggerDetailList from '@/components/triggers/DetailList'
  import PayloadViewer from '@/components/PayloadViewer'
  import MenuToggle from '@/components/MenuToggle'
  export default {
    components: {
      TriggerDetailList,
      PayloadViewer,
      MenuToggle
    },
    props: {
      trigger: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        params: {
          key: uuidv4(),
          transactionId: '0x0000000000000000000000000000000000000000',
          blockId: '0000000',
          from: '0x1111111111111111111111111111111111111111',
          to: '0x2222222222222222222222222222222222222222',
          value: '0',
          fees: '0',
          payload: {}
        }
      }
    },
    computed: {
      ethereumContractConnector () {
        return this.trigger.connector.ethereumContract
      },
      headers () {
        return [
          { text: this.$t('header.key'), align: 'left', sortable: false },
          { text: this.$t('header.value'), align: 'left', sortable: false }
        ]
      },
      items () {
        return [
          { key: 'transactionId', type: 'text' },
          { key: 'blockId', type: 'text' },
          { key: 'from', type: 'text' },
          { key: 'to', type: 'text' },
          { key: 'value', type: 'text' },
          { key: 'fees', type: 'text' },
          this.ethereumContractConnector
            ? { key: 'payload', type: 'payload' }
            : null
        ]
          .filter(x => x)
      }
    },
    methods: {
      ...mapActions({
        createEvent: 'events/create'
      }),
      submit () {
        this.createEvent({ variables: {
          triggerId: this.trigger.id,
          ...this.params,
          executedAt: new Date()
        } })
          .then(event => this.$emit('saved', event))
      }
    }
  }
</script>
