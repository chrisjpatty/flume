import React from "react";
import styles from "./IoPorts.css";
import { Portal } from "react-portal";
import {
  NodeDispatchContext,
  ConnectionRecalculateContext,
  StageContext
} from "../../context";
import Control from "../Control/Control";
import Connection from "../Connection/Connection";
import { PortTypesContext } from "../../context";
import usePrevious from "../../hooks/usePrevious";
import { calculateCurve, getPortRect } from "../../connectionCalculator";

const IoPorts = ({
  nodeId,
  inputs = [],
  outputs = [],
  connections,
  inputData,
  updateNodeConnections
}) => {
  const inputTypes = React.useContext(PortTypesContext);
  const triggerRecalculation = React.useContext(ConnectionRecalculateContext);

  return (
    <div className={styles.wrapper}>
      {inputs.length ? (
        <div className={styles.inputs}>
          {inputs.map((input, i) => (
            <Input
              {...input}
              data={inputData[input.name] || {}}
              isConnected={!!connections.inputs[input.name]}
              triggerRecalculation={triggerRecalculation}
              updateNodeConnections={updateNodeConnections}
              inputTypes={inputTypes}
              nodeId={nodeId}
              inputData={inputData}
              key={i}
            />
          ))}
        </div>
      ) : null}
      {!!outputs.length && (
        <div className={styles.outputs}>
          {outputs.map((output, i) => (
            <Output
              {...output}
              triggerRecalculation={triggerRecalculation}
              inputTypes={inputTypes}
              nodeId={nodeId}
              inputData={inputData}
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
  data,
  controls: localControls,
  inputTypes,
  noControls,
  triggerRecalculation,
  updateNodeConnections,
  isConnected,
  inputData,
  hidePort
}) => {
  const { label: defaultLabel, color, controls: defaultControls = [] } =
    inputTypes[type] || {};
  const prevConnected = usePrevious(isConnected);

  const controls = localControls || defaultControls;

  React.useEffect(() => {
    if (isConnected !== prevConnected) {
      triggerRecalculation();
    }
  }, [isConnected, prevConnected, triggerRecalculation]);

  return (
    <div
      className={styles.transput}
      data-controlless={isConnected || noControls}
      onDragStart={e => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {!hidePort ? (
        <Port
          type={type}
          color={color}
          name={name}
          nodeId={nodeId}
          isInput
          triggerRecalculation={triggerRecalculation}
        />
      ) : null}
      {!noControls && !isConnected
        ? controls.map(control => (
            <Control
              {...control}
              nodeId={nodeId}
              portName={name}
              triggerRecalculation={triggerRecalculation}
              updateNodeConnections={updateNodeConnections}
              inputLabel={label}
              data={data[control.name]}
              key={control.name}
              inputData={inputData}
              isMonoControl={controls.length === 1}
            />
          ))
        : null}
      {(!controls.length || noControls || isConnected) && (
        <label className={styles.portLabel}>{label || defaultLabel}</label>
      )}
    </div>
  );
};

const Output = ({
  label,
  name,
  nodeId,
  type,
  inputTypes,
  triggerRecalculation
}) => {
  const { label: defaultLabel, color } = inputTypes[type] || {};

  return (
    <div
      className={styles.transput}
      data-controlless={true}
      onDragStart={e => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <label className={styles.portLabel}>{label || defaultLabel}</label>
      <Port
        type={type}
        name={name}
        color={color}
        nodeId={nodeId}
        triggerRecalculation={triggerRecalculation}
      />
    </div>
  );
};

const Port = ({
  color = "grey",
  name = "",
  type,
  isInput,
  nodeId,
  triggerRecalculation
}) => {
  const nodesDispatch = React.useContext(NodeDispatchContext);
  const stageState = React.useContext(StageContext);
  const inputTypes = React.useContext(PortTypesContext);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStartCoordinates, setDragStartCoordinates] = React.useState({
    x: 0,
    y: 0
  });
  const dragStartCoordinatesCache = React.useRef(dragStartCoordinates);
  const port = React.useRef();
  const line = React.useRef();
  const lineInToPort = React.useRef();

  const byScale = value => (1 / stageState.scale) * value;

  const handleDrag = e => {
    const stage = document
      .getElementById("__node_editor_stage__")
      .getBoundingClientRect();

    if (isInput) {
      const to = {
        x:
          byScale(e.clientX - stage.x - stage.width / 2) +
          byScale(stageState.translate.x),
        y:
          byScale(e.clientY - stage.y - stage.height / 2) +
          byScale(stageState.translate.y)
      };
      lineInToPort.current.setAttribute(
        "d",
        calculateCurve(dragStartCoordinatesCache.current, to)
      );
    } else {
      const to = {
        x:
          byScale(e.clientX - stage.x - stage.width / 2) +
          byScale(stageState.translate.x),
        y:
          byScale(e.clientY - stage.y - stage.height / 2) +
          byScale(stageState.translate.y)
      };
      line.current.setAttribute(
        "d",
        calculateCurve(dragStartCoordinatesCache.current, to)
      );
    }
  };

  const handleDragEnd = e => {
    const droppedOnPort = !!e.target.dataset.portName;

    if (isInput) {
      const {
        inputNodeId,
        inputPortName,
        outputNodeId,
        outputPortName
      } = lineInToPort.current.dataset;
      nodesDispatch({
        type: "REMOVE_CONNECTION",
        input: { nodeId: inputNodeId, portName: inputPortName },
        output: { nodeId: outputNodeId, portName: outputPortName }
      });
      if (droppedOnPort) {
        const {
          portName: connectToPortName,
          nodeId: connectToNodeId,
          portType: connectToPortType
        } = e.target.dataset;
        const isNotSameNode = outputNodeId !== connectToNodeId;
        if (isNotSameNode) {
          const inputWillAcceptConnection = inputTypes[
            connectToPortType
          ].acceptTypes.includes(type);
          if (inputWillAcceptConnection) {
            nodesDispatch({
              type: "ADD_CONNECTION",
              input: { nodeId: connectToNodeId, portName: connectToPortName },
              output: { nodeId: outputNodeId, portName: outputPortName }
            });
          }
        }
      }
    } else {
      if (droppedOnPort) {
        const {
          portName: inputPortName,
          nodeId: inputNodeId,
          portType: inputNodeType
        } = e.target.dataset;
        const isNotSameNode = inputNodeId !== nodeId;
        if (isNotSameNode) {
          const inputWillAcceptConnection = inputTypes[
            inputNodeType
          ].acceptTypes.includes(type);
          if (inputWillAcceptConnection) {
            nodesDispatch({
              type: "ADD_CONNECTION",
              output: { nodeId, portName: name },
              input: { nodeId: inputNodeId, portName: inputPortName }
            });
            triggerRecalculation();
          }
        }
      }
    }
    setIsDragging(false);
    document.removeEventListener("mouseup", handleDragEnd);
    document.removeEventListener("mousemove", handleDrag);
  };

  const handleDragStart = e => {
    e.preventDefault();
    e.stopPropagation();
    const startPort = port.current.getBoundingClientRect();
    const stage = document
      .getElementById("__node_editor_stage__")
      .getBoundingClientRect();

    if (isInput) {
      lineInToPort.current = document.querySelector(
        `[data-input-node-id="${nodeId}"][data-input-port-name="${name}"]`
      );
      const portIsConnected = !!lineInToPort.current;
      if (portIsConnected) {
        lineInToPort.current.parentNode.style.zIndex = 9999;
        const outputPort = getPortRect(
          lineInToPort.current.dataset.outputNodeId,
          lineInToPort.current.dataset.outputPortName,
          "output"
        );
        const coordinates = {
          x:
            byScale(
              outputPort.x - stage.x + outputPort.width / 2 - stage.width / 2
            ) + byScale(stageState.translate.x),
          y:
            byScale(
              outputPort.y - stage.y + outputPort.width / 2 - stage.height / 2
            ) + byScale(stageState.translate.y)
        };
        setDragStartCoordinates(coordinates);
        dragStartCoordinatesCache.current = coordinates;
        setIsDragging(true);
        document.addEventListener("mouseup", handleDragEnd);
        document.addEventListener("mousemove", handleDrag);
      }
    } else {
      const coordinates = {
        x:
          byScale(
            startPort.x - stage.x + startPort.width / 2 - stage.width / 2
          ) + byScale(stageState.translate.x),
        y:
          byScale(
            startPort.y - stage.y + startPort.width / 2 - stage.height / 2
          ) + byScale(stageState.translate.y)
      };
      setDragStartCoordinates(coordinates);
      dragStartCoordinatesCache.current = coordinates;
      setIsDragging(true);
      document.addEventListener("mouseup", handleDragEnd);
      document.addEventListener("mousemove", handleDrag);
    }
  };

  return (
    <React.Fragment>
      <div
        style={{ zIndex: 999 }}
        onMouseDown={handleDragStart}
        className={styles.port}
        data-port-color={color}
        data-port-name={name}
        data-port-type={type}
        data-port-transput-type={isInput ? "input" : "output"}
        data-node-id={nodeId}
        onDragStart={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
        ref={port}
      />
      {isDragging && !isInput ? (
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
