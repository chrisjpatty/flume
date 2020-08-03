import React from 'react'
import styles from './Connections.css'

const Connections = ({ nodes, connectionsId }) => {

  return (
    <div className={styles.svgWrapper} id={connectionsId}/>
  )
}

export default Connections
