import React from "react";
import Stage from "./components/Stage/Stage";
import Node from "./components/Node/Node";
import Connections from "./components/Connections/Connections";
import {
  NodeTypesContext,
  PortTypesContext,
  NodeDispatchContext,
  ConnectionRecalculateContext,
  ContextContext,
  StageContext,
  CacheContext
} from "./context";
import { createConnections } from "./connectionCalculator";
import nodesReducer, {
  connectNodesReducer,
  getInitialNodes
} from "./nodesReducer";
import stageReducer from "./stageReducer";
import { STAGE_WRAPPER_ID } from "./constants";
import usePrevious from "./hooks/usePrevious";
import clamp from "lodash/clamp";
import Cache from "./Cache";

import styles from "./styles.css";

export let NodeEditor = (
  {
    nodes: initialNodes,
    nodeTypes = {},
    portTypes = {},
    defaultNodes = [],
    context = {},
    onChange,
    initialScale,
    spaceToPan = false,
    debug
  },
  ref
) => {
  const cache = React.useRef(new Cache());
  const [
    nodes,
    dispatchNodes
  ] = React.useReducer(
    connectNodesReducer(nodesReducer, { nodeTypes, portTypes, cache }),
    {},
    () => getInitialNodes(initialNodes, defaultNodes, nodeTypes, portTypes)
  );
  const stage = React.useRef();
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
    }
  }));

  const previousNodes = usePrevious(nodes);

  React.useEffect(() => {
    if (previousNodes && onChange && nodes !== previousNodes) {
      onChange(nodes);
    }
  }, [nodes, previousNodes, onChange]);

  return (
    <PortTypesContext.Provider value={portTypes}>
      <NodeTypesContext.Provider value={nodeTypes}>
        <NodeDispatchContext.Provider value={dispatchNodes}>
          <ConnectionRecalculateContext.Provider value={triggerRecalculation}>
            <ContextContext.Provider value={context}>
              <StageContext.Provider value={stageState}>
                <CacheContext.Provider value={cache}>
                  <Stage
                    scale={stageState.scale}
                    translate={stageState.translate}
                    spaceToPan={spaceToPan}
                    dispatchStageState={dispatchStageState}
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
                        </div>
                      )
                    }
                  >
                    {Object.values(nodes).map(node => (
                      <Node
                        stageRect={stage}
                        onDragEnd={triggerRecalculation}
                        onDragStart={recalculateStageRect}
                        {...node}
                        key={node.id}
                      />
                    ))}
                    <Connections nodes={nodes} />
                    <div
                      className={styles.dragWrapper}
                      id="__node_editor_drag_connection__"
                    ></div>
                  </Stage>
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
