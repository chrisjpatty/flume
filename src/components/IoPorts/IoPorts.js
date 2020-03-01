import React from "react";
import styles from "./IoPorts.css";
import { Portal } from "react-portal";
import {
  NodeDispatchContext,
  ConnectionRecalculateContext
} from "../../context";
import Control from "../Control/Control";
import Connection from "../Connection/Connection";
import { InputTypesContext } from "../../context";

const IoPorts = ({
  nodeId,
  inputs = [],
  outputs = [],
  updateNodeConnections
}) => {
  const inputTypes = React.useContext(InputTypesContext);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputs}>
        {inputs.map((input, i) => (
          <Input
            {...input}
            updateNodeConnections={updateNodeConnections}
            inputTypes={inputTypes}
            nodeId={nodeId}
            key={i}
          />
        ))}
      </div>
      {!!outputs.length && (
        <div className={styles.outputs}>
          {outputs.map((output, i) => (
            <Output
              {...output}
              inputTypes={inputTypes}
              nodeId={nodeId}
              portOnRight
              key={i}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default IoPorts;

const Input = ({
  type,
  label,
  name,
  nodeId,
  inputTypes,
  noControls,
  updateNodeConnections
}) => {
  const { label: defaultLabel, color, controls = [] } = inputTypes[type] || {};

  return (
    <div className={styles.transput}>
      <Port type={type} color={color} name={name} nodeId={nodeId} isInput />
      {!noControls
        ? controls.map(control => (
            <Control {...control} updateNodeConnections={updateNodeConnections} inputLabel={label} key={control.name} />
          ))
        : null}
      {(!controls.length || noControls) && (
        <label className={styles.portLabel}>{label || defaultLabel}</label>
      )}
    </div>
  );
};

const Output = ({ label, name, nodeId, type, inputTypes }) => {
  const { label: defaultLabel, color } = inputTypes[type] || {};

  return (
    <div className={styles.transput}>
      <label className={styles.portLabel}>{label || defaultLabel}</label>
      <Port type={type} name={name} color={color} nodeId={nodeId} />
    </div>
  );
};

const Port = ({ color = "grey", name = "", type, isInput, nodeId }) => {
  const nodesDispatch = React.useContext(NodeDispatchContext);
  const inputTypes = React.useContext(InputTypesContext);
  const setShouldRecalculateConnections = React.useContext(
    ConnectionRecalculateContext
  );
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStartCoordinates, setDragStartCoordinates] = React.useState({
    x: 0,
    y: 0
  });
  const port = React.useRef();
  const line = React.useRef();

  const handleDrag = e => {
    const stage = document
      .getElementById("__node_editor_stage__")
      .getBoundingClientRect();
    line.current.setAttribute("x2", e.clientX - stage.x);
    line.current.setAttribute("y2", e.clientY - stage.y);
  };

  const handleDragEnd = e => {
    if (e.target.dataset.portName) {
      const {
        portName: inputPortName,
        nodeId: inputNodeId,
        portType: inputNodeType
      } = e.target.dataset;
      const inputWillAcceptConnection = inputTypes[
        inputNodeType
      ].acceptTypes.includes(type);
      if (inputWillAcceptConnection) {
        nodesDispatch({
          type: "ADD_CONNECTION",
          output: { nodeId, portName: name },
          input: { nodeId: inputNodeId, portName: inputPortName }
        });
        setShouldRecalculateConnections(true);
      }
    }
    setIsDragging(false);
    document.removeEventListener("mouseup", handleDragEnd);
    document.removeEventListener("mousemove", handleDrag);
  };

  const handleDragStart = e => {
    e.stopPropagation();
    const startPort = port.current.getBoundingClientRect();
    const stage = document
      .getElementById("__node_editor_stage__")
      .getBoundingClientRect();
    setDragStartCoordinates({
      x: startPort.x - stage.x + startPort.width / 2,
      y: startPort.y - stage.y + startPort.width / 2
    });
    setIsDragging(true);
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("mousemove", handleDrag);
  };

  return (
    <React.Fragment>
      <div
        style={{ zIndex: 999 }}
        onMouseDown={isInput ? undefined : handleDragStart}
        className={styles.port}
        data-port-color={color}
        data-port-name={name}
        data-port-type={type}
        data-port-transput-type={isInput ? "input" : "output"}
        data-node-id={nodeId}
        ref={port}
      />
      {isDragging ? (
        <Portal
          node={document.getElementById("__node_editor_drag_connection__")}
        >
          <Connection
            from={dragStartCoordinates}
            to={dragStartCoordinates}
            lineRef={line}
          />
        </Portal>
      ) : null}
    </React.Fragment>
  );
};
