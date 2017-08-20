const errorLabels = {
  en: {
    required: 'Is required',
    minLength: 'Is too short',
    maxLength: 'Is too long',
    alphaNum: 'Is invalid',
    includedIn: 'Is not in the list',
    jsonValid: 'Cannot parse it',
    validEvents: 'Events are invalid',
    withEvents: 'Needs at least one event'
  }
}

export default {
  computed: {
    errors () {
      return Object.keys(this.$v.$params)
        .filter(x => this.$v[x].$dirty)
        .reduce((acc, x) => ({
          ...acc,
          [x]: this.errorsFor(x)
        }), {})
    },
    errorsCount () {
      return Object.keys(this.errors)
        .reduce((sum, x) => sum + this.errors[x].length, 0)
    },
    isValid () {
      return this.errorsCount === 0 && !this.$v.$error && !this.$v.$invalid
    }
  },
  methods: {
    errorsFor (key) {
      return Object
        .keys(this.$v[key].$params)
        .filter(type => !this.$v[key][type])
        .map(type => {
          const { messages, locale } = this.$i18n
          const localizedMessages = messages[locale]
          const errorKeyType = ((localizedMessages.errors || {})[key] || {})[type]
          const errorType = (localizedMessages.errors || {})[type]
          if (errorKeyType) { return errorKeyType }
          if (errorType) { return errorType }
          if (errorLabels[locale][type]) { return errorLabels[locale][type] }
          return type
        })
    }
  }
}
