import resolveLogic from './resolveLogic'

export const getFieldValues = (fields, fieldsOrder) => (
  fieldsOrder.reduce((values, fieldId) => {
    const field = fields[fieldId]
    const { name, value, visible } = resolveLogic(field, fields) || {};
    values[name] = {
      value,
      name,
      visible
    }
    return values
  }, {})
)
