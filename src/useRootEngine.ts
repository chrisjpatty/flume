import { RootEngine } from "./RootEngine";
import { NodeMap, RootEngineOptions } from "./types";
import React from "react";

export const useRootEngine = <T extends { [inputName: string]: any }>(
  nodes: NodeMap,
  engine: RootEngine,
  context?: any,
  options?: RootEngineOptions
): T => {
  const [resolvedValues, setResolvedValues] = React.useState<T>({} as T);

  React.useEffect(() => {
    if (Object.keys(nodes).length) {
      engine
        .resolveRootNode<T>(nodes, { ...options, context })
        .then(setResolvedValues);
    } else {
      setResolvedValues({} as T);
    }
  }, [nodes, engine, context, options]);

  return resolvedValues;
};
