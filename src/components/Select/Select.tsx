import React from "react";
import selectStyles from "../Select/Select.css";
import { Portal } from "react-portal";
import ContextMenu from "../ContextMenu/ContextMenu";
import styles from "./Select.css";
import { SelectOption } from "../../types";

const MAX_LABEL_LENGTH = 50;

interface SelectProps {
  allowMultiple?: boolean;
  data: string | string[];
  onChange: (data: string | string[]) => void;
  options: SelectOption[];
  placeholder?: string;
}

const Select = ({
  options = [],
  placeholder = "[Select an option]",
  onChange,
  data,
  allowMultiple = false
}: SelectProps) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [drawerCoordinates, setDrawerCoordinates] = React.useState({
    x: 0,
    y: 0
  });
  const wrapper = React.useRef<HTMLDivElement>(null);

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const openDrawer = () => {
    if (!drawerOpen) {
      const wrapperRect = wrapper.current?.getBoundingClientRect();
      if (wrapperRect) {
        setDrawerCoordinates({
          x: wrapperRect.x,
          y: wrapperRect.y + wrapperRect.height
        });
        setDrawerOpen(true);
      }
    }
  };

  const handleOptionSelected = (option: SelectOption) => {
    if (allowMultiple && Array.isArray(data)) {
      onChange([...data, option.value]);
    } else {
      onChange(option.value);
    }
  };

  const handleOptionDeleted = (optionIndex: number) => {
    onChange([...data.slice(0, optionIndex), ...data.slice(optionIndex + 1)]);
  };

  const getFilteredOptions = () =>
    allowMultiple ? options.filter(opt => !data.includes(opt.value)) : options;

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
      {allowMultiple && typeof data !== "string" ? (
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
      {(allowMultiple || !data) && (
        <div
          className={selectStyles.wrapper}
          ref={wrapper}
          onClick={openDrawer}
        >
          {placeholder}
        </div>
      )}
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

interface SelectedOptionProps {
  option?: SelectOption;
  wrapperRef: React.RefObject<HTMLDivElement>;
  onClick: React.MouseEventHandler;
}

const SelectedOption = ({
  option: { label, description } = {
    label: "",
    description: "",
    value: ""
  },
  wrapperRef,
  onClick
}: SelectedOptionProps) => (
  <div
    className={styles.selectedWrapper}
    onClick={onClick}
    ref={wrapperRef}
    data-flume-component="select"
  >
    <label data-flume-component="select-label">{label}</label>
    {description ? (
      <p data-flume-component="select-desc">{description}</p>
    ) : null}
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
