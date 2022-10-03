import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import FlListBox from "../FlListBox/FlListBox";
import Alert from "react-bootstrap/Alert";
import "./MyFreelance.css";
import { Link } from "react-router-dom";

export default (props) => {
  const [freelance, setFreelance] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState({ message: "", status: "" });

  useEffect(() => {
    axios
      .get(`/api/freelancer/user/${props.UserId}`)
      .then((resp) => {
        console.log(resp);
        setIsLoading(false);

        if (resp.data.status === "success") {
          setFreelance(resp.data.message);
          console.log(resp.data.message);
        }

      })
      .catch(() => {
        setIsLoading(false);
        setMessages({ message: "Server error", status: "danger" });
      });
  }, []);

  const List = () => {
    if (freelance.length < 1) {
      return (
        <div>
          <h3 style={{ color: "red" }}>No books have been added</h3>
          <Link className="item ui button primary" to="/createFreelance">
            <strong>Click me to add One!</strong>
          </Link>
        </div>
      );
    } else {
      return freelance.map((value, index) => {
        return (
          <FlListBox
            key={index}
            setMessages={setMessages}
            freelance={value}
            link="/myFreelance/"
          />
        );
      });
    }
  };

  return (
    <Container>
      <h1 className="h1header">My Books</h1>
      {messages.message && (
        <Alert variant={messages.status}>{messages.message}</Alert>
      )}
      {isLoading ? (
        "Loading"
      ) : (
        <div className="row">
          <List />
        </div>
      )}
    </Container>
  );
};
