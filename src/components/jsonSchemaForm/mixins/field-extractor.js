export default {
  methods: {
    extractFields (schema) {
      if (schema.type !== 'object') { throw new Error('Schema type should be object') }

      return Object.keys(schema.properties).map(key => {
        const schemaDefinition = schema.properties[key]
        return {
          key,
          schema: schemaDefinition,
          label: schemaDefinition.name || key,
          description: schemaDefinition.description || '',
          default: schemaDefinition.default || '',
          type: schemaDefinition.type || 'string',
          value: this.value[key] || schemaDefinition.default || '',
          onUpdate: this.onUpdate(key),
          values: schemaDefinition.enum || [],
          validations: [
            schema.required.indexOf(key) >= 0 || schemaDefinition.required ? x => !!x || `${key} is required` : null,
            schemaDefinition.pattern ? x => new RegExp(schemaDefinition.pattern).test(x) || `${key} doesn't match "${schemaDefinition.pattern}"` : null,
            schemaDefinition.enum ? x => schemaDefinition.enum.indexOf(x) >= 0 || `${key} doesn't have a valid value: ${schemaDefinition.enum.map(e => `"${e}"`).join(', ')}` : null
          ].filter(x => x)
        }
      })
    }
  }
}
