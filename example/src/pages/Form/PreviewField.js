import React from "react";
import { PreviewFieldsDispatchContext } from "./Form";
const nanoid = require("nanoid");

export default ({ field }) => {
  const { label, value, disabled, required } = field;
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
            onChange={e => handleChange(e.target.value)}
          />
        );
      case "checkbox":
        return <Checkbox value={value} label={label} onChange={handleChange} />;
      case "select":
        return (
          <Select
            value={value}
            options={field.options}
            onChange={handleChange}
          />
        );
      default:
        return <div>Some field</div>;
    }
  };

  return (
    <FieldWrapper
      disabled={disabled}
      required={required}
      hideLabel={field.type === "checkbox"}
      label={label}
    >
      {getFieldByType()}
    </FieldWrapper>
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

const Checkbox = ({ value, label, onChange }) => {
  const id = React.useRef(nanoid(10));

  return (
    <div className="dummy-checkbox-wrapper real-checkbox-wrapper">
      <input
        id={id.current}
        type="checkbox"
        value={value}
        checked={value}
        onChange={e => onChange(e.target.checked)}
      />
      <label htmlFor={id.current} className="checkbox-box"></label>
      <label htmlFor={id.current} className="checkbox-label">
        {label}
      </label>
    </div>
  );
};

const Select = ({ value, onChange, options }) => (
  <select
    className="dummy-input"
    value={value}
    onChange={e => onChange(e.target.value)}
  >
    {options.map((option, i) => (
      <option value={option.value} key={`${option.name}${i}`}>
        {option.label}
      </option>
    ))}
  </select>
);
