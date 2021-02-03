import React, { Component } from 'react'
import {Modal,Button} from 'react-bootstrap'
import './Popup.css';
import axios from 'axios';
import history from './history'
import {connect} from 'react-redux';
class HomePageModal extends Component {
  addtocart=(type,id)=>{
    axios.post("http://127.0.0.1:8000/api/cart/add-to-cart/",{
        "type":type,
        "id":id},
{        headers:{
        'Content-Type':'application/json',
        'Authorization':`token ${localStorage.getItem('token')}`
    }}).then(()=>history.push('/checkout'))
}
addtobookmark=(type,id)=>{
  axios.post('http://127.0.0.1:8000/api/cart/add-to-bookmark/',{
      "type":type,
      "id":id
  },{
      headers:{
          'Content-Type':'application/json',
          'Authorization':`token ${localStorage.getItem('token')}`
      }
  })}
    render() {
   
        return (<div>
            <Modal
            {...this.props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <img src={this.props.data1.image} alt="book image" style={{width:'250px'}} className="ml-2"></img>
        <h3>{this.props.data1.name}</h3>
        <div style={{fontSize:'24px',color:'#20B038'}}>Rs. {this.props.data1.price}</div>
        <h4 className="text-center">Description</h4>
        <div>{this.props.data1.description}</div>
            </Modal.Body>
            <Modal.Footer>
              <button className="btn-la1" onClick={()=>{this.addtocart(this.props.data1.type,this.props.data1.id)}}>Add to Cart</button>
          
              <i className="far fa-heart round-border fa-2x" onClick={()=>{this.addtobookmark(this.props.data1.type,this.props.data1.id)}}></i>
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
export default connect(mapStateToProps)(HomePageModal)
