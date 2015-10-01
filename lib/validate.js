import mongoose from 'mongoose';
import attachPermission from './schema/attach'

var Schema = mongoose.Schema
var schema = new Schema({})
schema.plugin(attachPermission)

// Compile a mock schema for permission validation
var Permissions = mongoose.model('mongoose-permissions-for-validation', schema);

export default function validate(permissions, callback) {
  let perms = new Permissions({
    permissions: permissions
  })
  perms.validate(callback)
}
