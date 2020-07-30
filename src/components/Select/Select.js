import React from "react";
import selectStyles from "../Select/Select.css";
import { Portal } from "react-portal";
import ContextMenu from "../ContextMenu/ContextMenu";
import styles from "./Select.css";

const MAX_LABEL_LENGTH = 50;

const Select = ({
  options = [],
  placeholder = "[Select an option]",
  onChange,
  data,
  allowMultiple
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
    if(allowMultiple){
      onChange([...data, option.value]);
    }else{
      onChange(option.value)
    }
  };

  const handleOptionDeleted = optionIndex => {
    onChange([...data.slice(0, optionIndex), ...data.slice(optionIndex + 1)]);
  };

  const getFilteredOptions = () =>
    options.filter(opt => !data.includes(opt.value));

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
      {allowMultiple ? (
        data.length ? (
          <div className={styles.chipsWrapper}>
            {data.map((val, i) => {
              const optLabel =
                (options.find(opt => opt.value === val) || {}).label || "";
              return (
                <OptionChip
                  onRequestDelete={() => handleOptionDeleted(i)}
                  key={val}
                >
                  {optLabel}
                </OptionChip>
              );
            })}
          </div>
        ) : null
      ) : data ? (
        <SelectedOption
          wrapperRef={wrapper}
          option={selectedOption}
          onClick={openDrawer}
        />
      ) : null}
      {
        (allowMultiple || !data) &&
        <div className={selectStyles.wrapper} ref={wrapper} onClick={openDrawer}>
          {placeholder}
        </div>
      }
      {drawerOpen && (
        <Portal>
          <ContextMenu
            x={drawerCoordinates.x}
            y={drawerCoordinates.y}
            emptyText="There are no options"
            options={getFilteredOptions()}
            onOptionSelected={handleOptionSelected}
            onRequestClose={closeDrawer}
          />
        </Portal>
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

const OptionChip = ({ children, onRequestDelete }) => (
  <div className={styles.chipWrapper}>
    {children}
    <button
      className={styles.deleteButton}
      onMouseDown={e => {
        e.stopPropagation();
      }}
      onClick={onRequestDelete}
    >
      ✕
    </button>
  </div>
);
