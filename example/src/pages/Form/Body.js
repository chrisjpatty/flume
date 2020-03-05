import React from "react";
import Field from "./Field";

export default ({ fields, fieldsOrder, clearForm, saveForm }) => {
  return (
    <form className="form-body">
      <div className="flex-row align-center">
        <h2>Form Preview</h2>
        <div className="flex-row align-right" style={{ marginTop: -15 }}>
          <button
            className="attribute-button secondary small"
            style={{ marginRight: 10 }}
            onClick={clearForm}
            type="button"
          >
            Clear
          </button>
          <button
            className="attribute-button small"
            onClick={saveForm}
            type="button"
          >
            Save
          </button>
        </div>
      </div>
      {fieldsOrder.map(fieldId => (
        <Field field={fields[fieldId]} key={fieldId} />
      ))}
    </form>
  );
};
