import React, { MouseEventHandler } from "react";
import styles from "./Stage.css";
import { Portal } from "react-portal";
import ContextMenu from "../ContextMenu/ContextMenu";
import { NodeTypesContext, NodeDispatchContext } from "../../context";
import Draggable from "../Draggable/Draggable";
import orderBy from "lodash/orderBy";
import clamp from "lodash/clamp";
import { STAGE_ID } from "../../constants";
import { NodesActionType } from "../../nodesReducer";
import { CommentAction, CommentActionTypes } from "../../commentsReducer";
import {
  Coordinate,
  SelectOption,
  StageState,
  StageTranslate
} from "../../types";
import {
  StageAction,
  StageActionSetter,
  StageActionType
} from "../../stageReducer";

interface StageProps {
  scale: number;
  translate: StageTranslate;
  editorId: string;
  dispatchStageState: React.Dispatch<StageActionSetter>;
  children: React.ReactNode;
  outerStageChildren: React.ReactNode;
  numNodes: number;
  stageRef: React.MutableRefObject<DOMRect | undefined>;
  spaceToPan: boolean;
  dispatchComments: React.Dispatch<CommentAction>;
  disableComments: boolean;
  disablePan: boolean;
  disableZoom: boolean;
}

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
}: StageProps) => {
  const nodeTypes = React.useContext(NodeTypesContext);
  const dispatchNodes = React.useContext(NodeDispatchContext);
  const wrapper = React.useRef<HTMLDivElement>(null);
  const translateWrapper = React.useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [menuCoordinates, setMenuCoordinates] = React.useState({ x: 0, y: 0 });
  const dragData = React.useRef({ x: 0, y: 0 });
  const [spaceIsPressed, setSpaceIsPressed] = React.useState(false);

  const setStageRect = React.useCallback(() => {
    if (wrapper.current) {
      stageRef.current = wrapper.current.getBoundingClientRect();
    }
  }, []);

  React.useEffect(() => {
    if (wrapper.current) {
      stageRef.current = wrapper.current.getBoundingClientRect();
    }

    window.addEventListener("resize", setStageRect);
    return () => {
      window.removeEventListener("resize", setStageRect);
    };
  }, [stageRef, setStageRect]);

  const handleWheel = React.useCallback(
    (e: WheelEvent) => {
      const wheelTarget = e.target as HTMLElement;
      if (wheelTarget.nodeName === "TEXTAREA" || wheelTarget.dataset.comment) {
        if (wheelTarget.clientHeight < wheelTarget.scrollHeight) return;
      }
      e.preventDefault();
      if (numNodes === 0) return;

      const wrapperRect = wrapper.current?.getBoundingClientRect();

      if (wrapperRect) {
        dispatchStageState((stageState: StageState) => {
          const {
            scale: currentScale,
            translate: currentTranslate
          } = stageState;
          const delta = e.deltaY;
          const newScale: number = clamp(
            currentScale - clamp(delta, -10, 10) * 0.005,
            0.1,
            7
          );

          const byOldScale = (no: number) => no * (1 / currentScale);
          const byNewScale = (no: number) => no * (1 / newScale);

          const xOld = byOldScale(
            e.clientX -
              wrapperRect.x -
              wrapperRect.width / 2 +
              currentTranslate.x
          );
          const yOld = byOldScale(
            e.clientY -
              wrapperRect.y -
              wrapperRect.height / 2 +
              currentTranslate.y
          );

          const xNew = byNewScale(
            e.clientX -
              wrapperRect.x -
              wrapperRect.width / 2 +
              currentTranslate.x
          );
          const yNew = byNewScale(
            e.clientY -
              wrapperRect.y -
              wrapperRect.height / 2 +
              currentTranslate.y
          );

          const xDistance = xOld - xNew;
          const yDistance = yOld - yNew;

          return {
            type: StageActionType.SET_TRANSLATE_SCALE,
            scale: newScale,
            translate: {
              x: currentTranslate.x + xDistance * newScale,
              y: currentTranslate.y + yDistance * newScale
            }
          };
        });
      }
    },
    [dispatchStageState, numNodes]
  );

  const handleDragDelayStart = () => {
    wrapper.current?.focus();
  };

  const handleDragStart = (event: React.MouseEvent | React.TouchEvent) => {
    const e = event as React.MouseEvent;
    e.preventDefault();
    dragData.current = {
      x: e.clientX,
      y: e.clientY
    };
  };

  const handleMouseDrag = (coords: Coordinate, e: MouseEvent) => {
    const xDistance = dragData.current.x - e.clientX;
    const yDistance = dragData.current.y - e.clientY;
    const xDelta = translate.x + xDistance;
    const yDelta = translate.y + yDistance;
    if (wrapper.current) {
      wrapper.current.style.backgroundPosition = `${-xDelta}px ${-yDelta}px`;
    }
    if (translateWrapper.current) {
      translateWrapper.current.style.transform = `translate(${-(
        translate.x + xDistance
      )}px, ${-(translate.y + yDistance)}px)`;
    }
  };

  const handleDragEnd = (e: MouseEvent) => {
    const xDistance = dragData.current.x - e.clientX;
    const yDistance = dragData.current.y - e.clientY;
    dragData.current.x = e.clientX;
    dragData.current.y = e.clientY;
    dispatchStageState(({ translate: tran }) => ({
      type: StageActionType.SET_TRANSLATE,
      translate: {
        x: tran.x + xDistance,
        y: tran.y + yDistance
      }
    }));
  };

  const handleContextMenu: MouseEventHandler = e => {
    e.preventDefault();
    setMenuCoordinates({ x: e.clientX, y: e.clientY });
    setMenuOpen(true);
    return false;
  };

  const closeContextMenu = () => {
    setMenuOpen(false);
  };

  const byScale = (value: number) => (1 / scale) * value;

  const addNode = ({ node, internalType }: SelectOption) => {
    const wrapperRect = wrapper.current?.getBoundingClientRect();

    if (wrapperRect) {
      const x =
        byScale(menuCoordinates.x - wrapperRect.x - wrapperRect.width / 2) +
        byScale(translate.x);
      const y =
        byScale(menuCoordinates.y - wrapperRect.y - wrapperRect.height / 2) +
        byScale(translate.y);
      if (internalType === "comment") {
        dispatchComments({
          type: CommentActionTypes.ADD_COMMENT,
          x,
          y
        });
      } else {
        dispatchNodes?.({
          type: NodesActionType.ADD_NODE,
          x,
          y,
          nodeType: node?.type || ""
        });
      }
    }
  };

  const handleDocumentKeyUp = (e: KeyboardEvent) => {
    if (e.which === 32) {
      setSpaceIsPressed(false);
      document.removeEventListener("keyup", handleDocumentKeyUp);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.which === 32 && document.activeElement === wrapper.current) {
      e.preventDefault();
      e.stopPropagation();
      setSpaceIsPressed(true);
      document.addEventListener("keyup", handleDocumentKeyUp);
    }
  };

  const handleMouseEnter = () => {
    if (!wrapper.current?.contains(document.activeElement)) {
      wrapper.current?.focus({ preventScroll: true });
    }
  };

  React.useEffect(() => {
    if (!disableZoom) {
      let stageWrapper = wrapper.current;
      stageWrapper?.addEventListener("wheel", handleWheel);
      return () => {
        stageWrapper?.removeEventListener("wheel", handleWheel);
      };
    }
  }, [handleWheel, disableZoom]);

  const menuOptions = React.useMemo(() => {
    const options: SelectOption[] = orderBy(
      Object.values(nodeTypes || {})
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
    <Draggable
      data-flume-component="stage"
      id={`${STAGE_ID}${editorId}`}
      className={styles.wrapper}
      innerRef={wrapper}
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
    </Draggable>
  );
};
export default Stage;
