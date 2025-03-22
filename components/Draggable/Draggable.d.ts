import React, { HTMLProps, MutableRefObject, RefObject } from "react";
import { Coordinate, StageState } from "../../types";
declare type DraggableProps = Omit<HTMLProps<HTMLDivElement>, "onDrag" | "onDragEnd" | "onDragStart"> & {
    stageState: StageState;
    stageRect?: RefObject<DOMRect | undefined>;
    onDragDelayStart?: (event: React.MouseEvent | React.TouchEvent) => void;
    onDragStart?: (event: MouseEvent | TouchEvent) => void;
    onDrag?: (coordinates: Coordinate, event: MouseEvent) => void;
    onDragEnd?: (event: MouseEvent, coordinate: Coordinate) => void;
    onMouseDown?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onTouchStart?: (event: React.TouchEvent<HTMLDivElement>) => void;
    disabled?: boolean;
    delay?: number;
    innerRef?: MutableRefObject<HTMLDivElement | null>;
    id?: string;
};
declare const Draggable: ({ children, stageState, stageRect, onDragDelayStart, onDragStart, onDrag, onDragEnd, onMouseDown, onTouchStart, disabled, delay, innerRef, ...rest }: DraggableProps) => JSX.Element;
export default Draggable;
