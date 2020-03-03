import React from 'react'
import styles from './Connections'
import { createConnections } from '../../connectionCalculator'

const Connections = ({ nodes }) => {

  return (
    <div className={styles.svgWrapper} id="__node_editor_connections__"/>
  )
}

export default Connections
