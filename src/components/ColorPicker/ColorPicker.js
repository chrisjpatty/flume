import React from "react";
import styles from "./ColorPicker.css";
import { Colors } from "../../typeBuilders";

export default ({ x, y, onColorPicked, onRequestClose }) => {
  return (
    <div
      className={styles.wrapper}
      style={{
        left: x,
        top: y
      }}
    >
      {Object.values(Colors).map(color => (
        <ColorButton
          onSelected={() => {
            onColorPicked(color);
            onRequestClose();
          }}
          color={color}
          key={color}
        />
      ))}
    </div>
  );
};

const ColorButton = ({ color, onSelected }) => (
  <div className={styles.colorButtonWrapper}>
    <button
      className={styles.colorButton}
      onClick={onSelected}
      data-color={color}
      aria-label={color}
    />
  </div>
);
