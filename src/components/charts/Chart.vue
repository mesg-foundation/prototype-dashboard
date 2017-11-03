<template>
  <v-card flat>
    <v-card-title v-if="title" class="subheading">{{ title }}</v-card-title>
    <v-card-text>
      <component v-if="$attrs.rawData || $attrs.data" :is="chart" v-bind="$attrs"></component>
      <v-layout v-else :style="`height:${$attrs.height}px`" justify-center align-center>
        <v-progress-circular indeterminate class="primary--text"></v-progress-circular>
      </v-layout>
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
