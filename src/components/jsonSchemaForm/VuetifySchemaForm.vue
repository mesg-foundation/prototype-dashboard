<template>
  <v-form ref="form" v-model="valid">
    <JsonSchemaForm
      v-bind="$attrs"
      :schema="schema"
      :value="value"
      @input="onUpdate">
      <template scope="field">
        <ArrayField v-if="isArray(field)"
          :class="inputClass"
          :field="field"
          :value="field.value"
          @input="field.onUpdate"
          :hint="field.description"
          :rules="errors[field.key]">
        </ArrayField>
        <v-text-field v-else-if="isLargeText(field)"
          :class="inputClass"
          multi-line auto-grow textarea
          :label="field.label"
          :value="field.value"
          @input="field.onUpdate"
          :hint="field.description"
          persistent-hint
          :rules="errors[field.key]">
        </v-text-field>
        <v-select v-else-if="isCollection(field)"
          :class="inputClass"
          :label="field.label"
          :value="field.value"
          @input="field.onUpdate"
          :items="field.values"
          :hint="field.description"
          persistent-hint
          :rules="errors[field.key]">
        </v-select>
        <v-switch v-else-if="isBoolean(field)"
          :class="inputClass"
          :label="field.label"
          :value="field.value"
          @change="field.onUpdate"
          :hint="field.description"
          persistent-hint
          :rules="errors[field.key]">
        </v-switch>
        <CodeEditor v-else-if="isCode(field)"
          :class="inputClass"
          :title="field.label"
          :value="field.value"
          @input="field.onUpdate"
          :hint="field.description"
          persistent-hint
          :rules="errors[field.key]">
        </CodeEditor>
        <v-text-field v-else :label="field.label"
          :class="inputClass"
          :value="field.value"
          @input="field.onUpdate"
          :rules="errors[field.key]"
          :hint="field.description"
          persistent-hint
          :type="type(field)">
        </v-text-field>
      </template>
    </JsonSchemaForm>
  </v-form>
</template>

<script>
import JsonSchemaForm from './Form'
import ArrayField from './ArrayField'
import CodeEditor from '@/components/CodeEditor'
export default {
  name: 'vuetify-schema-form',

  components: {
    JsonSchemaForm,
    ArrayField,
    CodeEditor
  },
  props: {
    schema: {
      type: Object,
      required: true
    },
    value: {
      type: Object,
      default: () => ({})
    },
    displayAllErrors: {
      type: Boolean,
      default: false
    },
    inputClass: {
      type: [Array, Object, String],
      default: ''
    }
  },
  data () {
    return {
      errors: {},
      valid: true
    }
  },
  watch: {
    schema () {
      this.$refs.form.reset()
    },
    displayAllErrors () {
      if (this.displayAllErrors) {
        this.$refs.form.validate()
      }
    }
  },
  methods: {
    onUpdate (x) {
      if (!x.errors) {
        this.valid = true
        this.errors = {}
        this.$emit('input', x)
        return
      }
      this.$emit('input', {})
      this.valid = false
      const key = error => error.name === 'required'
        ? error.argument
        : error.property.replace('instance.', '')
      this.errors = x.errors
        .reduce((acc, error) => ({
          ...acc,
          [key(error)]: [
            ...(acc[key(error)] || []),
            error.message
          ]
        }), {})
    },
    type (field) {
      return [
        { type: 'number', test: x => x.type === 'integer' || x.type === 'number' },
        { type: 'url', test: x => x.schema.pattern && x.schema.pattern.match(/^\^http/) },
        { type: 'text', test: x => x.type === 'string' }
      ]
        .filter(x => x.test(field))
        .map(x => x.type)[0] || field.type || 'text'
    },
    isLargeText (field) {
      return field.type === 'string' && ['body', 'description', 'content'].indexOf(field.key) >= 0
    },
    isCollection (field) {
      return field.values && field.values.length > 0
    },
    isBoolean (field) {
      return field.type === 'boolean'
    },
    isCode (field) {
      return ['code', 'function'].indexOf(field.key) >= 0
    },
    isArray (field) {
      return field.type === 'array'
    }
  }
}
</script>
