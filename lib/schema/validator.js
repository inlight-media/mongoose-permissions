var _ = require('lodash');

export default {
  permissions: {
    validator: validatePermissions,
    message: 'Found an invalid permission'
  }
}

// Validate each item. A valid item should have a score value that exists inside its scores array.
function validatePermissions(permissions) {

  return _.every(permissions, permission => {
    let type = permission.type
    let value = permission.value

    if (!isValueValid(type, value)) {
      return false
    }

    return true
  })
}

function isValueValid(type, value) {

  if (type !== 'module' && !value) {
    return false
  }
  return true
}
