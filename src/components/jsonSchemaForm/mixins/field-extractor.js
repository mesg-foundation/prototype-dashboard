export default {
  methods: {
    extractFields (schema) {
      if (schema.type !== 'object') { throw new Error('Schema type should be object') }

      return Object.keys(schema.properties).map(key => {
        const schemaDefinition = schema.properties[key]
        return {
          key,
          schema: schemaDefinition,
          label: schemaDefinition.title || key,
          description: schemaDefinition.description || '',
          default: schemaDefinition.default || '',
          type: schemaDefinition.type || 'string',
          value: this.value[key] || schemaDefinition.default || '',
          onUpdate: this.onUpdate(key),
          values: schemaDefinition.enum || [],
          validations: []
        }
      })
    }
  }
}
