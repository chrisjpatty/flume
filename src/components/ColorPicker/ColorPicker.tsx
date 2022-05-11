import React from "react";
import styles from "./ColorPicker.css";
import { Colors } from "../../typeBuilders";
import { Colors as ColorsType } from "../../types";

interface ColorPickerProps {
  x: number;
  y: number;
  onColorPicked: (color: ColorsType) => void;
  onRequestClose: () => void;
}

export default ({ x, y, onColorPicked, onRequestClose }: ColorPickerProps) => {
  const wrapper = React.useRef<HTMLDivElement>(null);

  const testClickOutside = React.useCallback(
    (e: MouseEvent) => {
      if (wrapper.current && !wrapper.current.contains(e.target as Node)) {
        onRequestClose();
        document.removeEventListener("click", testClickOutside);
        document.removeEventListener("contextmenu", testClickOutside);
      }
    },
    [wrapper, onRequestClose]
  );

  const testEscape = React.useCallback(
    (e: KeyboardEvent) => {
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
      {Object.values(Colors).map(colorString => {
        const color = colorString as ColorsType;
        return (
          <ColorButton
            onSelected={() => {
              onColorPicked(color);
              onRequestClose();
            }}
            color={color}
            key={color}
          />
        );
      })}
    </div>
  );
};

const ColorButton = ({
  color,
  onSelected
}: {
  color: ColorsType;
  onSelected: () => void;
}) => (
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
