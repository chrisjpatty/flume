const designerReducer = (state, action) => {
  switch (action.type) {
    case 'POPULATE_STATE':
      return {
        ...state,
        wizardId: action.wizardId,
        wizardLogic: action.wizardLogic,
        title: action.title
      }

    case 'SET_SELECTED_FIELD_ID': {
      const { fieldId } = action
      return {
        ...state,
        selectedFieldId: fieldId,
        editingWizard: false
      }
    }

    case 'START_WIZARD_EDIT':
      return {
        ...state,
        selectedFieldId: null,
        editingWizard: true
      }

    case 'SET_TITLE':
      return {
        ...state,
        title: action.title
      }

    case 'SET_LOGIC':
      return {
        ...state,
        wizardLogic: action.logic
      }

    default:
      return state;
  }
}

export default designerReducer
