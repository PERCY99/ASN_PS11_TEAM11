import React from 'react'
import './Login.css';
import {Form,Button} from 'react-bootstrap'
import Header from './Header'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import * as actions from './actions/auth';
import LoginModal from './LoginModal';
import history from './history'
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
 class Login extends React.Component{
   state={username:"",password:"",isLoggedin:false,userID:"",name:"",email:"",picture:""}
   
   onformSubmit=(event)=>{
    event.preventDefault();
    this.props.onAuth(this.state.username,this.state.password);
   }
  fbResponse = (response) => {
    const tok=response.accessToken;
    
    this.props.onlogin(tok);
  }
    render() {
      // const responseGoogle = (response) => {
      //   const tok=response.accessToken;
        
      //   this.props.ongooglelogin(tok);
      // }      
      // let googlecontent;
      // googlecontent=(  <GoogleLogin
      //   render={renderProps => (
      //     <button className="login-with-google" onClick={renderProps.onClick} disabled={renderProps.disabled}>Login with Google</button>
      //   )}
      //   clientId="1059696678278-alrfk4hk0jvpu3hqcok9vjr7fnnbtf6r.apps.googleusercontent.com"
      //   buttonText="Login with Google"
      //   onSuccess={responseGoogle}
      //   onFailure={responseGoogle}
      //   style={{backgroundColor:'blue',width:'500px'}}
      //   cookiePolicy={'single_host_origin'}
      // />)
      
      // let fbcontent;
      // fbcontent=(<FacebookLogin
      //   appId= "1154739381563130"
      //   fields="name,email,picture"
      //   cssClass="my-facebook-button-class"
      //   callback={this.fbResponse}
      // />);
       let addModalClose =()=>this.setState({addModalShow:false})
        return (
            <div>
              {!this.props.loading?(<div>
              <LoginModal show={this.state.addModalShow} onHide={addModalClose} data1={this.state.res1}/>
                <Header/>
                <div className="container con">
                  <p className="tlarge text-center ">
                  Login
                  </p>
                  <div className="text-center tex f-mobile-10">
                    Don't have an account?
                    <Link to='/signup' className="join">Join Procto now</Link>
                  </div>
                <div className="row d-flex align-items-center justify-content-center ">
                  <div className="col-sm-6 mr-auto">              
                    <Form onSubmit={this.onformSubmit}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email / Username</Form.Label>
    <Form.Control type="text" placeholder="Email/Username" className="box-d" value={this.state.username}
    onChange={(e)=>{this.setState({username:e.target.value})}}
    />
 
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" value={this.state.password}
   className="box-d" onChange={(e)=>{this.setState({password:e.target.value})}}/>
      <Form.Text className="text-right" style={{width:'290px'}}>
      <Link onClick={()=>this.setState({addModalShow:true})}>forgot your Password?</Link>
    </Form.Text>
  </Form.Group>
  <div>
    {this.props.error==null?"":<p className="invalid-password">Invalid Username/Password</p>}
  </div>
  <Button variant="primary" type="submit">
    Login
  </Button>
</Form>
                </div>
                {/* <div className="col-sm-6">
           
              <button type="button " className="btn btn-primary bn bn-fb reduce-size-login"><i className="fab fa-facebook-square fa-2x f-mobile-10"><span className="f-mobile-10">{fbcontent}</span></i></button>
                <br></br>
              <button type="button" className="btn btn-primary bn bn-g reduce-size-login"><i className="fab fa-google fa-2x f-mobile-10"><span className="f-mobile-10">{googlecontent}</span></i></button>
                </div> */}
                </div>

                </div>
                </div>):(<div className="text-center">
  <div className="spinner-border" role="status">
    <span className="sr-only">Loading...</span>
  </div>
</div>)}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
  return {
      loading: state.auth.loading,
      error: state.auth.error
  }
}
const mapDispatchToProps = dispatch => {
  return {
      onAuth: (username, password) => dispatch(actions.authLogin(username, password)),
      onlogin:(token)=>dispatch(actions.authLoginwithfacebook(token)),
      ongooglelogin:(token)=>dispatch(actions.authLoginwithgoogle(token))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
