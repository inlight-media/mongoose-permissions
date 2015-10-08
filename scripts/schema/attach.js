'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = attachPermissionPlugin;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _validator = require('./validator');

var _validator2 = _interopRequireDefault(_validator);

function attachPermissionPlugin(schema) {
  var permissions = {
    permissions: [{
      module: {
        type: String,
        required: true
      },
      type: {
        type: String,
        'enum': ['module', 'document', 'field'],
        'default': 'module'
      },
      value: String, // (optional if type is module, otherwise required) Either document id or property path of field
      access: [{
        type: String,
        'enum': ['create', 'read', 'update', 'delete']
      }],
      strategy: {
        type: String,
        'enum': ['include', 'exclude'] // only make sense when type is module
      }
    }]
  };

  schema.add(permissions);
  schema.path('permissions').validate(_validator2['default']);
}

module.exports = exports['default'];