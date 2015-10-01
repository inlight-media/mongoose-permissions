'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _schemaAttach = require('../../schema/attach');

var _schemaAttach2 = _interopRequireDefault(_schemaAttach);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _should = require('should');

var _should2 = _interopRequireDefault(_should);

var Schema = _mongoose2['default'].Schema;

describe('mongoose-permission:unit:index', function () {

  it('Should attach permission schema', function (done) {
    var schema = new Schema({
      name: String
    });

    schema.plugin(_schemaAttach2['default']);

    schema.paths.should.have.property('permissions');

    done();
  });
});