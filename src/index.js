import React from "react";
import PropTypes from "prop-types";
import Stage from "./components/Stage/Stage";
import Node from "./components/Node/Node";
import Connection from "./components/Connection/Connection";
import {
  NodeTypesContext,
  InputTypesContext,
  NodeDispatchContext,
  ConnectionRecalculateContext
} from "./context";
import { getPortRectsByNodes } from "./connectionCalculator";
import nodesReducer from "./nodesReducer";

import styles from "./styles.css";

const NodeEditor = ({ nodes: initialNodes, nodeTypes, inputTypes }) => {
  const [nodes, dispatchNodes] = React.useReducer(nodesReducer, initialNodes);
  const stage = React.useRef();
  const [portRects, setPortRects] = React.useState(null);
  const [shouldRecalculateConnections, setShouldRecalculateConnections] = React.useState(true)

  const recalculateConnections = React.useCallback(() => {
    const portRects = getPortRectsByNodes(nodes);
    setPortRects(portRects);
  }, [nodes]);

  React.useLayoutEffect(() => {
    if(shouldRecalculateConnections){
      recalculateConnections()
      setShouldRecalculateConnections(false)
    }
  }, [shouldRecalculateConnections, recalculateConnections])

  return (
    <InputTypesContext.Provider value={inputTypes}>
      <NodeTypesContext.Provider value={nodeTypes}>
        <NodeDispatchContext.Provider value={dispatchNodes}>
          <ConnectionRecalculateContext.Provider value={setShouldRecalculateConnections}>
            <Stage stageRef={stage}>
              {Object.values(nodes).map(node => (
                <Node
                  stageRef={stage}
                  onDrag={recalculateConnections}
                  onDragEnd={recalculateConnections}
                  {...node}
                  key={node.id}
                />
              ))}
              {portRects
                ? Object.values(nodes).flatMap(node =>
                    node.connections && node.connections.inputs
                      ? Object.entries(node.connections.inputs).flatMap(
                          ([inputName, outputs], k) =>
                            outputs.map(output => {
                              const fromPort =
                                portRects[output.nodeId + output.portName];
                              const portHalf = fromPort ? fromPort.width / 2 : 0;
                              const toPort = portRects[node.id + inputName];
                              return fromPort && toPort ? (
                                <Connection
                                  id={
                                    output.nodeId +
                                    output.portName +
                                    node.id +
                                    inputName
                                  }
                                  from={{
                                    x: fromPort.x - stage.current.x + portHalf,
                                    y: fromPort.y - stage.current.y + portHalf
                                  }}
                                  to={{
                                    x: toPort.x - stage.current.x + portHalf,
                                    y: toPort.y - stage.current.y + portHalf
                                  }}
                                  key={node.id + inputName + k}
                                />
                              ) : null;
                            })
                        )
                      : []
                  )
                : null}
              <div
                className={styles.dragWrapper}
                id="__node_editor_drag_connection__"
              ></div>
            </Stage>
          </ConnectionRecalculateContext.Provider>
        </NodeDispatchContext.Provider>
      </NodeTypesContext.Provider>
    </InputTypesContext.Provider>
  );
};

export default NodeEditor;
