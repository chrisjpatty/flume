const nanoid = require("nanoid");

const getAttributes = attributes =>
  attributes.reduce((obj, attr) => {
    obj[attr.name] = attr.defaultValue;
    return obj;
  }, {});

const fieldsReducer = (state, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default fieldsReducer;
