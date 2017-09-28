<template>
  <v-card flat>
    <form novalidate @submit.prevent="submit()">
      <v-toolbar card class="secondary">
        <MenuToggle></MenuToggle>
        <v-toolbar-title class="headline">{{ $t('title') }}</v-toolbar-title>
      </v-toolbar>
      <v-divider></v-divider>
      <TriggerDetailList
        :trigger="trigger">
      </TriggerDetailList>
      <v-divider></v-divider>
      <PayloadViewer
        v-if="ethereumContractConnector"
        :ethereumContractConnector="ethereumContractConnector"
        @input="$v.payload.$touch()"
        v-model="payload"
        editable>
      </PayloadViewer>
      <v-card-actions>
        <v-btn
          primary dark block
          type="submit">
          {{ $t('submit') }}
        </v-btn>
      </v-card-actions>
    </form>
  </v-card>
</template>

<i18n>
  en:
    title: "Test the trigger"
    submit: "Send test event"
</i18n>

<script>
  import withValidation from '@/mixins/withValidation'
  import { mapActions } from 'vuex'
  import { required } from '@/validators'
  import TriggerDetailList from '@/components/triggers/DetailList'
  import PayloadViewer from '@/components/PayloadViewer'
  import MenuToggle from '@/components/MenuToggle'
  export default {
    components: {
      TriggerDetailList,
      PayloadViewer,
      MenuToggle
    },
    mixins: [
      withValidation
    ],
    props: {
      trigger: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        payload: ''
      }
    },
    validations: {
      payload: {
        required
      }
    },
    computed: {
      ethereumContractConnector () {
        return this.trigger.connector.ethereumContract
      }
    },
    methods: {
      ...mapActions({
        createEvent: 'events/create'
      }),
      submit () {
        if (!this.validate()) { return }
        this.createEvent({ variables: {
          triggerId: this.trigger.id,
          payload: this.payload,
          transactionId: '0x0000000000000000000000000000000000000000'
        }})
          .then(event => this.$emit('saved', event))
      }
    }
  }
</script>
