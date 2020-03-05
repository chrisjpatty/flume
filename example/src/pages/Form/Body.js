import React from 'react'
import Field from './Field'

export default ({ fields, fieldsOrder }) => {

  return (
    <form className="form-body">
      <h2>Form Preview</h2>
      {
        fieldsOrder.map(fieldId => (
          <Field field={fields[fieldId]} key={fieldId}/>
        ))
      }
    </form>
  )
}
