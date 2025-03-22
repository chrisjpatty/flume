import React from "react";
import styles from "./TextInput.css";
import { RecalculateStageRectContext } from "../../context";

interface TextInputProps {
  placeholder?: string;
  updateNodeConnections: () => void;
  onChange: (value: string | number) => void;
  data: string | number;
  step?: number;
  type?: "number" | "text";
}

const TextInput = ({
  placeholder,
  updateNodeConnections,
  onChange,
  data,
  step,
  type
}: TextInputProps) => {
  const numberInput = React.useRef<HTMLInputElement>(null);
  const recalculateStageRect = React.useContext(RecalculateStageRectContext);

  const handleDragEnd = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleDragEnd);
  };

  const handleMouseMove = (e: MouseEvent) => {
    e.stopPropagation();
    updateNodeConnections();
  };

  const handlePossibleResize: React.MouseEventHandler<HTMLInputElement | HTMLTextAreaElement> = e => {
    e.stopPropagation();
    recalculateStageRect?.();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleDragEnd);
  };

  return (
    <div className={styles.wrapper} data-flume-component="text-input">
      {type === "number" ? (
        <input
          data-flume-component="text-input-number"
          onKeyDown={e => {
            if (e.keyCode === 69) {
              e.preventDefault();
              return false;
            }
          }}
          onChange={e => {
            const inputValue = e.target.value.replace(/e/g, "");
            if (!!inputValue) {
              const value = parseFloat(inputValue);
              if (Number.isNaN(value)) {
                onChange(0);
              } else {
                onChange(value);
                if (numberInput.current) {
                  numberInput.current.value = value.toString();
                }
              }
            }
          }}
          onBlur={e => {
            if (!e.target.value) {
              onChange(0);
              if (numberInput.current) {
                numberInput.current.value = "0";
              }
            }
          }}
          step={step || "1"}
          onMouseDown={handlePossibleResize}
          type={type || "text"}
          placeholder={placeholder}
          className={styles.input}
          defaultValue={data}
          onDragStart={e => e.stopPropagation()}
          ref={numberInput}
        />
      ) : (
        <textarea
          data-flume-component="text-input-textarea"
          onChange={e => onChange(e.target.value)}
          onMouseDown={handlePossibleResize}
          placeholder={placeholder}
          className={styles.input}
          value={data}
          onDragStart={e => e.stopPropagation()}
        />
      )}
    </div>
  );
};

export default TextInput;
