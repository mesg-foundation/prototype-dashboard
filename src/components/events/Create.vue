<template>
  <EventForm
    v-if="webhook"
    :webhook="webhook"
    @saved="eventSaved">
  </EventForm>
</template>

<script>
  import item from '@/mixins/item'
  import EventForm from '@/components/events/Form'
  export default {
    components: {
      EventForm
    },
    mixins: [
      item('webhook', x => x.webhookId)
    ],
    props: {
      webhookId: {
        type: String,
        required: true
      }
    },
    methods: {
      eventSaved (event) {
        this.$router.push({ name: 'event', params: { id: event.id } })
      }
    }
  }
</script>
