import { nanoid } from "nanoid/non-secure";
import { Colors, FlumeComment } from "./types";

type CommentMap = { [commentId: string]: FlumeComment };

export enum CommentActionTypes {
  ADD_COMMENT = "ADD_COMMENT",
  REMOVE_COMMENT_NEW = "REMOVE_COMMENT_NEW",
  SET_COMMENT_COORDINATES = "SET_COMMENT_COORDINATES",
  SET_COMMENT_DIMENSIONS = "SET_COMMENT_DIMENSIONS",
  SET_COMMENT_TEXT = "SET_COMMENT_TEXT",
  SET_COMMENT_COLOR = "SET_COMMENT_COLOR",
  DELETE_COMMENT = "DELETE_COMMENT"
}

export type CommentAction =
  | {
      type: CommentActionTypes.ADD_COMMENT;
      x: number;
      y: number;
    }
  | {
      type: CommentActionTypes.REMOVE_COMMENT_NEW;
      id: string;
    }
  | {
      type: CommentActionTypes.SET_COMMENT_COORDINATES;
      id: string;
      x: number;
      y: number;
    }
  | {
      type: CommentActionTypes.SET_COMMENT_DIMENSIONS;
      id: string;
      width: number;
      height: number;
    }
  | {
      type: CommentActionTypes.SET_COMMENT_TEXT;
      id: string;
      text: string;
    }
  | {
      type: CommentActionTypes.SET_COMMENT_COLOR;
      id: string;
      color: Colors;
    }
  | {
      type: CommentActionTypes.DELETE_COMMENT;
      id: string;
    };

const setComment = (
  comments: CommentMap,
  id: string,
  merge: Partial<FlumeComment>
): CommentMap => ({
  ...comments,
  [id]: {
    ...comments[id],
    ...merge
  }
});

export default (comments: CommentMap = {}, action) => {
  switch (action.type) {
    case CommentActionTypes.ADD_COMMENT: {
      const comment = {
        id: nanoid(10),
        text: "",
        x: action.x,
        y: action.y,
        width: 200,
        height: 30,
        color: "blue",
        isNew: true
      };
      return {
        ...comments,
        [comment.id]: comment
      };
    }
    case CommentActionTypes.REMOVE_COMMENT_NEW:
      const { isNew: toDelete, ...comment } = comments[action.id];
      return {
        ...comments,
        [action.id]: comment
      };
    case CommentActionTypes.SET_COMMENT_COORDINATES: {
      return setComment(comments, action.id, { x: action.x, y: action.y });
    }
    case CommentActionTypes.SET_COMMENT_DIMENSIONS: {
      return setComment(comments, action.id, {
        width: action.width,
        height: action.height
      });
    }
    case CommentActionTypes.SET_COMMENT_TEXT: {
      return setComment(comments, action.id, { text: action.text });
    }
    case CommentActionTypes.SET_COMMENT_COLOR: {
      return setComment(comments, action.id, { color: action.color });
    }
    case CommentActionTypes.DELETE_COMMENT: {
      const { [action.id]: toDelete, ...newComments } = comments;
      return newComments;
    }
    default:
      return comments;
  }
};
