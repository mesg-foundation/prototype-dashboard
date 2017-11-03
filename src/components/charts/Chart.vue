<template>
  <v-card flat>
    <v-card-title v-if="title" class="subheading">{{ title }}</v-card-title>
    <v-card-text>
      <component :is="chart" v-bind="$attrs"></component>
    </v-card-text>
  </v-card>
</template>

<script>
import TimeChart from '@/components/charts/timeChart'
export default {
  props: {
    title: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'time'
    }
  },
  computed: {
    chart () {
      return {
        time: TimeChart
      }[this.type]
    }
  }
}
</script>
