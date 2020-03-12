import React from "react";
import styles from "./Control.css";
import Select from "../Select/Select";
import Checkbox from "../Checkbox/Checkbox";
import TextInput from "../TextInput/TextInput";
import Multiselect from "../Multiselect/Multiselect";
import { NodeDispatchContext, ContextContext } from "../../context";

const Control = ({
  type,
  name,
  nodeId,
  portName,
  label,
  inputLabel,
  data,
  options = [],
  placeholder,
  inputData,
  triggerRecalculation,
  getOptions,
  setValue
}) => {
  const nodesDispatch = React.useContext(NodeDispatchContext);
  const executionContext = React.useContext(ContextContext)

  const onChange = data => {
    nodesDispatch({
      type: "SET_PORT_DATA",
      data,
      nodeId,
      portName,
      controlName: name,
      setValue
    });
    triggerRecalculation()
  };

  const getControlByType = type => {
    const commonProps = { triggerRecalculation, onChange, data };
    switch (type) {
      case "select":
        return (
          <Select
            {...commonProps}
            options={getOptions ? getOptions(inputData, executionContext) : options}
            placeholder={placeholder}
          />
        );
      case "text":
        return <TextInput {...commonProps} placeholder={inputLabel || label} />;
      case "number":
        return (
          <TextInput
            {...commonProps}
            type="number"
            placeholder={inputLabel || label}
          />
        );
      case "checkbox":
        return <Checkbox {...commonProps} label={label} />;
      case "multiselect":
        return (
          <Multiselect
            {...commonProps}
            options={getOptions ? getOptions(inputData, executionContext) : options}
            placeholder={placeholder}
            label={label}
          />
        );
      default:
        return <div>Control</div>;
    }
  };

  return <div className={styles.wrapper}>{getControlByType(type)}</div>;
};

export default Control;
