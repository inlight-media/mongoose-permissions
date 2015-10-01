'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _validate = require('../../validate');

var _validate2 = _interopRequireDefault(_validate);

var _should = require('should');

var _should2 = _interopRequireDefault(_should);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var Schema = _mongoose2['default'].Schema;
var ObjectId = Schema.Types.ObjectId;

describe('mongoose-permission:unit:validate', function () {

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

    (0, _validate2['default'])(permissions, function (err) {
      _should2['default'].not.exist(err);
    });

    done();
  });

  it('Should pass if access is null', function (done) {

    var permissions = [{
      module: 'location',
      type: 'module',
      access: null
    }];

    (0, _validate2['default'])(permissions, function (err) {
      _should2['default'].not.exist(err);
    });

    done();
  });

  it('Should pass if access is undefined', function (done) {

    var permissions = [{
      module: 'location',
      type: 'module'
    }];

    (0, _validate2['default'])(permissions, function (err) {
      _should2['default'].not.exist(err);
    });

    done();
  });

  it('Should pass if access is an empty array', function (done) {

    var permissions = [{
      module: 'location',
      type: 'module',
      access: []
    }];

    (0, _validate2['default'])(permissions, function (err) {
      _should2['default'].not.exist(err);
    });

    done();
  });

  it('Should fail if type is invalid', function (done) {

    var permissions = [{
      module: 'location',
      type: 'anything',
      value: 'hello',
      access: []
    }];

    (0, _validate2['default'])(permissions, function (err) {
      _should2['default'].exist(err);
      err.errors['permissions.0.type'].should.have.properties({
        message: '`anything` is not a valid enum value for path `type`.',
        name: 'ValidatorError',
        kind: 'enum',
        path: 'type',
        value: 'anything'
      });
    });

    done();
  });

  it('Should fail if access is invalid', function (done) {

    var permissions = [{
      module: 'location',
      type: 'module',
      access: ['read', 'write']
    }];

    (0, _validate2['default'])(permissions, function (err) {
      _should2['default'].exist(err);
      err.errors['permissions.0.access.1'].should.have.properties({
        message: '`write` is not a valid enum value for path `access`.',
        name: 'ValidatorError',
        kind: 'enum',
        path: 'access',
        value: 'write'
      });
    });

    done();
  });

  it('Should fail if value is null when module is not "module"', function (done) {

    var permissions = [{
      module: 'zone',
      type: 'field',
      value: '',
      access: ['create', 'read']
    }];

    (0, _validate2['default'])(permissions, function (err) {
      _should2['default'].exist(err);
      err.errors.permissions.should.have.properties({
        name: 'ValidatorError',
        kind: 'user defined',
        path: 'permissions'
      });
    });
    done();
  });
});