import React from "react";
import styles from "./Stage.css";
import { Portal } from "react-portal";
import ContextMenu from "../ContextMenu/ContextMenu";
import { NodeTypesContext, NodeDispatchContext } from "../../context";
import orderBy from "lodash/orderBy";
import clamp from "lodash/clamp";

const Stage = ({
  scale,
  translate,
  dispatchStageState,
  children,
  stageRef
}) => {
  const nodeTypes = React.useContext(NodeTypesContext);
  const nodesDispatch = React.useContext(NodeDispatchContext);
  const wrapper = React.useRef();
  const translateWrapper = React.useRef();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [menuCoordinates, setMenuCoordinates] = React.useState({ x: 0, y: 0 });
  const dragData = React.useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    stageRef.current = wrapper.current.getBoundingClientRect();
  }, [stageRef]);

  const handleWheel = React.useCallback(e => {
    e.preventDefault()
    dispatchStageState(({scale}) => ({
      type: "SET_SCALE",
      scale: clamp(scale - (clamp(e.deltaY, -10, 10) * 0.005), .1, 7)
    }));
  }, [dispatchStageState]);

  const handleMouseDrag = e => {
    const xDistance = dragData.current.x - e.clientX;
    const yDistance = dragData.current.y - e.clientY;
    translateWrapper.current.style.transform = `translate(${-(translate.x + xDistance)}px, ${-(translate.y + yDistance)}px)`
  };

  const handleMouseUp = e => {
    const xDistance = dragData.current.x - e.clientX;
    const yDistance = dragData.current.y - e.clientY;
    dragData.current.x = e.clientX;
    dragData.current.y = e.clientY;
    dispatchStageState(({ translate: tran }) => ({
      type: "SET_TRANSLATE",
      translate: {
        x: tran.x + xDistance,
        y: tran.y + yDistance
      }
    }));
    document.removeEventListener("mousemove", handleMouseDrag);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleDragStart = e => {
    e.preventDefault();
    dragData.current = {
      x: e.clientX,
      y: e.clientY
    };
    document.addEventListener("mousemove", handleMouseDrag);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleContextMenu = e => {
    e.preventDefault();
    setMenuCoordinates({ x: e.clientX, y: e.clientY });
    setMenuOpen(true);
    return false;
  };

  const closeContextMenu = () => {
    setMenuOpen(false);
  };

  const menuOptions = React.useMemo(
    () =>
      orderBy(
        Object.values(nodeTypes)
          .filter(node => node.addable !== false)
          .map(node => ({
            value: node.type,
            label: node.label,
            description: node.description,
            sortIndex: node.sortIndex,
            node
          })),
        ["sortIndex", "label"]
      ),
    [nodeTypes]
  );

  const byScale = value => (1 / scale) * value;

  const addNode = ({ node }) => {
    const wrapperRect = wrapper.current.getBoundingClientRect();
    nodesDispatch({
      type: "ADD_NODE",
      x: byScale(menuCoordinates.x - wrapperRect.x - (wrapperRect.width / 2)) + byScale(translate.x),
      y: byScale(menuCoordinates.y - wrapperRect.y - (wrapperRect.height / 2)) + byScale(translate.y),
      nodeType: node.type
    });
  };

  React.useEffect(() => {
    let stageWrapper = wrapper.current;
    stageWrapper.addEventListener('wheel', handleWheel)
    return () => {
      stageWrapper.removeEventListener('wheel', handleWheel)
    }
  }, [handleWheel])

  return (
    <div
      id="__node_editor_stage__"
      className={styles.wrapper}
      ref={wrapper}
      onContextMenu={handleContextMenu}
      onDragStart={handleDragStart}
      draggable
    >
      {menuOpen ? (
        <Portal>
          <ContextMenu
            x={menuCoordinates.x}
            y={menuCoordinates.y}
            options={menuOptions}
            onRequestClose={closeContextMenu}
            onOptionSelected={addNode}
            label="Add Node"
          />
        </Portal>
      ) : null}
      <div
        ref={translateWrapper}
        className={styles.transformWrapper}
        style={{ transform: `translate(${-translate.x}px, ${-translate.y}px)` }}
      >
        <div
          className={styles.scaleWrapper}
          style={{ transform: `scale(${scale})` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
export default Stage;
