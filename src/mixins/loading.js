export default (loaderName = null) => {
  const loaderAttribute = [
    'loading',
    loaderName ? loaderName[0].toUpperCase() : null,
    loaderName ? loaderName.substr(1) : null
  ].join('')
  return {
    data () {
      return {
        [loaderAttribute]: false
      }
    },
    methods: {
      async commitLoading (callback) {
        this[loaderAttribute] = true
        try {
          const result = await callback()
          this[loaderAttribute] = false
          return result
        } catch (e) {
          this[loaderAttribute] = false
          throw e
        }
      }
    }
  }
}
