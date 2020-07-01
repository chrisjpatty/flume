import { deleteConnection, deleteConnectionsByNodeId } from "./connectionCalculator";
// import cloneDeep from 'lodash/cloneDeep'
const nanoid = require("nanoid");

const addConnection = (nodes, input, output) => ({
  ...nodes,
  [input.nodeId]: {
    ...nodes[input.nodeId],
    connections: {
      ...nodes[input.nodeId].connections,
      inputs: {
        ...nodes[input.nodeId].connections.inputs,
        [input.portName]: [
          ...(nodes[input.nodeId].connections.inputs[input.portName] || []),
          {
            nodeId: output.nodeId,
            portName: output.portName
          }
        ]
      }
    }
  },
  [output.nodeId]: {
    ...nodes[output.nodeId],
    connections: {
      ...nodes[output.nodeId].connections,
      outputs: {
        ...nodes[output.nodeId].connections.outputs,
        [output.portName]: [
          ...(nodes[output.nodeId].connections.outputs[output.portName] || []),
          {
            nodeId: input.nodeId,
            portName: input.portName
          }
        ]
      }
    }
  }
});

const removeConnection = (nodes, input, output) => {
  const inputNode = nodes[input.nodeId];
  const {
    [input.portName]: removedInputPort,
    ...newInputNodeConnectionsInputs
  } = inputNode.connections.inputs;
  const newInputNode = {
    ...inputNode,
    connections: {
      ...inputNode.connections,
      inputs: newInputNodeConnectionsInputs
    }
  };

  const outputNode = nodes[output.nodeId];
  const filteredOutputNodes = outputNode.connections.outputs[
    output.portName
  ].filter(
    cnx => {
      return cnx.nodeId === input.nodeId ? cnx.portName !== input.portName : true
    }
  );
  const newOutputNode = {
    ...outputNode,
    connections: {
      ...outputNode.connections,
      outputs: {
        ...outputNode.connections.outputs,
        [output.portName]: filteredOutputNodes
      }
    }
  };

  return {
    ...nodes,
    [input.nodeId]: newInputNode,
    [output.nodeId]: newOutputNode
  };
};

const getFilteredTransputs = (transputs, nodeId) => (
  Object.entries(transputs).reduce((obj, [portName, transput]) => {
    const newTransputs = transput.filter(t => t.nodeId !== nodeId)
    if(newTransputs.length){
      obj[portName] = newTransputs
    }
    return obj
  }, {})
)

const removeConnections = (connections, nodeId) => ({
  inputs: getFilteredTransputs(connections.inputs, nodeId),
  outputs: getFilteredTransputs(connections.outputs, nodeId)
})

const removeNode = (startNodes, nodeId) => {
  let { [nodeId]: deletedNode, ...nodes } = startNodes;
  nodes = Object.values(nodes).reduce((obj, node) => {
    obj[node.id] = {
      ...node,
      connections: removeConnections(node.connections, nodeId)
    }

    return obj
  }, {})
  deleteConnectionsByNodeId(nodeId)
  return nodes
}

export const getInitialNodes = (initialNodes = {}, defaultNodes = [], nodeTypes, inputTypes) => {
  if(Object.keys(initialNodes).length){
    return initialNodes
  }else{
    return defaultNodes.reduce((nodes, dNode) => {
      nodes = nodesReducer(nodes, {
        type: "ADD_NODE",
        x: dNode.x,
        y: dNode.y,
        nodeType: dNode.type
      }, {nodeTypes, inputTypes})
      return nodes
    }, {})
  }
}

const getDefaultData = ({ nodeType, inputTypes }) =>
  nodeType.inputs.reduce((obj, input) => {
    const inputType = inputTypes[input.type];
    obj[input.name || inputType.name] = (
      input.controls ||
      inputType.controls ||
      []
    ).reduce((obj2, control) => {
      obj2[control.name] = control.defaultValue;
      return obj2;
    }, {});
    return obj;
  }, {});

const nodesReducer = (nodes, action = {}, { nodeTypes, inputTypes }) => {
  switch (action.type) {

    case "ADD_CONNECTION": {
      const { input, output } = action;
      const inputIsNotConnected = !nodes[input.nodeId].connections.inputs[
        input.portName
      ];
      if (inputIsNotConnected) return addConnection(nodes, input, output);
      else return nodes;
  }

    case "REMOVE_CONNECTION": {
      const { input, output } = action;
      deleteConnection({
        id: output.nodeId + output.portName + input.nodeId + input.portName
      });
      return removeConnection(nodes, input, output);
    }

    case "ADD_NODE": {
      const { x, y, nodeType } = action;
      const newNodeId = nanoid(10);
      return {
        ...nodes,
        [newNodeId]: {
          id: newNodeId,
          x,
          y,
          type: nodeType,
          width: nodeTypes[nodeType].initialWidth || 200,
          connections: {
            inputs: {},
            outputs: {}
          },
          inputData: getDefaultData({
            nodeType: nodeTypes[nodeType],
            inputTypes
          })
        }
      };
    }

    case "REMOVE_NODE": {
      const { nodeId } = action;
      return removeNode(nodes, nodeId)
    }

    case "SET_PORT_DATA": {
      const { nodeId, portName, controlName, data, setValue } = action;
      let newData = {
        ...nodes[nodeId].inputData,
        [portName]: {
          ...nodes[nodeId].inputData[portName],
          [controlName]: data
        }
      }
      if(setValue){
        newData = setValue(newData, nodes[nodeId].inputData)
      }
      return {
        ...nodes,
        [nodeId]: {
          ...nodes[nodeId],
          inputData: newData
        }
      };
    }

    case "SET_NODE_COORDINATES": {
      const { x, y, nodeId } = action;
      return {
        ...nodes,
        [nodeId]: {
          ...nodes[nodeId],
          x,
          y
        }
      };
    }

    default:
      return nodes;
  }
};

export const connectNodesReducer = (reducer, environment) => (state, action) =>
  reducer(state, action, environment);

export default nodesReducer;
