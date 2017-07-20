import { mapGetters, mapActions } from 'vuex'
import loading from '@/mixins/loading'

export default item => {
  const collection = `${item}s`
  return {
    mixins: [loading(item)],
    computed: {
      ...mapGetters({
        collection: `${collection}/collection`
      }),
      [item] () {
        return this.collection[this.id]
      }
    },
    methods: {
      ...mapActions({
        fetch: `${collection}/fetch`
      }),
      reload () {
        return this.commitLoading(_ => this.fetch({ id: this.id }))
      }
    },
    mounted () {
      this.reload()
    }
  }
}
