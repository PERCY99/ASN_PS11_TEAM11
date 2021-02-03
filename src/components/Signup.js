import React from "react";
import { Form, Button } from "react-bootstrap";
import Header from "./Header";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./actions/auth";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import axios from "axios";
import WebcamCapture from './Webcam'
class Signup extends React.Component {
  state = {
    name: "",
    username: "",
    email: "",
    password1: "",
    password2: "",
    contact: "",
    image : "",
    message: "",
    users: [],
    phonemessage: "",
  };

  SetImage = (src) => {
    this.setState({image : src} )
    console.log( this.state.image);
  }
  componentDidMount() {
    axios
      .get(`http://127.0.0.1:8000/api/core/users/`)
      .then((res) => this.setState({ users: res.data }));
  }
  renderemail = () => {
    const testmap = this.state.users.filter(
      (res) => res.email == this.state.email
    );
    
    if (testmap[0] != undefined) {
      if(testmap[0].email!="")
      return true;
    }

  };
  renderusername = () => {
    const testmap = this.state.users.filter(
      (res) => res.username == this.state.username
    );
    if (testmap[0] != undefined) {
      return true;
    }
  };
  onformSubmit = (event) => {
    console.log('fired');
    event.preventDefault();
    if (this.state.contact.length !== 10) {
      this.setState({ phonemessage: "PhoneNumber Invalid" });
      return;
    }
    if (this.state.password1 !== this.state.password2) {
      this.setState({ message: "Both password should be same" });
    }

    if (this.state.image.length !== 0) {
      this.props.onAuth(
        this.state.name,
        this.state.username,
        this.state.email,
        this.state.password1,
        this.state.password2,
        this.state.contact,
        this.state.image
      );  
    }
    
  };
  fbResponse = (response) => {
    const tok = response.accessToken;
    this.props.onlogin(tok);
  };
  render() {
    console.log(this.state.contact.length);
    const responseGoogle = (response) => {
      console.log(response);
    };
    let googlecontent;
    googlecontent = (
      <GoogleLogin
        render={(renderProps) => (
          <button
            className="login-with-google"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            Login with Google
          </button>
        )}
        clientId="1059696678278-alrfk4hk0jvpu3hqcok9vjr7fnnbtf6r.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        style={{ backgroundColor: "blue", width: "500px" }}
        cookiePolicy={"single_host_origin"}
      />
    );

    let fbcontent;
    fbcontent = (
      <FacebookLogin
        appId="1154739381563130"
        fields="name,email,picture"
        cssClass="my-facebook-button-class"
        callback={this.fbResponse}
      />
    );
    let addModalClose = () => this.setState({ addModalShow: false });
    return (
      <div>
        {!this.props.loading ? (
          <div>
            <Header />
            <div className="container">
              <p className="tlarge text-center reduce-signup">SignUp</p>
              <p className="text-center tex f-mobile-10 reduce-margin-0">
                Already a user?
                <Link to="/login" className="join">
                  Login Now
                </Link>
              </p>
              <div className="row d-flex align-items-center justify-content-center ">
                <div className="col-6 mr-auto">
                  <Form
                    onSubmit={this.onformSubmit}
                    className="reduce-margin-1"
                  >
                    <Form.Group>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Name"
                        className="box-d"
                        required
                        onChange={(e) => {
                          this.setState({ name: e.target.value });
                        }}
                      />
                      <Form.Text className="text-muted"></Form.Text>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>User Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Username"
                        className="box-d"
                        required
                        value={this.state.username}
                        onChange={(e) => {
                          this.setState({ username: e.target.value });
                        }}
                      />
                      {this.renderusername() ? (
                        <div style={{ color: "red" }}>
                          UserName already Taken
                        </div>
                      ) : (
                        ""
                      )}
                      <Form.Text className="text-muted"></Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Email"
                        className="box-d"
                        required
                        value={this.state.email}
                        onChange={(e) => {
                          this.setState({ email: e.target.value });
                        }}
                      />
                      {this.renderemail() ? (
                        <div style={{ color: "red" }}>Email already Taken</div>
                      ) : (
                        ""
                      )}
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Type Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        className="box-d"
                        required
                        onChange={(e) => {
                          this.setState({ password1: e.target.value });
                        }}
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Re-Type Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        className="box-d"
                        required
                        onChange={(e) => {
                          this.setState({ password2: e.target.value });
                        }}
                      />
                      <div style={{ color: "red" }}>{this.state.message}</div>
                    </Form.Group>
                    <Form.Group controlId="formBasic">
                      <Form.Label>Contact No.</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Contact No."
                        className="box-d"
                        value={this.state.contact}
                        onChange={(e) => {
                          this.setState({ contact: e.target.value });
                        }}
                      />
                      <div style={{ color: "red" }}>
                        {this.state.phonemessage}
                      </div>
                    </Form.Group>

                    <Form.Group controlId="formBasic">
                      <Form.Label>Image</Form.Label>
                      
                      <WebcamCapture SetImage = {this.SetImage}/>
                    </Form.Group>

                    <div>
                      {this.props.error == null ? (
                        ""
                      ) : (
                        <p className="invalid-password">
                          Username/Email already in use
                        </p>
                      )}
                    </div>

                    <Button variant="primary" type="submit">
                      Signup
                    </Button>
                  </Form>
                </div>


                {/* <div className="col-sm-6">
                  <button
                    type="button"
                    className="btn btn-primary bn bn-fb reduce-size-login"
                  >
                    <i className="fab fa-facebook-square fa-2x f-mobile-10">
                      <span className="f-mobile-10">{fbcontent}</span>
                    </i>
                  </button>
                  <br></br>
                  <button
                    type="button"
                    className="btn btn-primary bn bn-g reduce-size-login"
                  >
                    <i className="fab fa-google fa-2x f-mobile-10">
                      {" "}
                      <span className="f-mobile-10">{googlecontent}</span>
                    </i>
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (name, username, email, password1, password2, contact , image) => {
      dispatch(
        actions.authSignup(name, username, email, password1, password2, contact , image)
      );
    },
    onlogin: (token) => dispatch(actions.authLoginwithfacebook(token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
