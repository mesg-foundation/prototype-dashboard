import { mapGetters, mapActions } from 'vuex'
import Utils from '@/utils'
import loading from '@/mixins/loading'

export default (collection, payloadFunction = component => ({})) => {
  const fetchFunction = `fetchAll${collection}`
  const reloadFunction = `reload${collection}`
  const ids = `${collection}Ids`
  const list = `${collection}List`
  return {
    mixins: [loading(collection)],
    computed: {
      ...mapGetters({
        [ids]: `${collection}/collection`,
        [list]: `${collection}/collectionList`
      }),
      [collection] () {
        return (this[list][Utils.dataToUrlString(payloadFunction(this))] || [])
          .map(x => this[ids][x])
      }
    },
    methods: {
      ...mapActions({
        [fetchFunction]: `${collection}/fetchAll`
      }),
      [reloadFunction] () {
        return this.commitLoading(_ => this[fetchFunction]({ variables: payloadFunction(this) }))
      }
    },
    mounted () {
      this[reloadFunction]()
    }
  }
}
