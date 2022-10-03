import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import FlListBox from "../FlListBox/FlListBox";
import "./CfList.css";
import { Router } from "react-router-dom";

export default () => {
  const [crowdFund, setCrowdFund] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState({ message: "", status: "" });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios
      .get("/api/freelancer/approved")
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

  const ListActual = () => {
    return crowdFund.map((value, index) => {
      return (
        <FlListBox
          key={index}
          setMessages={setMessages}
          freelance={value}
          link="/freelancer/"
        />
      )
    });
  };

  const ListContainer = () => {
    return (
      <>
        <h1 className="h1first mt-3">List of available books</h1>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 pt-5">
          <ListActual />
        </div>
      </>
    );
  };

  const handleFilterChange = (e)=>{
    setFilter(e.target.value)
}

const handleFilter = () =>{
  setIsLoading(true)
  axios.get('/api/freelancer/filter/service/' + filter)
  .then(resp => {
      setIsLoading(false)

      if(resp.data.status === 'success')
          setCrowdFund(resp.data.message)
  })
  .catch(()=>{
      setIsLoading(false)
      // setMessages({message: 'Įvyko serverio klaida', status: 'danger'})
  })
}

  return (
    
      <Container>
        {isLoading ? 
          "Loading...." :(
            <>
        <div className="Filter row d-flex justify-content-center">
          <label>Filtravimas pagal pavadinima:</label>
          <input className="form-control col-3" type="text" value={filter} onChange={e=> handleFilterChange(e)} />
          <button className="btn mt-2 btn-info col-3" onClick={handleFilter}>Filtruoti</button>
        </div>
         
        <ListContainer />
            </>
        )
        }
      </Container>
  );
};
