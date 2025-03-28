import React from "react";
import styles from "./ContextMenu.css";
import clamp from "lodash/clamp";
import { nanoid } from "nanoid/non-secure";
import { SelectOption } from "../../types";

interface ContextMenuProps {
  x: number;
  y: number;
  options: SelectOption[];
  onRequestClose: () => void;
  onOptionSelected: (option: SelectOption) => void;
  label?: string;
  hideHeader?: boolean;
  hideFilter?: boolean;
  emptyText?: string;
}

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
}: ContextMenuProps) => {
  const menuWrapper = React.useRef<HTMLDivElement>(null);
  const menuOptionsWrapper = React.useRef<HTMLDivElement>(null);
  const filterInput = React.useRef<HTMLInputElement>(null);
  const [filter, setFilter] = React.useState("");
  const [menuWidth, setMenuWidth] = React.useState(0);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(0);
  const menuId = React.useRef(nanoid(10));

  const handleOptionSelected = (option: SelectOption) => {
    onOptionSelected(option);
    onRequestClose();
  };

  const testClickOutside = React.useCallback(
    (e: MouseEvent) => {
      if (
        menuWrapper.current &&
        !menuWrapper.current.contains(e.target as Element)
      ) {
        onRequestClose();
        document.removeEventListener("click", testClickOutside, {
          capture: true
        });
        document.removeEventListener("contextmenu", testClickOutside, {
          capture: true
        });
      }
    },
    [menuWrapper, onRequestClose]
  );

  const testEscape = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        onRequestClose();
        document.removeEventListener("keydown", testEscape, { capture: true });
      }
    },
    [onRequestClose]
  );

  React.useEffect(() => {
    if (filterInput.current) {
      filterInput.current.focus();
    }
    setMenuWidth(menuWrapper.current?.getBoundingClientRect()?.width ?? 0);
    document.addEventListener("keydown", testEscape, { capture: true });
    document.addEventListener("click", testClickOutside, { capture: true });
    document.addEventListener("contextmenu", testClickOutside, {
      capture: true
    });
    return () => {
      document.removeEventListener("click", testClickOutside, {
        capture: true
      });
      document.removeEventListener("contextmenu", testClickOutside, {
        capture: true
      });
      document.removeEventListener("keydown", testEscape, { capture: true });
    };
  }, [testClickOutside, testEscape]);

  const filteredOptions = React.useMemo(() => {
    if (!filter) return options;
    const lowerFilter = filter.toLowerCase();
    return options.filter(opt => opt.label.toLowerCase().includes(lowerFilter));
  }, [filter, options]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter(value);
    setSelectedIndex(0);
  };

  const handleKeyDown: React.KeyboardEventHandler = e => {
    // Up pressed
    if (e.which === 38) {
      e.preventDefault();
      if (selectedIndex === null) {
        setSelectedIndex(0);
      } else if (selectedIndex > 0) {
        setSelectedIndex(i => (i || 0) - 1);
      }
    }
    // Down pressed
    if (e.which === 40) {
      e.preventDefault();
      if (selectedIndex === null) {
        setSelectedIndex(0);
      } else if (selectedIndex < filteredOptions.length - 1) {
        setSelectedIndex(i => (i || 0) + 1);
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
      menuWrapper.current?.focus();
    }
  }, [hideFilter, hideHeader]);

  React.useEffect(() => {
    const menuOption = document.getElementById(
      `${menuId.current}-${selectedIndex}`
    );
    if (menuOption) {
      const menuRect = menuOptionsWrapper.current?.getBoundingClientRect();
      const optionRect = menuOption.getBoundingClientRect();
      if (
        menuRect &&
        (optionRect.y + optionRect.height > menuRect.y + menuRect.height ||
          optionRect.y < menuRect.y)
      ) {
        menuOption.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  return (
    <div
      data-flume-component="ctx-menu"
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
      {!hideHeader && (label ? true : !!options.length) ? (
        <div
          className={styles.menuHeader}
          data-flume-component="ctx-menu-header"
        >
          <label
            className={styles.menuLabel}
            data-flume-component="ctx-menu-title"
          >
            {label}
          </label>
          {!hideFilter && options.length ? (
            <input
              data-flume-component="ctx-menu-input"
              type="text"
              placeholder="Filter options"
              value={filter}
              onChange={handleFilterChange}
              className={styles.menuFilter}
              autoFocus
              ref={filterInput}
            />
          ) : null}
        </div>
      ) : null}
      <div
        data-flume-component="ctx-menu-list"
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
          <span
            data-flume-component="ctx-menu-empty"
            className={styles.emptyText}
          >
            {emptyText}
          </span>
        ) : null}
      </div>
    </div>
  );
};

interface ContextOptionProps {
  menuId: string;
  index: number;
  children: React.ReactNode;
  onClick: () => void;
  selected: boolean;
  onMouseEnter: () => void;
}

const ContextOption = ({
  menuId,
  index,
  children,
  onClick,
  selected,
  onMouseEnter
}: ContextOptionProps) => {
  return (
    <div
      data-flume-component="ctx-menu-option"
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
