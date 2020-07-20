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
  render,
  options = [],
  placeholder,
  inputData,
  triggerRecalculation,
  updateNodeConnections,
  getOptions,
  setValue,
  defaultValue,
  isMonoControl
}) => {
  const nodesDispatch = React.useContext(NodeDispatchContext);
  const executionContext = React.useContext(ContextContext);

  const calculatedLabel = isMonoControl ? inputLabel : label

  const onChange = data => {
    nodesDispatch({
      type: "SET_PORT_DATA",
      data,
      nodeId,
      portName,
      controlName: name,
      setValue
    });
    triggerRecalculation();
  };

  const getControlByType = type => {
    const commonProps = { triggerRecalculation, updateNodeConnections, onChange, data };
    switch (type) {
      case "select":
        return (
          <Select
            {...commonProps}
            options={
              getOptions ? getOptions(inputData, executionContext) : options
            }
            placeholder={placeholder}
          />
        );
      case "text":
        return <TextInput {...commonProps} placeholder={placeholder} />;
      case "number":
        return (
          <TextInput
            {...commonProps}
            type="number"
            placeholder={placeholder}
          />
        );
      case "checkbox":
        return <Checkbox {...commonProps} label={calculatedLabel} />;
      case "multiselect":
        return (
          <Multiselect
            {...commonProps}
            options={
              getOptions ? getOptions(inputData, executionContext) : options
            }
            placeholder={placeholder}
            label={label}
          />
        );
      case "custom":
        return render(data, onChange, executionContext, triggerRecalculation, {
          label,
          name,
          portName,
          inputLabel,
          defaultValue
        });
      default:
        return <div>Control</div>;
    }
  };

  return <div className={styles.wrapper}>
    {calculatedLabel && type !== "checkbox" && <label className={styles.controlLabel}>{calculatedLabel}</label>}
    {getControlByType(type)}
  </div>;
};

export default Control;
