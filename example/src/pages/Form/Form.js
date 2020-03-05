import React from "react";
import Sidebar from "./Sidebar";
import Body from "./Body";
import Attributes from "./Attributes";
import fieldsReducer from "./fieldsReducer";
import designerReducer from "./designerReducer";
import ls from "local-storage";
import "./Form.css";

export const FieldsContext = React.createContext();
export const FieldsDispatchContext = React.createContext();
export const DesignerStateContext = React.createContext();
export const DesignerDispatchContext = React.createContext();

const initialDesignerState = {
  selectedFieldId: null
};

export default () => {
  const [
    { fields, fieldsOrder },
    dispatchFields
  ] = React.useReducer(fieldsReducer, {
    fields: ls.get("FIELDS") || {},
    fieldsOrder: ls.get("FIELDS_ORDER") || []
  });
  const [designerState, dispatchDesignerState] = React.useReducer(
    designerReducer,
    initialDesignerState
  );

  const clearForm = () => {
    ls.remove("FIELDS");
    ls.remove("FIELDS_ORDER");
    dispatchFields({
      type: "CLEAR_FORM"
    });
  };

  const saveForm = () => {
    ls.set("FIELDS", fields);
    ls.set("FIELDS_ORDER", fieldsOrder);
  };

  return (
    <FieldsContext.Provider value={fields}>
      <FieldsDispatchContext.Provider value={dispatchFields}>
        <DesignerStateContext.Provider value={designerState}>
          <DesignerDispatchContext.Provider value={dispatchDesignerState}>
            <div className="form-wrapper">
              <Sidebar />
              <Body
                fields={fields}
                fieldsOrder={fieldsOrder}
                clearForm={clearForm}
                saveForm={saveForm}
              />
              <Attributes />
            </div>
          </DesignerDispatchContext.Provider>
        </DesignerStateContext.Provider>
      </FieldsDispatchContext.Provider>
    </FieldsContext.Provider>
  );
};
