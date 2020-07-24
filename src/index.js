import React from "react";
import Stage from "./components/Stage/Stage";
import Node from "./components/Node/Node";
import Comment from "./components/Comment/Comment";
import Connections from "./components/Connections/Connections";
import {
  NodeTypesContext,
  PortTypesContext,
  NodeDispatchContext,
  ConnectionRecalculateContext,
  RecalculateStageRectContext,
  ContextContext,
  StageContext,
  CacheContext,
} from "./context";
import { createConnections } from "./connectionCalculator";
import nodesReducer, {
  connectNodesReducer,
  getInitialNodes
} from "./nodesReducer";
import commentsReducer from "./commentsReducer";
import stageReducer from "./stageReducer";
import { STAGE_WRAPPER_ID } from "./constants";
import usePrevious from "./hooks/usePrevious";
import clamp from "lodash/clamp";
import Cache from "./Cache";

import styles from "./styles.css";

export let NodeEditor = (
  {
    comments: initialComments,
    nodes: initialNodes,
    nodeTypes = {},
    portTypes = {},
    defaultNodes = [],
    context = {},
    onChange,
    onCommentsChange,
    initialScale,
    spaceToPan = false,
    hideComments = false,
    disableComments = false,
    debug
  },
  ref
) => {
  const cache = React.useRef(new Cache());
  const stage = React.useRef();
  const [
    nodes,
    dispatchNodes
  ] = React.useReducer(
    connectNodesReducer(nodesReducer, { nodeTypes, portTypes, cache }),
    {},
    () => getInitialNodes(initialNodes, defaultNodes, nodeTypes, portTypes)
  );
  const [comments, dispatchComments] = React.useReducer(
    commentsReducer,
    initialComments
  );
  const [
    shouldRecalculateConnections,
    setShouldRecalculateConnections
  ] = React.useState(true);
  const [stageState, dispatchStageState] = React.useReducer(stageReducer, {
    scale: typeof initialScale === "number" ? clamp(initialScale, 0.1, 7) : 1,
    translate: { x: 0, y: 0 }
  });

  const recalculateConnections = React.useCallback(() => {
    createConnections(nodes, stageState);
  }, [nodes]);

  const recalculateStageRect = () => {
    stage.current = document
      .getElementById(STAGE_WRAPPER_ID)
      .getBoundingClientRect();
  };

  React.useLayoutEffect(() => {
    if (shouldRecalculateConnections) {
      recalculateConnections();
      setShouldRecalculateConnections(false);
    }
  }, [shouldRecalculateConnections, recalculateConnections]);

  const triggerRecalculation = () => {
    setShouldRecalculateConnections(true);
  };

  React.useImperativeHandle(ref, () => ({
    getNodes: () => {
      return nodes;
    },
    getComments: () => {
      return comments;
    }
  }));

  const previousNodes = usePrevious(nodes);

  React.useEffect(() => {
    if (previousNodes && onChange && nodes !== previousNodes) {
      onChange(nodes);
    }
  }, [nodes, previousNodes, onChange]);

  const previousComments = usePrevious(comments);

  React.useEffect(() => {
    if (previousComments && onCommentsChange && comments !== previousComments) {
      onCommentsChange(comments);
    }
  }, [comments, previousComments, onCommentsChange]);

  return (
    <PortTypesContext.Provider value={portTypes}>
      <NodeTypesContext.Provider value={nodeTypes}>
        <NodeDispatchContext.Provider value={dispatchNodes}>
          <ConnectionRecalculateContext.Provider value={triggerRecalculation}>
            <ContextContext.Provider value={context}>
              <StageContext.Provider value={stageState}>
                <CacheContext.Provider value={cache}>
                  <RecalculateStageRectContext.Provider value={recalculateStageRect}>
                    <Stage
                      scale={stageState.scale}
                      translate={stageState.translate}
                      spaceToPan={spaceToPan}
                      dispatchStageState={dispatchStageState}
                      dispatchComments={dispatchComments}
                      disableComments={disableComments || hideComments}
                      stageRef={stage}
                      numNodes={Object.keys(nodes).length}
                      outerStageChildren={
                        debug && (
                          <div className={styles.debugWrapper}>
                            <button
                              className={styles.debugButton}
                              onClick={() => console.log(nodes)}
                            >
                              Log Nodes
                            </button>
                            <button
                              className={styles.debugButton}
                              onClick={() => console.log(JSON.stringify(nodes))}
                            >
                              Export Nodes
                            </button>
                            <button
                              className={styles.debugButton}
                              onClick={() => console.log(comments)}
                            >
                              Log Comments
                            </button>
                          </div>
                        )
                      }
                    >
                      {!hideComments && Object.values(comments).map(comment => (
                        <Comment
                          {...comment}
                          stageRect={stage}
                          dispatch={dispatchComments}
                          onDragStart={recalculateStageRect}
                          key={comment.id}
                        />
                      ))}
                      {Object.values(nodes).map(node => (
                        <Node
                          {...node}
                          stageRect={stage}
                          onDragEnd={triggerRecalculation}
                          onDragStart={recalculateStageRect}
                          key={node.id}
                        />
                      ))}
                      <Connections nodes={nodes} />
                      <div
                        className={styles.dragWrapper}
                        id="__node_editor_drag_connection__"
                      ></div>
                    </Stage>
                  </RecalculateStageRectContext.Provider>
                </CacheContext.Provider>
              </StageContext.Provider>
            </ContextContext.Provider>
          </ConnectionRecalculateContext.Provider>
        </NodeDispatchContext.Provider>
      </NodeTypesContext.Provider>
    </PortTypesContext.Provider>
  );
};
NodeEditor = React.forwardRef(NodeEditor);
export { FlumeConfig, Controls, Colors } from "./typeBuilders";
export RootEngine from "./RootEngine";
export const useRootEngine = (nodes, engine, context) =>
  Object.keys(nodes).length ? engine.resolveRootNode(nodes, { context }) : {};
