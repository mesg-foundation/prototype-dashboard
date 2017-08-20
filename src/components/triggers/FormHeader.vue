<template>
  <v-toolbar card class="secondary">
    <MenuToggle></MenuToggle>
    <v-toolbar-title class="headline">
      {{ trigger ? $t('update') : $t('title') }}
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items v-if="trigger">
      <v-switch
        class="mr-3"
        v-model="enable">
      </v-switch>
    </v-toolbar-items>
  </v-toolbar>
</template>

<i18n>
  en:
    title: "Create a trigger"
    update: "Update trigger"
</i18n>

<script>
  import { mapActions } from 'vuex'
  import MenuToggle from '@/components/MenuToggle'
  export default {
    components: {
      MenuToggle
    },
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
