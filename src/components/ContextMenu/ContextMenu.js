import React from "react";
import clamp from "lodash/clamp";
import styled from "@emotion/styled";
const nanoid = require("nanoid");

const MenuWrapper = styled.div`
  position: fixed;
  z-index: 9999;
  background: rgba(29, 32, 34, 0.95);
  border-radius: 5px;
  box-shadow: 0px 6px 7px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 0, 0, 0.4);
  font-size: 14px;
  max-width: 300px;
  min-width: 150px;
  font-family: Helvetica, sans-serif;
  line-height: 1.15;
  outline: none;

  @supports (backdrop-filter: blur(6px)) {
    backdrop-filter: blur(6px);
    background: rgba(29, 32, 34, 0.8);
  }
`;

const MenuHeader = styled.div`
  padding: 5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
`;

const MenuLabel = styled.label`
  margin: 0px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`;

const MenuFilter = styled.input`
  border: none;
  background: none;
  height: 24px;
  flex: 1 1 auto;
  width: 100%;
  outline: none;
  color: #fff;
  &::placeholder {
    font-style: italic;
  }
`;

const OptionsWrapper = styled.div`
  max-height: 300px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const EmptyText = styled.label`
  color: #fff;
  padding: 5px;
`;

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
        document.removeEventListener("contextmenu", testClickOutside);
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
    document.addEventListener("contextmenu", testClickOutside);
    return () => {
      document.removeEventListener("click", testClickOutside);
      document.removeEventListener("contextmenu", testClickOutside);
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
    <MenuWrapper
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
        <MenuHeader>
          <MenuLabel>{label}</MenuLabel>
          {!hideFilter && options.length ? (
            <MenuFilter
              type="text"
              placeholder="Filter options"
              value={filter}
              onChange={handleFilterChange}
              autoFocus
              ref={filterInput}
            />
          ) : null}
        </MenuHeader>
      ) : null}
      <OptionsWrapper
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
        {!options.length ? <EmptyText>{emptyText}</EmptyText> : null}
      </OptionsWrapper>
    </MenuWrapper>
  );
};

const Option = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  label {
    margin-bottom: 5px;
    user-select: none;
    &:last-child {
      margin-bottom: 0px;
    }
  }
  p {
    margin: 0px;
    font-style: italic;
    font-size: 12px;
    color: rgb(182, 186, 194);
    user-select: none;
  }
  &[data-selected="true"] {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const ContextOption = ({
  menuId,
  index,
  children,
  onClick,
  selected,
  onMouseEnter
}) => {
  return (
    <Option
      role="menuitem"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      data-selected={selected}
      id={`${menuId}-${index}`}
    >
      {children}
    </Option>
  );
};

export default ContextMenu;
