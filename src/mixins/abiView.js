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
  }
}
