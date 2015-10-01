import _ from 'lodash'
import should from 'should'
import mongoose from 'mongoose'

var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

export default {
  schema: testSchema,
  create: createWithPermisstions,
  update: updatePermisstions
}

function testSchema(options) {
  let schema = options.schema
  it('Should attach permission schema', function(done) {
    schema.paths.should.have.property('permissions')
    done()
  })
}

function createWithPermisstions(options) {
  let url = options.url
  let validPayload = options.validPayload
  let fn = options.fn || _.noop
  let authUser = options.authUser
  let request = options.request

  // Create test
  it('should create the resource successfully', function(done) {

    let permissions = [{
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

    validPayload.permissions = permissions

    request.post(url)
      .set(authUser ? test.authorizationForUser(authUser) : {})
      .send(validPayload)
      .expect('Content-Type', /json/)
      .expect(201, function(err, res) {
        should.not.exist(err)
        let json = res.body
        json.permissions.should.have.length(3)
        json.permissions[0].should.have.properties(permissions[0])
        fn(json)
        done()
      })
  })

  it('Should pass if access is null', function(done) {

    let permissions = [{
      module: 'location',
      type: 'module',
      access: null
    }]

    validPayload.permissions = permissions

    request.post(url)
      .set(authUser ? test.authorizationForUser(authUser) : {})
      .send(validPayload)
      .expect('Content-Type', /json/)
      .expect(201, function(err, res) {
        should.not.exist(err)
        let json = res.body
        json.permissions.should.have.length(1)
        fn(json)
        done()
      })
  })

  it('Should pass if access is undefined', function(done) {

    let permissions = [{
      module: 'location',
      type: 'module'
    }]

    validPayload.permissions = permissions

    request.post(url)
      .set(authUser ? test.authorizationForUser(authUser) : {})
      .send(validPayload)
      .expect('Content-Type', /json/)
      .expect(201, function(err, res) {
        should.not.exist(err)
        let json = res.body
        json.permissions.should.have.length(1)
        fn(json)
        done()
      })
  })

  it('Should pass if access is an empty array', function(done) {

    let permissions = [{
      module: 'location',
      type: 'module',
      access: []
    }]

    validPayload.permissions = permissions

    request.post(url)
      .set(authUser ? test.authorizationForUser(authUser) : {})
      .send(validPayload)
      .expect('Content-Type', /json/)
      .expect(201, function(err, res) {
        should.not.exist(err)
        let json = res.body
        json.permissions.should.have.length(1)
        fn(json)
        done()
      })
  })

  it('Should fail if type is invalid', function(done) {

    let permissions = [{
      module: 'location',
      type: 'anything',
      access: []
    }]

    validPayload.permissions = permissions

    request.post(url)
      .set(authUser ? test.authorizationForUser(authUser) : {})
      .send(validPayload)
      .expect('Content-Type', /json/)
      .expect(400, function(err, res) {
        should.not.exist(err)
        let json = res.body
        json.error.errors.permissions.should.have.properties({
          message: 'Found an invalid permission',
          name: 'ValidatorError',
          kind: 'user defined',
          path: 'permissions'
        })
        fn(json)
        done()
      })
  })

  it('Should fail if access is invalid', function(done) {

    let permissions = [{
      module: 'location',
      type: 'module',
      access: ['read', 'write']
    }]

    validPayload.permissions = permissions

    request.post(url)
      .set(authUser ? test.authorizationForUser(authUser) : {})
      .send(validPayload)
      .expect('Content-Type', /json/)
      .expect(400, function(err, res) {
        should.not.exist(err)
        let json = res.body
        json.error.should.have.properties({
          code: 400,
          status: 400,
          name: 'ValidationError',
          message: 'One or more of the fields of the data you sent was invalid'
        })
        fn(json)
        done()
      })
  })
}

function updatePermisstions(options) {
  let url = options.url
  let validPayload = options.validPayload
  let fn = options.fn || _.noop
  let authUser = options.authUser
  let request = options.request

  // Update test
  it('should update the resource successfully', function(done) {

    let permissions = [{
      module: 'location',
      type: 'document',
      value: 'new ObjectId().toString()',
      access: ['create', 'read', 'delete']
    }, {
      module: 'zone',
      type: 'module',
      access: ['create', 'read']
    }]

    validPayload.permissions = permissions

    request.put(url)
      .set(authUser ? test.authorizationForUser(authUser) : {})
      .send(validPayload)
      .expect('Content-Type', /json/)
      .expect(200, function(err, res) {
        should.not.exist(err)
        let json = res.body
        json.permissions.should.have.length(2)
        json.permissions[0].should.have.properties(permissions[0])
        json.permissions[1].should.have.properties(permissions[1])
        fn(json)
        done()
      })
  })

}
