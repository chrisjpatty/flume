import React from "react";
import axios from "axios";
import FloatingNavigation from "../../components/FloatingNavigation";
import { BASE_URL } from "../Form/Form";
import orderBy from "lodash/orderBy";
import { Link } from "react-router-dom";
import "./Forms.css";

const placeholderDescription =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.";

const Forms = () => {
  const [forms, setForms] = React.useState([]);

  React.useEffect(() => {
    axios.get(`${BASE_URL}/forms`).then(res => {
      setForms(orderBy(res.data, "dateCreated"));
    });
  }, []);
  
  return (
    <div className="forms-page-wrapper">
      <div className="forms-wrapper">
        <header className="flex-row align-center">
          <h1>Forms</h1>
          <Link to="/form" className="new-form-button align-right">
            <div className="plus-icon" /> New Form
          </Link>
        </header>
        <div className="form-blocks">
          {forms.map(form => (
            <div key={form.id}>
              <FormBlock
                title={form.definition.title || "Untitled Form"}
                id={form.id}
                description={placeholderDescription}
              />
            </div>
          ))}
        </div>
      </div>
      <FloatingNavigation />
    </div>
  );
};

export default Forms;

const FormBlock = ({ title, description, id }) => {
  return (
    <div className="form-block">
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="flex-row">
        <div className="align-right form-block-controls">
          <Link to={`/form/${id}`} className="form-block-button">
            Edit
          </Link>
          <Link to={`/form/${id}?file="true"`} className="form-block-button">
            File
          </Link>
        </div>
      </div>
    </div>
  );
};
