import _ from 'lodash'
import should from 'should'
import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export default {
  schema: testSchema,
  create: createWithPermisstions,
  update: updatePermisstions
}

function testSchema(options) {
  const schema = options.schema
  it('Should attach permission schema', done => {
    schema.paths.should.have.property('permissions')
    done()
  })
}

function createWithPermisstions(options) {
  const url = options.url
  const validPayload = options.validPayload
  const fn = options.fn || _.noop
  const authUser = options.authUser
  const request = options.request

  // Create test
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

    validPayload.permissions = permissions

    request.post(url)
      .set(authUser ? test.authorizationForUser(authUser) : {})
      .send(validPayload)
      .expect('Content-Type', /json/)
      .expect(201, (err, res) => {
        should.not.exist(err)
        const json = res.body
        json.permissions.should.have.length(3)
        json.permissions[0].should.have.properties(permissions[0])
        fn(json)
        done()
      })
  })

  it('Should pass if access is null', done => {
    const permissions = [{
      module: 'location',
      type: 'module',
      access: null
    }]

    validPayload.permissions = permissions

    request.post(url)
      .set(authUser ? test.authorizationForUser(authUser) : {})
      .send(validPayload)
      .expect('Content-Type', /json/)
      .expect(201, (err, res) => {
        should.not.exist(err)
        const json = res.body
        json.permissions.should.have.length(1)
        fn(json)
        done()
      })
  })

  it('Should pass if access is undefined', done => {
    const permissions = [{
      module: 'location',
      type: 'module'
    }]

    validPayload.permissions = permissions

    request.post(url)
      .set(authUser ? test.authorizationForUser(authUser) : {})
      .send(validPayload)
      .expect('Content-Type', /json/)
      .expect(201, (err, res) => {
        should.not.exist(err)
        const json = res.body
        json.permissions.should.have.length(1)
        fn(json)
        done()
      })
  })

  it('Should pass if access is an empty array', done => {
    const permissions = [{
      module: 'location',
      type: 'module',
      access: []
    }]

    validPayload.permissions = permissions

    request.post(url)
      .set(authUser ? test.authorizationForUser(authUser) : {})
      .send(validPayload)
      .expect('Content-Type', /json/)
      .expect(201, (err, res) => {
        should.not.exist(err)
        const json = res.body
        json.permissions.should.have.length(1)
        fn(json)
        done()
      })
  })

  it('Should fail if type is invalid', done => {
    const permissions = [{
      module: 'location',
      type: 'anything',
      access: []
    }]

    validPayload.permissions = permissions

    request.post(url)
      .set(authUser ? test.authorizationForUser(authUser) : {})
      .send(validPayload)
      .expect('Content-Type', /json/)
      .expect(400, (err, res) => {
        should.not.exist(err)
        const json = res.body
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

  it('Should fail if access is invalid', done => {
    const permissions = [{
      module: 'location',
      type: 'module',
      access: ['read', 'write']
    }]

    validPayload.permissions = permissions

    request.post(url)
      .set(authUser ? test.authorizationForUser(authUser) : {})
      .send(validPayload)
      .expect('Content-Type', /json/)
      .expect(400, (err, res) => {
        should.not.exist(err)
        const json = res.body
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
  const url = options.url
  const validPayload = options.validPayload
  const fn = options.fn || _.noop
  const authUser = options.authUser
  const request = options.request

  // Update test
  it('should update the resource successfully', done => {
    const permissions = [{
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
      .expect(200, (err, res) => {
        should.not.exist(err)
        const json = res.body
        json.permissions.should.have.length(2)
        json.permissions[0].should.have.properties(permissions[0])
        json.permissions[1].should.have.properties(permissions[1])
        fn(json)
        done()
      })
  })
}
