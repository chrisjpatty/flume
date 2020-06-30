import React from "react";
import Stage from "./components/Stage/Stage";
import Node from "./components/Node/Node";
import Connections from "./components/Connections/Connections";
import {
  NodeTypesContext,
  InputTypesContext,
  NodeDispatchContext,
  ConnectionRecalculateContext,
  ContextContext,
  StageContext
} from "./context";
import { createConnections } from "./connectionCalculator";
import nodesReducer, { connectNodesReducer, getInitialNodes } from "./nodesReducer";
import stageReducer from './stageReducer'

import styles from "./styles.css";

const NodeEditor = ({ nodes: initialNodes, nodeTypes, inputTypes, defaultNodes=[], context={} }, ref) => {
  const [nodes, dispatchNodes] = React.useReducer(
    connectNodesReducer(nodesReducer, { nodeTypes, inputTypes }),
    getInitialNodes(initialNodes, defaultNodes, nodeTypes, inputTypes)
  );
  const stage = React.useRef();
  const [
    shouldRecalculateConnections,
    setShouldRecalculateConnections
  ] = React.useState(true);
  const [stageState, dispatchStageState] = React.useReducer(stageReducer, {scale: 1, translate: {x: 0, y: 0}})

  const recalculateConnections = React.useCallback(() => {
    createConnections(nodes, stageState);
  }, [nodes]);

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

  return (
    <InputTypesContext.Provider value={inputTypes}>
      <NodeTypesContext.Provider value={nodeTypes}>
        <NodeDispatchContext.Provider value={dispatchNodes}>
          <ConnectionRecalculateContext.Provider value={triggerRecalculation}>
            <ContextContext.Provider value={context}>
              <StageContext.Provider value={stageState}>
                <Stage scale={stageState.scale} translate={stageState.translate} dispatchStageState={dispatchStageState} stageRef={stage}>
                  {Object.values(nodes).map(node => (
                    <Node
                      stageRect={stage}
                      onDragEnd={triggerRecalculation}
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
    </InputTypesContext.Provider>
  );
};

export default React.forwardRef(NodeEditor);
