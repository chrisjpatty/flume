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

const reconcileNodes = (initialNodes, nodeTypes, portTypes) => {
  let nodes = {...initialNodes}

  // Delete extraneous nodes
  let nodesToDelete = Object.values(nodes)
    .map(node => !nodeTypes[node.type] ? node.id : undefined)
    .filter(x => x)

  nodesToDelete.forEach(nodeId => {
    nodes = nodesReducer(nodes, {
      type: "REMOVE_NODE",
      nodeId
    }, {nodeTypes, portTypes})
  })

  // Reconcile input data for each node
  const reconciledNodes = Object.values(nodes).reduce((nodesObj, node) => {
    const nodeType = nodeTypes[node.type]
    const defaultInputData = getDefaultData({nodeType, portTypes})
    const currentInputData = Object.entries(node.inputData).reduce((dataObj, [key, data]) => {
      if(defaultInputData[key] !== undefined){
        dataObj[key] = data;
      }
      return dataObj;
    }, {})
    const newInputData = {
      ...defaultInputData,
      ...currentInputData
    }
    nodesObj[node.id] = {
      ...node,
      inputData: newInputData
    }
    return nodesObj
  }, {})

  return reconciledNodes
}

export const getInitialNodes = (initialNodes = {}, defaultNodes = [], nodeTypes, portTypes) => {
  const reconciledNodes = reconcileNodes(initialNodes, nodeTypes, portTypes)

  return {
    ...reconciledNodes,
    ...defaultNodes.reduce((nodes, dNode) => {
      const nodeNotAdded = !Object.values(initialNodes).find(n => n.type === dNode.type)
      if(nodeNotAdded){
        nodes = nodesReducer(nodes, {
          type: "ADD_NODE",
          x: dNode.x || 0,
          y: dNode.y || 0,
          nodeType: dNode.type
        }, {nodeTypes, portTypes})
      }
      return nodes
    }, {})
  }
}

const getDefaultData = ({ nodeType, portTypes }) =>
  nodeType.inputs.reduce((obj, input) => {
    const inputType = portTypes[input.type];
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

const nodesReducer = (nodes, action = {}, { nodeTypes, portTypes }) => {
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
            portTypes
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
