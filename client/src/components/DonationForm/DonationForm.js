import React, { useState } from "react";
import axios from "axios";
import "./DonationForm.css";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

export default (props) => {
  const [comment, setComment] = useState({
    name: "",
    comment: "",
    FreelancerId: props.id,
  });

  const [commentMessage, setCommentMessage] = useState({
    message: "",
    status: "",
  });

  const handleValidation = () => {
    for (let index of Object.keys(comment)) {
      if (comment[index] === "") {
        return false;
      }
    }
    return true;
  };

  const handleInputChange = (e) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!handleValidation()) {
      setCommentMessage({
        message: "Comment form was filled incorrectly",
        status: "danger",
      });
      return false;
    }

    axios
      .post("/api/comments/comment", comment)
      .then((resp) => {
        setCommentMessage({
          message: resp.data.message,
          status: resp.data.status,
        });
        if (resp.data.status === "success") {
          setCommentMessage({
            message: resp.data.message,
            status: resp.data.status,
          });
        }
      })
      .catch(() => {
        setCommentMessage({ message: "Server error", status: "danger" });
      });
  };

  return (
    <div className="donationForm">
      <h2>Leave a comment!</h2>
      {commentMessage.message && (
        <Alert variant={commentMessage.status}>
          {commentMessage.message}
        </Alert>
      )}
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Your name"
            value={comment.name}
            onChange={handleInputChange}
            maxLength="20"
          />
          <textarea
            name="comment"
            rows="3"
            className="form-control"
            placeholder="Comment (100 letters)"
            value={comment.comment}
            onChange={handleInputChange}
            maxLength="100"
          />
        </div>
        <Button type="submit" variant="primary">
          Leave a review/comment
        </Button>
      </form>
    </div>
  );
};
