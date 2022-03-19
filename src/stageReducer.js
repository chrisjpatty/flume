export default (state, incomingAction) => {
  let action = typeof incomingAction === 'function' ? incomingAction(state) : incomingAction;
  switch (action.type) {
    case 'SET_SCALE':
      return { ...state, scale: action.scale }
    case 'SET_TRANSLATE':
      return { ...state, translate: action.translate }
    case 'SET_TRANSLATE_SCALE':
      return { ...state, translate: action.translate, scale: action.scale }
    default:
      return state;
  }
}
