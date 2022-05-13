import {
  PortResolver,
  NodeResolver,
  NodeMap,
  ConnectionMap,
  Connection,
  FlumeNode,
  NodeType,
  NodeTypeMap,
  Connections,
  RootEngineOptions
} from "./types";
import { FlumeConfig } from "./typeBuilders";

class LoopError extends Error {
  public code: number;
  static maxLoopsExceeded = 1;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}

export class RootEngine {
  public config: FlumeConfig;
  private resolveInputControls: PortResolver;
  private fireNodeFunction: NodeResolver;
  private loops: number;
  private maxLoops: number;

  constructor(
    config: FlumeConfig,
    resolveInputControls: PortResolver,
    fireNodeFunction: NodeResolver
  ) {
    this.config = config;
    this.fireNodeFunction = fireNodeFunction;
    this.resolveInputControls = resolveInputControls;
    this.loops = 0;
    this.maxLoops = 1000;
  }
  private resetLoops = (maxLoops?: number) => {
    this.maxLoops = maxLoops !== undefined ? maxLoops : 1000;
    this.loops = 0;
  };
  private checkLoops = () => {
    if (this.maxLoops >= 0 && this.loops > this.maxLoops) {
      throw new LoopError(
        "Max loop count exceeded.",
        LoopError.maxLoopsExceeded
      );
    } else {
      this.loops++;
    }
  };
  private getRootNode = (nodes: NodeMap) => {
    const roots = Object.values(nodes).filter(n => n.root);
    if (roots.length > 1) {
      throw new Error(
        "The root engine must not be called with more than one root node."
      );
    }
    return roots[0];
  };
  private reduceRootInputs = (
    inputs: ConnectionMap,
    callback: (
      inputName: string,
      connection: Connection[]
    ) => { name: string; value: any }
  ) =>
    Object.entries(inputs).reduce((obj, [inputName, connections]) => {
      const input = callback(inputName, connections);
      obj[input.name] = input.value;
      return obj;
    }, {});
  private resolveInputValues = (
    node: FlumeNode,
    nodeType: NodeType,
    nodes: NodeMap,
    context: any
  ) => {
    let inputs = nodeType.inputs;
    if (typeof inputs === "function") {
      inputs = inputs(node.inputData, node.connections, context);
    }
    return inputs.reduce((obj, input) => {
      const inputConnections = node.connections.inputs[input.name] || [];
      if (inputConnections.length > 0) {
        obj[input.name] = this.getValueOfConnection(
          inputConnections[0],
          nodes,
          context
        );
      } else {
        obj[input.name] = this.resolveInputControls(
          input.type,
          node.inputData[input.name] || {},
          context
        );
      }
      return obj;
    }, {});
  };
  private getValueOfConnection = (
    connection: Connection,
    nodes: NodeMap,
    context: any
  ) => {
    this.checkLoops();
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
  public resolveRootNode(nodes: NodeMap, rawOptions?: RootEngineOptions) {
    const options = rawOptions ?? {};
    const rootNode = options.rootNodeId
      ? nodes[options.rootNodeId]
      : this.getRootNode(nodes);
    if (rootNode) {
      let inputs = this.config.nodeTypes[rootNode.type].inputs;
      if (typeof inputs === "function") {
        inputs = inputs(
          rootNode.inputData,
          rootNode.connections,
          options.context
        );
      }
      const controlValues = inputs.reduce((obj, input) => {
        obj[input.name] = this.resolveInputControls(
          input.type,
          rootNode.inputData[input.name] || {},
          options.context
        );
        return obj;
      }, {});
      const inputValues = this.reduceRootInputs(
        rootNode.connections.inputs,
        (inputName, connections) => {
          this.resetLoops(options.maxLoops);
          let value;
          try {
            value = this.getValueOfConnection(
              connections[0],
              nodes,
              options.context
            );
          } catch (e) {
            const err = e as LoopError;
            if (err.code === LoopError.maxLoopsExceeded) {
              console.error(
                `${err.message} Circular nodes detected in ${inputName} port.`
              );
            } else {
              console.error(e);
            }
          } finally {
            return {
              name: inputName,
              value
            };
          }
        }
      );
      if (options.onlyResolveConnected) {
        return inputValues;
      } else {
        return { ...controlValues, ...inputValues };
      }
    } else {
      console.error(
        "A root node was not found. The Root Engine requires that exactly one node be marked as the root node."
      );
      return {};
    }
  }
}
