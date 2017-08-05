<template>
  <v-tabs centered grow light scrollable>
    <v-tabs-bar slot="activators" class="transparent">
      <v-tabs-item
        v-for="item in items" :key="item.key"
        :href="`#${item.key}`"
        ripple>
        {{ $t(`titles.${item.key}`) }}
      </v-tabs-item>
      <v-tabs-item href="#raw" ripple>{{ $t('titles.raw') }}</v-tabs-item>
      <v-tabs-slider></v-tabs-slider>
    </v-tabs-bar>
    <v-tabs-content
      v-for="item in items" :key="item.key"
      :id="item.key">
      <component
        :is="item.component"
        v-for="entry in item.entries" :key="entry.name"
        :value="entry">
      </component>
    </v-tabs-content>
    <v-tabs-content :id="'raw'">
      <code class="pa-3">{{ value }}</code>
    </v-tabs-content>
  </v-tabs>
</template>

<i18n>
  en:
    titles:
      constructor: "Constructor"
      constant: "Constants"
      event: "Events"
      function: "Functions"
      raw: "RAW ABI"
</i18n>

<script>
  import Utils from '@/utils'
  import Constant from './Constant'
  import Event from './Event'
  import Function from './Function'
  import Constructor from './Constructor'
  export default {
    components: {
      Constant,
      Event,
      Constructor,
      Function
    },
    props: {
      value: {
        type: Array,
        required: true
      }
    },
    computed: {
      events () {
        return this.value
          .filter(x => x.type === 'event')
      },
      items () {
        return [
          'constructor',
          'event',
          'function',
          'constant'
        ]
          .map(type => ({
            key: type,
            component: Utils.toHuman(type),
            entries: this.value
              .filter(entry => entry.type === type)
          }))
          .filter(x => x.entries.length > 0)
      }
    }
  }
</script>

<style>
  code {
    width: 100%;
  }
</style>
