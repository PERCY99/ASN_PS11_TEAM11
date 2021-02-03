import React, { Component } from 'react'
import {Modal,Button} from 'react-bootstrap'
import './Popup.css';
import {Form} from 'react-bootstrap'
import axios from 'axios';
import history from './history'
import {connect} from 'react-redux';
import {reset_password} from './actions/auth'
class LoginModal extends Component {
         state={email:"",users:[],message:""}
         componentDidMount(){
          axios.get(`http://127.0.0.1:8000//api/core/users/`).then(res=>this.setState({users:res.data}))
      }
         onformSubmit=(event)=>{
            event.preventDefault();
            const testmap=this.state.users.filter(res=>res.email==this.state.email)
            if(testmap[0]!=undefined){
              this.props.reset_password(this.state.email)
            }
            else{
              this.setState({message:"Email is not registered with us. Please Sign up"})
            }
           }
    render() {
        return (<div>
            <Modal
            {...this.props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
            <Form onSubmit={this.onformSubmit}>
            <div className="close-btn" onClick={this.props.onHide}>X</div>
            <Form.Group controlId="formBasicEmail">
    <Form.Label>Enter Your Email</Form.Label>
    <Form.Control type="email" placeholder="Email" className="box-d" value={this.state.email}
    onChange={(e)=>{this.setState({email:e.target.value})}}
    />
    </Form.Group>
    <div style={{color:'green'}}>
      {this.props.message.detail}
    </div>
    <button type="submit" className="btn-test btn-test-m float-right" style={{width:'50%'}}>Reset Password</button>
    </Form>
            </Modal.Body>
            <Modal.Footer>
              <div style={{color:'red'}}>
              {this.state.message}
              </div>
            </Modal.Footer>
          </Modal>
          </div>
        )
    }
}
const mapStateToProps = (state) => {
  return {
      message:state.auth.message
  }
}
export default connect(mapStateToProps,{reset_password})(LoginModal);
