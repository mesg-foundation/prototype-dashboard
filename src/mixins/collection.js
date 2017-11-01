import { mapGetters, mapActions } from 'vuex'
import Utils from '@/utils'
import loading from '@/mixins/loading'

export default (collection, { payloadFunction, pagination, syncUrl } = {}) => {
  payloadFunction = payloadFunction || `${collection}Params`
  const fetchFunction = `fetchAll${collection}`
  const reloadFunction = `reload${collection}`
  const ids = `${collection}Ids`
  const list = `${collection}List`
  const collectionPagination = `${collection}Pagination`
  return {
    mixins: [loading(collection)],
    data () {
      if (!pagination) { return {} }
      return {
        [collectionPagination]: {
          itemPerPage: 15,
          page: syncUrl ? this.$route.query.page || 1 : 1
        }
      }
    },
    computed: {
      ...mapGetters({
        [ids]: `${collection}/collection`,
        [list]: `${collection}/collectionList`
      }),
      [`${collection}Current`] () {
        const params = this[payloadFunction]
        const key = Utils.dataToUrlString(params)
        return this[list][key] || {}
      },
      [collection] () {
        return (this[`${collection}Current`].list || []).map(x => this[ids][x])
      },
      [`${collection}Total`] () {
        return this[`${collection}Current`].total
      }
    },
    methods: {
      ...mapActions({
        [fetchFunction]: `${collection}/fetchAll`
      }),
      [reloadFunction] () {
        return this.commitLoading(_ => this[fetchFunction]({
          variables: this[payloadFunction]
        }))
      },
      [`${collection}ChangePage`] (page) {
        this[collectionPagination] = {
          ...this[collectionPagination],
          page
        }
        if (syncUrl) {
          this.$router.push({
            ...this.$route,
            query: {
              ...this.$route.query,
              page
            }
          })
        }
      }
    },
    watch: {
      [payloadFunction] () {
        this[reloadFunction]()
      }
    },
    mounted () {
      this[reloadFunction]()
    }
  }
}
