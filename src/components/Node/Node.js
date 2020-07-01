import React from "react";
import styles from "./Node.css";
import { NodeTypesContext, NodeDispatchContext, StageContext } from "../../context";
import { getPortRect } from "../../connectionCalculator";
import { Portal } from 'react-portal'
import ContextMenu from '../ContextMenu/ContextMenu'
import IoPorts from "../IoPorts/IoPorts";

const Node = ({
  id,
  width,
  height,
  x,
  y,
  delay = 6,
  stageRect,
  connections,
  type,
  inputData,
  onDragEnd,
  onDrag
}) => {
  const nodeTypes = React.useContext(NodeTypesContext);
  const nodesDispatch = React.useContext(NodeDispatchContext);
  const stageState = React.useContext(StageContext);
  const { label, deletable, inputs = [], outputs = [] } = nodeTypes[type];

  const startCoordinates = React.useRef(null);
  const [coordinates, setCoordinates] = React.useState({ x, y });
  const [isDragging, setIsDragging] = React.useState(false);
  const offset = React.useRef();
  const nodeWrapper = React.useRef();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [menuCoordinates, setMenuCoordinates] = React.useState({ x: 0, y: 0 });

  const byScale = value => (1 / stageState.scale) * value;

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
        cnt.x1.baseVal.value =
          byScale(toRect.x - stageRect.current.x + portHalf - (stageRect.current.width / 2)) + byScale(stageState.translate.x);
        cnt.y1.baseVal.value =
          byScale(toRect.y - stageRect.current.y + portHalf - (stageRect.current.height / 2)) + byScale(stageState.translate.y);
        cnt.x2.baseVal.value =
          byScale(fromRect.x - stageRect.current.x + portHalf - (stageRect.current.width / 2)) + byScale(stageState.translate.x);
        cnt.y2.baseVal.value =
          byScale(fromRect.y - stageRect.current.y + portHalf - (stageRect.current.height / 2)) + byScale(stageState.translate.y);
      });
    });
  };

  const updateNodeConnections = () => {
    if (connections) {
      updateConnectionsByTransput(connections.inputs);
      updateConnectionsByTransput(connections.outputs, true);
    }
  };

  const getScaledCoordinates = e => {
    const x =
      byScale(e.clientX -
      stageRect.current.left -
      offset.current.x
      - (stageRect.current.width / 2)) +
      byScale(stageState.translate.x)
    const y =
      byScale(e.clientY -
      stageRect.current.top -
      offset.current.y
      - (stageRect.current.height / 2)) +
      byScale(stageState.translate.y)
    return {x, y}
  }

  const updateCoordinates = e => {
    const { x, y } = getScaledCoordinates(e)
    nodeWrapper.current.style.transform = `translate(${x}px,${y}px)`;
    updateNodeConnections();
  };

  const stopDrag = e => {
    const coordinates = getScaledCoordinates(e)
    setCoordinates(coordinates);
    setIsDragging(false);
    nodesDispatch({
      type: "SET_NODE_COORDINATES",
      ...coordinates,
      nodeId: id
    });
    window.removeEventListener("mouseup", stopDrag);
    window.removeEventListener("mousemove", updateCoordinates);
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
    e.stopPropagation();
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

  const handleContextMenu = e => {
    e.preventDefault();
    e.stopPropagation();
    setMenuCoordinates({ x: e.clientX, y: e.clientY });
    setMenuOpen(true);
    return false;
  };

  const closeContextMenu = () => {
    setMenuOpen(false);
  };

  const handleMenuOption = ({ value }) => {
    switch (value) {
      case 'deleteNode':
        nodesDispatch({
          type: "REMOVE_NODE",
          nodeId: id
        })
        break;
      default:
        return;
    }
  }

  return (
    <div
      className={styles.wrapper}
      style={{
        width,
        // height,
        transform: `translate(${coordinates.x}px, ${coordinates.y}px)`
      }}
      onMouseDown={startDragDelay}
      onTouchStart={startDragDelay}
      ref={nodeWrapper}
      data-node-id={id}
      onContextMenu={handleContextMenu}
      onDragStart={e=>{e.preventDefault(); e.stopPropagation()}}
    >
      <h2 className={styles.label}>{label}</h2>
      <IoPorts
        nodeId={id}
        inputs={inputs}
        outputs={outputs}
        connections={connections}
        updateNodeConnections={updateNodeConnections}
        inputData={inputData}
      />
      {menuOpen ? (
        <Portal>
          <ContextMenu
            x={menuCoordinates.x}
            y={menuCoordinates.y}
            options={[
              ...(deletable !== false ?
              [{label: "Delete Node", value: "deleteNode", description: "Deletes a node and all of its connections."}]
              : [])
            ]}
            onRequestClose={closeContextMenu}
            onOptionSelected={handleMenuOption}
            hideFilter
            label="Node Options"
            emptyText="This node has no options."
          />
        </Portal>
      ) : null}
    </div>
  );
};

export default Node;
