'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var _ = require('lodash');

exports['default'] = {
  permissions: {
    validator: validatePermissions,
    message: 'Found an invalid permission'
  }
};

// Validate each item. A valid item should have a score value that exists inside its scores array.
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

  if (type !== 'module' && !value) {
    return false;
  }
  return true;
}
module.exports = exports['default'];