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
  import Event from './Event'
  import Function from './Function'
  import Constant from './Constant'
  import Constructor from './Constructor'
  export default {
    components: {
      Event,
      Constant,
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
      constructors () {
        return this.value
          .filter(x => x.type === 'constructor')
          .sort((a, b) => a.name.localeCompare(b.name))
      },
      events () {
        return this.value
          .filter(x => x.type === 'event')
          .sort((a, b) => a.name.localeCompare(b.name))
      },
      constants () {
        return this.value
          .filter(x => x.type === 'function' && x.constant)
          .sort((a, b) => a.name.localeCompare(b.name))
      },
      functions () {
        return this.value
          .filter(x => x.type === 'function' && !x.constant)
          .sort((a, b) => a.name.localeCompare(b.name))
      },
      items () {
        return [
          'constructor',
          'constant',
          'event',
          'function'
        ]
          .map(type => ({
            key: type,
            component: Utils.toHuman(type),
            entries: this[`${type}s`]
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
