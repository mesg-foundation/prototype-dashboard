import { mapGetters, mapActions } from 'vuex'
import loading from '@/mixins/loading'

export default (collection, payloadFunction = component => ({})) => {
  const fetchFunction = `fetchAll${collection}`
  const reloadFunction = `reload${collection}`
  return {
    mixins: [loading(collection)],
    computed: {
      ...mapGetters({
        [collection]: `${collection}/collectionList`
      })
    },
    methods: {
      ...mapActions({
        [fetchFunction]: `${collection}/fetchAll`
      }),
      [reloadFunction] () {
        return this.commitLoading(_ => this[fetchFunction](payloadFunction(this)))
      }
    },
    mounted () {
      this[reloadFunction]()
    }
  }
}
