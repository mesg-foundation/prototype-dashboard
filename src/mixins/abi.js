
export default {
  computed: {
    abiObject () {
      try {
        return JSON.parse(this.abi)
      } catch (e) {
        return []
      }
    },
    events () {
      return this.abiObject
        .filter(e => e.type === 'event') || []
    }
  }
}
