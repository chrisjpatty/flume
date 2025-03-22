import React from "react";
import { CommentAction } from "../../commentsReducer";
import { StageTranslate } from "../../types";
import { StageActionSetter } from "../../stageReducer";
interface StageProps {
    scale: number;
    translate: StageTranslate;
    editorId: string;
    dispatchStageState: React.Dispatch<StageActionSetter>;
    children: React.ReactNode;
    outerStageChildren: React.ReactNode;
    numNodes: number;
    stageRef: React.MutableRefObject<DOMRect | undefined>;
    spaceToPan: boolean;
    dispatchComments: React.Dispatch<CommentAction>;
    disableComments: boolean;
    disablePan: boolean;
    disableZoom: boolean;
}
declare const Stage: ({ scale, translate, editorId, dispatchStageState, children, outerStageChildren, numNodes, stageRef, spaceToPan, dispatchComments, disableComments, disablePan, disableZoom }: StageProps) => JSX.Element;
export default Stage;
