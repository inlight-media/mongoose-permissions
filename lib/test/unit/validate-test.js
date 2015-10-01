import validate from '../../validate'
import should from 'should'
import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

describe('mongoose-permission:unit:validate', () => {
  it('should create the resource successfully', done => {
    const permissions = [{
      module: 'location',
      type: 'module',
      access: ['create', 'read', 'update', 'delete']
    }, {
      module: 'zone',
      type: 'document',
      value: new ObjectId().toString(),
      access: ['create', 'read']
    }, {
      module: 'zone',
      type: 'field',
      value: 'zone.name',
      access: ['create', 'read']
    }]

    validate(permissions, err => {
      should.not.exist(err)
    })

    done()
  })

  it('Should pass if access is null', done => {
    const permissions = [{
      module: 'location',
      type: 'module',
      access: null
    }]

    validate(permissions, err => {
      should.not.exist(err)
    })

    done()
  })

  it('Should pass if access is undefined', done => {
    const permissions = [{
      module: 'location',
      type: 'module'
    }]


    validate(permissions, err => {
      should.not.exist(err)
    })

    done()
  })

  it('Should pass if access is an empty array', done => {
    const permissions = [{
      module: 'location',
      type: 'module',
      access: []
    }]

    validate(permissions, err => {
      should.not.exist(err)
    })

    done()
  })

  it('Should fail if type is invalid', done => {
    const permissions = [{
      module: 'location',
      type: 'anything',
      value: 'hello',
      access: []
    }]

    validate(permissions, err => {
      should.exist(err)
      err.errors['permissions.0.type'].should.have.properties({
        message: '`anything` is not a valid enum value for path `type`.',
        name: 'ValidatorError',
        kind: 'enum',
        path: 'type',
        value: 'anything'
      })
    })

    done()
  })

  it('Should fail if access is invalid', done => {
    const permissions = [{
      module: 'location',
      type: 'module',
      access: ['read', 'write']
    }]

    validate(permissions, err => {
      should.exist(err)
      err.errors['permissions.0.access.1'].should.have.properties({
        message: '`write` is not a valid enum value for path `access`.',
        name: 'ValidatorError',
        kind: 'enum',
        path: 'access',
        value: 'write'
      })
    })

    done()
  })

  it('Should fail if value is null when module is not "module"', done => {
    const permissions = [{
      module: 'zone',
      type: 'field',
      value: '',
      access: ['create', 'read']
    }]

    validate(permissions, err => {
      should.exist(err)
      err.errors.permissions.should.have.properties({
        name: 'ValidatorError',
        kind: 'user defined',
        path: 'permissions',
      })
    })

    done()
  })
})
