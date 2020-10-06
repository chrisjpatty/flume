import React from "react";
import { RecalculateStageRectContext } from "../../context";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  background: none;
  border: none;
`;

const Input = styled.input`
  background: linear-gradient(to bottom, #5b5f62, #6f7477);
  width: 100%;
  border: 1px solid #3c3e40;
  border-radius: 4px;
  font-size: 13px;
  padding: 5px;
  resize: vertical;
  outline: none;
  &::placeholder {
    color: rgb(47, 49, 50);
  }
  &:focus {
    background: linear-gradient(to bottom, #676b6e, #75797c);
  }
`;

const TextInput = ({
  placeholder,
  updateNodeConnections,
  onChange,
  data,
  step,
  type
}) => {
  const numberInput = React.useRef();
  const recalculateStageRect = React.useContext(RecalculateStageRectContext);

  const handleDragEnd = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleDragEnd);
  };

  const handleMouseMove = e => {
    e.stopPropagation();
    updateNodeConnections();
  };

  const handlePossibleResize = e => {
    e.stopPropagation();
    recalculateStageRect();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleDragEnd);
  };

  return (
    <Wrapper>
      {type === "number" ? (
        <Input
          onKeyDown={e => {
            if (e.keyCode === 69) {
              e.preventDefault();
              return false;
            }
          }}
          onChange={e => {
            const inputValue = e.target.value.replace(/[^0-9.]+/g, "");
            if (!!inputValue) {
              const value = parseFloat(inputValue, 10);
              if (Number.isNaN(value)) {
                onChange(0);
              } else {
                onChange(value);
                numberInput.current.value = value;
              }
            }
          }}
          onBlur={e => {
            if (!e.target.value) {
              onChange(0);
              numberInput.current.value = 0;
            }
          }}
          step={step || "1"}
          onMouseDown={handlePossibleResize}
          type={type || "text"}
          placeholder={placeholder}
          defaultValue={data}
          onDragStart={e => e.stopPropagation()}
          ref={numberInput}
        />
      ) : (
        <Input
          onChange={e => onChange(e.target.value)}
          onMouseDown={handlePossibleResize}
          type="text"
          placeholder={placeholder}
          value={data}
          onDragStart={e => e.stopPropagation()}
        />
      )}
    </Wrapper>
  );
};

export default TextInput;
