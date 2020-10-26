import React from "react";
import styles from "./Checkbox.css";
import nanoid from "nanoid/non-secure/index";

const Checkbox = ({ label, data, onChange }) => {
  const id = React.useRef(nanoid(10));

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.checkbox}
        type="checkbox"
        id={id}
        value={data}
        checked={data}
        onChange={e => onChange(e.target.checked)}
      />
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
