import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./FlListBox.css";

export default (props) => {
  const date = new Date(props.freelance.createdAt);
  const description = props.freelance.description;

  const [donations, setDonations] = useState([]);

  useEffect(() => {
    axios
      .get("/api/freelancer/comments/" + props.freelance.id)
      .then((resp) => {
        if (resp.data.status === "success") {
          setDonations(resp.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const sum = () => {
    let total = 0;
    donations.forEach((e) => {
      total += e.donation;
    });
    return total;
  };

  const descriptionhandler = () => {
    if (description.length >= 120) {
      return description.slice(0, 120) + "...";
    } else {
      return description;
    }
  };

  return (
    <div className="col-sm-4 col-md-offset-1">
      <div className="card shadow-sm">
        <Link style={{textDecoration:'none'}} to={`${props.link}` + props.freelance.id}>
          <div className="card-body">
            <h3>{props.freelance.service}</h3>
            <div className="imageDiv">
              <img
                className="cf_image"
                src={"/uploads/" + props.freelance.fl_image}
                alt="image"
              />
            </div>
            <div className=" justify-content-between align-items-center">
              <h5 className="card-text">Provided by: {props.freelance.first_name} {props.freelance.last_name}</h5>
              <p className="description">{descriptionhandler()}</p>
              <p className="city">{props.freelance.city}</p>
              <div className="btn-group">
                <small className="text-muted">
                  Created: {date.toLocaleDateString("lt-LT")}
                </small>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
