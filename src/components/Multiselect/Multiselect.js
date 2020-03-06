import React from "react";
import selectStyles from "../Select/Select.css";
import SelectDrawer from "../SelectDrawer/SelectDrawer";
import styles from './Multiselect.css'

const Multiselect = ({
  options = [],
  placeholder = "[Select an option]",
  onChange,
  data
}) => {
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
    onChange([
      ...data,
      option.value
    ]);
  };

  const getFilteredOptions = () => (
    options.filter(opt => !data.includes(opt.value))
  )

  return (
    <React.Fragment>
      {
        data.length ?
        <div className={styles.chipsWrapper}>
          {
            data.map(val => {
              const optLabel = (options.find(opt => opt.value === val) || {}).label || ""
              return (
                <OptionChip key={val}>{optLabel}</OptionChip>
              )
            })
          }
        </div>
        :
        null
      }
      <div className={selectStyles.wrapper} ref={wrapper} onClick={openDrawer}>
        {placeholder}
      </div>
      {drawerOpen && (
        <SelectDrawer
          x={drawerCoordinates.x}
          y={drawerCoordinates.y}
          options={getFilteredOptions()}
          onSelected={handleOptionSelected}
          onRequestClose={closeDrawer}
        />
      )}
    </React.Fragment>
  );
};

export default Multiselect;

const OptionChip = ({children}) => (
  <div className={styles.chipWrapper}>{children}</div>
)
