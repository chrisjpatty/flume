import React from "react";
import { Colors } from "../../typeBuilders";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  position: fixed;
  z-index: 9999;
  background: rgba(29, 32, 34, 0.95);
  border-radius: 5px;
  box-shadow: 0px 6px 7px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 0, 0, 0.4);
  color: #fff;
  display: flex;
  width: 102px;
  flex-wrap: wrap;
  padding: 2px;

  @supports (backdrop-filter: blur(6px)) {
    backdrop-filter: blur(6px);
    background: rgba(29, 32, 34, 0.8);
  }
`;

const ColorButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
`;

const StyledColorButton = styled.div`
  border-radius: 3px;
  border: none;
  width: 20px;
  height: 20px;
  background: rgba(204, 204, 204, 1);
  &[data-color="red"]{
    background: rgba(210, 101, 111, 1)
  }
  &[data-color="purple"]{
    background: rgba(159, 101, 210, 1)
  }
  &[data-color="blue"]{
    background: rgba(101, 151, 210, 1)
  }
  &[data-color="green"]{
    background: rgba(101, 210, 168, 1)
  }
  &[data-color="orange"]{
    background: rgba(210, 137, 101, 1)
  }
  &[data-color="yellow"]{
    background: rgba(210, 196, 101, 1)
  }
  &[data-color="pink"]{
    background: rgba(241, 124, 226, 1)
  }
  &:hover{
    opacity: .8;
  }
}
`;

export default ({ x, y, onColorPicked, onRequestClose }) => {
  const wrapper = React.useRef();

  const testClickOutside = React.useCallback(
    e => {
      if (!wrapper.current.contains(e.target)) {
        onRequestClose();
        document.removeEventListener("click", testClickOutside);
        document.removeEventListener("contextmenu", testClickOutside);
      }
    },
    [wrapper, onRequestClose]
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
    document.addEventListener("keydown", testEscape);
    document.addEventListener("click", testClickOutside);
    document.addEventListener("contextmenu", testClickOutside);
    return () => {
      document.removeEventListener("click", testClickOutside);
      document.removeEventListener("contextmenu", testClickOutside);
      document.removeEventListener("keydown", testEscape);
    };
  }, [testClickOutside, testEscape]);

  return (
    <Wrapper
      ref={wrapper}
      style={{
        left: x,
        top: y
      }}
    >
      {Object.values(Colors).map(color => (
        <ColorButton
          onSelected={() => {
            onColorPicked(color);
            onRequestClose();
          }}
          color={color}
          key={color}
        />
      ))}
    </Wrapper>
  );
};

const ColorButton = ({ color, onSelected }) => (
  <ColorButtonWrapper>
    <StyledColorButton
      onClick={onSelected}
      data-color={color}
      aria-label={color}
    />
  </ColorButtonWrapper>
);
