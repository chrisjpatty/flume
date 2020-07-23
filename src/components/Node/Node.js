import React from "react";
import styles from "./Node.css";
import {
  NodeTypesContext,
  NodeDispatchContext,
  StageContext
} from "../../context";
import { getPortRect, calculateCurve } from "../../connectionCalculator";
import { Portal } from "react-portal";
import ContextMenu from "../ContextMenu/ContextMenu";
import IoPorts from "../IoPorts/IoPorts";
import Draggable from "../Draggable/Draggable";

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
  onDragStart,
  onDragEnd,
  onDrag
}) => {
  const nodeTypes = React.useContext(NodeTypesContext);
  const nodesDispatch = React.useContext(NodeDispatchContext);
  const stageState = React.useContext(StageContext);
  const { label, deletable, inputs = [], outputs = [] } = nodeTypes[type];

  const nodeWrapper = React.useRef();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [menuCoordinates, setMenuCoordinates] = React.useState({ x: 0, y: 0 });
  const portCache = React.useRef({});

  const byScale = value => (1 / stageState.scale) * value;

  const updateConnectionsByTransput = (transput = {}, isOutput, mouse) => {
    Object.entries(transput).forEach(([portName, outputs]) => {
      outputs.forEach(output => {
        const toRect = portCache.current[id + portName];
        const fromRect = portCache.current[output.nodeId + output.portName];
        const portHalf = fromRect.halfWidth;
        let combined;
        if (isOutput) {
          combined = id + portName + output.nodeId + output.portName;
        } else {
          combined = output.nodeId + output.portName + id + portName;
        }
        const cnx = document.querySelector(
          `[data-connection-id="${combined}"]`
        );
        const xDiff = x - mouse.x
        const yDiff = y - mouse.y
        const from = {
          x:
            byScale(
              toRect.x - xDiff -
                stageRect.current.x +
                portHalf -
                stageRect.current.width / 2
            ) + byScale(stageState.translate.x),
          y:
            byScale(
              toRect.y - yDiff -
                stageRect.current.y +
                portHalf -
                stageRect.current.height / 2
            ) + byScale(stageState.translate.y)
        };
        const to = {
          x:
            byScale(
              fromRect.x -
                stageRect.current.x +
                portHalf -
                stageRect.current.width / 2
            ) + byScale(stageState.translate.x),
          y:
            byScale(
              fromRect.y -
                stageRect.current.y +
                portHalf -
                stageRect.current.height / 2
            ) + byScale(stageState.translate.y)
        };
        cnx.setAttribute("d", calculateCurve(from, to));
      });
    });
  };

  const updateNodeConnections = (coordinates = {x: 0, y: 0}) => {
    if (connections) {
      updateConnectionsByTransput(connections.inputs, false, coordinates);
      updateConnectionsByTransput(connections.outputs, true, coordinates);
    }
  };

  const cachePortsByTransput = (transput, isOutput) => {
    Object.entries(transput).forEach(([portName, outputs]) => {
      outputs.forEach(output => {
        const toRect = getPortRect(id, portName, isOutput ? "output" : "input");
        const fromRect = getPortRect(
          output.nodeId,
          output.portName,
          isOutput ? "input" : "output"
        );
        portCache.current[id + portName] = {
          x: toRect.x,
          y: toRect.y,
          halfWidth: toRect.width / 2
        };
        portCache.current[output.nodeId + output.portName] = {
          x: fromRect.x,
          y: fromRect.y,
          halfWidth: fromRect.width / 2
        };
      });
    });
  };

  const cachePortRects = () => {
    cachePortsByTransput(connections.inputs);
    cachePortsByTransput(connections.outputs, true);
  };

  const stopDrag = (e, coordinates) => {
    nodesDispatch({
      type: "SET_NODE_COORDINATES",
      ...coordinates,
      nodeId: id
    });
  };

  const handleDrag = ({ x, y }) => {
    nodeWrapper.current.style.transform = `translate(${x}px,${y}px)`;
    updateNodeConnections({ x, y });
  };

  const startDrag = e => {
    cachePortRects();
    onDragStart();
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
      case "deleteNode":
        nodesDispatch({
          type: "REMOVE_NODE",
          nodeId: id
        });
        break;
      default:
        return;
    }
  };

  React.useEffect(() => {
    cachePortRects()
  }, [])

  return (
    <Draggable
      className={styles.wrapper}
      style={{
        width,
        transform: `translate(${x}px, ${y}px)`
      }}
      onDragStart={startDrag}
      onDrag={handleDrag}
      onDragEnd={stopDrag}
      innerRef={nodeWrapper}
      data-node-id={id}
      onContextMenu={handleContextMenu}
      stageState={stageState}
      stageRect={stageRect}
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
              ...(deletable !== false
                ? [
                    {
                      label: "Delete Node",
                      value: "deleteNode",
                      description: "Deletes a node and all of its connections."
                    }
                  ]
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
    </Draggable>
  );
};

export default Node;
