import React from "react";
import styles from "./IoPorts.css";
import Control from "../Control/Control";
import { InputTypesContext } from "../../context";

const IoPorts = ({ inputs = [], outputs = [] }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inputs}>
        {inputs.map((input, i) => (
          <Input {...input} key={i} />
        ))}
      </div>
      {!!outputs.length && (
        <div className={styles.outputs}>
          {outputs.map((output, i) => (
            <Output {...output} portOnRight key={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default IoPorts;

const Input = ({ type, label, name }) => {
  const inputTypes = React.useContext(InputTypesContext);
  const { label: defaultLabel, color, controls = [] } = inputTypes[type] || {};

  return (
    <div className={styles.transput}>
      <Port color={color} name={name} />
      {controls.map(control => (
        <Control {...control} key={control.name} />
      ))}
      {!controls.length && (
        <label className={styles.portLabel}>{label || defaultLabel}</label>
      )}
    </div>
  );
};

const Output = ({ label, name }) => {
  return (
    <div className={styles.transput}>
      <label className={styles.portLabel}>{label}</label>
      <Port name={name} />
    </div>
  );
};

const Port = ({ color = "grey", name="" }) => {
  const handleMouseDown = e => {
    e.stopPropagation();
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      className={styles.port}
      data-port-color={color}
      data-port-name={name}
    ></div>
  );
};
