import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from 'axios';
import history from '../history'
export default class Suggestions extends Component {
  state = { message: "" ,experience:""};
  
  handlesubmit=()=>{
axios.post('http://127.0.0.1:8000/api/core/feedbacks/',{message:this.state.message,experience:this.state.experience, is_bug: false}).then((res)=>{
alert("Thanks for Your valuable response.")
history.push('/')

}).catch((res)=>alert(res.response.data.experience))
  }
  render() {
    return (
      <div>
        <div className="d-flex">
          <div className="side-forum-1">
            <div className="s-f">
              <div className="py-2 my-2 text-center ses">
                <Link
                  to="/forum"
                  style={{ fontSize: "20px" }}
                  className="no-hover"
                >
                  Sessions
                </Link>
              </div>
              <div
                className="py-2 my-2 text-center highlight-color-1 sugg"
                style={{ fontSize: "20px" }}
              >
                <Link to="/suggestions" className="no-hover highlight-color-1"   style={{ fontSize: "20px" }}>
                  Suggestions/ Feedback
                </Link>
              </div>
            </div>
          </div>
          <div className="sug">
            <div className="row d-flex flex-column mx-auto">
              <div>
                <div className="blue-bgs">
                  <div className="f-29 mx-2 px-2">Send us your Feedback</div>
                  <div className="mx-2 px-2">
                    Do you have any suggestions or found any bug ? Let us know
                    in the field below
                  </div>
                </div>
              </div>

              <div className="my-2 mx-2 px-2">How was your experience?</div>
              <div className="px-2">
                <i
                  className="far fa-smile fa-3x mx-2 emoji"
                  id="emoji-1"
                  onClick={() => {
                      this.setState({experience:"good"})
                    document.getElementById("emoji-1").style.color = "green";
                    document.getElementById("emoji-2").style.color = "black";
                    document.getElementById("emoji-3").style.color = "black";
                  }}
                ></i>
                <i
                  className="far fa-meh fa-3x mx-2 emoji"
                  id="emoji-2"
                  onClick={() => {
                    this.setState({experience:"ok"})
                    document.getElementById("emoji-2").style.color = "green";
                    document.getElementById("emoji-1").style.color = "black";
                    document.getElementById("emoji-3").style.color = "black";
                  }}
                ></i>
                <i
                  className="far fa-frown fa-3x mx-2 emoji"
                  id="emoji-3"
                  onClick={() => {
                    this.setState({experience:"bad"})
                    document.getElementById("emoji-3").style.color = "green";
                    document.getElementById("emoji-2").style.color = "black";
                    document.getElementById("emoji-1").style.color = "black";
                  }}
                ></i>
              </div>
              <div>
                <label className="mx-2 px-2 mt-2">
                  Describe your experience below
                </label>
                <div>
                  <textarea
                    rows="5"
                    className="form-control review-fo"
                    onChange={(event) => {
                      this.setState({ message: event.target.value });
                    }}
                  ></textarea>{" "}
                </div>
              </div>
              <div className="mx-auto">
                <Button className="my-2"  style={{ width: "180px" }} onClick={this.handlesubmit}>
                  Send Feedback
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
