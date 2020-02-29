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
    document.removeEventListener("click", testClickOutside);
  };

  const testClickOutside = e => {
    const selectDrawer = document.getElementById(
      "__node_editor_select_wrapper__"
    );
    if (selectDrawer && !selectDrawer.contains(e.target)) {
      closeDrawer();
    }
  };

  const openDrawer = () => {
    if (!drawerOpen) {
      const wrapperRect = wrapper.current.getBoundingClientRect();
      setDrawerCoordinates({
        x: wrapperRect.x,
        y: wrapperRect.y + wrapperRect.height
      });
      setDrawerOpen(true);
      document.addEventListener("click", testClickOutside);
    }
  };

  const handleOptionSelected = option => {
    onChange(option.value);
    closeDrawer();
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
        />
      )}
    </React.Fragment>
  );
};

export default Select;
