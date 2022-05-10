import styles from "./components/Connection/Connection.css";
import { CONNECTIONS_ID } from "./constants";
import { line, curveBasis } from "d3-shape";
import { Coordinate, FlumeNode, TransputType } from "./types";
import FlumeCache from "./Cache";
import { RefObject } from "react";

const getPort = (
  nodeId: string,
  portName: string,
  transputType: TransputType = "input"
) =>
  document.querySelector(
    `[data-node-id="${nodeId}"] [data-port-name="${portName}"][data-port-transput-type="${transputType}"]`
  );

export const getPortRect = (
  nodeId: string,
  portName: string,
  transputType?: TransputType,
  cache?: RefObject<FlumeCache>
) => {
  let calculatedTransputType = transputType ?? "input";

  if (cache && cache.current) {
    const portCacheName = nodeId + portName + calculatedTransputType;
    const cachedPort = cache.current.ports[portCacheName];
    if (cachedPort) {
      return cachedPort.getBoundingClientRect();
    } else {
      const port = getPort(nodeId, portName, calculatedTransputType);
      if (port) {
        cache.current.ports[portCacheName] = port;
      }
      return port && port.getBoundingClientRect();
    }
  } else {
    const port = getPort(nodeId, portName, calculatedTransputType);
    return port && port.getBoundingClientRect();
  }
};

export const getPortRectsByNodes = (
  nodes: { [nodeId: string]: FlumeNode },
  forEachConnection
) =>
  Object.values(nodes).reduce((obj, node) => {
    if (node.connections && node.connections.inputs) {
      Object.entries(node.connections.inputs).forEach(
        ([inputName, outputs]) => {
          outputs.forEach(output => {
            const toRect = getPortRect(node.id, inputName);
            const fromRect = getPortRect(
              output.nodeId,
              output.portName,
              "output"
            );
            if (forEachConnection) {
              forEachConnection({
                to: toRect,
                from: fromRect,
                name: output.nodeId + output.portName + node.id + inputName
              });
            }
            obj[node.id + inputName] = toRect;
            obj[output.nodeId + output.portName] = fromRect;
          });
        }
      );
    }
    return obj;
  }, {});

export const calculateCurve = (from: Coordinate, to: Coordinate) => {
  const length = to.x - from.x;
  const thirdLength = length / 3;
  const curve =
    line().curve(curveBasis)([
      [from.x, from.y],
      [from.x + thirdLength, from.y],
      [from.x + thirdLength * 2, to.y],
      [to.x, to.y]
    ]) ?? "";
  return curve;
};

export const deleteConnection = ({ id }: { id: string }) => {
  const line = document.querySelector(`[data-connection-id="${id}"]`);
  line?.parentElement?.remove();
};

export const deleteConnectionsByNodeId = (nodeId: string) => {
  const lines = Array.from(
    document.querySelectorAll(
      `[data-output-node-id="${nodeId}"], [data-input-node-id="${nodeId}"]`
    )
  );
  for (const line of lines) {
    line?.parentElement?.remove();
  }
};

export const updateConnection = ({
  line,
  from,
  to
}: {
  line: SVGPathElement;
  from: Coordinate;
  to: Coordinate;
}) => {
  line.setAttribute("d", calculateCurve(from, to));
};

export const createSVG = ({
  from,
  to,
  stage,
  id,
  outputNodeId,
  outputPortName,
  inputNodeId,
  inputPortName
}: {
  from: Coordinate;
  to: Coordinate;
  stage: HTMLDivElement;
  id: string;
  outputNodeId: string;
  outputPortName: string;
  inputNodeId: string;
  inputPortName: string;
}) => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", styles.svg);
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const curve = calculateCurve(from, to);
  path.setAttribute("d", curve);
  path.setAttribute("stroke", "rgb(185, 186, 189)");
  path.setAttribute("stroke-width", "3");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("fill", "none");
  path.setAttribute("data-connection-id", id);
  path.setAttribute("data-output-node-id", outputNodeId);
  path.setAttribute("data-output-port-name", outputPortName);
  path.setAttribute("data-input-node-id", inputNodeId);
  path.setAttribute("data-input-port-name", inputPortName);
  svg.appendChild(path);
  stage.appendChild(svg);
  return svg;
};

export const getStageRef = (editorId: string) =>
  document.getElementById(
    `${CONNECTIONS_ID}${editorId}`
  ) as HTMLDivElement | null;

export const createConnections = (
  nodes: { [nodeId: string]: FlumeNode },
  { scale, stageId }: { scale: number; stageId: string },
  editorId: string
) => {
  const stageRef = getStageRef(editorId);
  if (stageRef) {
    const stage = stageRef.getBoundingClientRect();
    const stageHalfWidth = stage.width / 2;
    const stageHalfHeight = stage.height / 2;

    const byScale = (value: number) => (1 / scale) * value;

    Object.values(nodes).forEach(node => {
      if (node.connections && node.connections.inputs) {
        Object.entries(node.connections.inputs).forEach(
          ([inputName, outputs], k) => {
            outputs.forEach(output => {
              const fromPort = getPortRect(
                output.nodeId,
                output.portName,
                "output"
              );
              const toPort = getPortRect(node.id, inputName, "input");
              const portHalf = fromPort ? fromPort.width / 2 : 0;
              if (fromPort && toPort) {
                const id =
                  output.nodeId + output.portName + node.id + inputName;
                const existingLine: SVGPathElement | null = document.querySelector(
                  `[data-connection-id="${id}"]`
                );
                if (existingLine) {
                  updateConnection({
                    line: existingLine,
                    from: {
                      x: byScale(
                        fromPort.x - stage.x + portHalf - stageHalfWidth
                      ),
                      y: byScale(
                        fromPort.y - stage.y + portHalf - stageHalfHeight
                      )
                    },
                    to: {
                      x: byScale(
                        toPort.x - stage.x + portHalf - stageHalfWidth
                      ),
                      y: byScale(
                        toPort.y - stage.y + portHalf - stageHalfHeight
                      )
                    }
                  });
                } else {
                  createSVG({
                    id,
                    outputNodeId: output.nodeId,
                    outputPortName: output.portName,
                    inputNodeId: node.id,
                    inputPortName: inputName,
                    from: {
                      x: byScale(
                        fromPort.x - stage.x + portHalf - stageHalfWidth
                      ),
                      y: byScale(
                        fromPort.y - stage.y + portHalf - stageHalfHeight
                      )
                    },
                    to: {
                      x: byScale(
                        toPort.x - stage.x + portHalf - stageHalfWidth
                      ),
                      y: byScale(
                        toPort.y - stage.y + portHalf - stageHalfHeight
                      )
                    },
                    stage: stageRef
                  });
                }
              }
            });
          }
        );
      }
    });
  }
};
