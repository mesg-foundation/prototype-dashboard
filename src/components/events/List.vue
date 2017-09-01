<template>
  <table-listing
    :headers="headers"
    :items="events"
    :title="title"
    :loading="loadingEvents"
    :pagination="eventsPagination"
    :total="eventsTotal"
    @pageChanged="eventsChangePage"
    extended
    withMenu>
    <template v-if="trigger" slot="toolbar">
      <PopupPageButton
        :title="$t('update')"
        :to="{ name: 'EditTrigger', params: { id: trigger.id } }"
        primary outline
        v-model="formModal">
        <TriggerForm
          :trigger="trigger"
          :contract="trigger.contract"
          @saved="closeFormModal()">
        </TriggerForm>
      </PopupPageButton>
      <PopupPageButton
        :title="$t('test')"
        :to="{ name: 'ExecuteTrigger', params: { triggerId: trigger.id } }"
        primary outline
        v-model="testModal">
        <EventForm
          :trigger="trigger"
          @saved="closeTestModal()">
        </EventForm>
      </PopupPageButton>
    </template>
    <TriggerDetailList
      slot="extension"
      class="secondary"
      v-if="trigger"
      :trigger="trigger">
    </TriggerDetailList>
    <template scope="event">
      <td>
        <router-link :to="{ name: 'Event', params: { id: event.id, triggerId: trigger.id } }">
          <timeago :since="event.createdAt" :auto-update="10"></timeago>
        </router-link>
      </td>
      <td>
        {{ event.transactionId }}
      </td>
      <td>
        {{ event.payload }}
      </td>
      <td>
        {{ event._taskLogsMeta.count }}
      </td>
    </template>
  </table-listing>
</template>

<i18n>
  en:
    test: "Test"
    update: "Update"
    header:
      createdAt: "Created At"
      transactionId: "Transaction ID"
      payload: "Data"
      attempts: "Attempts"
</i18n>

<script>
  import item from '@/mixins/item'
  import collection from '@/mixins/collection'
  import TableListing from '@/components/layouts/TableListing'
  import EventForm from '@/components/events/Form'
  import TriggerForm from '@/components/triggers/Form'
  import TriggerDetailList from '@/components/triggers/DetailList'
  import PopupPageButton from '@/components/PopupPageButton'
  export default {
    components: {
      TableListing,
      EventForm,
      TriggerForm,
      TriggerDetailList,
      PopupPageButton
    },
    mixins: [
      item('trigger'),
      collection('events', { pagination: true })
    ],
    props: {
      id: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        formModal: false,
        testModal: false
      }
    },
    computed: {
      eventsParams () {
        return {
          triggerId: this.id,
          ...this.eventsPagination
        }
      },
      title () {
        if (!this.trigger) { return '' }
        return [
          this.trigger.service.name,
          this.trigger.contract.name,
          this.trigger.eventName
        ].join(' - ')
      },
      headers () {
        return [
          { text: this.$t('header.createdAt'), align: 'left', sortable: false, value: 'createdAt' },
          { text: this.$t('header.transactionId'), align: 'left', sortable: false, value: 'transactionId' },
          { text: this.$t('header.payload'), align: 'left', sortable: false, value: 'payload' },
          { text: this.$t('header.attempts'), align: 'left', sortable: false, value: '_taskLogsMeta' }
        ]
      }
    },
    methods: {
      closeTestModal () {
        this.testModal = false
      },
      closeFormModal () {
        this.formModal = false
      }
    }
  }
</script>
