import validator from './validator'

export default function attachPermissionPlugin(schema) {
  const permissions = {
    permissions: [{
      module: {
        type: String,
        required: true
      },
      type: {
        type: String,
        enum: ['module', 'document', 'field'],
        default: 'module'
      },
      value: String, // (optional if type is module, otherwise required) Either document id or property path of field
      access: [{
        type: String,
        enum: ['create', 'read', 'update', 'delete']
      }],
      strategy: {
        type: String,
        enum: ['include', 'exclude'] // only make sense when type is module
      }
    }]
  }

  schema.add(permissions)
  schema.path('permissions').validate(validator)
}
