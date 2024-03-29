import { withParams } from 'vuelidate/lib/validators/common'

export default withParams(
  { type: 'withEvents' },
  value => {
    try {
      return (JSON.parse(value) || [])
        .filter(x => x.type === 'event')
        .length > 0
    } catch (e) {
      return false
    }
  }
)
