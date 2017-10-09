<template>
  <v-card
    :class="{ 'blue': isSelected, 'lighten-5': isSelected }">
    <img v-if="service.picture" :src="service.picture" :alt="service.name">
    <v-card-title v-else class="headline">
      {{ service.name }}
    </v-card-title>
    <v-card-text style="min-height:150px" v-html="service.description"></v-card-text>
    <v-card-actions>
      <v-btn block flat color="primary" @click.stop="select">
        <v-icon
          v-if="isSelected"
          class="success--text mr-2">
          check
        </v-icon>
        <span v-if="isSelected">{{ $t('selected') }}</span>
        <span v-else>{{ $t('select') }}</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<i18n>
  en:
    select: "Connect this service"
    selected: "Selected"
</i18n>

<script>
  import input from '@/mixins/input'
  export default {
    mixins: [
      input
    ],
    props: {
      service: {
        type: Object,
        required: true
      }
    },
    computed: {
      isSelected () {
        return this.value === this.service.id
      }
    },
    methods: {
      select () {
        this.$emit('input', this.service.id)
      }
    }
  }
</script>

<style scoped>
  .card {
    text-align: center;
  }

  img {
    max-width: 80%;
    margin: 1.5em;
    height: 3em;
  }
</style>
