import Container from "react-bootstrap/Container";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./freelanceEdit.css";

export default (CrowdFundEdit) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [freelanceForm, setFreelanceForm] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState({ message: "", status: "" });
  const [donations, setDonations] = useState([]);

  const sum = () => {
    let total = 0;
    donations.forEach((e) => {
      total += e.donation;
    });
    return total;
  };

  useEffect(() => {
    axios
      .get("/api/freelancer/comments/" + id)
      .then((resp) => {
        if (resp.data.status === "success") {
          setDonations(resp.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/freelancer/single/" + id)
      .then((resp) => {
        console.log(resp);
        setIsLoading(false);

        if (resp.data.status === "success") {
          setFreelanceForm(resp.data.message);
          console.log(freelanceForm);
        } else {
          navigate("/myFreelance");
        }
      })
      .catch(() => {
        setIsLoading(false);
        setMessages({ message: "Server side error", status: "danger" });
      });
  }, []);

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
    if (!handleValidation()) {
      setMessages({
        message: "Form was filled in incorrectly",
        status: "danger",
      });
      return false;
    }


    axios
      .put(`/api/freelancer/update/${id}`, freelanceForm)
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
        <h1>Update a Book</h1>
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

          <Button className="mt-2" type="submit" variant="primary">
            Update a book
          </Button>
        </form>
      </div>
    </Container>
  );
};