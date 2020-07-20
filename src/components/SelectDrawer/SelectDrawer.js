import React from "react";
import { Portal } from "react-portal";
import styles from "./SelectDrawer.css";

const SelectDrawer = ({ x, y, options, onSelected, onRequestClose }) => {
  const wrapper = React.useRef()

  const closeDrawer = () => {
    onRequestClose()
    document.removeEventListener("click", testClickOutside);
  };

  const testClickOutside = e => {
    if (!wrapper.current.contains(e.target)) {
      closeDrawer();
    }
  };

  const handleClick = option => {
    onSelected(option)
    onRequestClose()
  }

  React.useEffect(() => {
    document.addEventListener("click", testClickOutside)
    return () => {
      document.removeEventListener("click", testClickOutside)
    }
  }, [])

  return (
    <Portal>
      <div
        className={styles.wrapper}
        style={{ left: x, top: y }}
        ref={wrapper}
      >
        {
          options.map((option, i) => (
            <div className={styles.option} onClick={() => handleClick(option)} key={option.value + i}>
              <label>{option.label}</label>
              {option.description ? <p>{option.description}</p> : null}
            </div>
          ))
        }
        {
          !options.length ?
          <div className={styles.emptyText}>There are no options available.</div>
          : null
        }
      </div>
    </Portal>
  );
};

export default SelectDrawer;
