import React from "react";
import styles from "./TextInput.css";

const TextInput = ({
  placeholder,
  triggerRecalculation,
  onChange,
  data,
  type
}) => {
  const handleDragEnd = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleDragEnd);
  };

  const handleMouseMove = e => {
    triggerRecalculation();
  };

  const handlePossibleResize = e => {
    e.stopPropagation();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleDragEnd);
  };

  return (
    <div className={styles.wrapper}>
      {type === "number" ? (
        <input
          onChange={e =>{
            const value = parseFloat(e.target.value.replace(/e/g, ""), 10);
            if(Number.isNaN(value)){
              onChange(0)
            }else{
              onChange(value)
            }
          }}
          step="0.01"
          onMouseDown={handlePossibleResize}
          type={type || "text"}
          placeholder={placeholder}
          className={styles.input}
          value={data}
        />
      ) : (
        <textarea
          onChange={e => onChange(e.target.value)}
          onMouseDown={handlePossibleResize}
          type="text"
          placeholder={placeholder}
          className={styles.input}
          value={data}
        />
      )}
    </div>
  );
};

export default TextInput;
