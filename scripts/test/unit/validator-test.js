'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _schemaValidator = require('../../schema/validator');

var _schemaValidator2 = _interopRequireDefault(_schemaValidator);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var validator = _schemaValidator2['default'].validator;
var Schema = _mongoose2['default'].Schema;
var ObjectId = Schema.Types.ObjectId;

describe('mongoose-permission:unit:validator', function () {

  it('Should fail if value is null when module is not "module"', function (done) {

    var permissions = [{
      module: 'zone',
      type: 'field',
      value: '',
      access: ['create', 'read']
    }];

    validator(permissions).should.equal(false);
    done();
  });
});