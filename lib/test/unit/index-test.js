import attachPermission from '../../schema/attach'
import mongoose from 'mongoose'

const Schema = mongoose.Schema

describe('mongoose-permission:unit:index', () => {
  it('Should attach permission schema', done => {
    const schema = new Schema({
      name: String
    })

    schema.plugin(attachPermission)

    schema.paths.should.have.property('permissions')

    done()
  })
})
