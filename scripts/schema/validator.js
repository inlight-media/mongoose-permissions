'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var _ = require('lodash');

exports['default'] = {
  validator: validatePermissions,
  message: 'Found an invalid permission'
};

function validatePermissions(permissions) {

  return _.every(permissions, function (permission) {
    var type = permission.type;
    var value = permission.value;

    if (!isValueValid(type, value)) {
      return false;
    }

    return true;
  });
}

function isValueValid(type, value) {

  // Optional if type is module, otherwise required
  if (type !== 'module' && !value) {
    return false;
  }
  return true;
}
module.exports = exports['default'];