const nanoid = require('nanoid')

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
})

const removeConnection = (nodes, input, output) => {
  const inputNode = nodes[input.nodeId]
  const { [input.portName]: removedInputPort, ...newInputNodeConnectionsInputs} = inputNode.connections.inputs;
  const newInputNode = {
    ...inputNode,
    connections: {
      ...inputNode.connections,
      inputs: newInputNodeConnectionsInputs
    }
  }

  const outputNode = nodes[output.nodeId]
  const filteredOutputNodes = outputNode.connections.outputs[output.portName].filter(cnx => cnx.nodeId !== input.nodeId && cnx.portName !== input.portName)
  const newOutputNode = {
    ...outputNode,
    connections: {
      ...outputNode.connections,
      outputs: {
        ...outputNode.connections.outputs,
        [output.portName]: filteredOutputNodes
      }
    }
  }

  return {
    ...nodes,
    [input.nodeId]: newInputNode,
    [output.nodeId]: newOutputNode
  }
}

const nodesReducer = (nodes, action={}) => {
  switch (action.type) {
    case 'ADD_CONNECTION': {
      const { input, output } = action;
      const inputIsNotConnected = !nodes[input.nodeId].connections.inputs[input.portName]
      if(inputIsNotConnected)
        return addConnection(nodes, input, output);
      else
        return nodes
    }

    case 'REMOVE_CONNECTION': {
      const { input, output } = action;
      console.log(nodes);
      console.log(removeConnection(nodes, input, output));
      return removeConnection(nodes, input, output)
    }

    case 'ADD_NODE': {
      const { x, y, nodeType, width=200 } = action;
      const newNodeId = nanoid(10)
      return {
        ...nodes,
        [newNodeId]: {
          id: newNodeId,
          x, y, type: nodeType, width,
          connections: {
            inputs: {},
            outputs: {}
          }
        }
      }
    }

    default:
      return nodes;
  }
};

export default nodesReducer
