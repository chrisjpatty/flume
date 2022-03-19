import React from "react";
import { nanoid }from "nanoid";

const Checkbox = ({ label, value, onChange }) => {
  const id = React.useRef(nanoid(10));

  return (
    <div className="checkbox-wrapper">
      <input
        type="checkbox"
        value={value}
        checked={value}
        id={id.current}
        onChange={e => onChange(e.target.checked)}
      />
      <label htmlFor={id.current} className="checkbox-box"></label>
      <label htmlFor={id.current} className="checkbox-label">{label}</label>
    </div>
  );
};

export default Checkbox;