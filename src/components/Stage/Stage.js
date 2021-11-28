import React from "react";
import { Portal } from "react-portal";
import ContextMenu from "../ContextMenu/ContextMenu";
import { NodeTypesContext, NodeDispatchContext } from "../../context";
import Draggable from "../Draggable/Draggable";
import orderBy from "lodash/orderBy";
import clamp from "lodash/clamp";
import { STAGE_ID } from "../../constants";
import styled from "@emotion/styled";

const Wrapper = styled(Draggable)`
  width: 100%;
  height: 100%;
  min-height: 100px;
  background-color: rgb(26, 28, 29);
  background-image: linear-gradient(
      0deg,
      transparent 24%,
      rgba(255, 255, 255, 0.04) 25%,
      rgba(255, 255, 255, 0.04) 26%,
      transparent 27%,
      transparent 74%,
      rgba(255, 255, 255, 0.04) 75%,
      rgba(255, 255, 255, 0.04) 76%,
      transparent 77%,
      transparent
    ),
    linear-gradient(
      90deg,
      transparent 24%,
      rgba(255, 255, 255, 0.04) 25%,
      rgba(255, 255, 255, 0.04) 26%,
      transparent 27%,
      transparent 74%,
      rgba(255, 255, 255, 0.04) 75%,
      rgba(255, 255, 255, 0.04) 76%,
      transparent 77%,
      transparent
    );
  color: #000;
  background-size: 30px 30px;
  position: relative;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
  font-family: Helvetica, sans-serif;
  text-align: left;
  line-height: 1;
  outline: none !important;

  * {
    box-sizing: border-box;
  }

  input,
  textarea,
  select {
    font-family: Helvetica, sans-serif;
  }
`;

const TransformWrapper = styled.div`
  transform-origin: center center;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 0px;
  height: 0px;
`;

const ScaleWrapper = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 0px;
  height: 0px;
`;

const Stage = ({
  scale,
  translate,
  editorId,
  dispatchStageState,
  children,
  outerStageChildren,
  numNodes,
  stageRef,
  spaceToPan,
  dispatchComments,
  disableComments,
  disablePan,
  disableZoom
}) => {
  const nodeTypes = React.useContext(NodeTypesContext);
  const dispatchNodes = React.useContext(NodeDispatchContext);
  const wrapper = React.useRef();
  const translateWrapper = React.useRef();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [menuCoordinates, setMenuCoordinates] = React.useState({ x: 0, y: 0 });
  const dragData = React.useRef({ x: 0, y: 0 });
  const [spaceIsPressed, setSpaceIsPressed] = React.useState(false);

  const setStageRect = React.useCallback(() => {
    stageRef.current = wrapper.current.getBoundingClientRect();
  }, [stageRef]);

  React.useEffect(() => {
    stageRef.current = wrapper.current.getBoundingClientRect();
    window.addEventListener("resize", setStageRect);
    return () => {
      window.removeEventListener("resize", setStageRect);
    };
  }, [stageRef, setStageRect]);

  const handleWheel = React.useCallback(
    e => {
      if (e.target.nodeName === "TEXTAREA" || e.target.dataset.comment) {
        if (e.target.clientHeight < e.target.scrollHeight) return;
      }
      e.preventDefault();
      if (numNodes > 0) {
        const delta = e.deltaY;
        dispatchStageState(({ scale }) => ({
          type: "SET_SCALE",
          scale: clamp(scale - clamp(delta, -10, 10) * 0.005, 0.1, 7)
        }));
      }
    },
    [dispatchStageState, numNodes]
  );

  const handleDragDelayStart = e => {
    wrapper.current.focus();
  };

  const handleDragStart = e => {
    e.preventDefault();
    dragData.current = {
      x: e.clientX,
      y: e.clientY
    };
  };

  const handleMouseDrag = (coords, e) => {
    const xDistance = dragData.current.x - e.clientX;
    const yDistance = dragData.current.y - e.clientY;
    translateWrapper.current.style.transform = `translate(${-(
      translate.x + xDistance
    )}px, ${-(translate.y + yDistance)}px)`;
  };

  const handleDragEnd = e => {
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

  const byScale = value => (1 / scale) * value;

  const addNode = ({ node, internalType }) => {
    const wrapperRect = wrapper.current.getBoundingClientRect();
    const x =
      byScale(menuCoordinates.x - wrapperRect.x - wrapperRect.width / 2) +
      byScale(translate.x);
    const y =
      byScale(menuCoordinates.y - wrapperRect.y - wrapperRect.height / 2) +
      byScale(translate.y);
    if (internalType === "comment") {
      dispatchComments({
        type: "ADD_COMMENT",
        x,
        y
      });
    } else {
      dispatchNodes({
        type: "ADD_NODE",
        x,
        y,
        nodeType: node.type
      });
    }
  };

  const handleDocumentKeyUp = e => {
    if (e.which === 32) {
      setSpaceIsPressed(false);
      document.removeEventListener("keyup", handleDocumentKeyUp);
    }
  };

  const handleKeyDown = e => {
    if (e.which === 32 && document.activeElement === wrapper.current) {
      e.preventDefault();
      e.stopPropagation();
      setSpaceIsPressed(true);
      document.addEventListener("keyup", handleDocumentKeyUp);
    }
  };

  const handleMouseEnter = () => {
    if (!wrapper.current.contains(document.activeElement)) {
      wrapper.current.focus();
    }
  };

  React.useEffect(() => {
    if (!disableZoom) {
      let stageWrapper = wrapper.current;
      stageWrapper.addEventListener("wheel", handleWheel);
      return () => {
        stageWrapper.removeEventListener("wheel", handleWheel);
      };
    }
  }, [handleWheel, disableZoom]);

  const menuOptions = React.useMemo(() => {
    const options = orderBy(
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
    );
    if (!disableComments) {
      options.push({
        value: "comment",
        label: "Comment",
        description: "A comment for documenting nodes",
        internalType: "comment"
      });
    }
    return options;
  }, [nodeTypes, disableComments]);

  return (
    <Wrapper
      id={`${STAGE_ID}${editorId}`}
      customRef={wrapper}
      onContextMenu={handleContextMenu}
      onMouseEnter={handleMouseEnter}
      onDragDelayStart={handleDragDelayStart}
      onDragStart={handleDragStart}
      onDrag={handleMouseDrag}
      onDragEnd={handleDragEnd}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      stageState={{ scale, translate }}
      style={{ cursor: spaceIsPressed && spaceToPan ? "grab" : "" }}
      disabled={disablePan || (spaceToPan && !spaceIsPressed)}
      data-flume-stage={true}
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
      <TransformWrapper
        ref={translateWrapper}
        style={{ transform: `translate(${-translate.x}px, ${-translate.y}px)` }}
      >
        <ScaleWrapper style={{ transform: `scale(${scale})` }}>
          {children}
        </ScaleWrapper>
      </TransformWrapper>
      {outerStageChildren}
    </Wrapper>
  );
};
export default Stage;
