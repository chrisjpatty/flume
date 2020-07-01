import React from "react";
import styles from "./Stage.css";
import { Portal } from "react-portal";
import ContextMenu from "../ContextMenu/ContextMenu";
import { NodeTypesContext, NodeDispatchContext } from "../../context";
import orderBy from "lodash/orderBy";
import clamp from "lodash/clamp";

const DRAG_DELAY = 5;

const Stage = ({
  scale,
  translate,
  dispatchStageState,
  children,
  outerStageChildren,
  stageRef
}) => {
  const nodeTypes = React.useContext(NodeTypesContext);
  const nodesDispatch = React.useContext(NodeDispatchContext);
  const wrapper = React.useRef();
  const translateWrapper = React.useRef();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [menuCoordinates, setMenuCoordinates] = React.useState({ x: 0, y: 0 });
  const dragData = React.useRef({ x: 0, y: 0 });
  const dragDelayStartCoordinates = React.useRef({ x: 0, y: 0});

  const setStageRect = React.useCallback(() => {
    stageRef.current = wrapper.current.getBoundingClientRect();
  }, [])

  React.useEffect(() => {
    stageRef.current = wrapper.current.getBoundingClientRect();
    window.addEventListener('resize', setStageRect)
    return () => {
      window.removeEventListener('resize', setStageRect)
    }
  }, [stageRef, setStageRect]);

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
    wrapper.current.removeEventListener("mousemove", handleMouseDrag);
    wrapper.current.removeEventListener("mouseup", handleMouseUp);
  };

  const handleDragStart = e => {
    e.preventDefault();
    dragData.current = {
      x: e.clientX,
      y: e.clientY
    };
    wrapper.current.addEventListener("mousemove", handleMouseDrag);
    wrapper.current.addEventListener("mouseup", handleMouseUp);
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

  const checkDragDelay = e => {
    let x;
    let y;
    if ("ontouchstart" in window && e.touches) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else {
      e.preventDefault();
      x = e.clientX;
      y = e.clientY;
    }
    let a = Math.abs(dragDelayStartCoordinates.current.x - x);
    let b = Math.abs(dragDelayStartCoordinates.current.y - y);
    let distance = Math.round(Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)));
    let dragDistance = DRAG_DELAY;
    if (distance >= dragDistance) {
      handleDragStart(e);
      endDragDelay();
    }
  };

  const endDragDelay = () => {
    document.removeEventListener("mouseup", endDragDelay);
    document.removeEventListener("mousemove", checkDragDelay);
    dragDelayStartCoordinates.current = null;
  };

  const startDragDelay = e => {
    e.stopPropagation();
    let x;
    let y;
    if ("ontouchstart" in window && e.touches) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else {
      e.preventDefault();
      x = e.clientX;
      y = e.clientY;
    }
    dragDelayStartCoordinates.current = { x, y };
    document.addEventListener("mouseup", endDragDelay);
    document.addEventListener("mousemove", checkDragDelay);
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
      onMouseDown={startDragDelay}
      onTouchStart={startDragDelay}
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
      {outerStageChildren}
    </div>
  );
};
export default Stage;
