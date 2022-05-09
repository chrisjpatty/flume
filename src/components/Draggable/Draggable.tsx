import React, { MutableRefObject, RefObject } from "react";
import { Coordinate, StageState } from "../../types";

interface DraggableProps {
  children: React.ReactNode;
  stageState: StageState;
  stageRect: RefObject<DOMRect>;
  onDragDelayStart: (event: React.MouseEvent | React.TouchEvent) => void;
  onDragStart: (event: React.MouseEvent | React.TouchEvent) => void;
  onDrag: (coordinates: Coordinate, event: MouseEvent) => void;
  onDragEnd: (event: MouseEvent, coordinate: Coordinate) => void;
  onMouseDown: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onTouchStart: (event: React.TouchEvent<HTMLDivElement>) => void;
  disabled?: boolean;
  delay?: number;
  innerRef?: MutableRefObject<HTMLDivElement | null>;
}

const Draggable = ({
  children,
  stageState,
  stageRect,
  onDragDelayStart,
  onDragStart,
  onDrag,
  onDragEnd,
  onMouseDown,
  onTouchStart,
  disabled,
  delay = 6,
  innerRef,
  ...rest
}: DraggableProps) => {
  const startCoordinates = React.useRef<Coordinate | null>(null);
  const offset = React.useRef<Coordinate>();
  const wrapper = React.useRef<HTMLDivElement | null>(null);

  const byScale = (value: number) => (1 / stageState.scale) * value;

  const getScaledCoordinates = (e: MouseEvent): Coordinate => {
    const offsetX = offset.current?.x ?? 0;
    const offsetY = offset.current?.y ?? 0;

    const x =
      byScale(
        e.clientX -
          (stageRect ? stageRect.current?.left ?? 0 : 0) -
          offsetX -
          (stageRect ? stageRect.current?.width ?? 0 : 0) / 2
      ) + byScale(stageState.translate.x);

    const y =
      byScale(
        e.clientY -
          (stageRect ? stageRect.current?.top ?? 0 : 0) -
          offsetY -
          (stageRect ? stageRect.current?.height ?? 0 : 0) / 2
      ) + byScale(stageState.translate.y);

    return { x, y };
  };

  const updateCoordinates = (e: MouseEvent) => {
    const coordinates = getScaledCoordinates(e);
    if (onDrag) {
      onDrag(coordinates, e);
    }
  };

  const stopDrag = (e: MouseEvent) => {
    const coordinates = getScaledCoordinates(e);
    if (onDragEnd) {
      onDragEnd(e, coordinates);
    }
    window.removeEventListener("mouseup", stopDrag);
    window.removeEventListener("mousemove", updateCoordinates);
  };

  const startDrag = e => {
    if (onDragStart) {
      onDragStart(e);
    }
    if (wrapper.current && startCoordinates.current) {
      const nodeRect = wrapper.current.getBoundingClientRect();
      offset.current = {
        x: startCoordinates.current.x - nodeRect.left,
        y: startCoordinates.current.y - nodeRect.top
      };
      window.addEventListener("mouseup", stopDrag);
      window.addEventListener("mousemove", updateCoordinates);
    }
  };

  const checkDragDelay = (e: MouseEvent | TouchEvent) => {
    if (startCoordinates.current) {
      let x: number, y: number;
      if ("ontouchstart" in window && (e as TouchEvent).touches) {
        const touch = (e as TouchEvent).touches[0];
        x = touch.clientX;
        y = touch.clientY;
      } else {
        const mouse = e as MouseEvent;
        e.preventDefault();
        x = mouse.clientX;
        y = mouse.clientY;
      }
      let a = Math.abs(startCoordinates.current.x - x);
      let b = Math.abs(startCoordinates.current.y - y);
      let distance = Math.round(Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)));
      let dragDistance = delay;
      if (distance >= dragDistance) {
        startDrag(e);
        endDragDelay();
      }
    }
  };

  const endDragDelay = () => {
    document.removeEventListener("mouseup", endDragDelay);
    document.removeEventListener("mousemove", checkDragDelay);
    startCoordinates.current = null;
  };

  const startDragDelay = (e: React.MouseEvent | React.TouchEvent) => {
    if (onDragDelayStart) {
      onDragDelayStart(e);
    }
    e.stopPropagation();
    let x;
    let y;
    if ("ontouchstart" in window && (e as React.TouchEvent).touches) {
      const touch = (e as React.TouchEvent).touches[0];
      x = touch.clientX;
      y = touch.clientY;
    } else {
      e.preventDefault();
      const mouse = e as React.MouseEvent;
      x = mouse.clientX;
      y = mouse.clientY;
    }
    startCoordinates.current = { x, y };
    document.addEventListener("mouseup", endDragDelay);
    document.addEventListener("mousemove", checkDragDelay);
  };

  return (
    <div
      onMouseDown={e => {
        if (!disabled) {
          startDragDelay(e);
        }
        if (onMouseDown) {
          onMouseDown(e);
        }
      }}
      onTouchStart={e => {
        if (!disabled) {
          startDragDelay(e);
        }
        if (onTouchStart) {
          onTouchStart(e);
        }
      }}
      onDragStart={e => {
        e.preventDefault();
        e.stopPropagation();
      }}
      ref={ref => {
        wrapper.current = ref;
        if (innerRef) {
          innerRef.current = ref;
        }
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Draggable;
