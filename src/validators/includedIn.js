import { withParams } from 'vuelidate/lib/validators/common'

export default list => withParams(
  { type: 'includedIn', list },
  value => list.indexOf(value) >= 0
)
