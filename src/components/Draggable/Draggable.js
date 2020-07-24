import React from "react";

export default ({
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
}) => {
  const startCoordinates = React.useRef(null);
  const offset = React.useRef();
  const wrapper = React.useRef();

  const byScale = value => (1 / stageState.scale) * value;

  const getScaledCoordinates = e => {
    const x =
      byScale(
        e.clientX -
          (stageRect ? stageRect.current.left : 0) -
          offset.current.x -
          (stageRect ? stageRect.current.width : 0) / 2
      ) + byScale(stageState.translate.x);
    const y =
      byScale(
        e.clientY -
          (stageRect ? stageRect.current.top : 0) -
          offset.current.y -
          (stageRect ? stageRect.current.height : 0) / 2
      ) + byScale(stageState.translate.y);
    return { x, y };
  };

  const updateCoordinates = e => {
    const coordinates = getScaledCoordinates(e);
    if (onDrag) {
      onDrag(coordinates, e);
    }
  };

  const stopDrag = e => {
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
    const nodeRect = wrapper.current.getBoundingClientRect();
    offset.current = {
      x: startCoordinates.current.x - nodeRect.left,
      y: startCoordinates.current.y - nodeRect.top
    };
    window.addEventListener("mouseup", stopDrag);
    window.addEventListener("mousemove", updateCoordinates);
  };

  const checkDragDelay = e => {
    let x;
    let y;
    if ("ontouchstart" in window && e.touches) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else {
      e.preventDefault();
      x = e.clientX;
      y = e.clientY;
    }
    let a = Math.abs(startCoordinates.current.x - x);
    let b = Math.abs(startCoordinates.current.y - y);
    let distance = Math.round(Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)));
    let dragDistance = delay;
    if (distance >= dragDistance) {
      startDrag(e);
      endDragDelay();
    }
  };

  const endDragDelay = () => {
    document.removeEventListener("mouseup", endDragDelay);
    document.removeEventListener("mousemove", checkDragDelay);
    startCoordinates.current = null;
  };

  const startDragDelay = e => {
    if (onDragDelayStart) {
      onDragDelayStart(e);
    }
    e.stopPropagation();
    let x;
    let y;
    if ("ontouchstart" in window && e.touches) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else {
      e.preventDefault();
      x = e.clientX;
      y = e.clientY;
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
