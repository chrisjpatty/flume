import React from 'react'

const usePrevious = (value: any) => {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  }, [ref.current]);
  return ref.current;
}

export default usePrevious
