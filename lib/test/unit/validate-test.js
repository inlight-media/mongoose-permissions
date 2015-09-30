import validate from '../../schema/validator'

import mongoose from 'mongoose'

var validator = validate.permissions.validator
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

describe('mongoose-permission:unit:validate', function() {

  it('Should fail if value is null when module is not "module"', function(done) {

    let permissions = [{
      module: 'zone',
      type: 'field',
      value: '',
      access: ['create', 'read']
    }]

    validator(permissions).should.equal(false)

    done()
  });
});
