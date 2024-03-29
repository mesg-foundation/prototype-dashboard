import { mapGetters, mapActions } from 'vuex'
import loading from '@/mixins/loading'

export default (item, idGetter = component => component.id) => {
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
        return this.collection[idGetter(this)]
      }
    },
    methods: {
      ...mapActions({
        [fetchFunc]: `${collection}/fetch`
      }),
      [reloadFunc] () {
        if (!idGetter(this)) { return }
        return this.commitLoading(() => this[fetchFunc]({ variables: { id: idGetter(this) } }))
      }
    },
    mounted () {
      this[reloadFunc]()
    }
  }
}
