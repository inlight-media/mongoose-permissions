import validate from './validate'
import permissionSchema from './schema/attach'
import sharedTest from './test/shared/attach-permission'

export default {
  validate: validate,
  permissionSchema: permissionSchema,
  sharedTest: sharedTest
}
