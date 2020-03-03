import styles from "./components/Connection/Connection.css";

export const getPortRect = (nodeId, portName, transputType = "input") =>
  document
    .querySelector(
      `[data-node-id="${nodeId}"] [data-port-name="${portName}"][data-port-transput-type="${transputType}"]`
    )
    .getBoundingClientRect();

export const getPortRectsByNodes = (nodes, forEachConnection) =>
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

/* <Connection
  id={
    output.nodeId +
    output.portName +
    node.id +
    inputName
  }
  from={{
    x: fromPort.x - stage.current.x + portHalf,
    y: fromPort.y - stage.current.y + portHalf
  }}
  to={{
    x: toPort.x - stage.current.x + portHalf,
    y: toPort.y - stage.current.y + portHalf
  }}
  key={node.id + inputName + k}
/> */

export const updateConnection = ({ line, from, to }) => {
  line.setAttribute("x1", from.x);
  line.setAttribute("y1", from.y);
  line.setAttribute("x2", to.x);
  line.setAttribute("y2", to.y);
}

export const createSVG = ({ from, to, stage, id }) => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", styles.svg);
  // svg.setAttributeNS("http://www.w3.org/2000/svg", "xmlns")
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", from.x);
  line.setAttribute("y1", from.y);
  line.setAttribute("x2", to.x);
  line.setAttribute("y2", to.y);
  line.setAttribute("stroke", "rgb(185, 186, 189)");
  line.setAttribute("stroke-width", "5");
  line.setAttribute("stroke-linecap", "round");
  line.setAttribute("data-connection-id", id);
  svg.appendChild(line);
  stage.appendChild(svg);
  return svg;
};

export const getStageRef = () =>
  document.getElementById("__node_editor_stage__");

export const createConnections = nodes => {
  const stageRef = getStageRef();
  const stage = stageRef.getBoundingClientRect();

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
              const id = output.nodeId + output.portName + node.id + inputName;
              const existingLine = document.querySelector(`[data-connection-id="${id}"]`)
              if(existingLine){
                updateConnection({
                  line: existingLine,
                  from: {
                    x: fromPort.x - stage.x + portHalf,
                    y: fromPort.y - stage.y + portHalf
                  },
                  to: {
                    x: toPort.x - stage.x + portHalf,
                    y: toPort.y - stage.y + portHalf
                  }
                });
              }else{
                createSVG({
                  id,
                  from: {
                    x: fromPort.x - stage.x + portHalf,
                    y: fromPort.y - stage.y + portHalf
                  },
                  to: {
                    x: toPort.x - stage.x + portHalf,
                    y: toPort.y - stage.y + portHalf
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
};
