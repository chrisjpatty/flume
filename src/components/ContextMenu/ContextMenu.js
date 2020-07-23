import React from "react";
import styles from "./ContextMenu.css";
import clamp from "lodash/clamp";
const nanoid = require("nanoid");

const ContextMenu = ({
  x,
  y,
  options = [],
  onRequestClose,
  onOptionSelected,
  label,
  hideHeader,
  hideFilter,
  emptyText
}) => {
  const menuWrapper = React.useRef();
  const menuOptionsWrapper = React.useRef();
  const filterInput = React.useRef();
  const [filter, setFilter] = React.useState("");
  const [menuWidth, setMenuWidth] = React.useState(0);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const menuId = React.useRef(nanoid(10));

  const handleOptionSelected = option => {
    onOptionSelected(option);
    onRequestClose();
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
    if (filterInput.current) {
      filterInput.current.focus();
    }
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

  const handleFilterChange = e => {
    const value = e.target.value;
    setFilter(value);
    setSelectedIndex(0);
  };

  const handleKeyDown = e => {
    // Up pressed
    if (e.which === 38) {
      e.preventDefault();
      if (selectedIndex === null) {
        setSelectedIndex(0);
      } else if (selectedIndex > 0) {
        setSelectedIndex(i => i - 1);
      }
    }
    // Down pressed
    if (e.which === 40) {
      e.preventDefault();
      if (selectedIndex === null) {
        setSelectedIndex(0);
      } else if (selectedIndex < filteredOptions.length - 1) {
        setSelectedIndex(i => i + 1);
      }
    }
    // Enter pressed
    if (e.which === 13 && selectedIndex !== null) {
      const option = filteredOptions[selectedIndex];
      if (option) {
        handleOptionSelected(option);
      }
    }
  };

  React.useEffect(() => {
    if (hideFilter || hideHeader) {
      menuWrapper.current.focus();
    }
  }, [hideFilter, hideHeader]);

  React.useEffect(() => {
    const menuOption = document.getElementById(
      `${menuId.current}-${selectedIndex}`
    );
    if (menuOption) {
      const menuRect = menuOptionsWrapper.current.getBoundingClientRect();
      const optionRect = menuOption.getBoundingClientRect();
      if (
        optionRect.y + optionRect.height > menuRect.y + menuRect.height ||
        optionRect.y < menuRect.y
      ) {
        menuOption.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  return (
    <div
      className={styles.menuWrapper}
      onMouseDown={e => e.stopPropagation()}
      onKeyDown={handleKeyDown}
      style={{
        left: x,
        top: y,
        width: filter ? menuWidth : "auto"
      }}
      ref={menuWrapper}
      tabIndex={0}
      role="menu"
      aria-activedescendant={`${menuId.current}-${selectedIndex}`}
    >
      {!hideHeader ? (
        <div className={styles.menuHeader}>
          <label className={styles.menuLabel}>{label}</label>
          {!hideFilter ? (
            <input
              type="text"
              placeholder="Filter options"
              value={filter}
              onChange={handleFilterChange}
              className={styles.menuFilter}
              ref={filterInput}
            />
          ) : null}
        </div>
      ) : null}
      <div
        className={styles.optionsWrapper}
        role="menu"
        ref={menuOptionsWrapper}
        style={{ maxHeight: clamp(window.innerHeight - y - 70, 10, 300) }}
      >
        {filteredOptions.map((option, i) => (
          <ContextOption
            menuId={menuId.current}
            selected={selectedIndex === i}
            onClick={() => handleOptionSelected(option)}
            onMouseEnter={() => setSelectedIndex(null)}
            index={i}
            key={option.value + i}
          >
            <label>{option.label}</label>
            {option.description ? <p>{option.description}</p> : null}
          </ContextOption>
        ))}
        {!options.length ? (
          <span className={styles.emptyText}>{emptyText}</span>
        ) : null}
      </div>
    </div>
  );
};

const ContextOption = ({
  menuId,
  index,
  children,
  onClick,
  selected,
  onMouseEnter
}) => {
  return (
    <div
      className={styles.option}
      role="menuitem"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      data-selected={selected}
      id={`${menuId}-${index}`}
    >
      {children}
    </div>
  );
};

export default ContextMenu;
