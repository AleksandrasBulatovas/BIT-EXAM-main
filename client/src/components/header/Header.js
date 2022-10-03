import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import "./Header.css";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

export default (props) => {
  const navigate = useNavigate();

  const onLogout = () => {
    axios
      .get("/api/users/logout")
      .then(() => {
        props.handleLoginState(false);
        navigate("/");
      })
      .catch((e) => {
        console.log("Server is offline");
      });
  };

  return (
    <div className="header">
      <div className="ui menu">
        <div>
          <Link className="item" to="/">
            <img
              style={{ width: "50px", height: "50px" }}
              src="https://t3.ftcdn.net/jpg/03/19/15/80/360_F_319158029_4JKXm8ZJy7BaaciR3SB6ZuGxL1mVGPRA.jpg"
              alt="home logo"
            />
          </Link>
        </div>
        <Link className="item" to="/freelancers">
          List of available books
        </Link>
        <div className="right menu">
          {props.loggedIn === true && props.userRole === 0 && (
            <Link className="item" to="/myFreelance">
              My Books
            </Link>
          )}
          {props.loggedIn === true && props.userRole === 0 && (
            <Link className="item" to="/createFreelance">
              <strong>Add a Book</strong>
            </Link>
          )}

          {props.userRole === 1 && (
            <Link className="item" to="/admin">
              Admin panel
            </Link>
          )}

          <Dropdown>
            <Dropdown.Toggle variant="primary" size="lg mt-3" id="dropdown-basic">
              Settings
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <DropdownItem>
                {props.loggedIn === false && (
                  <Link className="item" to="/login">
                    Log-In
                  </Link>
                )}
              </DropdownItem>
              <DropdownItem>
                {props.loggedIn === false && (
                  <Link className="item" to="/registration">
                    Sign up
                  </Link>
                )}
              </DropdownItem>
              <Dropdown.ItemText>
                {props.email && (
                  <div className="item">
                    <b>Online: {props.email}</b>
                  </div>
                )}
              </Dropdown.ItemText>
              {props.loggedIn === true && (
                <DropdownItem
                  onClick={onLogout}
                  style={{ border: "none" }}
                  className="item"
                  to="/"
                >
                  <span>Logout</span>
                </DropdownItem>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
