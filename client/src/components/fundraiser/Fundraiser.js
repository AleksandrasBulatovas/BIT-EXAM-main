import React, { useState, useEffect } from "react";
import axios from "axios";
import "./freelance.css";
import Container from "react-bootstrap/Container";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import DonationForm from "../DonationForm/DonationForm";
import CommentBox from "../commentBox/CommentBox";

export default (props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [crowdFund, setCrowdFund] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState({ message: "", status: "" });

  useEffect(() => {
    axios
      .get("/api/freelancer/single/" + id)
      .then((resp) => {
        setIsLoading(false);
        if (resp.data.status === "success") {
          setCrowdFund(resp.data.message);
        } else {
          navigate("/freelancers");
        }
      })
      .catch(() => {
        setIsLoading(false);
        setMessages({ message: "Server side error", status: "danger" });
      });
      console.log(crowdFund)
  }, []);

  // useEffect(() => {
  //   axios
  //     .get("/api/crowdfunder/comments/" + id)
  //     .then((resp) => {
  //       if (resp.data.status === "success") {
  //         setComments(resp.data.message);
  //       }
  //     })
  //     .catch(() => {
  //       setMessages({ message: "Server side error", status: "danger" });
  //     });
  // }, [setComments]);

  const CommentList = () => {
    return comments.map((value, index) => {
      return <CommentBox key={index} comments={value} />;
    });
  };


  return (
    <Container>
      {messages.message && (
        <Alert variant={messages.status}>{messages.message}</Alert>
      )}
      {isLoading ? (
        "Loading...."
      ) : (
        <>
          <div className="crowfunder">
            <h1>{crowdFund.service}</h1>
            
            <div>
              <img className="FreelancePicture" src={"/uploads/" + crowdFund.fl_image} alt="goFundMe" />
            </div>
            <div>
              <h4 className="FreelancedText">Provider: {crowdFund.first_name} {crowdFund.last_name} </h4>
            </div>
            <div>
              <p className="FreelanceDescription">{crowdFund.description}</p>
            </div>
            <div>
              <p className="FreelancedText">City: {crowdFund.city}</p>
            </div>
          </div>
          {!props.loggedIn ? (
            <h3 className="LogInToComment"></h3>
          ) : (
            <DonationForm id={id} />
          )}
          <div className="comments">
            {/* <h2 className="ui dividing header"> Check comments/reviews!</h2> */}
            {comments.length == 0 ? (
              <h4 style={{ color: "blue", paddingBottom: "2rem" }}>
                
              </h4>
            ) : (
              <CommentList />
            )}
          </div>
        </>
      )}
    </Container>
  );
};
