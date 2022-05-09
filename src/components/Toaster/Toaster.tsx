import React from "react";
import { ToastAction, ToastActionTypes } from "../../toastsReducer";
import { Toast } from "../../types";
import styles from "./Toaster.css";

type ToasterProps = {
  toasts: Toast[];
  dispatchToasts: (action: ToastAction) => void;
};

export default ({ toasts = [], dispatchToasts }: ToasterProps) => {
  const setHeight = React.useCallback(
    (id: string, height: number) => {
      dispatchToasts({
        type: ToastActionTypes.SET_HEIGHT,
        id,
        height
      });
    },
    [dispatchToasts]
  );

  const startExit = React.useCallback(
    (id: string) => {
      dispatchToasts({
        type: ToastActionTypes.SET_EXITING,
        id
      });
    },
    [dispatchToasts]
  );

  const removeToast = React.useCallback(
    (id: string) => {
      dispatchToasts({
        type: ToastActionTypes.REMOVE_TOAST,
        id
      });
    },
    [dispatchToasts]
  );

  return (
    <div className={styles.toaster}>
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
    </div>
  );
};

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
  const wrapper = React.useRef<HTMLDivElement>(null);
  const timer = React.useRef<NodeJS.Timeout>();

  const stopTimer = React.useCallback(() => {
    setPaused(true);
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }, []);

  const resumeTimer = React.useCallback(() => {
    setPaused(false);
    timer.current = setTimeout(() => onExitRequested(id), duration);
  }, [id, duration, onExitRequested]);

  React.useLayoutEffect(() => {
    if (wrapper.current) {
      const { height } = wrapper.current.getBoundingClientRect();
      onHeightReceived(id, height);
    }
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
    <div
      data-flume-component="toast"
      ref={wrapper}
      className={styles.toast}
      data-type={type}
      style={{ transform: `translateY(-${y}px)` }}
      data-exiting={exiting}
      onAnimationEnd={handleAnimationEnd}
      onMouseEnter={stopTimer}
      onMouseLeave={resumeTimer}
      role="alert"
    >
      {title ? (
        <span data-flume-component="toast-title" className={styles.title}>
          {title}
        </span>
      ) : null}
      <p data-flume-component="toast-message">{message}</p>
      {!paused && (
        <div
          className={styles.timer}
          style={{ animationDuration: `${duration}ms` }}
          onAnimationEnd={e => e.stopPropagation()}
        />
      )}
      <button
        data-flume-component="toast-close"
        className={styles.exitButton}
        onClick={() => {
          stopTimer();
          onExitRequested(id);
        }}
      >
        ✕
      </button>
    </div>
  );
};
