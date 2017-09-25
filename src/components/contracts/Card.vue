<template>
  <v-card
    :class="{ 'blue': isSelected, 'lighten-5': isSelected }">
    <v-card-title class="headline">
      {{ contract.name }}
      -
      {{ contract.chain }}
    </v-card-title>
    <v-card-text style="min-height:100px">
      <span class="caption">{{ contract.address }}</span>
      <div v-html="contract.description"></div>
    </v-card-text>
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
    select: "Connect this contract"
    selected: "Selected"
</i18n>

<script>
  import input from '@/mixins/input'
  export default {
    mixins: [
      input
    ],
    props: {
      contract: {
        type: Object,
        required: true
      }
    },
    computed: {
      isSelected () {
        return this.value === this.contract.id
      }
    },
    methods: {
      select () {
        this.$emit('input', this.contract.id)
      }
    }
  }
</script>

<style scoped>
  .card {
    text-align: center;
    width: 320px;
  }
</style>
