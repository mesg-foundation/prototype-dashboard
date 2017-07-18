import { withParams } from 'vuelidate/lib/validators/common'

const isValidEvent = event => !!event.name && Array.isArray(event.inputs)

export default withParams(
  { type: 'withEvents' },
  value => {
    try {
      return (JSON.parse(value) || [])
        .filter(x => x.type === 'event')
        .filter(x => !isValidEvent(x))
        .length === 0
    } catch (e) {
      return false
    }
  }
)
