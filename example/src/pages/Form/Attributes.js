import React from "react";
import {
  DesignerStateContext,
  DesignerDispatchContext,
  FieldsContext,
  FieldsDispatchContext
} from "./Form";
import fieldTypes from "./fieldTypes";
import Checkbox from "../../components/Checkbox";
import OptionsEditor from "../../components/OptionsEditor";
import LogicEditor from "../../components/LogicEditor";
import NodeTypes from "./NodeTypes";
import { getInputTypes } from "./InputTypes";
import { NodeTypes as WizardNodeTypes, InputTypes as WizardInputTypes } from './wizardLogic/logicTypes'

const AttributesWrapper = ({ previewing, editingWizard }) => {
  const designerState = React.useContext(DesignerStateContext);
  const designerDispatch = React.useContext(DesignerDispatchContext);
  const fields = React.useContext(FieldsContext);
  const fieldsDispatch = React.useContext(FieldsDispatchContext);

  const currentField = fields[designerState.selectedFieldId];
  const currentFieldType = currentField ? fieldTypes[currentField.type] : {};

  const deleteField = () => {
    const fieldId = designerState.selectedFieldId

    designerDispatch({
      type: "SET_SELECTED_FIELD_ID",
      fieldId: null
    })

    fieldsDispatch({
      type: "REMOVE_FIELD",
      fieldId
    })
  }

  const setWizardTitle = title => {
    designerDispatch({
      type: "SET_TITLE",
      title
    })
  }

  const setWizardLogic = logic => {
    console.log(logic);
    designerDispatch({
      type: "SET_LOGIC",
      logic
    })
  }

  return (
    <div className="attributes">
      <div
        className="form-sidebar form-attributes"
        data-previewing={previewing}
      >
        <h2>Attributes</h2>
        {
          !editingWizard ?
          <React.Fragment>
            {currentField && currentFieldType ? (
              <Attributes
                attributes={currentFieldType.attributes}
                currentField={currentField}
              />
            ) : (
              <span>No field selected</span>
            )}
            {currentField && currentFieldType ? (
              <AttributeWrapper>
                <AttributeButton danger onClick={deleteField}>Delete Field</AttributeButton>
              </AttributeWrapper>
            ) : null}
          </React.Fragment>
          :
          <React.Fragment>
            <AttributeWrapper label="Form Title">
              <input
                type="text"
                value={designerState.title}
                onChange={e => setWizardTitle(e.target.value)}
              />
            </AttributeWrapper>
            <AttributeWrapper>
              <WizardLogic logic={designerState.wizardLogic} fields={fields} onChange={setWizardLogic} />
            </AttributeWrapper>
          </React.Fragment>
        }
      </div>
    </div>
  );
};

export default AttributesWrapper

const Attributes = ({ attributes = [], currentField }) => {
  return attributes.map(attr => (
    <Attribute
      {...attr}
      value={currentField[attr.name]}
      field={currentField}
      key={currentField.id + attr.name}
    />
  ));
};

const hiddenLabelTypes = ["checkbox", "options", "logic"];

const WizardLogic = ({logic, fields, onChange}) => {
  const [modalOpen, setModalOpen] = React.useState(false);

  const closeModal = () => setModalOpen(false);

  return (
    <React.Fragment>
      <AttributeButton onClick={() => setModalOpen(true)}>
        Edit Logic
      </AttributeButton>
      <LogicEditor
        nodes={logic}
        onChange={onChange}
        onCloseRequested={closeModal}
        isOpen={modalOpen}
        context={{fields}}
        nodeTypes={WizardNodeTypes}
        inputTypes={WizardInputTypes}
        defaultNodes={[
          {
            type: "output",
            x: 900,
            y: 330
          }
        ]}
      />
    </React.Fragment>
  )
}

const Attribute = ({ field, label, name, type, value }) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const fieldsDispatch = React.useContext(FieldsDispatchContext);
  const fields = React.useContext(FieldsContext);

  const setAttribute = value => {
    fieldsDispatch({
      type: "SET_ATTRIBUTE_VALUE",
      fieldId: field.id,
      name,
      value
    });
  };

  const closeModal = () => setModalOpen(false);

  const getAttributeField = () => {
    switch (type) {
      case "checkbox":
        return <Checkbox label={label} value={value} onChange={setAttribute} />;
      case "options":
        return (
          <React.Fragment>
            <AttributeButton onClick={() => setModalOpen(true)}>
              Edit Options
            </AttributeButton>
            <OptionsEditor
              options={value}
              onChange={setAttribute}
              isOpen={modalOpen}
              onCloseRequested={closeModal}
            />
          </React.Fragment>
        );
      case "logic":
        return (
          <React.Fragment>
            <AttributeButton onClick={() => setModalOpen(true)}>
              Edit Logic
            </AttributeButton>
            <LogicEditor
              nodes={value}
              onChange={setAttribute}
              onCloseRequested={closeModal}
              isOpen={modalOpen}
              nodeTypes={NodeTypes}
              inputTypes={getInputTypes(fields)}
            />
          </React.Fragment>
        );
      case "text":
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={e => setAttribute(e.target.value)}
          />
        );
    }
  };

  return (
    <AttributeWrapper label={label} hideLabel={hiddenLabelTypes.includes(type)}>
      {getAttributeField()}
    </AttributeWrapper>
  );
};

const AttributeWrapper = ({ label, children, hideLabel }) => (
  <div className="attribute-wrapper">
    {!hideLabel && label ? <label>{label}</label> : null}
    {children}
  </div>
);

const AttributeButton = ({ children, onClick, danger }) => (
  <button
    className={`attribute-button ${danger ? "danger" : ""}`}
    onClick={onClick}
  >
    {children}
  </button>
);
