import React, { RefObject } from "react";
import { Colors } from "../../types";
import { CommentAction } from "../../commentsReducer";
interface CommentProps {
    dispatch: React.Dispatch<CommentAction>;
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    color: Colors;
    text: string;
    stageRect: RefObject<DOMRect | undefined>;
    onDragStart: () => void;
    isNew: boolean;
}
declare const _default: ({ dispatch, id, x, y, width, height, color, text, stageRect, onDragStart, isNew }: CommentProps) => JSX.Element;
export default _default;
