import React from "react";
import { Portal } from "react-portal";
import ContextMenu from "../ContextMenu/ContextMenu";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  font-size: 14px;
  padding: 3px 6px;
  border-radius: 4px;
  background: linear-gradient(to top, #5b5f62, #6f7477);
  width: 100%;
  border: 1px solid #3c3e40;
  padding-right: 15px;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    background: none;
    right: 5px;
    top: 8px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6px 5px 0 5px;
    border-color: #191b1c transparent transparent transparent;
  }
  &:hover {
    background: linear-gradient(to top, #63676a, #777b7e);
  }
`;

const ChipsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 6px;
`;

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
    if (allowMultiple) {
      onChange([...data, option.value]);
    } else {
      onChange(option.value);
    }
  };

  const handleOptionDeleted = optionIndex => {
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
      {allowMultiple ? (
        data.length ? (
          <ChipsWrapper>
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
          </ChipsWrapper>
        ) : null
      ) : data ? (
        <SelectedOption
          wrapperRef={wrapper}
          option={selectedOption}
          onClick={openDrawer}
        />
      ) : null}
      {(allowMultiple || !data) && (
        <Wrapper ref={wrapper} onClick={openDrawer}>
          {placeholder}
        </Wrapper>
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

const SelectedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  background: linear-gradient(to top, #5b5f62, #6f7477);
  width: 100%;
  border: 1px solid #3c3e40;
  font-size: 14px;
  padding: 3px 6px;
  padding-right: 15px;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    background: none;
    right: 5px;
    top: calc(50% - 4px);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6px 5px 0 5px;
    border-color: #191b1c transparent transparent transparent;
  }
  label {
    margin: 0px;
  }
  p {
    margin: 0px;
    margin-top: 5px;
    font-size: 12px;
    font-style: italic;
    color: rgb(50, 50, 50);
  }
`;

const SelectedOption = ({
  option: { label, description } = {},
  wrapperRef,
  onClick
}) => (
  <SelectedWrapper onClick={onClick} ref={wrapperRef}>
    <label>{label}</label>
    {description ? <p>{description}</p> : null}
  </SelectedWrapper>
);

const DeleteButton = styled.button`
  position: absolute;
  right: 0px;
  top: 0px;
  height: 100%;
  width: 22px;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to top, #5b5f62, #6f7477);
  border-radius: 3px;
  border: none;
  font-weight: bold;
  opacity: 0;

  :focus {
    opacity: 1;
  }

  :hover {
    background: linear-gradient(to top, #64696c, #797f82);
  }
`;

const ChipWrapper = styled.div`
  font-size: 14px;
  padding: 3px 6px;
  border-radius: 4px;
  background: linear-gradient(to top, #5b5f62, #6f7477);
  border: 1px solid #3c3e40;
  margin: 2px;
  position: relative;

  :hover ${DeleteButton} {
    opacity: 1;
  }
`;

const OptionChip = ({ children, onRequestDelete }) => (
  <ChipWrapper>
    {children}
    <DeleteButton
      onMouseDown={e => {
        e.stopPropagation();
      }}
      onClick={onRequestDelete}
    >
      ✕
    </DeleteButton>
  </ChipWrapper>
);
