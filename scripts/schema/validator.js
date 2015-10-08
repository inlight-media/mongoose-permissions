'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

exports['default'] = {
  validator: validatePermissions,
  message: 'Found an invalid permission'
};

function isValueValid(type, value) {
  // Optional if type is module, otherwise required
  if (type !== 'module' && !value) {
    return false;
  }
  return true;
}

function validatePermissions(permissions) {
  return _lodash2['default'].every(permissions, function (permission) {
    var type = permission.type;
    var value = permission.value;

    if (!isValueValid(type, value)) {
      return false;
    }

    return true;
  });
}
module.exports = exports['default'];