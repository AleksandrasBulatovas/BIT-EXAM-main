import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export default () => {

  const [crowdFund, setCrowdFund] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("/api/freelancer/")
      .then((resp) => {
        setIsLoading(false);

        if (resp.data.status === "success") {
          setCrowdFund(resp.data.message);
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const approve = (id) => {
    axios.post(`/api/freelancer/approve/${id}`);
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  };

  const remove = (id) => {
    axios.delete(`/api/freelancer/delete/${id}`);
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }


  return (
    <Container>
      <h1>Approve or decline books</h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Books</th>
            <th scope="col">User Id</th>
            <th scope="col">Approved</th>
          </tr>
        </thead>
        <tbody>
          {crowdFund.map((item, idx) => (
            <tr>
              <th scope="row">{idx + 1}</th>
              <td>{item.service}</td>
              <td>{item.UserId}</td>
              <td>{item.Aproved}</td>
              <td>
                {!item.Aproved && (<button onClick={() => approve(item.id)} className="btn btn-primary btn-sm">Approve</button>)}
              </td>
              <td><button onClick={() => remove(item.id)} className="btn btn-primary btn-sm m-1">Decline</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};
