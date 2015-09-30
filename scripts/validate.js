'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = validate;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schemaSchema = require('./schema/schema');

var _schemaSchema2 = _interopRequireDefault(_schemaSchema);

var Schema = _mongoose2['default'].Schema;

function validate(permission, callback) {
  var schema = new Schema({});
  schema.plugin(_schemaSchema2['default']);

  var Model = schema.Model;
  var model = new Model(permission);
  model.validate(callback);
}

module.exports = exports['default'];