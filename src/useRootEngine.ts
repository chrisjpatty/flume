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
    if (!Object.keys(nodes).length) {
      setResolvedValues({} as T);
      return;
    }

    const abortController = new AbortController();

    const resolveAsync = async () => {
      try {
        const result = await engine.resolveRootNode<T>(nodes, {
          ...options,
          context
        });

        if (!abortController.signal.aborted) {
          setResolvedValues(result);
        }
      } catch (error) {
        if (!abortController.signal.aborted) {
          console.error("Root engine resolution failed:", error);
        }
      }
    };

    resolveAsync();

    return () => {
      abortController.abort();
    };
  }, [nodes, engine, context, options]);

  return resolvedValues;
};
