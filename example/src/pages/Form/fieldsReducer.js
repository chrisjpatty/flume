import { nanoid }from "nanoid/non-secure/index";

const getAttributes = attributes =>
  attributes.reduce((obj, attr) => {
    obj[attr.name] = attr.defaultValue;
    return obj;
  }, {});

const removeFieldByFieldId = (state, fieldId) => {
  const { [fieldId]: deletedField, ...fields } = state.fields;

  return {
    fields,
    fieldsOrder: state.fieldsOrder.filter(f => f !== fieldId)
  }
}

const fieldsReducer = (state, action) => {
  switch (action.type) {
    case "POPULATE_FIELDS": {
      const { fields, fieldsOrder } = action;
      return {...state, fields, fieldsOrder}
    }

    case "ADD_FIELD": {
      const { fieldType } = action;
      const id = nanoid(10);
      return {
        ...state,
        fields: {
          ...state.fields,
          [id]: {
            id,
            type: fieldType.type,
            value: fieldType.defaultValue,
            ...getAttributes(fieldType.attributes)
          }
        },
        fieldsOrder: [...state.fieldsOrder, id]
      };
    }

    case "REMOVE_FIELD": {
      const { fieldId } = action;
      return removeFieldByFieldId(state, fieldId)
    }

    case "SET_ATTRIBUTE_VALUE": {
      const { fieldId, name, value } = action;

      return {
        ...state,
        fields: {
          ...state.fields,
          [fieldId]: {
            ...state.fields[fieldId],
            [name]: value
          }
        }
      };
    }

    case "CLEAR_FORM": {
      return { fields: {}, fieldsOrder: [] }
    }

    default:
      return state;
  }
};

export default fieldsReducer;
