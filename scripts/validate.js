'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = validate;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schemaAttach = require('./schema/attach');

var _schemaAttach2 = _interopRequireDefault(_schemaAttach);

var Schema = _mongoose2['default'].Schema;
var schema = new Schema({});
schema.plugin(_schemaAttach2['default']);

// Compile a mock schema for permission validation
var Permissions = _mongoose2['default'].model('mongoose-permissions-for-validation', schema);

function validate(permissions, callback) {
  var perms = new Permissions({
    permissions: permissions
  });
  perms.validate(callback);
}

module.exports = exports['default'];