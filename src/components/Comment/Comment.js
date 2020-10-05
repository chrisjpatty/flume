import React from "react";
import Draggable from "../Draggable/Draggable";
import ContextMenu from "../ContextMenu/ContextMenu";
import ColorPicker from "../ColorPicker/ColorPicker";
import { StageContext } from "../../context";
import { Portal } from "react-portal";
import clamp from "lodash/clamp";
import styled from "@emotion/styled";

const StyledDraggable = styled(Draggable)`
  position: absolute;
  left: 0px;
  top: 0px;
  padding: 5px;
  background: rgba(147, 154, 158, 0.7);
  border-radius: 5px;
  border-bottom-right-radius: 2px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  min-width: 80px;
  font-size: 14px;
  display: flex;
  text-shadow: 0px 1px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(168, 176, 181, 0.7);
  user-select: none;
  &[data-color="red"] {
    background: rgba(213, 84, 103, 0.65);
    border-color: rgba(227, 85, 119, 0.65);
  }
  &[data-color="purple"] {
    background: rgba(153, 83, 196, 0.65);
    border-color: rgba(156, 85, 227, 0.65);
  }
  &[data-color="blue"] {
    background: rgba(76, 142, 203, 0.65);
    border-color: rgba(85, 159, 227, 0.65);
  }
  &[data-color="green"] {
    background: rgba(70, 200, 130, 0.65);
    border-color: rgba(85, 227, 150, 0.65);
  }
  &[data-color="yellow"] {
    background: rgba(200, 167, 63, 0.65);
    border-color: rgba(227, 213, 85, 0.65);
  }
  &[data-color="orange"] {
    background: rgba(215, 123, 64, 0.65);
    border-color: rgba(227, 149, 85, 0.65);
  }
  &[data-color="pink"] {
    background: rgba(255, 102, 208, 0.65);
    border-color: rgba(242, 131, 228, 0.65);
  }
`;

const ResizeThumb = styled(Draggable)`
  width: 10px;
  height: 10px;
  border-radius: 4px 0px 4px 0px;
  position: absolute;
  right: 0px;
  bottom: 0px;
  overflow: hidden;
  cursor: nwse-resize;

  &::before,
  &::after {
    content: "";
    position: absolute;
    right: 0px;
    top: 0px;
    width: 250%;
    height: 0px;
    border-top: 1px solid rgba(0, 0, 0, 0.7);
    border-bottom: 2px solid rgba(255, 255, 255, 0.7);
    transform-origin: center right;
    transform: rotate(-45deg) scale(0.5);
  }
  &::after {
    transform: rotate(-45deg) translateY(3px) scale(0.5);
  }
`;

const Text = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  white-space: pre-wrap;
  cursor: default;
`;

const Textarea = styled.textarea`
  resize: none;
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  outline: none;
  margin: -2px;
  margin-top: -1px;
  padding-top: 0px;
  font-size: 14px;
  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
`;

export default ({
  dispatch,
  id,
  x,
  y,
  width,
  height,
  color,
  text,
  stageRect,
  onDragStart,
  isNew
}) => {
  const stageState = React.useContext(StageContext);
  const wrapper = React.useRef();
  const textarea = React.useRef();
  const [isEditing, setIsEditing] = React.useState(false);
  const [isPickingColor, setIsPickingColor] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [menuCoordinates, setMenuCoordinates] = React.useState({ x: 0, y: 0 });
  const [colorPickerCoordinates, setColorPickerCoordinates] = React.useState({
    x: 0,
    y: 0
  });

  const handleContextMenu = e => {
    e.preventDefault();
    e.stopPropagation();
    setMenuCoordinates({ x: e.clientX, y: e.clientY });
    setMenuOpen(true);
    return false;
  };

  const closeContextMenu = () => setMenuOpen(false);

  const startDrag = e => {
    onDragStart();
  };

  const handleDrag = ({ x, y }) => {
    wrapper.current.style.transform = `translate(${x}px,${y}px)`;
  };

  const handleDragEnd = (_, { x, y }) => {
    dispatch({
      type: "SET_COMMENT_COORDINATES",
      id,
      x,
      y
    });
  };

  const handleResize = coordinates => {
    const width = clamp(coordinates.x - x + 10, 80, 10000);
    const height = clamp(coordinates.y - y + 10, 30, 10000);
    wrapper.current.style.width = `${width}px`;
    wrapper.current.style.height = `${height}px`;
  };

  const handleResizeEnd = (_, coordinates) => {
    const width = clamp(coordinates.x - x + 10, 80, 10000);
    const height = clamp(coordinates.y - y + 10, 30, 10000);
    dispatch({
      type: "SET_COMMENT_DIMENSIONS",
      id,
      width,
      height
    });
  };

  const handleMenuOption = (option, e) => {
    switch (option.value) {
      case "edit":
        startTextEdit();
        break;
      case "color":
        setColorPickerCoordinates(menuCoordinates);
        setIsPickingColor(true);
        break;
      case "delete":
        dispatch({
          type: "DELETE_COMMENT",
          id
        });
        break;
      default:
    }
  };

  const startTextEdit = () => {
    setIsEditing(true);
  };

  const endTextEdit = () => {
    setIsEditing(false);
  };

  const handleTextChange = e => {
    dispatch({
      type: "SET_COMMENT_TEXT",
      id,
      text: e.target.value
    });
  };

  const handleColorPicked = color => {
    dispatch({
      type: "SET_COMMENT_COLOR",
      id,
      color
    });
  };

  React.useEffect(() => {
    if (isNew) {
      setIsEditing(true);
      dispatch({
        type: "REMOVE_COMMENT_NEW",
        id
      });
    }
  }, [isNew, dispatch, id]);

  return (
    <StyledDraggable
      customRef={wrapper}
      style={{
        transform: `translate(${x}px,${y}px)`,
        width,
        height,
        zIndex: isEditing ? 999 : ""
      }}
      stageState={stageState}
      stageRect={stageRect}
      onDragStart={startDrag}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onContextMenu={handleContextMenu}
      onDoubleClick={startTextEdit}
      onWheel={e => e.stopPropagation()}
      data-color={color}
    >
      {isEditing ? (
        <Textarea
          onChange={handleTextChange}
          onMouseDown={e => e.stopPropagation()}
          onBlur={endTextEdit}
          placeholder="Text of the comment..."
          autoFocus
          value={text}
          ref={textarea}
        />
      ) : (
        <Text data-comment={true}>{text}</Text>
      )}
      <ResizeThumb
        stageState={stageState}
        stageRect={stageRect}
        onDrag={handleResize}
        onDragEnd={handleResizeEnd}
      />
      {menuOpen ? (
        <Portal>
          <ContextMenu
            hideFilter
            label="Comment Options"
            x={menuCoordinates.x}
            y={menuCoordinates.y}
            options={[
              {
                value: "edit",
                label: "Edit Comment",
                description: "Edit the text of the comment"
              },
              {
                value: "color",
                label: "Change Color",
                description: "Change the color of the comment"
              },
              {
                value: "delete",
                label: "Delete Comment",
                description: "Delete the comment"
              }
            ]}
            onRequestClose={closeContextMenu}
            onOptionSelected={handleMenuOption}
          />
        </Portal>
      ) : null}
      {isPickingColor ? (
        <Portal>
          <ColorPicker
            x={colorPickerCoordinates.x}
            y={colorPickerCoordinates.y}
            onRequestClose={() => setIsPickingColor(false)}
            onColorPicked={handleColorPicked}
          />
        </Portal>
      ) : null}
    </StyledDraggable>
  );
};
