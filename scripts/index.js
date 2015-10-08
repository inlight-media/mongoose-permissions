'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _validate = require('./validate');

var _validate2 = _interopRequireDefault(_validate);

var _schemaAttach = require('./schema/attach');

var _schemaAttach2 = _interopRequireDefault(_schemaAttach);

var _testSharedAttachPermission = require('./test/shared/attach-permission');

var _testSharedAttachPermission2 = _interopRequireDefault(_testSharedAttachPermission);

exports['default'] = {
  validate: _validate2['default'],
  attach: _schemaAttach2['default'],
  sharedTest: _testSharedAttachPermission2['default']
};
module.exports = exports['default'];