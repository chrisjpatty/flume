import React from "react";
import { Portal } from "react-portal";
import {
  NodeDispatchContext,
  ConnectionRecalculateContext,
  StageContext,
  EditorIdContext
} from "../../context";
import Control from "../Control/Control";
import Connection from "../Connection/Connection";
import { PortTypesContext } from "../../context";
import usePrevious from "../../hooks/usePrevious";
import { calculateCurve, getPortRect } from "../../connectionCalculator";
import { STAGE_ID, DRAG_CONNECTION_ID } from "../../constants";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  width: 100%;
  padding: 5px;
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0px;
  }
  .transput {
    &:first-child {
      .portLabel,
      .port {
        margin-top: 5px;
      }
    }
    &:last-child {
      .portLabel,
      .port {
        margin-bottom: 5px;
      }
    }
  }
`;

const Outputs = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  .transput {
    &:last-child {
      .portLabel,
      .port {
        margin-bottom: 5px;
      }
    }
  }
  &:first-child {
    margin-top: 5px;
  }
`;

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
    <Wrapper>
      {inputs.length ? (
        <Inputs>
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
        </Inputs>
      ) : null}
      {!!outputs.length && (
        <Outputs>
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
        </Outputs>
      )}
    </Wrapper>
  );
};

export default IoPorts;

const Transput = styled.div`
  display: flex;
  align-items: center;
  margin-top: 6px;
  margin-bottom: 6px;
  &:first-child {
    margin-top: 0px;
  }
  &[data-controlless="true"] {
    margin-top: 6px;
    margin-bottom: 6px;
    &:first-child {
      margin-top: 0px;
    }
  }
  &[data-controlless="false"] {
    margin-top: 2px;
    margin-bottom: 2px;
  }
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PortLabel = styled.label`
  font-size: 13px;
  font-weight: 400;
`;

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
    <Transput
      data-controlless={isConnected || noControls || !controls.length}
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
      {(!controls.length || noControls || isConnected) && (
        <PortLabel>{label || defaultLabel}</PortLabel>
      )}
      {!noControls && !isConnected ? (
        <Controls>
          {controls.map(control => (
            <Control
              {...control}
              nodeId={nodeId}
              portName={name}
              triggerRecalculation={triggerRecalculation}
              updateNodeConnections={updateNodeConnections}
              inputLabel={label}
              data={data[control.name]}
              allData={data}
              key={control.name}
              inputData={inputData}
              isMonoControl={controls.length === 1}
            />
          ))}
        </Controls>
      ) : null}
    </Transput>
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
    <Transput
      data-controlless={true}
      onDragStart={e => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <PortLabel>{label || defaultLabel}</PortLabel>
      <Port
        type={type}
        name={name}
        color={color}
        nodeId={nodeId}
        triggerRecalculation={triggerRecalculation}
      />
    </Transput>
  );
};

const StyledPort = styled.div`
  width: 12px;
  height: 12px;
  background: linear-gradient(to bottom, #acb1b4, #919699);
  border-radius: 100%;
  margin-right: 5px;
  margin-left: -11px;
  flex: 0 0 auto;
  box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.6);
  &:last-child {
    margin-right: -11px;
    margin-left: 5px;
  }
  &[data-port-color="red"] {
    background: linear-gradient(to bottom, #fa4a6f, #c22e4d);
  }
  &[data-port-color="purple"] {
    background: linear-gradient(to bottom, #9e55fb, #6024b6);
  }
  &[data-port-color="blue"] {
    background: linear-gradient(to bottom, #4284f7, #2867d4);
  }
  &[data-port-color="green"] {
    background: linear-gradient(to bottom, #31dd9f, #11ad7a);
  }
  &[data-port-color="yellow"] {
    background: linear-gradient(to bottom, #d6bf47, #9d8923);
  }
  &[data-port-color="orange"] {
    background: linear-gradient(to bottom, #fa7841, #c94b23);
  }
  &[data-port-color="pink"] {
    background: linear-gradient(to bottom, #fe8aeb, #e046c3);
  }
`;

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
  const editorId = React.useContext(EditorIdContext);
  const stageId = `${STAGE_ID}${editorId}`;
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
    const stage = document.getElementById(stageId).getBoundingClientRect();

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
          portType: connectToPortType,
          portTransputType: connectToTransputType
        } = e.target.dataset;
        const isNotSameNode = outputNodeId !== connectToNodeId;
        if (isNotSameNode && connectToTransputType !== "output") {
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
          portType: inputNodeType,
          portTransputType: inputTransputType
        } = e.target.dataset;
        const isNotSameNode = inputNodeId !== nodeId;
        if (isNotSameNode && inputTransputType !== "output") {
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
    const stage = document.getElementById(stageId).getBoundingClientRect();

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
      <StyledPort
        style={{ zIndex: 999 }}
        onMouseDown={handleDragStart}
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
          node={document.getElementById(`${DRAG_CONNECTION_ID}${editorId}`)}
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
