import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./actions/auth";
import axios from "axios";
import { Form } from "react-bootstrap";
import "./Header.css";
import history from './history';
import image from '../../src/images/logo.jpeg'
import searchicon from '../../src/images/Search.png'
var name = "";
var initial = "";
class Header extends React.Component {
  state = {
    user: "",
    username: [],
    email: [],
    mobile: [],
    notifications: [],
    personalnotifications:[],
    search: [],
    searchdata:[]
  };
  componentDidMount() {
    axios
      .get(
        `http://127.0.0.1:8000/api/core/users/${localStorage.getItem(
          "userid"
        )}`
      )
      .then((res) =>
        this.setState({
          user: res.data,
          username: res.data.first_name,
          email: res.data.email,
          mobile: res.data.mobile,
        })
      );
    axios
      .get("http://127.0.0.1:8000/api/core/general-notification/")
      .then((res) => this.setState({ notifications: res.data }));
      axios
      .get("http://127.0.0.1:8000/api/core/personal-notification/",{
        headers:{
            'Authorization':`token ${localStorage.getItem('token')}`
        }
    })
      .then((res) => this.setState({ personalnotifications: res.data }));

  }
  rendername = () => {
    name = this.state.user.first_name;
    return (initial = name.charAt(0).toUpperCase());
  };
  onformSubmit = (event) => {
    event.preventDefault();
    axios
      .patch(
        `http://127.0.0.1:8000/api/core/users/${localStorage.getItem(
          "userid"
        )}/`,
        {
          email: this.state.email,
          first_name: this.state.username,
          mobile: this.state.mobile,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => this.componentDidMount());
  };
  logoutf = () => {
    document.getElementById("popove").classList.toggle("popove-active");
    this.props.logout();
  };

  searchfunction = () => {
    document.getElementById("search-bar").classList.toggle("search-bar-active");
   
  };
   searchifunction = (searchitem) => {
  
    axios.get(`http://127.0.0.1:8000/api/core/search?search=${searchitem}`).then(res=>this.setState({searchdata:res.data})
    )
    document.getElementById('search-results').classList.add('dum')
  };
  checkloginstatus=()=>{
    localStorage.getItem("token")!=null?alert('This a paid item , you need to purchase it to access , but preview file is available on corressponding section if you want to see click on corressponding tab and view it '):history.push('/login')
  }
  render() {

    return (
      <div className="Navbar">
        <div className="navbar-1">
          <div>
            <Link to="/">
      <img src={image} alt="book" className="logo-design"></img>
            </Link>
          </div>
          <ul className="nav-buttons">
            <li>
              <Link to="/" className="list ml-4 hide-icon">
                Home
              </Link>
            </li>
            {/* <li>
              <Link to="/aboutus" className="list hide-icon">
                About Us
              </Link>
            </li> */}
            {/* <li>
              <Link to="/contact" className="list hide-icon">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/terms" className="list hide-icon">
                T&Cs
              </Link>
            </li>
            <li>
              <Link to="/join" className="list hide-icon">
                Join our Team
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="list hide-icon">
                Blogs
              </Link>
            </li> */}
          </ul>
          <ul className="nav-2">
            <li className="mx-2 position-relative">
              <i
                className="fas fa-search fa-2x " style={{cursor:'pointer'}}
                onClick={() => {
                  document
                    .getElementById("search-bar")
                    .classList.toggle("search-bar-active");
                    document.getElementById('search-results').classList.add('dum')
                }}
              >
                <div id="search-bar" className="d-flex">
                  <i
                    className="fas fa-search fa-sm search-back-white positioon-relative web-exc-o"
                    onClick={() => this.searchfunction()}
                  >
                      <div id="search-results" className="position-absolute dum">
         {this.state.searchdata.pdfs!=undefined?this.state.searchdata.pdfs.map(pdf=>{
           return ( <div className="search-result-item my-3 mx-2">
           <a href={pdf.file} className="no-hover">
           {pdf.name}
           </a>
           </div>)
         }):""}
         {this.state.searchdata.summaries!=undefined?this.state.searchdata.summaries.map(pdf=>{
           return ( <div className="search-result-item my-3 mx-2">
             {pdf.file!=null?<div><a href={pdf.file} className="no-hover">{pdf.name}</a></div>:<div onClick={()=>this.checkloginstatus()}>
               {`${pdf.name}`}
               </div>}
           
           </div>)
         }):""}
         {this.state.searchdata.mcqs!=undefined?this.state.searchdata.mcqs.map(pdf=>{
           return ( <div className="search-result-item my-3 mx-2">
           {pdf.file!=null?<div><a href={pdf.file} className="no-hover">{pdf.name}</a></div>:<div onClick={()=>this.checkloginstatus()}>
               {pdf.name}
               </div>}
           
           </div>)
         }):""}
         {this.state.searchdata.sessions!=undefined?this.state.searchdata.sessions.map(pdf=>{
           return ( <div className="search-result-item my-3 mx-2">
           <a href={pdf.demo} className="no-hover">{pdf.name}</a>
           </div>)
         }):""}
         {this.state.searchdata.tests!=undefined?this.state.searchdata.tests.map(pdf=>{
           return ( <div className="search-result-item my-3 mx-2">
           <Link to="/Testseries" className="no-hover"> {pdf.name}</Link>
           </div>)
         }):""}
        
        </div>
                  </i>
                  <input
                    type="text"
                    className="remove-outline position-relative"
                   placeholder="Search.." style={{fontSize:'18px'}}
                    onChange={(e) => {
                        this.setState({ search: e.target.value })
                        this.searchifunction(e.target.value)
                    }}
                    onClick={() => {
                      document
                        .getElementById("search-bar")
                        .classList.toggle("search-bar-active");
                    }}
                  ></input>
                </div>
              </i>
            </li>
            <li
              className="mx-2"
              onClick={() => {
                document
                  .getElementById("notification-pannel")
                  .classList.toggle("notification-pannel-active");
              }}
            >
              {" "}
              <i className="far fa-bell fa-2x mx-2 position-relative icon-nav" style={{cursor:'pointer'}}>
                {" "}
                <div className="position absolute nav-bar-hov f-18 mx-2">
                  Notification
                </div>
              </i>
            </li>
            <li className="mx-2">
              <Link to="/checkout" className="no-hover web-exc">
                <i className="fas fa-shopping-cart fa-2x position-relative icon-nav">
                  <div className="position absolute nav-bar-hov f-18 mx-2">
                    Cart
                  </div>
                </i>
              </Link>
              {localStorage.getItem('token')?  <Link to="/checkout" className="no-hover">
                <i className="fas fa-shopping-cart fa-2x position-relative icon-nav mob-exc">
                  <div className="position absolute nav-bar-hov f-18 mx-2">
                    Cart
                  </div>
                </i>
              </Link>:""}
            </li>

            {localStorage.getItem("token") ? (
              <div>
                <li className="last-two-container mx-2">
                  <button
                    className="round-username mx-2"
                    onClick={() => {
                      document
                        .getElementById("popove")
                        .classList.toggle("popove-active");
                    }}
                  >
                    {this.state.user.first_name != undefined
                      ? this.rendername()
                      : ""}
                  </button>
                </li>
              </div>
            ) : (
              <Fragment>
                <li className="mx-2">
                  <button className="button ml-2 mr-1">
                    <Link to="/login" className="button mx-sm-2">
                      Login
                    </Link>
                  </button>
                </li>
                <li className="mx-2">
                  <button className="button">
                    <Link to="/signup" className="button">
                      Sign up
                    </Link>
                  </button>
                </li>
              </Fragment>
            )}
          </ul>
        </div>
        <div id="edit-details">
          <div className="round-username-xl text-center mt-3">
            {this.state.user.first_name != undefined ? this.rendername() : ""}
          </div>
          <Form onSubmit={this.onformSubmit}>
            <div className="d-flex justify-content-center mt-2">
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={this.state.username}
                  className="box-d mb-0"
                  style={{ width: "200px" }}
                  onChange={(e) => {
                    this.setState({ username: e.target.value });
                  }}
                />
              </Form.Group>
            </div>
            <div className="d-flex justify-content-center">
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={this.state.email}
                  className="box-d"
                  style={{ width: "200px" }}
                  onChange={(e) => {
                    this.setState({ email: e.target.value });
                  }}
                />
              </Form.Group>
            </div>
            <div className="d-flex justify-content-center">
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="number"
                  placeholder="Contact"
                  value={this.state.mobile}
                  className="box-d"
                  style={{ width: "200px" }}
                  onChange={(e) => {
                    this.setState({ mobile: e.target.value });
                  }}
                />
              </Form.Group>
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn-test"
                onClick={() => {
                  document
                    .getElementById("edit-details")
                    .classList.toggle("edit-details-active");
                }}
              >
                Update
              </button>
              <button
                className="btn-test"
                onClick={() => {
                  document
                    .getElementById("edit-details")
                    .classList.toggle("edit-details-active");
                }}
              >
                Cancel
              </button>
            </div>
          </Form>
        </div>
        <div id="popove">
          <div className="round-username-xl text-center mt-3">
            {this.state.user.first_name != undefined ? this.rendername() : ""}
          </div>
          <div className="text-center">
            <b>
              {this.state.user.first_name != undefined
                ? this.state.user.first_name
                : ""}
            </b>
          </div>
          <div className="text-center">
            {this.state.user.first_name != undefined
              ? this.state.user.email
              : ""}
          </div>
          <div className="text-center">
            {this.state.user.first_name != undefined
              ? this.state.user.mobile
              : ""}
          </div>
          <div className="pt-3">
            <button
              className="btn-test red-btn-t ml-2"
              onClick={() => {
                document
                  .getElementById("popove")
                  .classList.toggle("popove-active");
              }}
            >
              Cancel
            </button>
            <div className="float-right mx-2" onClick={() => this.logoutf()}>
              <i
                className="fas fa-sign-out-alt fa-lg"
                style={{
                  background: "#4FC3F7",
                  padding: "10px",
                  borderRadius: "200px",
                }}
              ></i>
            </div>
            <div
              className="float-right"
              onClick={() => {
                document
                  .getElementById("edit-details")
                  .classList.toggle("edit-details-active");
              }}
            >
              <i
                class="fas fa-pencil-alt fa-lg"
                style={{
                  background: "#4FC3F7",
                  padding: "10px",
                  borderRadius: "200px",
                }}
              ></i>
            </div>
          </div>
        </div>
        <div id="notification-pannel">
   
          {this.state.personalnotifications.map((notification) => {
            return (
              <div className="container gray-container ">
                <div className="row">
                  <div className="d-flex">
                    <div className="small-round-username-xl text-center mx-1">
                      U
                    </div>
                    <div>
            <div className="mx-3 mt-2 f-18">{notification.quizname}</div>
                      <div className="mx-3 blurred-text">
                        {notification.quizinfo!=undefined?(
                        <div>{`First Slot starts at ${notification.quizinfo.date} on ${notification.quizinfo.time}`}</div>):"Loading.."
          }
                      </div>
                    </div>
                  </div>
                </div>
                <div className="top-marg"></div>
                <div className="row d-flex justify-content-center">
                  <div>
                    <i class="fas fa-mouse-pointer"></i>
                    <Link to="/TestSeries" className="no-hover">
                      {" "}
                      View Now
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
                 {this.state.notifications.map((notification) => {
            return (
              <div className="container gray-container ">
                <div className="row">
                  <div className="d-flex">
                    <div className="small-round-username-xl text-center mx-1">
                      U
                    </div>
                    <div>
                      <div className="mx-3 mt-2 f-18">{notification.title}</div>
                      <div className="mx-3 blurred-text">
                        {notification.description}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="top-marg"></div>
                <div className="row d-flex justify-content-center">
                  <div>
                    <i class="fas fa-mouse-pointer"></i>
                    <a href={notification.link} className="no-hover">
                      {" "}
                      View Now
                    </a>
                  </div>
                </div>
              </div>
            );
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
export default connect(null, mapDispatchToProps)(Header);
