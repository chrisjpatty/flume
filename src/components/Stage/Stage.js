import React from 'react'
import styles from  './Stage.css'

const Stage = ({children, stageRef}) => {
  const wrapper = React.useRef()

  React.useEffect(() => {
    stageRef.current = wrapper.current.getBoundingClientRect()
  }, [stageRef])

  return (
    <div id="__node_editor_stage__" className={styles.wrapper} ref={wrapper}>
      {children}
    </div>
  )
}

export default Stage
