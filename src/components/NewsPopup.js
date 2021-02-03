import React, { Component } from 'react'
import {Modal,Button} from 'react-bootstrap'
import './Popup.css';
import axios from 'axios';
import history from './history'
import {connect} from 'react-redux';
class NewsPopup extends Component {
    render() {
        return (<div>
            <Modal
            {...this.props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
        <p className="f-24">{this.props.type}</p>
        <p style={{fontSize:'20px'}}>{this.props.data1.title}</p>
        <p className="f-29">{this.props.data1.date}</p>
        <div className="d-flex justify-content-center">
                          <img src={this.props.data1.image} alt="book image" style={{width:'250px'}}></img>
                          </div>
        <h4 className="text-center ">Description</h4>
        <div style={{fontSize:'18px'}}>{this.props.data1.description}</div>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </Modal>
          </div>
        )
    }
}
const mapStateToProps =state =>{
  return{
      token:state.auth.token
      }
}
export default connect(mapStateToProps)(NewsPopup)
