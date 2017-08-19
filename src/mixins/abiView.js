import PayloadViewer from '@/components/PayloadViewer'
import ToolbarWithContent from '@/components/ToolbarWithContent'
export default {
  components: {
    ToolbarWithContent,
    PayloadViewer
  },
  props: {
    contract: {
      type: Object,
      required: true
    },
    value: {
      type: Object,
      required: true
    }
  },
  computed: {
    signature () {
      const toParams = x => [x.name, x.type].join(': ')
      const collectionToParams = x => x.map(toParams).join(', ')
      return [
        this.value.type === 'constructor' ? 'Constructor' : this.value.name,
        '(',
        collectionToParams(this.value.inputs),
        ') ',
        this.value.outputs && this.value.outputs.length ? collectionToParams(this.value.outputs) : ''
      ].join('')
    }
  }
}
