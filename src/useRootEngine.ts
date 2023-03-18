import { RootEngine } from "./RootEngine";
import { NodeMap, RootEngineOptions } from "./types";

export const useRootEngine = <T extends { [inputName: string]: any }>(
  nodes: NodeMap,
  engine: RootEngine,
  context: any,
  options: RootEngineOptions = {}
): T =>
  Object.keys(nodes).length
    ? engine.resolveRootNode<T>(nodes, { ...options, context })
    : ({} as T);
