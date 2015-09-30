import attachPermission from '../../schema/attach'
import mongoose from 'mongoose'
import should from 'should'

var Schema = mongoose.Schema

describe('mongoose-permission:unit:index', function() {

	it('Should attach permission schema', function(done) {
		let schema = new Schema({
			name: String
		})

		schema.plugin(attachPermission)

		schema.paths.should.have.property('permissions')

		done()
	})
})
