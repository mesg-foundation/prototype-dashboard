<template>
  <div>
    <v-dialog
      class="{ 'hidden-sm-and-down': to }"
      v-model="modal"
      :width="modalWidth"
      lazy>
      <v-btn
        v-bind="$attrs"
        slot="activator">
        <v-icon v-if="icon">{{ icon }}</v-icon>
        {{ title }}
      </v-btn>
      <slot></slot>
    </v-dialog>
    <v-btn
      v-if="to"
      v-bind="$attrs"
      class="hidden-md-and-up"
      :to="to">
      <v-icon v-if="icon">{{ icon }}</v-icon>
      {{ title }}
    </v-btn>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      to: {
        type: Object,
        default: null
      },
      icon: {
        type: String,
        default: null
      },
      modalWidth: {
        type: Number,
        default: 640
      }
    },
    data () {
      return {
        modal: false
      }
    },
    watch: {
      modal () {
        if (!this.to) { return }
        if (this.modal) {
          history.pushState({}, null, this.to.path)
        } else {
          history.back()
        }
      }
    }
  }
</script>
