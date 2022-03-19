import React from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Body from "./Body";
import FloatingNavigation from '../../components/FloatingNavigation'
import Attributes from "./Attributes";
import fieldsReducer from "./fieldsReducer";
import designerReducer from "./designerReducer";
import previewFieldsReducer from "./previewFieldsReducer";
import { useParams, useHistory, useLocation } from "react-router-dom";
import decodeQuery from 'decode-query-string'
import ls from "local-storage";
import "./Form.css";

export const FieldsContext = React.createContext();
export const FieldsDispatchContext = React.createContext();
export const DesignerStateContext = React.createContext();
export const DesignerDispatchContext = React.createContext();
export const PreviewFieldsContext = React.createContext();
export const PreviewFieldsDispatchContext = React.createContext();

export const BASE_URL = "http://localhost:8000";

export const previewState = {
  getFields: () => {}
};

export const designerStore = {
  getFields: () => {}
};

const initialDesignerState = {
  selectedFieldId: null,
  editingWizard: false,
  title: "",
  wizardId: 0,
  wizardLogic: {}
};

const Form = () => {
  const location = useLocation();
  const { formId } = useParams();
  const history = useHistory();
  const [{ fields, fieldsOrder }, dispatchFields] = React.useReducer(
    fieldsReducer,
    {
      fields: {},
      fieldsOrder: []
    }
  );
  const [designerState, dispatchDesignerState] = React.useReducer(
    designerReducer,
    initialDesignerState
  );
  const [{ previewFields }, dispatchPreviewFields] = React.useReducer(
    previewFieldsReducer,
    {
      previewFields: fields
    }
  );
  const [previewing, setPreviewing] = React.useState(false);
  const [isFiling, setIsFiling] = React.useState(false)
  const [wizardLoading, setWizardLoading] = React.useState(true)
  const { file: triggerFile } = React.useMemo(() => decodeQuery(location.search || "?"), [location])
  const clearForm = () => {
    ls.remove("FIELDS");
    ls.remove("FIELDS_ORDER");
    dispatchFields({
      type: "CLEAR_FORM"
    });
  };

  const saveForm = () => {
    if (formId) {
      axios.put(`${BASE_URL}/forms/${formId}`, {
        definition: {
          fields,
          fieldsOrder,
          title: designerState.title,
          logic: designerState.wizardLogic
        }
      });
    } else {
      axios
        .post(`${BASE_URL}/forms`, {
          definition: {
            fields,
            fieldsOrder,
            title: designerState.title,
            logic: designerState.wizardLogic
          }
        })
        .then(res => {
          history.replace(`/form/${res.data.id}`);
        });
    }
  };

  const togglePreview = () => {
    if (previewing) {
      setPreviewing(false);
    } else {
      dispatchPreviewFields({
        type: "POPULATE_FIELDS",
        fields
      });
      setPreviewing(true);
    }
  };

  const getPreviewFields = () => previewFields;
  previewState.getFields = getPreviewFields;

  const getFields = () => fields;
  designerStore.getFields = getFields;

  React.useEffect(() => {
    if (formId) {
      setIsFiling(!!triggerFile)
      axios.get(`${BASE_URL}/forms/${formId}`).then(res => {
        if (res.data) {
          dispatchFields({
            type: "POPULATE_FIELDS",
            ...res.data.definition
          });
          dispatchDesignerState({
            type: "POPULATE_STATE",
            title: res.data.definition.title,
            wizardId: res.data.id,
            wizardLogic: res.data.definition.logic
          })
          if(triggerFile){
            dispatchPreviewFields({
              type: "POPULATE_FIELDS",
              fields: res.data.definition.fields
            });
            setPreviewing(true)
          }
          setWizardLoading(false)
        }else{
          setWizardLoading(false)
        }
      });
    }else{
      setWizardLoading(false)
    }
  }, [formId, location, triggerFile]);

  return (
    <FieldsContext.Provider value={fields}>
      <FieldsDispatchContext.Provider value={dispatchFields}>
        <DesignerStateContext.Provider value={designerState}>
          <DesignerDispatchContext.Provider value={dispatchDesignerState}>
            <div className="form-wrapper">
              {
                !isFiling &&
                <Sidebar previewing={previewing} />
              }
              <PreviewFieldsContext.Provider value={previewFields}>
                <PreviewFieldsDispatchContext.Provider
                  value={dispatchPreviewFields}
                >
                  <Body
                    previewFields={previewFields}
                    fields={fields}
                    fieldsOrder={fieldsOrder}
                    clearForm={clearForm}
                    saveForm={saveForm}
                    previewing={previewing}
                    togglePreview={togglePreview}
                    editingWizard={designerState.editingWizard}
                    filing={isFiling}
                    wizardLoading={wizardLoading}
                  />
                </PreviewFieldsDispatchContext.Provider>
              </PreviewFieldsContext.Provider>
              {
                !isFiling &&
                <Attributes previewing={previewing} editingWizard={designerState.editingWizard} />
              }
              <FloatingNavigation />
            </div>
          </DesignerDispatchContext.Provider>
        </DesignerStateContext.Provider>
      </FieldsDispatchContext.Provider>
    </FieldsContext.Provider>
  );
};

export default Form;