# Mongoose Permissions
Mongoose Permissions is a utility that attach a permission schema and validation to your Mongoose models.

## Todo
- Contributing guidelines
- License

## Requirements
You will need to install **Mongoose** for your application. We do not require any version of Mongoose in this packages dependencies to give you the flexibility to use your own version of Mongoose.

## How to use
**Example**

```
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var attachPermission = require('mongoose-permissions').attach;

var testSchema = new Schema({
    application: String,
    name: String,
    created: Date
});

testSchema.plugin(attachPermission);
```

The code above will attache a Permission schema to `testSchema`. The permission schema is structured as the following:

```
permissions: [{
    module: {
        type: String,
        required: true
    }, // (required) Name of module, e.g. zone
    type: {
        type: String,
        enum: ['module', 'document', 'field'],
        default: 'module'
    }, // (enum, defaults to module) module, document, field
    value: String, // (optional if type is module, otherwise required) Either document id or property path of field
    access: [{
            type: String,
            enum: ['create', 'read', 'update', 'delete']
        }] // (enum, or null??) create, read, update, delete
}]
```

## Shared tests
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
