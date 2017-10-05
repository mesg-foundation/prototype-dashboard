import { url, email, required, minLength, maxLength, alphaNum } from 'vuelidate/lib/validators'
import { regex } from 'vuelidate/lib/validators/common'
import includedIn from './includedIn'
import jsonValid from './jsonValid'
import validEvents from './validEvents'
import withEvents from './withEvents'

export {
  regex,
  url,
  email,
  required,
  minLength,
  maxLength,
  alphaNum,
  includedIn,
  jsonValid,
  validEvents,
  withEvents
}
