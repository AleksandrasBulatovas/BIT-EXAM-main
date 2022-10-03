import Container from "react-bootstrap/Container";
import React, { useState } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./createFreelance.css";

// const UserId = 3 //Statinsi userio ID kuri veliau keisime

export default (props) => {
  const UserId = props.UserId;
  const navigate = useNavigate();

  const [freelanceForm, setFreelanceForm] = useState({
    first_name: "",
    last_name:"",
    fl_image: "",
    service:"",
    description: "",
    city: "",
    UserId: UserId,
    Aproved: 0,
  });

  const [messages, setMessages] = useState({ message: "", status: "" });

  const handleInputChange = (e) => {
    setFreelanceForm({
      ...freelanceForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleValidation = () => {
    for (let index of Object.keys(freelanceForm)) {
      if (freelanceForm[index] === "") {
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(freelanceForm);
    if (!handleValidation()) {
      setMessages({
        message: "Form was filled in incorrectly",
        status: "danger",
      });
      return false;
    }

    // cfForm.UserId = UserId

    const form = new FormData();
    Object.entries(freelanceForm).map((data) => {
      form.append(data[0], data[1]);
    });

    axios
      .post("/api/freelancer/create", form)
      .then((resp) => {
        setMessages({ message: resp.data.message, status: resp.data.status });
        if (resp.data.status === "success") {
          setTimeout(() => {
            navigate("/myFreelance");
          }, 2000);
        }
      })
      .catch(() => {
        setMessages({ message: "Server error", status: "danger" });
      });
  };

  return (
    <Container>
      <div className="FreelanceCreate">
        {messages.message && (
          <Alert variant={messages.status}>{messages.message}</Alert>
        )}
        <h1>Add a Book</h1>
        <form className="ui form" onSubmit={handleSubmit}>
          <div className="field mb-2">
            <label className="form-label">First name</label>
            <input
              type="text"
              name="first_name"
              className="form-control"
              placeholder="Enter your first name"
              value={freelanceForm.first_name}
              onChange={handleInputChange}
              maxLength="50"
            />
          </div>
          <div className="field mb-2">
            <label className="form-label">Last name</label>
            <input
              type="text"
              name="last_name"
              className="form-control"
              placeholder="Enter your last name"
              value={freelanceForm.last_name}
              onChange={handleInputChange}
              maxLength="50"
            />
          </div>
          <div className="field mb-2">
            <label className="form-label">Name of a book</label>
            <input
              type="text"
              name="service"
              className="form-control"
              placeholder="Enter name of a book"
              value={freelanceForm.service}
              onChange={handleInputChange}
              maxLength="70"
            />
          </div>
          <div className="field mb-2">
            <label className="form-label">Book Cover</label>
            <input
              type="file"
              name="fl_image"
              className="form-control"
              placeholder="upload your image"
              onChange={(e) =>
                setFreelanceForm({
                  ...freelanceForm,
                  [e.target.name]: e.target.files[0],
                })
              }
            />
          </div>
          
          <div className="field mb-2">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="6"
              name="description"
              value={freelanceForm.description}
              onChange={handleInputChange}
              maxLength="450"
            ></textarea>
          </div>
          <div className="field mb-2">
            <label className="form-label">
              Origin of a book
            </label>
            <input
              type="text"
              name="city"
              className="form-control"
              placeholder="origin City/Country"
              value={freelanceForm.city}
              onChange={handleInputChange}
              maxLength="50"
            />
          </div>

          <Button type="submit" variant="primary">
            Add a book
          </Button>
        </form>
      </div>
    </Container>
  );
};
