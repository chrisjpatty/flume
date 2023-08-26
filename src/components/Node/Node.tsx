import React, { HTMLProps } from "react";
import styles from "./Node.css";
import {
  NodeTypesContext,
  NodeDispatchContext,
  StageContext,
  CacheContext
} from "../../context";
import { getPortRect, calculateCurve } from "../../connectionCalculator";
import { Portal } from "react-portal";
import ContextMenu from "../ContextMenu/ContextMenu";
import IoPorts from "../IoPorts/IoPorts";
import Draggable from "../Draggable/Draggable";
import {
  ConnectionMap,
  Connections,
  Coordinate,
  InputData,
  NodeHeaderRenderCallback,
  SelectOption
} from "../../types";
import { NodesActionType } from "../../nodesReducer";

interface NodeProps {
  id: string;
  width: number;
  x: number;
  y: number;
  stageRect: React.MutableRefObject<DOMRect | undefined>;
  connections: Connections;
  type: string;
  inputData: InputData;
  onDragStart: () => void;
  renderNodeHeader?: NodeHeaderRenderCallback;
  root?: boolean;
}

const Node = ({
  id,
  width,
  x,
  y,
  stageRect,
  connections,
  type,
  inputData,
  root,
  onDragStart,
  renderNodeHeader
}: NodeProps) => {
  const cache = React.useContext(CacheContext) ?? undefined;
  const nodeTypes = React.useContext(NodeTypesContext) ?? {};
  const nodesDispatch = React.useContext(NodeDispatchContext);
  const stageState = React.useContext(StageContext) ?? {
    scale: 0,
    translate: { x: 0, y: 0 }
  };
  const currentNodeType = nodeTypes[type];
  const { label, deletable, inputs = [], outputs = [] } = currentNodeType;

  const nodeWrapper = React.useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [menuCoordinates, setMenuCoordinates] = React.useState({ x: 0, y: 0 });

  const byScale = (value: number) => (1 / stageState.scale) * value;

  const updateConnectionsByTransput = (
    transput: ConnectionMap = {},
    isOutput?: boolean
  ) => {
    Object.entries(transput).forEach(([portName, outputs]) => {
      outputs.forEach(output => {
        const toRect = getPortRect(
          id,
          portName,
          isOutput ? "output" : "input",
          cache
        );
        const fromRect = getPortRect(
          output.nodeId,
          output.portName,
          isOutput ? "input" : "output",
          cache
        );
        const portHalf = (fromRect?.width ?? 0) / 2;
        let combined;
        if (isOutput) {
          combined = id + portName + output.nodeId + output.portName;
        } else {
          combined = output.nodeId + output.portName + id + portName;
        }
        let cnx: SVGPathElement | Connections | null;
        const cachedConnection = cache?.current?.connections[combined];
        if (cachedConnection) {
          cnx = cachedConnection;
        } else {
          cnx = document.querySelector<SVGPathElement>(
            `[data-connection-id="${combined}"]`
          );
          if (cnx && cache && cache.current) {
            cache.current.connections[combined] = cnx;
          }
        }
        const from = {
          x:
            byScale(
              (toRect?.x ?? 0) -
                (stageRect.current?.x ?? 0) +
                portHalf -
                (stageRect.current?.width ?? 0) / 2
            ) + byScale(stageState.translate.x),
          y:
            byScale(
              (toRect?.y ?? 0) -
                (stageRect.current?.y ?? 0) +
                portHalf -
                (stageRect.current?.height ?? 0) / 2
            ) + byScale(stageState.translate.y)
        };
        const to = {
          x:
            byScale(
              (fromRect?.x ?? 0) -
                (stageRect.current?.x ?? 0) +
                portHalf -
                (stageRect.current?.width ?? 0) / 2
            ) + byScale(stageState.translate.x),
          y:
            byScale(
              (fromRect?.y ?? 0) -
                (stageRect.current?.y ?? 0) +
                portHalf -
                (stageRect.current?.height ?? 0) / 2
            ) + byScale(stageState.translate.y)
        };
        cnx?.setAttribute("d", calculateCurve(from, to));
      });
    });
  };

  const updateNodeConnections = () => {
    if (connections) {
      updateConnectionsByTransput(connections.inputs);
      updateConnectionsByTransput(connections.outputs, true);
    }
  };

  const stopDrag = (e: any, coordinates: Coordinate) => {
    nodesDispatch?.({
      type: NodesActionType.SET_NODE_COORDINATES,
      ...coordinates,
      nodeId: id
    });
  };

  const handleDrag = ({ x, y }: Coordinate) => {
    if (nodeWrapper.current) {
      nodeWrapper.current.style.transform = `translate(${x}px,${y}px)`;
      updateNodeConnections();
    }
  };

  const startDrag = () => {
    onDragStart();
  };

  const handleContextMenu = (e: MouseEvent | React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuCoordinates({ x: e.clientX, y: e.clientY });
    setMenuOpen(true);
    return false;
  };

  const closeContextMenu = () => {
    setMenuOpen(false);
  };

  const deleteNode = () => {
    nodesDispatch?.({
      type: NodesActionType.REMOVE_NODE,
      nodeId: id
    });
  };

  const handleMenuOption = ({ value }: SelectOption) => {
    switch (value) {
      case "deleteNode":
        deleteNode();
        break;
      default:
        return;
    }
  };

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
      data-flume-component="node"
      data-flume-node-type={currentNodeType.type}
      data-flume-component-is-root={!!root}
      onContextMenu={handleContextMenu}
      stageState={stageState}
      stageRect={stageRect}
    >
      {renderNodeHeader ? (
        renderNodeHeader(NodeHeader, currentNodeType, {
          openMenu: handleContextMenu,
          closeMenu: closeContextMenu,
          deleteNode
        })
      ) : (
        <NodeHeader>{label}</NodeHeader>
      )}
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

export const NodeHeader: React.FC<HTMLProps<HTMLHeadingElement>> = ({
  children,
  className = "",
  ...props
}) => (
  <h2
    {...props}
    className={styles.label + (className ? ` ${className}` : "")}
    data-flume-component="node-header"
  >
    {children}
  </h2>
);

export default Node;
