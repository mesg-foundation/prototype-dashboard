import { mapGetters, mapActions } from 'vuex'
import loading from '@/mixins/loading'

export default item => {
  const collection = `${item}s`
  const reloadFunc = `reload${item}`
  const fetchFunc = `fetch${item}`
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
        [fetchFunc]: `${collection}/fetch`
      }),
      [reloadFunc] () {
        return this.commitLoading(() => this[fetchFunc]({ id: this.id }))
      }
    },
    mounted () {
      this[reloadFunc]()
    }
  }
}
