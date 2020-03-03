import React from "react";
import styles from "./Node.css";
import { NodeTypesContext, NodeDispatchContext } from "../../context";
import { getPortRectsByNodes, getPortRect } from "../../connectionCalculator";
import IoPorts from "../IoPorts/IoPorts";

const Node = ({
  id,
  width,
  height,
  x,
  y,
  delay = 6,
  stageRef,
  connections,
  type,
  onDragEnd,
  onDrag
}) => {
  const nodeTypes = React.useContext(NodeTypesContext);
  const nodesDispatch = React.useContext(NodeDispatchContext);
  const { label, inputs = [], outputs = [] } = nodeTypes[type];

  const startCoordinates = React.useRef(null);
  const [coordinates, setCoordinates] = React.useState({ x, y });
  const [isDragging, setIsDragging] = React.useState(false);
  const offset = React.useRef();
  const nodeWrapper = React.useRef();

  const updateConnectionsByTransput = (transput = {}, isOutput) => {
    Object.entries(transput).forEach(([portName, outputs]) => {
      outputs.forEach(output => {
        const toRect = getPortRect(id, portName, isOutput ? "output" : "input");
        const fromRect = getPortRect(
          output.nodeId,
          output.portName,
          isOutput ? "input" : "output"
        );
        const portHalf = fromRect.width / 2;
        let combined;
        if (isOutput) {
          combined = id + portName + output.nodeId + output.portName;
        } else {
          combined = output.nodeId + output.portName + id + portName;
        }
        const cnt = document.querySelector(
          `[data-connection-id="${combined}"]`
        );
        cnt.x1.baseVal.value = toRect.x - stageRef.current.x + portHalf;
        cnt.y1.baseVal.value = toRect.y - stageRef.current.y + portHalf;
        cnt.x2.baseVal.value = fromRect.x - stageRef.current.x + portHalf;
        cnt.y2.baseVal.value = fromRect.y - stageRef.current.y + portHalf;
      });
    });
  };

  const updateNodeConnections = () => {
    if (connections) {
      updateConnectionsByTransput(connections.inputs);
      updateConnectionsByTransput(connections.outputs, true);
    }
  };

  const updateCoordinates = e => {
    nodeWrapper.current.style.left = `${e.clientX -
      stageRef.current.left -
      offset.current.x}px`;
    nodeWrapper.current.style.top = `${e.clientY -
      stageRef.current.top -
      offset.current.y}px`;
    updateNodeConnections();
  };

  const stopDrag = e => {
    const coordinates = {
      x: e.clientX - stageRef.current.left - offset.current.x,
      y: e.clientY - stageRef.current.top - offset.current.y
    };
    setCoordinates(coordinates);
    setIsDragging(false);
    nodesDispatch({
      type: "SET_NODE_COORDINATES",
      ...coordinates,
      nodeId: id
    });
    window.removeEventListener("mouseup", stopDrag);
    window.removeEventListener("mousemove", updateCoordinates);
    // onDragEnd();
  };

  const startDrag = e => {
    const nodeRect = nodeWrapper.current.getBoundingClientRect();
    offset.current = {
      x: startCoordinates.current.x - nodeRect.left,
      y: startCoordinates.current.y - nodeRect.top
    };
    updateCoordinates(e);
    setIsDragging(true);
    window.addEventListener("mouseup", stopDrag);
    window.addEventListener("mousemove", updateCoordinates);
  };

  const checkDragDelay = e => {
    let x;
    let y;
    if ("ontouchstart" in window && e.touches) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else {
      e.preventDefault();
      x = e.clientX;
      y = e.clientY;
    }
    let a = Math.abs(startCoordinates.current.x - x);
    let b = Math.abs(startCoordinates.current.y - y);
    let distance = Math.round(Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)));
    let dragDistance = delay;
    if (distance >= dragDistance) {
      startDrag(e);
      endDragDelay();
    }
  };

  const endDragDelay = () => {
    document.removeEventListener("mouseup", endDragDelay);
    document.removeEventListener("mousemove", checkDragDelay);
    startCoordinates.current = null;
  };

  const startDragDelay = e => {
    let x;
    let y;
    if ("ontouchstart" in window && e.touches) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else {
      e.preventDefault();
      x = e.clientX;
      y = e.clientY;
    }
    startCoordinates.current = { x, y };
    document.addEventListener("mouseup", endDragDelay);
    document.addEventListener("mousemove", checkDragDelay);
  };

  return (
    <div
      className={styles.wrapper}
      style={{
        width,
        // height,
        left: coordinates.x,
        top: coordinates.y
      }}
      onMouseDown={startDragDelay}
      onTouchStart={startDragDelay}
      ref={nodeWrapper}
      data-node-id={id}
    >
      <h2 className={styles.label}>{label}</h2>
      <IoPorts
        nodeId={id}
        inputs={inputs}
        outputs={outputs}
        connections={connections}
        updateNodeConnections={updateNodeConnections}
      />
    </div>
  );
};

export default Node;
