# Mongoose Permissions
Mongoose Permissions is a utility that attach a permission schema and validation to your Mongoose models.

## Todo
- Contributing guidelines
- License

## Requirements
You will need to install **Mongoose** for your application. We do not require any version of Mongoose in this packages dependencies to give you the flexibility to use your own version of Mongoose.

## How to use
### Attach schema
**Example**

```
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var permissionSchema = require('mongoose-permissions').permissionSchema;

var testSchema = new Schema({
    application: String,
    name: String,
    created: Date
});

testSchema.plugin(permissionSchema);
```

The code above will attache a Permission schema to `testSchema`. The permission schema is structured as the following:

```
permissions: [{
      module: {
        type: String,
        required: true
      },
      type: {
        type: String,
        enum: ['module', 'document', 'field'],
        default: 'module'
      },
      value: String, // (optional if type is module, otherwise required) Either document id or property path of field
      access: [{
        type: String,
        enum: ['create', 'read', 'update', 'delete']
      }],
      strategy: {
        type: String,
        enum: ['include', 'exclude'] // optional, only makes sense if type is module
      }
    }]
}]
```

### Validator
To use the validator, please follow this example:

```
var permissionValidate = require('mongoose-permissions').validate;

var permissions = [{
  module: 'location',
  type: 'module',
  access: ['create', 'read', 'update', 'delete']
}, {
  module: 'zone',
  type: 'document',
  value: new ObjectId().toString(),
  access: ['create', 'read']
}, {
  module: 'zone',
  type: 'field',
  value: 'zone.name',
  access: ['create', 'read']
}]

validate(permissions, function callback(err){
  //Handle err
})
```

This plugin will create a schema named `mongoose-permissions-for-validation` for the validation.

There are two possible error outputs at function callback.

The first error style looks like:

```
{ [ValidationError: mongoose-permissions-for-validation validation failed]
  stack: ...,
  message: 'mongoose-permissions-for-validation validation failed',
  name: 'ValidationError',
  errors:
   { 'permissions.0.access.1':
      { [ValidatorError: `write` is not a valid enum value for path `access`.]
        properties: [Object],
        stack: ...,
        message: '`write` is not a valid enum value for path `access`.',
        name: 'ValidatorError',
        kind: 'enum',
        path: 'access',
        value: 'write' } } }
```

The second error style looks like:

```
{ [ValidationError: mongoose-permissions-for-validation validation failed]
  stack: ...,
  message: 'mongoose-permissions-for-validation validation failed',
  name: 'ValidationError',
  errors:
   { permissions:
      { [ValidatorError: Found an invalid permission]
        properties: [Object],
        stack: ...,
        message: 'Found an invalid permission',
        name: 'ValidatorError',
        kind: 'user defined',
        path: 'permissions',
        value:
         [{ module: 'zone',
           value: '',
           _id: 560c8b4931e491dd060e3715,
           access: [ 'create', 'read' ],
           type: 'field' }] } } }
```

### Shared tests
To use the share test, simply include:

```
var permissionTest = require('mongoose-permissions').sharedTest;

permissionTest['schema']({
    schema: Role.schema,
});
```

There are 3 sets of shared tests are available -
- `schema` - to test schema structure after attaching permission to the resource.
- `create` - to test the functionality of creating a resource object with permission attributes.
- `update`- to test the functionality of updating a resource object with permission attributes.
