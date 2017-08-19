<template>
  <v-list-tile>
    <v-list-tile-content>
      <v-list-tile-title>
        <v-chip v-if="value.payable" small class="error white--text">
          <v-avatar class="white error--text">$</v-avatar>
          <small>{{ $t('payable') }}</small>
        </v-chip>
        {{ signature }}
      </v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<i18n>
  en:
    payable: "payable"
</i18n>

<script>
  import abiView from '@/mixins/abiView'
  export default {
    mixins: [abiView]
  }
</script>

<style scoped lang="stylus">
  @import "../../variables"

  .avatar {
    box-shadow: 0 0 0 1px $theme.error inset;
  }
</style>
