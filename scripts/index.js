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

exports.validate = _validate2['default'];
exports.attach = _schemaAttach2['default'];
exports.sharedTest = _testSharedAttachPermission2['default'];