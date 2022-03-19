import React from "react";
import axios from 'axios'
import { useHistory } from 'react-router'
import Field from "./Field";
import PreviewField from './PreviewField';
import { DesignerDispatchContext, DesignerStateContext, BASE_URL } from './Form'
import { getFieldValues } from './formHandler'

const Body = ({
  previewFields,
  fields,
  fieldsOrder,
  clearForm,
  saveForm,
  togglePreview,
  previewing,
  filing,
  editingWizard,
  wizardLoading
}) => {
  const designerDispatch = React.useContext(DesignerDispatchContext)
  const designerState = React.useContext(DesignerStateContext)
  const history = useHistory()

  const startWizardEdit = () => {
    designerDispatch({
      type: "START_WIZARD_EDIT"
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const values = getFieldValues(previewFields, fieldsOrder)
    axios.post(`${BASE_URL}/records`, {
      wizardId: designerState.wizardId,
      values
    })
    .then(res => {
      history.push('/records')
    })
  }

  return (
    <form className="form-body" onSubmit={handleSubmit}>
      <div className="flex-row align-center">
        <h2 onClick={startWizardEdit} data-editing={editingWizard}>{filing ? designerState.title : "Form Preview"}</h2>
        <div className="flex-row align-right" style={{ marginTop: -15 }}>
          {
            !filing &&
            <button
              className="attribute-button secondary small"
              style={{ marginRight: previewing ? 0 : 10 }}
              onClick={togglePreview}
              type="button"
            >
              {previewing ? "Return to Editing" : "Preview"}
            </button>
          }
          {!previewing && !filing && (
            <button
              className="attribute-button secondary small"
              style={{ marginRight: 10 }}
              onClick={clearForm}
              type="button"
            >
              Clear
            </button>
          )}
          {!previewing && !filing && (
            <button
              className="attribute-button small"
              onClick={saveForm}
              type="button"
            >
              Save
            </button>
          )}
        </div>
      </div>
      {
        !wizardLoading &&
        <React.Fragment>
          {!previewing && !filing ?
            fieldsOrder.map(fieldId => (
              <Field field={fields[fieldId]} key={fieldId} />
            ))
            :
            fieldsOrder.map(fieldId => (
              <PreviewField field={previewFields[fieldId]} fields={previewFields} key={fieldId} />
            ))
          }
        </React.Fragment>
      }
      {
        filing &&
        <div className="footer-toolbar flex-row" style={{marginTop: 'auto'}}>
          <button className="attribute-button align-right">Submit</button>
        </div>
      }
    </form>
  );
};

export default Body;