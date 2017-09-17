<template>
  <EventForm
    v-if="trigger"
    :trigger="trigger"
    @saved="eventSaved">
  </EventForm>
</template>

<i18n>
  en:
    title: "Test trigger"
</i18n>

<script>
  import item from '@/mixins/item'
  import EventForm from '@/components/events/Form'
  export default {
    components: {
      EventForm
    },
    mixins: [
      item('trigger', x => x.triggerId)
    ],
    props: {
      triggerId: {
        type: String,
        required: true
      }
    },
    metaInfo () {
      return {
        title: this.$t('title')
      }
    },
    methods: {
      eventSaved (event) {
        this.$router.push({ name: 'Trigger', params: { id: this.triggerId } })
      }
    }
  }
</script>
