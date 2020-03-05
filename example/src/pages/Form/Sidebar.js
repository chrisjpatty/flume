import React from 'react'
import fieldTypes from './fieldTypes'
import { FieldsDispatchContext } from './Form'

export default () => {

  return (
    <div>
      <div className="form-sidebar">
        <h2>Fields</h2>
        {
          Object.values(fieldTypes).map(fieldType => (
            <FieldButton {...fieldType} key={fieldType.type} />
          ))
        }
      </div>
    </div>
  )
}

const FieldButton = ({ label, type }) => {
  const fieldsDispatch = React.useContext(FieldsDispatchContext)

  const addField = () => {
    fieldsDispatch({
      type: 'ADD_FIELD',
      fieldType: fieldTypes[type]
    })
  }

  return (
    <button className="form-sidebar-button" onClick={addField}>{label}</button>
  )
}
