import _ from 'lodash'

export default {
  validator: validatePermissions,
  message: 'Found an invalid permission'
}

function isValueValid(type, value) {
  // Optional if type is module, otherwise required
  if (type !== 'module' && !value) {
    return false
  }
  return true
}

function validatePermissions(permissions) {
  return _.every(permissions, permission => {
    const type = permission.type
    const value = permission.value

    if (!isValueValid(type, value)) {
      return false
    }

    return true
  })
}
