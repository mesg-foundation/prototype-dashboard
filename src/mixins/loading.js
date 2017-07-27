import Utils from '@/utils'

export default (loaderName = null) => {
  const loaderAttribute = [
    'loading',
    loaderName ? Utils.toHuman(loaderName) : null
  ].filter(x => x).join('')
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
