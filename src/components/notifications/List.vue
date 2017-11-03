<template>
  <v-list two-line>
    <template v-for="(notification, i) in notifications">
      <v-divider v-if="i !== 0" :key="notification.id"></v-divider>
      <v-list-tile :key="notification.id" router :to="{ name: 'Trigger', params: notification.trigger }">
        <v-list-tile-avatar>
          <v-icon :class="`${error[notification.kind].level}--text`">{{ error[notification.kind].icon }}</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ notification.trigger.title }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ $t(`type.${notification.kind}`) }}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-list-tile-action-text>
            <timeago :since="notification.createdAt" :auto-update="10"></timeago>
          </v-list-tile-action-text>
        </v-list-tile-action>
      </v-list-tile>
    </template>
  </v-list>
</template>

<i18n>
  en:
    type:
      TRIGGER_ERROR: "Error on your trigger"
      TRIGGER_DISABLED: "Trigger disabled"
</i18n>

<script>
export default {
  props: {
    notifications: {
      type: Array,
      required: true
    }
  },
  computed: {
    error () {
      return {
        TRIGGER_ERROR: { level: 'warning', icon: 'warning' },
        TRIGGER_DISABLED: { level: 'error', icon: 'error' }
      }
    }
  }
}
</script>
