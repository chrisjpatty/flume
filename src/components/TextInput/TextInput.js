import React from "react";
import styles from "./TextInput.css";

const TextInput = ({ placeholder, updateNodeConnections }) => {

  const handleDragEnd = () => {
    document.removeEventListener("mousemove", handleMouseMove)
    document.removeEventListener("mouseup", handleDragEnd)
  }

  const handleMouseMove = e => {
    updateNodeConnections()
  }

  const handlePossibleResize = e => {
    e.stopPropagation();
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleDragEnd)
  };

  return (
    <div className={styles.wrapper}>
      <textarea
        onMouseDown={handlePossibleResize}
        type="text"
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
};

export default TextInput;
