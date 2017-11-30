<template>
  <v-card flat>
    <v-card-text>
      <v-text-field
        v-if="key"
        :prefix="baseEndpoint + '/'"
        readonly
        :value="key"
        :label="$t('labels.endpoint')"
        append-icon="refresh"
        :append-icon-cb="generateKey">
      </v-text-field>
      <p>{{ $t('text1') }}</p>
      <pre>
        <code>
{{ endpoint }}
        </code>
      </pre>
      <p>{{ $t('text2') }}</p>
      <pre>
        <code>
curl -XPOST -d foo=bar {{ endpoint }}
        </code>
      </pre>
    </v-card-text>
  </v-card>
</template>

<i18n>
  en:
    text1: "When your trigger is created you will be able to post some data to this address"
    text2: "You can try (when you trigger created) to POST some data on this address with the following command"
    labels:
      endpoint: "Endpoint of your webhook"
</i18n>

<script>
import uuidv4 from 'uuid/v4'
import { required } from '@/validators'
import withValidation from '@/mixins/withValidation'
export default {
  mixins: [
    withValidation
  ],
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      key: this.value.key
    }
  },
  computed: {
    baseEndpoint () {
      return process.env.WEBHOOK_BASE_ADDRESS
    },
    endpoint () {
      return [this.baseEndpoint, this.key].join('/')
    }
  },
  validations: {
    key: {
      required
    }
  },
  methods: {
    generateKey () {
      this.key = uuidv4()
      if (!this.validate()) { return this.$emit('input', null) }
      this.$emit('input', {
        key: this.key
      })
    }
  },
  mounted () {
    if (!this.key) { this.generateKey() }
  }
}
</script>
