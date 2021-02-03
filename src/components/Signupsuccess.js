import React, { Component } from "react";
import "./Signupsuccess.css";
import { Link } from "react-router-dom";
export default class Signupsuccess extends Component {
  render() {
    return (
      <div style={{ background: "black" }}>
        <div id="card" class="animated fadeIn">
          <div id="upper-side">
            <h3 id="status">Success</h3>
          </div>
          <div id="lower-side">
            <p id="message">
              Congratulations, your account has been successfully created.
            </p>
            <Link to="/" id="contBtn">
              Continue
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
