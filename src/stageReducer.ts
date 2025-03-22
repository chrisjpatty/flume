import { StageTranslate } from "./types";

export interface StageState {
  translate: StageTranslate;
  scale: number;
}

export enum StageActionType {
  SET_SCALE = "SET_SCALE",
  SET_TRANSLATE = "SET_TRANSLATE",
  SET_TRANSLATE_SCALE = "SET_TRANSLATE_SCALE"
}

export type StageAction =
  | {
    type: StageActionType.SET_SCALE;
    scale: number;
  }
  | {
    type: StageActionType.SET_TRANSLATE;
    translate: StageTranslate;
  }
  | {
    type: StageActionType.SET_TRANSLATE_SCALE;
    translate: StageTranslate;
    scale: number;
  };

export type StageActionSetter = StageAction | ((state: StageState) => StageAction);

const stageReducer = (state: StageState, incomingAction: StageActionSetter) => {
  let action =
    typeof incomingAction === "function"
      ? incomingAction(state)
      : incomingAction;

  switch (action.type) {
    case StageActionType.SET_SCALE:
      return { ...state, scale: action.scale };
    case StageActionType.SET_TRANSLATE:
      return { ...state, translate: action.translate };
    case StageActionType.SET_TRANSLATE_SCALE:
      return { ...state, translate: action.translate, scale: action.scale };
    default:
      return state;
  }
};

export default stageReducer;
