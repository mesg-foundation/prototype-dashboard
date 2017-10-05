const errorLabels = {
  en: {
    required: 'Is required',
    minLength: 'Is too short',
    maxLength: 'Is too long',
    regex: 'Is not valid',
    alphaNum: 'Is not valid',
    includedIn: 'Is not in the list',
    jsonValid: 'Cannot parse it',
    validEvents: 'Events are invalid',
    withEvents: 'Needs at least one event'
  }
}

export default {
  computed: {
    validableFields () {
      return Object.keys(this.$v.$params)
    },
    errors () {
      return this.validableFields
        .filter(x => this.$v[x].$dirty)
        .reduce((acc, x) => ({
          ...acc,
          [x]: this.errorsFor(x)
        }), {})
    },
    rules () {
      return Object.keys(this.errors)
        .reduce((acc, x) => ({
          ...acc,
          [x]: this.errors[x].map(x => () => x)
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
    validate () {
      this.validableFields
        .forEach(x => this.$v[x].$touch())
      return this.isValid
    },
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
