import React from "react";
import styles from "./Control.css";
import Select from '../Select/Select'

const Control = ({ type, label, options = [], placeholder }) => {
  const getControlByType = type => {
    switch (type) {
      case 'select':
        return <Select placeholder={placeholder} options={options} />
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
