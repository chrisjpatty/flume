import React from "react";
import styled from "@emotion/styled";

const Toaster = styled.div`
  position: absolute;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 15px;
  box-shadow: 0px 5px 10px -2px rgba(0, 0, 0, 0.3);
  pointer-events: none;
`;

export default ({ toasts = [], dispatchToasts }) => {
  const setHeight = React.useCallback(
    (id, height) => {
      dispatchToasts({
        type: "SET_HEIGHT",
        id,
        height
      });
    },
    [dispatchToasts]
  );

  const startExit = React.useCallback(
    id => {
      dispatchToasts({
        type: "SET_EXITING",
        id
      });
    },
    [dispatchToasts]
  );

  const removeToast = React.useCallback(
    id => {
      dispatchToasts({
        type: "REMOVE_TOAST",
        id
      });
    },
    [dispatchToasts]
  );

  return (
    <Toaster>
      {toasts.map((toast, i) => {
        return (
          <Toast
            {...toast}
            onHeightReceived={setHeight}
            onExitRequested={startExit}
            onRemoveRequested={removeToast}
            y={toasts.slice(0, i + 1).reduce((y, t) => t.height + y + 5, 0)}
            key={toast.id}
          />
        );
      })}
    </Toaster>
  );
};

const StyledToast = styled.div`
  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  position: absolute;
  left: calc(50% - 200px);
  top: 0px;
  pointer-events: all;
  width: 400px;
  padding: 10px;
  padding-top: 7px;
  padding-right: 16px;
  border-radius: 6px;
  background: rgba(231, 231, 231, 1);
  border: 1px solid;
  margin-bottom: 5px;
  transition: transform 300ms;
  flex: 0 0 auto;
  animation: fade-in 150ms;
  user-select: none;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  will-change: transform;
  &[data-type="danger"] {
    background: rgb(255, 116, 137);
    border-color: rgb(254, 99, 136);
    color: rgb(66, 6, 20);
  }
  &[data-type="info"] {
    background: rgb(76, 193, 250);
    border-color: rgb(103, 182, 255);
    color: rgb(5, 36, 64);
  }
  &[data-type="success"] {
    background: rgb(81, 230, 150);
    border-color: rgb(85, 227, 150);
    color: rgb(7, 57, 30);
  }
  &[data-type="warning"] {
    background: rgb(245, 208, 93);
    border-color: rgb(247, 235, 125);
    color: rgb(83, 75, 8);
  }
  &[data-exiting="true"] {
    animation: fade-out 150ms;
    animation-fill-mode: forwards;
  }

  p {
    margin: 0px;
  }
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Timer = styled.div`
  @keyframes timer {
    from {
      transform: scaleX(1);
    }
    to {
      transform: scaleX(0);
    }
  }

  position: absolute;
  bottom: -1px;
  left: -1px;
  width: calc(100% + 2px);
  height: 3px;
  background: rgba(0, 0, 0, 0.4);
  transform-origin: left center;
  animation: timer 1000ms linear;
  animation-fill-mode: forwards;
  z-index: 9;
`;

const ExitButton = styled.button`
  position: absolute;
  right: 0px;
  top: 0px;
  width: 20px;
  height: 20px;
  padding: 0px;
  background: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: inherit;
  opacity: 0.6;

  :hover {
    opacity: 0.9;
  }
`;

const Toast = ({
  id,
  title,
  message,
  duration,
  type,
  exiting,
  y,
  onHeightReceived,
  onExitRequested,
  onRemoveRequested
}) => {
  const [paused, setPaused] = React.useState(false);
  const wrapper = React.useRef();
  const timer = React.useRef();

  const stopTimer = React.useCallback(() => {
    setPaused(true);
    clearTimeout(timer.current);
  }, []);

  const resumeTimer = React.useCallback(() => {
    setPaused(false);
    timer.current = setTimeout(() => onExitRequested(id), duration);
  }, [id, duration, onExitRequested]);

  React.useLayoutEffect(() => {
    const { height } = wrapper.current.getBoundingClientRect();
    onHeightReceived(id, height);
  }, [onHeightReceived, id]);

  React.useEffect(() => {
    resumeTimer();
    return stopTimer;
  }, [resumeTimer, stopTimer]);

  const handleAnimationEnd = () => {
    if (exiting) {
      onRemoveRequested(id);
    }
  };

  return (
    <StyledToast
      ref={wrapper}
      data-type={type}
      style={{ transform: `translateY(-${y}px)` }}
      data-exiting={exiting}
      onAnimationEnd={handleAnimationEnd}
      onMouseEnter={stopTimer}
      onMouseLeave={resumeTimer}
      role="alert"
    >
      {title ? <Title>{title}</Title> : null}
      <p>{message}</p>
      {!paused && (
        <Timer
          style={{ animationDuration: `${duration}ms` }}
          onAnimationEnd={e => e.stopPropagation()}
        />
      )}
      <ExitButton
        onClick={() => {
          stopTimer();
          onExitRequested(id);
        }}
      >
        ✕
      </ExitButton>
    </StyledToast>
  );
};
