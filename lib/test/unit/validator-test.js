import validate from '../../schema/validator'

const validator = validate.validator

describe('mongoose-permission:unit:validator', () => {
  it('Should fail if value is null when module is not "module"', done => {
    const permissions = [{
      module: 'zone',
      type: 'field',
      value: '',
      access: ['create', 'read']
    }]

    validator(permissions).should.equal(false)
    done()
  })
})
