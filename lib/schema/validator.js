var _ = require('lodash');

export default {
  validator: validatePermissions,
  message: 'Found an invalid permission'
}

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

  // Optional if type is module, otherwise required
  if (type !== 'module' && !value) {
    return false
  }
  return true
}
