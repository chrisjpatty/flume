import React, { HTMLProps } from "react";
import { Connections, InputData, NodeHeaderRenderCallback } from "../../types";
interface NodeProps {
    id: string;
    width: number;
    x: number;
    y: number;
    stageRect: React.MutableRefObject<DOMRect | undefined>;
    connections: Connections;
    type: string;
    inputData: InputData;
    onDragStart: () => void;
    renderNodeHeader?: NodeHeaderRenderCallback;
    root?: boolean;
}
declare const Node: ({ id, width, x, y, stageRect, connections, type, inputData, root, onDragStart, renderNodeHeader }: NodeProps) => JSX.Element;
export declare const NodeHeader: React.FC<HTMLProps<HTMLHeadingElement>>;
export default Node;
