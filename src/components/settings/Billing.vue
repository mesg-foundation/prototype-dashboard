<template>
  <v-card flat>
    <v-toolbar card class="transparent">
      <v-toolbar-title class="headline">
        {{ $t('title', { from, to }) }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        success dark
        router :to="{ name: 'Plans' }">
        {{ $t('upgrade') }}
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <label>
        {{ $t('labels.requests') }}
        ({{ this.currentProject.requestsCount }} / {{ this.currentProject.requestsMax }})
      </label>
      <v-progress-linear
        :size="100"
        :width="15"
        :rotate="-90"
        :value="percent"
        class="primary--text">
      </v-progress-linear>
    </v-card-text>
  </v-card>
</template>

<i18n>
  en:
    title: "Usage ({from} - {to})"
    upgrade: "Upgrade my plan"
    labels:
      requests: "Requests number"
</i18n>

<script>
  import withCurrentProject from '@/mixins/withCurrentProject'
  import Plans from '@/components/Plans'
  export default {
    components: {
      Plans
    },
    mixins: [withCurrentProject],
    computed: {
      percent () {
        return this.currentProject.requestsCount / this.currentProject.requestsMax * 100
      },
      today () {
        return new Date()
      },
      from () {
        return new Date(this.today.getFullYear(), this.today.getMonth()).toLocaleDateString()
      },
      to () {
        return new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0).toLocaleDateString()
      }
    }
  }
</script>
