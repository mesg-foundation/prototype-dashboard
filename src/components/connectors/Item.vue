<template>
  <v-card
    :class="{ 'blue': isSelected, 'lighten-5': isSelected }">
    <img :src="connector.picture" :alt="connector.name">
    <v-card-title justify-center>
      <div class="headline text-xs-center">
        {{ connector.name }}
      </div>
    </v-card-title>
    <v-card-text style="min-height:100px" v-html="connector.description"></v-card-text>
    <v-card-actions>
      <v-btn block flat primary @click.stop="select">
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
    select: "Use this connector"
    selected: "Selected"
</i18n>

<script>
  import input from '@/mixins/input'
  export default {
    mixins: [
      input
    ],
    props: {
      connector: {
        type: Object,
        required: true
      }
    },
    computed: {
      isSelected () {
        return this.value === this.connector.id
      }
    },
    methods: {
      select () {
        this.$emit('input', this.connector.id)
      }
    }
  }
</script>

<style scoped>
  .card {
    text-align: center;
  }

  .card__title {
    justify-content: center;
  }

  img {
    max-width: 80%;
    margin: 1.5em;
    height: 3em;
  }
</style>
