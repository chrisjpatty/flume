import React from "react";
import fieldTypes from "./fieldTypes";
import { DesignerStateContext, DesignerDispatchContext } from "./Form";

const Field = ({ field }) => {
  const designerState = React.useContext(DesignerStateContext);
  const { ownsLabel } = fieldTypes[field.type];

  const getFieldByType = () => {
    switch (field.type) {
      case "text":
        return <TextInput {...field} />;
      case "select":
        return <Select {...field} />;
      case "checkbox":
        return <Checkbox {...field} />;
      default:
        return <div>Field</div>;
    }
  };

  return (
    <FieldWrapper
      fieldId={field.id}
      label={field.label}
      required={field.required}
      disabled={field.disabled}
      visible={field.visible}
      hideLabel={!ownsLabel}
      isSelected={designerState.selectedFieldId === field.id}
    >
      {getFieldByType()}
    </FieldWrapper>
  );
};

const FieldWrapper = ({
  children,
  label,
  disabled,
  visible,
  required,
  hideLabel,
  fieldId,
  isSelected
}) => {
  const designerDispatch = React.useContext(DesignerDispatchContext);

  const selectField = () => {
    designerDispatch({
      type: "SET_SELECTED_FIELD_ID",
      fieldId
    });
  };

  return (
    <div
      className="field-wrapper flex-column"
      data-visible={visible}
      data-disabled={disabled}
      data-required={required}
      data-selected={isSelected}
      onClick={selectField}
    >
      {hideLabel ? <label>{label}</label> : null}
      {children}
    </div>
  );
};

export default Field;

const TextInput = ({ value, disabled }) => (
  <div className="dummy-input" data-disabled={disabled}>
    {value}
  </div>
);

const Select = ({ value, disabled }) => (
  <div className="dummy-input dummy-select" data-disabled={disabled}>
    {value}
  </div>
);

const Checkbox = ({ value, label, disabled }) => (
  <div className="dummy-checkbox-wrapper">
    <div className="dummy-checkbox" data-disabled={disabled}></div>
    <label>{label}</label>
  </div>
);
