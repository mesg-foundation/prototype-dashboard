<template>
  <div>
    <v-toolbar :card="card">
      <v-toolbar-title class="heading">
        <slot name="title"></slot>
        {{ title }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <slot name="toolbar"></slot>
      <v-btn icon @click.stop="open = !open">
        <v-icon v-if="open">arrow_drop_up</v-icon>
        <v-icon v-else>arrow_drop_down</v-icon>
      </v-btn>
    </v-toolbar>
    <slot v-if="open"></slot>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      card: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        open: false
      }
    }
  }
</script>
