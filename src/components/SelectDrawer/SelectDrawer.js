import React from "react";
import { Portal } from "react-portal";
import styles from "./SelectDrawer.css";
const nanoid = require("nanoid");

const SelectDrawer = ({ x, y, options, onSelected, onRequestClose }) => {
  const wrapper = React.useRef();
  const menuId = React.useRef(nanoid(10));
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const closeDrawer = () => {
    onRequestClose();
    document.removeEventListener("click", testClickOutside);
  };

  const testClickOutside = e => {
    if (!wrapper.current.contains(e.target)) {
      closeDrawer();
    }
  };

  const handleClick = option => {
    onSelected(option);
    onRequestClose();
  };

  const handleKeyDown = e => {
    // Up pressed
    if (e.which === 38) {
      if (selectedIndex === null) {
        setSelectedIndex(0);
      } else if (selectedIndex > 0) {
        setSelectedIndex(i => i - 1);
      }
    }
    // Down pressed
    if (e.which === 40) {
      if (selectedIndex === null) {
        setSelectedIndex(0);
      } else if (selectedIndex < options.length - 1) {
        setSelectedIndex(i => i + 1);
      }
    }
    // Enter pressed
    if (e.which === 13 && selectedIndex !== null) {
      const option = options[selectedIndex];
      if (option) {
        handleClick(option);
      }
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", testClickOutside);
    wrapper.current.focus();
    return () => {
      document.removeEventListener("click", testClickOutside);
    };
  }, []);

  return (
    <Portal>
      <div
        className={styles.wrapper}
        style={{ left: x, top: y, maxHeight: window.innerHeight - y - 10 }}
        ref={wrapper}
        onKeyDown={handleKeyDown}
        role="menu"
        tabIndex={0}
        aria-activedescendant={`${menuId.current}-${selectedIndex}`}
      >
        {options.map((option, i) => (
          <div
            className={styles.option}
            onClick={() => handleClick(option)}
            onMouseEnter={() => setSelectedIndex(null)}
            data-selected={selectedIndex === i}
            role="menuitem"
            key={option.value + i}
          >
            <label>{option.label}</label>
            {option.description ? <p>{option.description}</p> : null}
          </div>
        ))}
        {!options.length ? (
          <div className={styles.emptyText}>
            There are no options available.
          </div>
        ) : null}
      </div>
    </Portal>
  );
};

export default SelectDrawer;
