import React from "react";
import styles from "./Select.css";
import SelectDrawer from "../SelectDrawer/SelectDrawer";

const noop = () => {};

const Select = ({ options, placeholder = "", onChange = noop }) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [drawerCoordinates, setDrawerCoordinates] = React.useState({
    x: 0,
    y: 0
  });
  const wrapper = React.useRef();

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const openDrawer = () => {
    if (!drawerOpen) {
      const wrapperRect = wrapper.current.getBoundingClientRect();
      setDrawerCoordinates({
        x: wrapperRect.x,
        y: wrapperRect.y + wrapperRect.height
      });
      setDrawerOpen(true);
    }
  };

  const handleOptionSelected = option => {
    onChange(option.value);
  };

  return (
    <React.Fragment>
      <div className={styles.wrapper} ref={wrapper} onClick={openDrawer}>
        {placeholder}
      </div>
      {drawerOpen && (
        <SelectDrawer
          x={drawerCoordinates.x}
          y={drawerCoordinates.y}
          options={options}
          onSelected={handleOptionSelected}
          onRequestClose={closeDrawer}
        />
      )}
    </React.Fragment>
  );
};

export default Select;
