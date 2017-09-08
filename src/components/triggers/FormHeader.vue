<template>
  <v-toolbar card class="secondary">
    <MenuToggle></MenuToggle>
    <v-toolbar-title class="headline">
      {{ trigger ? $t('update') : $t('title') }}
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items v-if="trigger">
      <TriggerSwitch
        class="mr-3"
        :trigger="trigger">
      </TriggerSwitch>
    </v-toolbar-items>
  </v-toolbar>
</template>

<i18n>
  en:
    title: "Create a trigger"
    update: "Update trigger"
</i18n>

<script>
  import MenuToggle from '@/components/MenuToggle'
  import TriggerSwitch from '@/components/triggers/Switch'
  export default {
    components: {
      MenuToggle,
      TriggerSwitch
    },
    props: {
      trigger: {
        type: Object,
        default: null
      }
    }
  }
</script>
