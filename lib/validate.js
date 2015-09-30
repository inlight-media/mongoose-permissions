import mongoose from 'mongoose';
import attachPermission from './schema/schema'

var Schema = mongoose.Schema;

export default function validate(permission, callback)
{
  let schema = new Schema({})
  schema.plugin(attachPermission)

  let Model = schema.Model
  let model = new Model(permission)
  model.validate(callback)
}
