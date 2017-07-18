import { mapGetters, mapActions } from 'vuex'
import loading from '@/mixins/loading'

export default (collection, payloadFunction = component => ({})) => ({
  mixins: [loading],
  computed: {
    ...mapGetters({
      [collection]: `${collection}/collectionList`
    })
  },
  methods: {
    ...mapActions({
      fetchAll: `${collection}/fetchAll`
    }),
    reload () {
      return this.commitLoading(_ => this.fetchAll(payloadFunction(this)))
    }
  },
  mounted () {
    this.reload()
  }
})
