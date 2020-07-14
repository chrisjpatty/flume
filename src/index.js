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
  StageContext
} from "./context";
import { createConnections } from "./connectionCalculator";
import nodesReducer, {
  connectNodesReducer,
  getInitialNodes
} from "./nodesReducer";
import stageReducer from "./stageReducer";
import { STAGE_WRAPPER_ID } from './constants'
import usePrevious from './hooks/usePrevious'

import styles from "./styles.css";

export let NodeEditor = (
  {
    nodes: initialNodes,
    nodeTypes = {},
    portTypes = {},
    defaultNodes = [],
    context = {},
    onChange,
    debug
  },
  ref
) => {
  const [nodes, dispatchNodes] = React.useReducer(
    connectNodesReducer(nodesReducer, { nodeTypes, portTypes }),
    getInitialNodes(initialNodes, defaultNodes, nodeTypes, portTypes)
  );
  const stage = React.useRef();
  const [
    shouldRecalculateConnections,
    setShouldRecalculateConnections
  ] = React.useState(true);
  const [stageState, dispatchStageState] = React.useReducer(stageReducer, {
    scale: 1,
    translate: { x: 0, y: 0 }
  });

  const recalculateConnections = React.useCallback(() => {
    createConnections(nodes, stageState);
  }, [nodes]);

  const recalculateStageRect = () => {
    stage.current = document.getElementById(STAGE_WRAPPER_ID).getBoundingClientRect()
  }

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
    if(onChange && nodes !== previousNodes){
      onChange(nodes)
    }
  }, [nodes, previousNodes, onChange])

  return (
    <PortTypesContext.Provider value={portTypes}>
      <NodeTypesContext.Provider value={nodeTypes}>
        <NodeDispatchContext.Provider value={dispatchNodes}>
          <ConnectionRecalculateContext.Provider value={triggerRecalculation}>
            <ContextContext.Provider value={context}>
              <StageContext.Provider value={stageState}>
                <Stage
                  scale={stageState.scale}
                  translate={stageState.translate}
                  dispatchStageState={dispatchStageState}
                  stageRef={stage}
                  numNodes={Object.keys(nodes).length}
                  outerStageChildren={debug && (
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
                  )}
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
              </StageContext.Provider>
            </ContextContext.Provider>
          </ConnectionRecalculateContext.Provider>
        </NodeDispatchContext.Provider>
      </NodeTypesContext.Provider>
    </PortTypesContext.Provider>
  );
};
NodeEditor = React.forwardRef(NodeEditor);
export { FlumeConfig, Controls, Colors } from './typeBuilders'
