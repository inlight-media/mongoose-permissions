'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _should = require('should');

var _should2 = _interopRequireDefault(_should);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var Schema = _mongoose2['default'].Schema;
var ObjectId = Schema.Types.ObjectId;

exports['default'] = {
  schema: testSchema,
  create: createWithPermisstions,
  update: updatePermisstions
};

function testSchema(options) {
  var schema = options.schema;
  it('Should attach permission schema', function (done) {
    schema.paths.should.have.property('permissions');
    done();
  });
}

function createWithPermisstions(options) {
  var url = options.url;
  var validPayload = options.validPayload;
  var fn = options.fn || _lodash2['default'].noop;
  var authUser = options.authUser;
  var request = options.request;

  // Create test
  it('should create the resource successfully', function (done) {

    var permissions = [{
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
    }];

    validPayload.permissions = permissions;

    request.post(url).set(authUser ? test.authorizationForUser(authUser) : {}).send(validPayload).expect('Content-Type', /json/).expect(201, function (err, res) {
      _should2['default'].not.exist(err);
      var json = res.body;
      json.permissions.should.have.length(3);
      json.permissions[0].should.have.properties(permissions[0]);
      fn(json);
      done();
    });
  });

  it('Should pass if access is null', function (done) {

    var permissions = [{
      module: 'location',
      type: 'module',
      access: null
    }];

    validPayload.permissions = permissions;

    request.post(url).set(authUser ? test.authorizationForUser(authUser) : {}).send(validPayload).expect('Content-Type', /json/).expect(201, function (err, res) {
      _should2['default'].not.exist(err);
      var json = res.body;
      json.permissions.should.have.length(1);
      fn(json);
      done();
    });
  });

  it('Should pass if access is undefined', function (done) {

    var permissions = [{
      module: 'location',
      type: 'module'
    }];

    validPayload.permissions = permissions;

    request.post(url).set(authUser ? test.authorizationForUser(authUser) : {}).send(validPayload).expect('Content-Type', /json/).expect(201, function (err, res) {
      _should2['default'].not.exist(err);
      var json = res.body;
      json.permissions.should.have.length(1);
      fn(json);
      done();
    });
  });

  it('Should pass if access is an empty array', function (done) {

    var permissions = [{
      module: 'location',
      type: 'module',
      access: []
    }];

    validPayload.permissions = permissions;

    request.post(url).set(authUser ? test.authorizationForUser(authUser) : {}).send(validPayload).expect('Content-Type', /json/).expect(201, function (err, res) {
      _should2['default'].not.exist(err);
      var json = res.body;
      json.permissions.should.have.length(1);
      fn(json);
      done();
    });
  });

  it('Should fail if type is invalid', function (done) {

    var permissions = [{
      module: 'location',
      type: 'anything',
      access: []
    }];

    validPayload.permissions = permissions;

    request.post(url).set(authUser ? test.authorizationForUser(authUser) : {}).send(validPayload).expect('Content-Type', /json/).expect(400, function (err, res) {
      _should2['default'].not.exist(err);
      var json = res.body;
      json.error.errors.permissions.should.have.properties({
        message: 'Found an invalid permission',
        name: 'ValidatorError',
        kind: 'user defined',
        path: 'permissions'
      });
      fn(json);
      done();
    });
  });

  it('Should fail if access is invalid', function (done) {

    var permissions = [{
      module: 'location',
      type: 'module',
      access: ['read', 'write']
    }];

    validPayload.permissions = permissions;

    request.post(url).set(authUser ? test.authorizationForUser(authUser) : {}).send(validPayload).expect('Content-Type', /json/).expect(400, function (err, res) {
      _should2['default'].not.exist(err);
      var json = res.body;
      json.error.should.have.properties({
        code: 400,
        status: 400,
        name: 'ValidationError',
        message: 'One or more of the fields of the data you sent was invalid'
      });
      fn(json);
      done();
    });
  });
}

function updatePermisstions(options) {
  var url = options.url;
  var validPayload = options.validPayload;
  var fn = options.fn || _lodash2['default'].noop;
  var authUser = options.authUser;
  var request = options.request;

  // Update test
  it('should update the resource successfully', function (done) {

    var permissions = [{
      module: 'location',
      type: 'document',
      value: 'new ObjectId().toString()',
      access: ['create', 'read', 'delete']
    }, {
      module: 'zone',
      type: 'module',
      access: ['create', 'read']
    }];

    validPayload.permissions = permissions;

    request.put(url).set(authUser ? test.authorizationForUser(authUser) : {}).send(validPayload).expect('Content-Type', /json/).expect(200, function (err, res) {
      _should2['default'].not.exist(err);
      var json = res.body;
      json.permissions.should.have.length(2);
      json.permissions[0].should.have.properties(permissions[0]);
      json.permissions[1].should.have.properties(permissions[1]);
      fn(json);
      done();
    });
  });
}
module.exports = exports['default'];