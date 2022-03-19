import React from "react";
import { PreviewFieldsDispatchContext } from "./Form";
import resolveLogic from './resolveLogic'
import { nanoid }from "nanoid/non-secure/index";

const PreviewField = ({ field, fields }) => {
  const { label, value, disabled, visible, required } = resolveLogic(field, fields) || {};
  const dispatchPreviewFields = React.useContext(PreviewFieldsDispatchContext);

  const handleChange = value => {
    dispatchPreviewFields({
      type: "SET_FIELD_VALUE",
      fieldId: field.id,
      value
    });
  };

  const getFieldByType = () => {
    switch (field.type) {
      case "text":
        return (
          <input
            className="dummy-input"
            type="text"
            value={value}
            required={required}
            disabled={disabled}
            onChange={e => handleChange(e.target.value)}
          />
        );
      case "checkbox":
        return (
          <Checkbox
            label={label}
            value={value}
            disabled={disabled}
            required={required}
            onChange={handleChange}
          />
        );
      case "select":
        return (
          <Select
            value={value}
            disabled={disabled}
            required={required}
            options={field.options}
            onChange={handleChange}
          />
        );
      default:
        return <div>Some field</div>;
    }
  };

  return (
    visible ?
    <FieldWrapper
      disabled={disabled}
      required={required}
      hideLabel={field.type === "checkbox"}
      label={label}
    >
      {getFieldByType()}
    </FieldWrapper>
    : null
  );
};

const FieldWrapper = ({ children, label, hideLabel, disabled, required }) => (
  <div
    className="field-wrapper unselectable flex-column"
    data-disabled={disabled}
    data-required={required}
  >
    {!hideLabel ? <label>{label}</label> : null}
    {children}
  </div>
);

const Checkbox = ({ value, label, onChange, disabled, required }) => {
  const id = React.useRef(nanoid(10));

  return (
    <div className="dummy-checkbox-wrapper real-checkbox-wrapper">
      <input
        id={id.current}
        type="checkbox"
        value={value}
        checked={value}
        disabled={disabled}
        required={required}
        onChange={e => onChange(e.target.checked)}
      />
      <label htmlFor={id.current} className="checkbox-box"></label>
      <label htmlFor={id.current} className="checkbox-label">
        {label}
      </label>
    </div>
  );
};

const Select = ({ value, disabled, onChange, options, required }) => (
  <select
    className="dummy-input"
    value={value}
    disabled={disabled}
    required={required}
    onChange={e => onChange(e.target.value)}
  >
    {options.map((option, i) => (
      <option value={option.value} key={`${option.name}${i}`}>
        {option.label}
      </option>
    ))}
  </select>
);

export default PreviewField;