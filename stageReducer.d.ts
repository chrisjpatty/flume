import { StageTranslate } from "./types";
export interface StageState {
    translate: StageTranslate;
    scale: number;
}
export declare enum StageActionType {
    SET_SCALE = "SET_SCALE",
    SET_TRANSLATE = "SET_TRANSLATE",
    SET_TRANSLATE_SCALE = "SET_TRANSLATE_SCALE"
}
export declare type StageAction = {
    type: StageActionType.SET_SCALE;
    scale: number;
} | {
    type: StageActionType.SET_TRANSLATE;
    translate: StageTranslate;
} | {
    type: StageActionType.SET_TRANSLATE_SCALE;
    translate: StageTranslate;
    scale: number;
};
export declare type StageActionSetter = StageAction | ((state: StageState) => StageAction);
declare const _default: (state: StageState, incomingAction: StageActionSetter) => StageState;
export default _default;
