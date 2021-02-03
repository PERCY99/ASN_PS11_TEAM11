import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";

class XYZ extends Component {
  render() {
    return (
      <div>
        <Navbar bg="primary" variant="dark" expand="lg">
          <Navbar.Brand>Upsc Basic Funda</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link>
              <i className="fas fa-search fa-2x"></i>
            </Nav.Link>
            <Nav.Link>
              <i className="fas fa-search fa-2x"></i>
            </Nav.Link>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
export default XYZ;
