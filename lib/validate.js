import mongoose from 'mongoose'
import attachPermission from './schema/attach'

const Schema = mongoose.Schema
const schema = new Schema({})
schema.plugin(attachPermission)

// Compile a mock schema for permission validation
const Permissions = mongoose.model('mongoose-permissions-for-validation', schema)

export default function validate(permissions, callback) {
  const perms = new Permissions({
    permissions: permissions
  })
  perms.validate(callback)
}
