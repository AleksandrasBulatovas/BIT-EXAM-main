import React from "react";
import "./CommentBox.css";

export default (props) => {
  return (
    <div className="comment-box">
      <h5 className="commentAuthor">{props.comments.name}</h5>
      <div className="commentText">{props.comments.comment}</div>
    </div>
  );
};
