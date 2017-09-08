<template>
  <v-switch
    v-model="enable">
  </v-switch>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    props: {
      trigger: {
        type: Object,
        default: null
      }
    },
    data () {
      return {
        enable: this.trigger ? this.trigger.enable : false
      }
    },
    watch: {
      enable () {
        if (!this.trigger) { return }
        this.updateTrigger({ variables: {
          id: this.trigger.id,
          enable: this.enable
        }})
      }
    },
    methods: mapActions({
      updateTrigger: 'triggers/update'
    })
  }
</script>
