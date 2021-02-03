import React, { Component } from 'react'
import {Modal,Button} from 'react-bootstrap'
import './Popup.css';
import {Link} from 'react-router-dom'
class PopupThankyou extends Component {
    render() {
        return (<div>
            <Modal
            {...this.props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body> 
              <div style={{height:'20vh'}} className="d-flex flex-column justify-content-center align-items-center">
        <div className="f-18 d-flex align-items-center justify-content-center">Your Response has been stored.
        </div><div className="f-18 d-flex justify-content-center align-items-center">We will get back to you soon</div>
       <div className="close-btn" onClick={this.props.onHide}>X</div>
        </div>
            </Modal.Body>
            <Modal.Footer>
            <div className=" f-18" style={{color:'red'}}>Thankyou<br></br>
            Team Procto</div>
            </Modal.Footer>
          </Modal>
          </div>
        )
    }
}

export default PopupThankyou;
