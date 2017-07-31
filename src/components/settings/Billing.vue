<template>
  <v-card flat>
    <v-card-title class="headline">
      {{ $t('title', { from, to }) }}
    </v-card-title>
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
    labels:
      requests: "Requests number"
</i18n>

<script>
  import withCurrentProject from '@/mixins/withCurrentProject'
  export default {
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
