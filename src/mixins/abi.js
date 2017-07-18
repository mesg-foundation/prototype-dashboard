const ABI_PARSE_ERROR = vm => value => vm
  .parseAbi(value)
  .length > 0 || 'Cannot parse this ABI'

const ABI_EVENT_LENGTH_ERROR = vm => value => vm
  .extractEvents(vm.parseAbi(value))
  .length > 0 || 'This ABI contains no events'

const ABI_VALID_EVENTS = vm => value => vm
  .extractEvents(vm.parseAbi(value))
  .filter(event => !event.name || !Array.isArray(event.inputs))
  .length === 0 || 'Some events are not valid, an event should contains a `name`, a `type` === \'event\' and an array of `inputs`'

export default {
  computed: {
    abiObject () {
      return this.parseAbi(this.abi)
    },
    abiValidations () {
      return [
        ABI_PARSE_ERROR(this),
        ABI_EVENT_LENGTH_ERROR(this),
        ABI_VALID_EVENTS(this)
      ]
    },
    events () {
      return this.extractEvents(this.abiObject)
    }
  },
  methods: {
    parseAbi (abi) {
      try {
        return JSON.parse(abi)
      } catch (e) {
        return []
      }
    },
    extractEvents (abiObject) {
      return abiObject.filter(e => e.type === 'event') || []
    }
  }
}
