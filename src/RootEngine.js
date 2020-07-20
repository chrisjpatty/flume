class RootEngine {
  constructor(config, resolveInputControls, fireNodeFunction) {
    this.config = config;
    this.fireNodeFunction = fireNodeFunction;
    this.resolveInputControls = resolveInputControls;
  }
  getRootNode = nodes => Object.values(nodes).find(n => n.root);
  reduceRootInputs = (inputs, callback) =>
    Object.entries(inputs).reduce((obj, [inputName, connection]) => {
      const input = callback(inputName, connection);
      obj[input.name] = input.value;
      return obj;
    }, {});
  resolveInputValues = (node, nodeType, nodes, context) => {
    return nodeType.inputs.reduce((obj, input) => {
      const inputConnections = node.connections.inputs[input.name] || [];
      if (inputConnections.length > 0) {
        obj[input.name] = this.getValueOfConnection(inputConnections[0], nodes);
      } else {
        obj[input.name] = this.resolveInputControls(
          input.type,
          node.inputData[input.name],
          context
        );
      }
      return obj;
    }, {});
  };
  getValueOfConnection = (connection, nodes, context) => {
    const outputNode = nodes[connection.nodeId];
    const outputNodeType = this.config.nodeTypes[outputNode.type];
    const inputValues = this.resolveInputValues(
      outputNode,
      outputNodeType,
      nodes,
      context
    );
    const outputResult = this.fireNodeFunction(
      outputNode,
      inputValues,
      outputNodeType,
      context
    )[connection.portName];
    return outputResult;
  };
  resolveRootNode(nodes, options = {}) {
    const rootNode = options.rootNodeId
      ? nodes[options.rootNodeId]
      : this.getRootNode(nodes);
    if (rootNode) {
      const controlValues = this.config.nodeTypes[rootNode.type].inputs.reduce(
        (obj, input) => {
          obj[input.name] = this.resolveInputControls(
            input.type,
            rootNode.inputData[input.name],
            options.context
          );
          return obj;
        },
        {}
      );
      const inputValues = this.reduceRootInputs(
        rootNode.connections.inputs,
        (inputName, connection) => {
          return {
            name: inputName,
            value: this.getValueOfConnection(connection[0], nodes, options.context)
          };
        }
      );
      return { ...controlValues, ...inputValues };
    } else {
      console.error("A root node was not found. The Root Engine requires that exactly one node be marked as the root node.")
      return {}
    }
  }
}

export default RootEngine;
