import React from 'react'
import { CONNECTIONS_ID } from '../../constants'
import styles from './Connections.css'

const Connections = ({ nodes, editorId }) => {

  return (
    <div className={styles.svgWrapper} id={`${CONNECTIONS_ID}${editorId}`}/>
  )
}

export default Connections
