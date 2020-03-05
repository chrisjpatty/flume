const previewFieldsReducer = (state, action) => {

  switch (action.type) {

    case 'POPULATE_FIELDS': {
      const { fields } = action;

      return {
        ...state,
        previewFields: fields
      }
    }

    case 'SET_FIELD_VALUE': {
      const { fieldId, value } = action;
      return {
        ...state,
        previewFields: {
          ...state.previewFields,
          [fieldId]: {
            ...state.previewFields[fieldId],
            value
          }
        }
      }
    }

    default:
      return state
  }
}

export default previewFieldsReducer
