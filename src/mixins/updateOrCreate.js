import { mapActions } from 'vuex'

export default resource => ({
  methods: {
    ...mapActions({
      [`create${resource}`]: `${resource.toLowerCase()}s/create`,
      [`update${resource}`]: `${resource.toLowerCase()}s/update`
    }),
    [`updateOrCreate${resource}`] (variables) {
      return variables.id
        ? this[`update${resource}`]({ variables })
        : this[`create${resource}`]({ variables })
    }
  }
})
