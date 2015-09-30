import mongoose from 'mongoose'
import validator from './validator'

export default function attachPermissionPlugin(schema) {

  let permissions = {
    permissions: [{
      module: {
        type: String,
        required: true
      }, // (required) Name of module, e.g. zone
      type: {
        type: String,
        enum: ['module', 'document', 'field'],
        default: 'module'
      }, // (enum, defaults to module) module, document, field
      value: String, // (optional if type is module, otherwise required) Either document id or property path of field
      access: [{
          type: String,
          enum: ['create', 'read', 'update', 'delete']
        }] // (enum, or null??) create, read, update, delete
    }]
  }

  schema.add(permissions)
  schema.path('permissions').validate(validator.permissions)
}
