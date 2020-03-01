import React from "react";
import styles from "./Control.css";
import Select from '../Select/Select'
import TextInput from '../TextInput/TextInput'

const Control = ({ type, label, inputLabel, options = [], placeholder, updateNodeConnections }) => {
  const getControlByType = type => {
    const commonProps = { updateNodeConnections }
    switch (type) {
      case 'select':
        return <Select {...commonProps} placeholder={placeholder} options={options} />
      case 'text':
        return <TextInput {...commonProps} placeholder={inputLabel || label} />
      default:
        return <div>Control</div>
    }
  }

  return (
    <div className={styles.wrapper}>
      {
        getControlByType(type)
      }
    </div>
  );
};

export default Control;
