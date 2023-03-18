export { NodeEditor } from "./NodeEditor";
export { FlumeConfig, Controls, Colors } from "./typeBuilders";
export { RootEngine } from "./RootEngine";
export const useRootEngine = (nodes, engine, context, options = {}) =>
  Object.keys(nodes).length
    ? engine.resolveRootNode(nodes, { ...options, context })
    : {};
export * from "./types";
