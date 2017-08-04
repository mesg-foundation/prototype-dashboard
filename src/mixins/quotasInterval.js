export default {
  computed: {
    today () {
      return new Date()
    },
    quotaLimitFrom () {
      return new Date(
        this.today.getFullYear(),
        this.today.getMonth()
      )
    },
    quotaLimitTo () {
      return new Date(
        this.today.getFullYear(),
        this.today.getMonth() + 1,
        0
      )
    }
  }
}
