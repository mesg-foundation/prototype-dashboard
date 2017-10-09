<template>
  <v-dialog v-model="popup" width="480px">
    <v-btn outline color="primary" slot="activator">
      <v-icon class="mr-2">edit</v-icon>
      {{ $t('edit') }}
      {{ field.schema.title }}
    </v-btn>
    <v-card>
      <v-toolbar card>
        <v-toolbar-title>
          {{ field.schema.title }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="addItem()">
          <v-icon>add</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-card v-for="(val, i) in values" :key="val.key" class="mb-2">
          <v-toolbar card dense>
            <v-spacer></v-spacer>
            <v-btn icon @click="removeItem(i)">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <component
              :is="component"
              inline
              v-bind="$attrs"
              :schema="field.schema.items"
              :value="val"
              inputClass="mr-2"
              @input="x => updateValue(i, x)">
            </component>
          </v-card-text>
        </v-card>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn @click="submit()" block color="primary">
          {{ $t('submit') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<i18n>
  en:
    edit: "Edit"
    submit: "Submit"
</i18n>

<script>
import VuetifySchemaForm from './VuetifySchemaForm'
export default {
  props: {
    field: {
      type: Object,
      required: true
    },
    value: {
      type: Array,
      default: () => []
    },
    hint: {
      type: String,
      default: ''
    },
    rules: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      popup: false,
      values: [...this.value]
    }
  },
  computed: {
    component () { return VuetifySchemaForm }
  },
  methods: {
    addItem () {
      this.values.push({})
    },
    removeItem (index) {
      this.values.splice(index, 1)
    },
    updateValue (index, x) {
      this.$set(this.values, index, x)
    },
    submit () {
      this.$emit('input', this.values)
      this.popup = false
    }
  }
}
</script>
