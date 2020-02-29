import React from "react";
import { Portal } from "react-portal";
import styles from "./SelectDrawer.css";

const SelectDrawer = ({ x, y, options, onSelected }) => {
  return (
    <Portal>
      <div
        className={styles.wrapper}
        style={{ left: x, top: y }}
        id="__node_editor_select_wrapper__"
      >
        {
          options.map((option, i) => (
            <div className={styles.option} onClick={() => onSelected(option)} key={option.value + i}>
              <label>{option.label}</label>
              <p>{option.description}</p>
            </div>
          ))
        }
      </div>
    </Portal>
  );
};

export default SelectDrawer;
