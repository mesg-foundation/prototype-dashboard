import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VueTimeago from 'vue-timeago'
import dateTimeFormats from './dateTimeFormats'
import numberFormats from './numberFormats'

Vue.use(VueTimeago, {
  name: 'timeago',
  locale: 'en-US',
  locales: {
    'en-US': require('vue-timeago/locales/en-US.json')
  }
})

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  dateTimeFormats,
  numberFormats
})
