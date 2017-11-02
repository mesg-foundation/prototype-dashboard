<template>
  <v-card flat>
    <v-toolbar card class="secondary">
      <MenuToggle></MenuToggle>
      <v-toolbar-title class="headline">
        {{ title }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-divider></v-divider>
  </v-card>
</template>

<script>
import MenuToggle from '@/components/MenuToggle'
export default {
  components: {
    MenuToggle
  }
}
</script>
