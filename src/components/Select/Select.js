import React from "react";
import styles from "./Select.css";
import SelectDrawer from "../SelectDrawer/SelectDrawer";

const MAX_LABEL_LENGTH = 50;

const Select = ({ options, placeholder = "", onChange, data }) => {
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

  const selectedOption = React.useMemo(() => {
    const option = options.find(o => o.value === data);
    if (option) {
      return {
        ...option,
        label:
          option.label.length > MAX_LABEL_LENGTH
            ? option.label.slice(0, MAX_LABEL_LENGTH) + "..."
            : option.label
      };
    }
  }, [options, data]);

  return (
    <React.Fragment>
      {data ? (
        <SelectedOption
          wrapperRef={wrapper}
          option={selectedOption}
          onClick={openDrawer}
        />
      ) : (
        <div className={styles.wrapper} ref={wrapper} onClick={openDrawer}>
          {placeholder}
        </div>
      )}
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

const SelectedOption = ({
  option: { label, description } = {},
  wrapperRef,
  onClick
}) => (
  <div className={styles.selectedWrapper} onClick={onClick} ref={wrapperRef}>
    <label>{label}</label>
    {description ? <p>{description}</p> : null}
  </div>
);
