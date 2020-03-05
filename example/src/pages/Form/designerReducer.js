const designerReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SELECTED_FIELD_ID':
      const { fieldId } = action
      return {
        ...state,
        selectedFieldId: fieldId
      }
    default:
      return state;
  }
}

export default designerReducer
