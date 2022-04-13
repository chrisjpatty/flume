import React from "react";
import styles from "./ColorPicker.css";
import { Colors } from "../../typeBuilders";

export default ({ x, y, onColorPicked, onRequestClose }) => {
  const wrapper = React.useRef();

  const testClickOutside = React.useCallback(
    e => {
      if (wrapper.current && !wrapper.current.contains(e.target)) {
        onRequestClose();
        document.removeEventListener("click", testClickOutside);
        document.removeEventListener("contextmenu", testClickOutside);
      }
    },
    [wrapper, onRequestClose]
  );

  const testEscape = React.useCallback(
    e => {
      if (e.keyCode === 27) {
        onRequestClose();
        document.removeEventListener("keydown", testEscape);
      }
    },
    [onRequestClose]
  );

  React.useEffect(() => {
    document.addEventListener("keydown", testEscape);
    document.addEventListener("click", testClickOutside);
    document.addEventListener("contextmenu", testClickOutside);
    return () => {
      document.removeEventListener("click", testClickOutside);
      document.removeEventListener("contextmenu", testClickOutside);
      document.removeEventListener("keydown", testEscape);
    };
  }, [testClickOutside, testEscape]);

  return (
    <div
      data-flume-component="color-picker"
      ref={wrapper}
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
      data-flume-component="color-button"
      className={styles.colorButton}
      onClick={onSelected}
      data-color={color}
      aria-label={color}
    />
  </div>
);
