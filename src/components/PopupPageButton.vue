<template>
  <div>
    <v-dialog
      class="{ 'hidden-sm-and-down': to }"
      v-model="modal"
      :width="modalWidth"
      lazy>
      <v-btn
        :success="success"
        :dark="dark"
        slot="activator">
        <v-icon v-if="icon">{{ icon }}</v-icon>
        {{ title }}
      </v-btn>
      <slot></slot>
    </v-dialog>
    <v-btn
      v-if="to"
      class="hidden-md-and-up"
      :success="success"
      :dark="dark"
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
      },
      success: {
        type: Boolean,
        default: false
      },
      dark: {
        type: Boolean,
        default: false
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
