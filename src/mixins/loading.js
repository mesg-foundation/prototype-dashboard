export default {
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async commitLoading (callback) {
      this.loading = true
      try {
        const result = await callback()
        this.loading = false
        return result
      } catch (e) {
        this.loading = false
        throw e
      }
    }
  }
}
