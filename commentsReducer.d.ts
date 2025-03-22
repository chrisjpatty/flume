/// <reference types="react" />
import { Colors, FlumeComment } from "./types";
declare type CommentMap = {
    [commentId: string]: FlumeComment;
};
export declare enum CommentActionTypes {
    ADD_COMMENT = "ADD_COMMENT",
    REMOVE_COMMENT_NEW = "REMOVE_COMMENT_NEW",
    SET_COMMENT_COORDINATES = "SET_COMMENT_COORDINATES",
    SET_COMMENT_DIMENSIONS = "SET_COMMENT_DIMENSIONS",
    SET_COMMENT_TEXT = "SET_COMMENT_TEXT",
    SET_COMMENT_COLOR = "SET_COMMENT_COLOR",
    DELETE_COMMENT = "DELETE_COMMENT"
}
export declare type CommentAction = {
    type: CommentActionTypes.ADD_COMMENT;
    x: number;
    y: number;
} | {
    type: CommentActionTypes.REMOVE_COMMENT_NEW;
    id: string;
} | {
    type: CommentActionTypes.SET_COMMENT_COORDINATES;
    id: string;
    x: number;
    y: number;
} | {
    type: CommentActionTypes.SET_COMMENT_DIMENSIONS;
    id: string;
    width: number;
    height: number;
} | {
    type: CommentActionTypes.SET_COMMENT_TEXT;
    id: string;
    text: string;
} | {
    type: CommentActionTypes.SET_COMMENT_COLOR;
    id: string;
    color: Colors;
} | {
    type: CommentActionTypes.DELETE_COMMENT;
    id: string;
};
declare const commentsReducer: React.Reducer<CommentMap, CommentAction>;
export default commentsReducer;
