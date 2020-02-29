import React from "react";
import PropTypes from "prop-types";
import Stage from "./components/Stage/Stage";
import Node from "./components/Node/Node";
import Connection from "./components/Connection/Connection";
import { NodeTypesContext, InputTypesContext } from "./context";

import styles from "./styles.css";

const NodeEditor = ({ nodes, nodeTypes, inputTypes }) => {
  const stage = React.useRef();
  const [connectionMap, setConnectionMap] = React.useState(null);
  const [portRects, setPortRects] = React.useState(null);

  const recalculateConnections = () => {
    const portRects = Object.values(nodes).reduce((obj, node) => {
      if (node.connections) {
        Object.entries(node.connections).forEach(([inputName, output]) => {
          obj[node.id + inputName] = document
            .querySelector(
              `[data-node-id="${node.id}"] [data-port-name="${inputName}"]`
            )
            .getBoundingClientRect();
          obj[output.nodeId + output.portName] = document
            .querySelector(
              `[data-node-id="${output.nodeId}"] [data-port-name="${output.portName}"]`
            )
            .getBoundingClientRect();
        });
      }
      return obj;
    }, {});
    setPortRects(portRects);
  };

  React.useLayoutEffect(() => {
    recalculateConnections();
  }, []);

  return (
    <InputTypesContext.Provider value={inputTypes}>
      <NodeTypesContext.Provider value={nodeTypes}>
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
                node.connections
                  ? Object.entries(node.connections).map(
                      ([inputName, output], k) => {
                        const fromPort =
                          portRects[output.nodeId + output.portName];
                        const fromHalf = fromPort.width / 2;
                        const toPort = portRects[node.id + inputName];
                        const toHalf = toPort.width / 2;
                        return (
                          <Connection
                            from={{
                              x: fromPort.x - stage.current.x + fromHalf,
                              y: fromPort.y - stage.current.y + fromHalf
                            }}
                            to={{
                              x: toPort.x - stage.current.x + toHalf,
                              y: toPort.y - stage.current.y + toHalf
                            }}
                            key={node.id + inputName + k}
                          />
                        );
                      }
                    )
                  : []
              )
            : null}
        </Stage>
      </NodeTypesContext.Provider>
    </InputTypesContext.Provider>
  );
};

export default NodeEditor;
