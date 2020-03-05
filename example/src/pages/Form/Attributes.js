import React from "react";
import {
  DesignerStateContext,
  FieldsContext,
  FieldsDispatchContext
} from "./Form";
import fieldTypes from "./fieldTypes";
import Checkbox from "../../components/Checkbox";
import OptionsEditor from "../../components/OptionsEditor";

export default () => {
  const designerState = React.useContext(DesignerStateContext);
  const fields = React.useContext(FieldsContext);

  const currentField = fields[designerState.selectedFieldId];
  const currentFieldType = currentField ? fieldTypes[currentField.type] : {};

  return (
    <div className="attributes">
      <div className="form-sidebar form-attributes">
        <h2>Attributes</h2>
        {currentField && currentFieldType ? (
          <Attributes
            attributes={currentFieldType.attributes}
            currentField={currentField}
          />
        ) : (
          <span>No field selected</span>
        )}
      </div>
    </div>
  );
};

const Attributes = ({ attributes = [], currentField }) => {
  return attributes.map(attr => (
    <Attribute
      {...attr}
      value={currentField[attr.name]}
      field={currentField}
      key={currentField.id + attr.name}
    />
  ));
};

const hiddenLabelTypes = ["checkbox", "options"]

const Attribute = ({ field, label, name, type, value }) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const fieldsDispatch = React.useContext(FieldsDispatchContext);

  const setAttribute = value => {
    fieldsDispatch({
      type: "SET_ATTRIBUTE_VALUE",
      fieldId: field.id,
      name,
      value
    });
  };

  const getAttributeField = () => {
    switch (type) {
      case "checkbox":
        return <Checkbox label={label} value={value} onChange={setAttribute} />;
      case "options":
        return (
          <React.Fragment>
            <AttributeButton onClick={() => setModalOpen(true)}>
              Edit Options
            </AttributeButton>
            <OptionsEditor
              options={value}
              onChange={setAttribute}
              isOpen={modalOpen}
              onCloseRequested={() => setModalOpen(false)}
            />
          </React.Fragment>
        );
      case "text":
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={e => setAttribute(e.target.value)}
          />
        );
    }
  };

  return (
    <AttributeWrapper label={label} hideLabel={hiddenLabelTypes.includes(type)}>
      {getAttributeField()}
    </AttributeWrapper>
  );
};

const AttributeWrapper = ({ label, children, hideLabel }) => (
  <div className="attribute-wrapper">
    {!hideLabel ? <label>{label}</label> : null}
    {children}
  </div>
);

const AttributeButton = ({ children, onClick }) => (
  <button className="attribute-button" onClick={onClick}>
    {children}
  </button>
);
