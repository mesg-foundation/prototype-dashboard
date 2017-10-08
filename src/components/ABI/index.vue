<template>
  <v-tabs centered grow light scrollable>
    <v-tabs-bar class="transparent">
      <v-tabs-item
        v-for="item in items" :key="item.key"
        :href="`#${item.key}`"
        ripple>
        {{ $t(`titles.${item.key}`) }}
        ({{ item.entries.length }})
      </v-tabs-item>
      <v-tabs-item href="#raw" ripple>{{ $t('titles.raw') }}</v-tabs-item>
      <v-tabs-slider></v-tabs-slider>
    </v-tabs-bar>
    <v-tabs-items>
      <v-divider></v-divider>
      <v-tabs-content
        v-for="item in items" :key="item.key"
        :id="item.key">
        <v-list two-line dense class="pa-0">
          <template v-for="(entry, i) in item.entries">
            <v-divider v-if="i !== 0" :key="entry.name"></v-divider>
            <component
              :key="entry.name"
              :is="item.component"
              :value="entry"
              :contract="contract">
            </component>
          </template>
        </v-list>
      </v-tabs-content>
      <v-tabs-content :id="'raw'">
        <code class="pa-3">{{ value }}</code>
      </v-tabs-content>
    </v-tabs-items>
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
      contract: {
        type: Object,
        required: true
      },
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
