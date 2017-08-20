const hasDialogParent = component => {
  if (!component.$parent) { return false }
  if (component.$options._componentTag && component.$options._componentTag.toLowerCase() === 'v-dialog') { return true }
  return hasDialogParent(component.$parent)
}

export default {
  computed: {
    inDialog () {
      return hasDialogParent(this)
    }
  }
}
