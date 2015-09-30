'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _validate = require('./validate');

var _validate2 = _interopRequireDefault(_validate);

var _schemaAttach = require('./schema/attach');

var _schemaAttach2 = _interopRequireDefault(_schemaAttach);

exports.validate = _validate2['default'];
exports['default'] = _schemaAttach2['default'];