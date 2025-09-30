import { FlumeNode } from "./types";

export const checkForCircularNodes = (
  nodes: { [nodeId: string]: FlumeNode },
  startNodeId: string
) => {

  let queue: string[] = [startNodeId]
  let visitedNodes: FlumeNode[] = []

  while (queue.length > 0) {
    let currentNodeId = queue.pop();
    if (currentNodeId == undefined)
      return;

    let currentNode = nodes[currentNodeId];

    if (visitedNodes.includes(currentNode)) {
      return true;
    }

    visitedNodes.push(currentNode);

    if (currentNode.connections == undefined)
      continue;
    let outputs = currentNode.connections.outputs;

    for (let output in outputs) {
      let outputArray = outputs[output]
      queue = queue.concat(outputArray.map(x => x.nodeId).filter((value, index, array) => array.indexOf(value) == index));
    }
  }

  return false;

};
