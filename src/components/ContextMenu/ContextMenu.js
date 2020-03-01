import React from "react";
import styles from "./ContextMenu.css";

const ContextMenu = ({
  x,
  y,
  options = [],
  onRequestClose,
  onOptionSelected,
  label
}) => {
  const menuWrapper = React.useRef();
  const filterInput = React.useRef();
  const [filter, setFilter] = React.useState("");
  const [menuWidth, setMenuWidth] = React.useState(0);

  const handleOptionSelected = option => {
    onOptionSelected(option);
    onRequestClose()
  };

  const testClickOutside = React.useCallback(
    e => {
      if (!menuWrapper.current.contains(e.target)) {
        onRequestClose();
        document.removeEventListener("click", testClickOutside);
      }
    },
    [menuWrapper, onRequestClose]
  );

  const testEscape = React.useCallback(
    e => {
      if (e.keyCode === 27) {
        onRequestClose();
        document.removeEventListener("keydown", testEscape);
      }
    },
    [onRequestClose]
  );

  React.useEffect(() => {
    filterInput.current.focus();
    setMenuWidth(menuWrapper.current.getBoundingClientRect().width);
    document.addEventListener("keydown", testEscape);
    document.addEventListener("click", testClickOutside);
    return () => {
      document.removeEventListener("click", testClickOutside);
      document.removeEventListener("keydown", testEscape);
    };
  }, [testClickOutside, testEscape]);

  const filteredOptions = React.useMemo(() => {
    if (!filter) return options;
    const lowerFilter = filter.toLowerCase();
    return options.filter(opt => opt.label.toLowerCase().includes(lowerFilter));
  }, [filter, options]);

  return (
    <div
      className={styles.menuWrapper}
      style={{ left: x, top: y, width: filter ? menuWidth : "auto" }}
      ref={menuWrapper}
    >
      <div className={styles.menuHeader}>
        <label className={styles.menuLabel}>{label}</label>
        <input
          type="text"
          placeholder="Filter options"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className={styles.menuFilter}
          ref={filterInput}
        />
      </div>
      <div className={styles.optionsWrapper}>
        {filteredOptions.map((option, i) => (
          <ContextOption
            onClick={() => handleOptionSelected(option)}
            key={option.value + i}
          >
            <label>{option.label}</label>
            {option.description ? <p>{option.description}</p> : null}
          </ContextOption>
        ))}
      </div>
    </div>
  );
};

const ContextOption = ({ children, onClick }) => {
  return (
    <div className={styles.option} onClick={onClick}>
      {children}
    </div>
  );
};

export default ContextMenu;
