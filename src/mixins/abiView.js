import PayloadViewer from '@/components/PayloadViewer'
import ToolbarWithContent from '@/components/ToolbarWithContent'
export default {
  components: {
    ToolbarWithContent,
    PayloadViewer
  },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  computed: {
    signature () {
      if (!this.value.inputs) { return this.name }
      return [
        this.value.type === 'constructor' ? 'Constructor' : this.value.name,
        '(',
        this.value.inputs.map(x => [x.name, x.type].join(': ')).join(', '),
        ')'
      ].join('')
    }
  }
}
