import React from "react";
import styles from "./Comment.css";
import Draggable from "../Draggable/Draggable";
import ContextMenu from "../ContextMenu/ContextMenu";
import ColorPicker from "../ColorPicker/ColorPicker";
import { StageContext } from "../../context";
import { Portal } from "react-portal";
import clamp from "lodash/clamp";

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
    <Draggable
      innerRef={wrapper}
      className={styles.wrapper}
      style={{
        transform: `translate(${x}px,${y}px)`,
        width,
        height,
        zIndex: isEditing ? 999 : ""
      }}
      stageState={stageState}
      stageRect={stageRect}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onContextMenu={handleContextMenu}
      onDoubleClick={startTextEdit}
      onWheel={e => e.stopPropagation()}
      data-color={color}
    >
      {isEditing ? (
        <textarea
          className={styles.textarea}
          onChange={handleTextChange}
          onMouseDown={e => e.stopPropagation()}
          onBlur={endTextEdit}
          placeholder="Text of the comment..."
          autoFocus
          value={text}
          ref={textarea}
        />
      ) : (
        <div data-comment={true} className={styles.text}>
          {text}
        </div>
      )}
      <Draggable
        className={styles.resizeThumb}
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
    </Draggable>
  );
};
