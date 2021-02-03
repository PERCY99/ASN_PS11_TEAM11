import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./actions/auth";
import "./SideNav.css";
import gmail from '../images/gmail.png'
import whatsapp from '../images/whatsapp.png';
import axios from "axios";
import telegram from '../images/telegram.png';
import {Button} from 'react-bootstrap';

import searchicon from '../../src/images/Search.png'
var name = "";
var initial = "";

class SideNav extends React.Component {
  state = { user: [], quizlist: [], completedquiz: [], scheduledquiz: [] ,rewards:[],upcomingquizzes:[]};
  componentDidMount() {
    axios
      .get(
        `http://127.0.0.1:8000/api/core/users/${localStorage.getItem(
          "userid"
        )}`
      )
      .then((res) => this.setState({ user: res.data }));
    axios
      .get("http://127.0.0.1:8000/api/quiz/quizzes")
      .then((res) => {this.setState({ quizlist: res.data })
      
    });
    axios
      .get("http://127.0.0.1:8000/api/core/user-subscriptions/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => this.setState({ completedquiz: res.data.tests }));
    axios
      .get("http://127.0.0.1:8000/api/core/personal-notification/", {
        headers: {
          Authorization: `token ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => this.setState({ scheduledquiz: res.data }));
      axios.get('http://127.0.0.1:8000/api/core/promo-code-view/').then((res)=>this.setState({rewards:res.data}))

  }
  rendername = () => {
    name = this.state.user.first_name;
    return (initial = name.charAt(0).toUpperCase());
  };
  render() {
    
    return (
      <div id="sidebar">
        <div className="view">
          <div
            className="toggle-btn"
            onClick={() => {
              document.getElementById("sidebar").classList.toggle("active");
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="showw">
            <ul>
              <li>
                <div className="position-relative sidenav-icon-1">
                  <Link
                    to="/"
                    className="no-hover"
                    onClick={() => {
                      document
                        .getElementById("sidebar")
                        .classList.toggle("active");
                    }}
                  >
                    <i className="fas fa-home fa-lg hide-xl"></i>
                    <i className="fas fa-home less-size"></i>
                  </Link>
                  <div className="position-absolute sidenav-icon-hover text-center">
                    Home
                  </div>{" "}
                </div>{" "}
              </li>
              <li>
                <div className="position-relative sidenav-icon-1">
                  <Link
                    to="/aboutus"
                    className="no-hover"
                    style={{ background: "black" }}
                  >
                    <i className="fas fa-user-tie fa-lg hide-xl"></i>
                    <i className="fas fa-user-tie less-size pl-1"></i>
                  </Link>
                  <div className="position-absolute sidenav-icon-hover text-center">
                    About Us
                  </div>
                </div>
              </li>
              <li>
                <div className="position-relative sidenav-icon-1">
                  <Link
                    to="/contact"
                    className="no-hover"
                    style={{ background: "blue" }}
                  >
                    <i className="far fa-comment fa-lg hide-xl"></i>
                    <i className="far fa-comment less-size pl-1"></i>
                  </Link>
                  <div className="position-absolute sidenav-icon-hover text-center">
                    Contact Us
                  </div>
                </div>
              </li>
              <li>
                <div className="position-relative sidenav-icon-1">
                  <Link
                    to="/terms"
                    className="no-hover"
                    style={{ background: "blue" }}
                  >
                    <i className="fas fa-file-signature fa-lg hide-xl"></i>
                    <i className="fas fa-file-signature less-size pl-1"></i>
                  </Link>
                  <div className="position-absolute sidenav-icon-hover text-center">
                    T&C's
                  </div>
                </div>
              </li>
              <li>
                <div className="position-relative sidenav-icon-1">
                  <Link
                    to="/join"
                    className="no-hover"
                    style={{ background: "blue" }}
                  >
                    <i className="far fa-handshake fa-lg hide-xl"></i>
                    <i
                      className="far fa-handshake less-size"
                      style={{ paddingLeft: "0.5px" }}
                    ></i>
                  </Link>
                  <div className="position-absolute sidenav-icon-hover text-center">
                    Join Our Team
                  </div>
                </div>
              </li>
              <li>
                <div className="position-relative sidenav-icon-1">
                  <Link
                    to="/blogs"
                    className="no-hover"
                    style={{ background: "blue" }}
                  >
                    <i className="fas fa-blog fa-lg hide-xl"></i>
                    <i className="fas fa-blog less-size pl-1"></i>
                  </Link>
                  <div className="position-absolute sidenav-icon-hover text-center">
                    Blogs
                  </div>
                </div>
              </li>
            </ul>
            <ul className="social-media-icons">
              <li>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=upscbasicfunda@gmail.com"
                  target="_blank"
                  className="no-hover"
                >
            <img src={gmail} className="more-size gmail-icon"></img>
                </a>
                <a href="mailto:upscbasicfunda@gmail.com" className="no-hover">
                <img src={gmail} className="less-size instagram-icon-1"></img>
                </a>
              </li>
              <li>
                <a
                  href="https://chat.whatsapp.com/GYjKTnbsArMGMpxKmcSAuL"
                  target="_blank"
                  className="no-hover"
                >
<img src={whatsapp} className="more-size whatsapp-icon"></img>
<img src={whatsapp} className="less-size instagram-icon-1"></img>
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/upscbasicfunda"
                  target="_blank"
                  className="no-hover"
                >
                  <img src={telegram} className="more-size instagram-icon"/>
                 <img src={telegram} className="less-size instagram-icon-1"></img>
                </a>
              </li>
              <li>
                <i className="fab fa-instagram fa-2x more-size d-none"></i>
                <i className="fab fa-instagram  less-size d-none"></i>
              </li>
              <li>
                <i className="fab fa-facebook fa-2x more-size d-none"></i>
                <i className="fab fa-facebook d-none less-size"></i>
              </li>
            </ul>
          </div>
        </div>
        <ul className="left-portion">
          <li>
            {localStorage.getItem("token") ? (
              <button
                className="big-round-username ml-5"
                onClick={() => {
                  document
                    .getElementById("popov")
                    .classList.toggle("popov-active");
                }}
              >
                {this.state.user.first_name != undefined
                  ? this.rendername()
                  : ""}
              </button>
            ) : (
              ""
            )}
          </li>
          <li>
            <i
              className="pointer-ico far fa-check-circle fa-2x h"
              onClick={() => {
                document
                  .getElementById("scheduled-test-series")
                  .classList.toggle("scheduled-test-series-active");
              }}
            ></i>
            <div className="aaaa">
              <div
                className="pointer-ico"
                onClick={() => {
                  document
                    .getElementById("scheduled-test-series")
                    .classList.toggle("scheduled-test-series-active");
                }}
              >
                Test Series
              </div>
              <div
                className="pointer-ico"
                onClick={() => {
                  document
                    .getElementById("scheduled-test-series")
                    .classList.toggle("scheduled-test-series-active");
                }}
                className="subcontent"
              >
                Check upcoming or scheduled test
              </div>
            </div>
          </li>
          <li>
            <i
              className="fas fa-share-alt fa-2x h pointer-ico"
              onClick={() => {
                document
                  .getElementById("share-buttons-link")
                  .classList.toggle("share-buttons-link-active");
              }}
            ></i>
            <div className="aaaa">
              <div
                className="pointer-ico"
                onClick={() => {
                  document
                    .getElementById("share-buttons-link")
                    .classList.toggle("share-buttons-link-active");
                }}
              >
                Share
              </div>
              <div
                onClick={() => {
                  document
                    .getElementById("share-buttons-link")
                    .classList.toggle("share-buttons-link-active");
                }}
                className="subcontent pointer-ico"
              >
                share our link and earn rewards
              </div>
            </div>
          </li>
          <li>
            <Link to="/material" className="no-hover">
              <i className="far fa-clipboard fa-2x h"></i>
            </Link>
            <div className="aaaa">
              <div>
                <Link to="/material" className="no-hover">
                  My Material
                </Link>
              </div>
              <div className="subcontent">Check Subscriptions</div>
            </div>
          </li>
          <li>
            <i className="fas fa-tag fa-2x h"></i>
            <div className="aaaa">
              <div    style={{cursor:'pointer'}} onClick={() => {
                  document
                    .getElementById("rewards")
                    .classList.toggle("rewards-active");
                }}>Rewards & Offers</div>
              <div className="subcontent">Redeem latest offers and coins</div>
            </div>
          </li>
          <li>
            <i className="fas fa-users fa-2x  h"></i>
            <div className="aaaa">
              <div>
                <Link to="/forum" className="no-hover">
                  Forum
                </Link>
              </div>
              <div className="subcontent">
                Discuss your problems with experts
              </div>
            </div>
          </li>
          <li>
            <i className="fas fa-cog fa-2x h"></i>
            <div className="aaaa">
              <div><Link className="no-hover" to="/faqs">Settings</Link></div>
              <div className="subcontent subcontent">
                Change settings,Search queries in FAQs
              </div>
            </div>
          </li>
          <li>
            <i className="fas fa-sign-out-alt fa-2x h"></i>
            <div className="aaaa">
              <div>
                {" "}
                <a onClick={this.props.logout} className="logou">
                  Log Out
                </a>
              </div>
              <div></div>
            </div>
          </li>
        </ul>
        <div id="popov">
          <div className="round-username-xl text-center mt-3">
            {this.state.user.first_name != undefined ? this.rendername() : ""}
          </div>
          <div className="text-center f-36-unbold">
            <b>
              {this.state.user.first_name != undefined
                ? this.state.user.first_name
                : ""}
            </b>
          </div>
          <div className="text-center" style={{fontSize:'18px'}}>
            {this.state.user.first_name != undefined
              ? this.state.user.email
              : ""}
          </div>
          <div className="text-center f-36-unbold">
            {this.state.user.first_name != undefined
              ? this.state.user.mobile
              : ""}
          </div>
          <div className="pt-3 d-flex justify-content-center">
            <button
              className="btn-test mt-3"
              onClick={() => {
                document
                  .getElementById("popov")
                  .classList.toggle("popov-active");
              }}
            >
              Close
            </button>
          </div>
        </div>
        <div id="scheduled-test-series">
          {localStorage.getItem("token") != null ? (
            <div>
              <p className="f-22">Test Series</p>
             {this.state.quizlist[0]!=undefined? <p className="f-18-p">Upcoming</p>:""}
              {this.state.quizlist.map((scheduledq) => {
              
                var now = new Date().getTime();
                var quizt=new Date(`${scheduledq.rollout_date}`).getTime();
                
               
                if(now<quizt)
                return (
                  <div className="d-flex justify-content-between align-items-center sub-cont mb-4">
                    <div style={{ fontSize: "16px" }}>
                      {scheduledq.name}
                    </div>
                    <div>
                      <p>
                        {scheduledq.rollout_date!= null ? (
                          <div>{scheduledq.rollout_date}</div>
                        ) : (
                          ""
                        )}
                      </p>
                        <p>Rs. {scheduledq.price}</p>
                    </div>
                  </div>
                );
              })}
            {this.state.completedquiz[0]!=undefined?<p className="f-18-p">Completed</p>:""}  
              {this.state.completedquiz.map(completedqui=>{
                  return  (<div>{completedqui.completed?<div className="d-flex justify-content-between align-items-center sub-cont-green mb-4">
                  <div style={{ fontSize: "16px" }}>{completedqui.name}</div>
                  <div>
                    <Link to={`/questionpaper/${completedqui.slug}`} className="no-hover">View</Link>
              <p>{`Rank : ${completedqui.rank}`}</p>
                  </div>
                </div>:""}

                  </div>) 
              })}
              <button
                className="btn-test mt-3 float-right mx-2"
                onClick={() => {
                  document
                    .getElementById("scheduled-test-series")
                    .classList.toggle("scheduled-test-series-active");
                }}
              >
                Close
              </button>
            </div>
          ) : (
            <div>
              <p className="f-22">Test Series</p>
              <p className="f-18-p">Test List</p>
              {this.state.quizlist[0]!=undefined? <p className="f-18-p">Upcoming</p>:""}
              {this.state.quizlist.map((scheduledq) => {
             
                var now = new Date().getTime();
                var quizt=new Date(`${scheduledq.rollout_date}`).getTime();
                
                
                if(now<quizt)
                return (
                  <div className="d-flex justify-content-between align-items-center sub-cont mb-4">
                    <div style={{ fontSize: "16px" }}>
                      {scheduledq.name}
                    </div>
                    <div>
                      <p>
                        {scheduledq.rollout_date!= null ? (
                          <div>{scheduledq.rollout_date}</div>
                        ) : (
                          ""
                        )}
                      </p>
                        <p>Rs. {scheduledq.price}</p>
                    </div>
                  </div>
                );
              })}
              <button
                className="btn-test mt-3 float-right mx-2"
                onClick={() => {
                  document
                    .getElementById("scheduled-test-series")
                    .classList.toggle("scheduled-test-series-active");
                }}
              >
                Close
              </button>
            </div>
          )}
        </div>
        <div id="share-buttons-link" className="d-flex align-items-center">
        <a className="no-hover" href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site http://www.upscbasicfunda.com.">
        <img src={gmail} className="more-size whatsapp-icon"></img>
          </a>
          <a
            className="no-hover"
            href="whatsapp://send?text=https://upscbasicfunda.com" target="blank"
          >
<img src={whatsapp} className=" whatsapp-icon"></img>
          </a>
          <a href="https://www.instagram.com/?url=https://upscbasicfunda.com/" target="_blank"  className="no-hover" rel="noopener"> 
          <i className="fab fa-instagram fa-2x no-hover" style={{color:' rgb(221, 42, 123)'}}></i>
          </a>

<a className="no-hover" href={`https://telegram.me/share/url?url=https://upscbasicfunda.com&text=Click on the link to get access to best education materials for free`} target="blank">          
          <i className="fab fa-telegram fa-2x" style={{ color: "#0088cc" }}></i>
          </a>
          <a href={`http://www.facebook.com/sharer.php?u=https://upscbasicfunda.com`} target="_blank">
          <i
            className="fab fa-facebook fa-2x"
            style={{ color: " #3b5998" }}
          ></i>
          </a>
        </div>
        <div id="rewards">
                <div className="text-center f-24"> Promo Codes</div>
                {this.state.rewards.map(reward=>{
                  return <div className="d-flex align-items-center justify-content-between sub-re-green mt-2 mb-4 mx-2">
                  <div className=" mx-2">{reward.description}</div>
                  <div><Button>{reward.code}</Button></div>
                  </div>
                })}
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};
export default connect(null, mapDispatchToProps)(SideNav);
