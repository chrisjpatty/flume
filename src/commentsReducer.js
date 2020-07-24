const nanoid = require("nanoid");

const setComment = (comments, id, merge) => ({
  ...comments,
  [id]: {
    ...comments[id],
    ...merge
  }
});

export default (comments = {}, action) => {
  switch (action.type) {
    case "ADD_COMMENT": {
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
    case "REMOVE_COMMENT_NEW":
      const { isNew: toDelete, ...comment } = comments[action.id];
      return {
        ...comments,
        [action.id]: comment
      };
    case "SET_COMMENT_COORDINATES": {
      return setComment(comments, action.id, { x: action.x, y: action.y });
    }
    case "SET_COMMENT_DIMENSIONS": {
      return setComment(comments, action.id, {
        width: action.width,
        height: action.height
      });
    }
    case "SET_COMMENT_TEXT": {
      return setComment(comments, action.id, { text: action.text });
    }
    case "SET_COMMENT_COLOR": {
      return setComment(comments, action.id, { color: action.color });
    }
    case "DELETE_COMMENT": {
      const { [action.id]: toDelete, ...newComments } = comments;
      return newComments;
    }
    default:
      return comments;
  }
};
