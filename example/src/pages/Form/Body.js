import React from "react";
import Field from "./Field";
import PreviewField from './PreviewField';

export default ({
  previewFields,
  fields,
  fieldsOrder,
  clearForm,
  saveForm,
  togglePreview,
  previewing
}) => {
  return (
    <form className="form-body">
      <div className="flex-row align-center">
        <h2>Form Preview</h2>
        <div className="flex-row align-right" style={{ marginTop: -15 }}>
          <button
            className="attribute-button secondary small"
            style={{ marginRight: previewing ? 0 : 10 }}
            onClick={togglePreview}
            type="button"
          >
            {previewing ? "Return to Editing" : "Preview"}
          </button>
          {!previewing && (
            <button
              className="attribute-button secondary small"
              style={{ marginRight: 10 }}
              onClick={clearForm}
              type="button"
            >
              Clear
            </button>
          )}
          {!previewing && (
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
      {!previewing ?
        fieldsOrder.map(fieldId => (
          <Field field={fields[fieldId]} key={fieldId} />
        ))
        :
        fieldsOrder.map(fieldId => (
          <PreviewField field={previewFields[fieldId]} key={fieldId} />
        ))
      }
    </form>
  );
};
