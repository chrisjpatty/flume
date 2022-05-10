import { NodeTypeMap, StageState, PortTypeMap } from "./types";
import { NodesAction } from "./nodesReducer";
import React, { RefObject } from "react";
import FlumeCache from "./Cache";

export const NodeTypesContext = React.createContext<NodeTypeMap | null>(null);
export const PortTypesContext = React.createContext<PortTypeMap | null>(null);
export const NodeDispatchContext = React.createContext<React.Dispatch<
  NodesAction
> | null>(null);
export const ConnectionRecalculateContext = React.createContext<
  (() => void) | null
>(null);
export const ContextContext = React.createContext<any>(null);
export const StageContext = React.createContext<StageState | null>(null);
export const CacheContext = React.createContext<RefObject<FlumeCache> | null>(
  null
);
export const RecalculateStageRectContext = React.createContext<
  null | (() => void)
>(null);
export const EditorIdContext = React.createContext<string>("");
