import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../Form/Form";
import { statusOptions } from '../Form/wizardLogic/logicTypes'
import FloatingNavigation from '../../components/FloatingNavigation'
import "./Records.css";

const Records = () => {
  const [records, setRecords] = React.useState([]);

  React.useEffect(() => {
    axios.get(`${BASE_URL}/records`).then(res => {
      setRecords(res.data);
    });
  }, []);

  console.log(records);

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
          {records.map(record => (
            <RecordBlock
              title={record.title}
              status={record.status}
              fee={record.fee}
              key={record.id}
            />
          ))}
        </div>
      </div>
      <FloatingNavigation />
    </div>
  );
};

export default Records;

const RecordBlock = ({ title, status = "approved", fee = 0 }) => (
  <div className="record-block">
    <h2>{title}</h2>
    <div className="record-attributes">
      <Attribute label="Status" value={statusOptions.find(opt => opt.value === status).label} />
      <Attribute label="Fee" value={`$${parseFloat(fee).toFixed(2)}`} />
    </div>
  </div>
);

const Attribute = ({ label, value }) => (
  <div className="record-attribute-wrapper">
    <span>{label}</span>: <strong>{value}</strong>
  </div>
)
