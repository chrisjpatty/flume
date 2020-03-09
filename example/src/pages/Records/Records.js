import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../Form/Form'
import './Records.css'

export default () => {
  const [records, setRecords] = React.useState([])

  React.useEffect(() => {
    axios.get(`${BASE_URL}/records`)
      .then(res => {
        setRecords(res.data)
      })
  }, [])

  return (
    <div className="forms-page-wrapper">
      <div className="forms-wrapper">
        <header className="flex-row align-center">
          <h1>My Records</h1>
          <Link to="/forms" className="new-form-button align-right">
            <div className="plus-icon" /> New Record
          </Link>
        </header>
        <div className="record-blocks">
          {
            records.map(record => (
              <RecordBlock title={record.title} key={record.id} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

const RecordBlock = ({title}) => (
  <div className="record-block">
    <h2>{title}</h2>
  </div>
)
