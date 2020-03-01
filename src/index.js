import React from "react";
import PropTypes from "prop-types";
import Stage from "./components/Stage/Stage";
import Node from "./components/Node/Node";
import Connection from "./components/Connection/Connection";
import { NodeTypesContext, InputTypesContext } from "./context";
import { getPortRectsByNodes } from './connectionCalculator'

import styles from "./styles.css";

const NodeEditor = ({ nodes, nodeTypes, inputTypes }) => {
  const stage = React.useRef();
  const [connectionMap, setConnectionMap] = React.useState(null);
  const [portRects, setPortRects] = React.useState(null);

  const recalculateConnections = () => {
    const portRects = getPortRectsByNodes(nodes)
    console.log(portRects);
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
                node.connections && node.connections.inputs
                  ? Object.entries(node.connections.inputs).flatMap(
                      ([inputName, outputs], k) => (
                        outputs.map(output => {
                          const fromPort =
                            portRects[output.nodeId + output.portName];
                          const portHalf = fromPort.width / 2;
                          const toPort = portRects[node.id + inputName];
                          return (
                            <Connection
                              id={output.nodeId + output.portName + node.id + inputName}
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
                          );
                        })
                      )
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
