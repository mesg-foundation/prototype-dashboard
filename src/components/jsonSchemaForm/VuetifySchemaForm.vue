<template>
  <JsonSchemaForm
    v-bind="$attrs"
    :schema="schema"
    :value="value"
    @input="x => $emit('input', x)">
    <template scope="field">
      <v-text-field v-if="isLargeText(field)"
        multi-line auto-grow textarea
        :label="field.label"
        :value="field.value"
        @input="field.onUpdate"
        :rules="field.validations">
      </v-text-field>
      <v-select v-else-if="isCollection(field)"
        :label="field.label"
        :value="field.value"
        @input="field.onUpdate"
        :items="field.values"
        :rules="field.validations">
      </v-select>
      <v-switch v-else-if="isBoolean(field)"
        :label="field.label"
        :value="field.value"
        @change="field.onUpdate"
        :rules="field.validations">
      </v-switch>
      <CodeEditor v-else-if="isCode(field)"
        :title="field.label"
        :value="field.value"
        @change="field.onUpdate"
        :rules="field.validations">
      </CodeEditor>
      <v-text-field v-else :label="field.label"
        :value="field.value"
        @input="field.onUpdate"
        :rules="field.validations"
        :type="type(field)">
      </v-text-field>
    </template>
  </JsonSchemaForm>
</template>

<script>
import JsonSchemaForm from './Form'
import CodeEditor from '@/components/CodeEditor'
export default {
  components: {
    JsonSchemaForm,
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
    }
  },
  methods: {
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
    }
  }
}
</script>
