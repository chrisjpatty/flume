import React from 'react'

const usePrevious = <T,>(value: T) => {
  const ref = React.useRef<T>();
  React.useEffect(() => {
    ref.current = value;
  }, [ref.current]);
  return ref.current;
}

export default usePrevious
