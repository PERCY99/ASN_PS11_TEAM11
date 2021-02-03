import React, { Component } from 'react'
import {Modal, ModalBody,Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import history from '../history'
export default class ForumPopup extends Component {
    state={showvideo:'',es:[],dummy:[],sub:[]}
    componentDidMount(){
   
        axios.get(`http://127.0.0.1:8000/api/core/sessions/${this.props.ses.id}`,{headers:{
            'Content-Type':'application/json',
            'Authorization':`token ${localStorage.getItem('token')}`
        }}).then(res=>{
            this.setState({es:res.data})
        })

        axios.get('http://127.0.0.1:8000/api/core/user-subscriptions/',{headers:{
            'Content-Type':'application/json',
            'Authorization':`token ${localStorage.getItem('token')}`
        }}).then(res=>this.setState({sub:res.data}))
    }
    addtocart=(id)=>{
      
        axios.post("http://127.0.0.1:8000/api/cart/add-to-cart/",{
            "type":"session",
            "id":id
        },{        headers:{
            'Content-Type':'application/json',
            'Authorization':`token ${localStorage.getItem('token')}`
        }}).then(()=>history.push('/checkout'))
        this.setState({spinn:true})
    }
    showaddtocart=(id)=>{
        if(this.state.sub.sessions==undefined){
            return false;
        }
        const testmap=this.state.sub.sessions.filter(sum=> sum.id==id)
        const conver=testmap.map(mas=> mas.id)
        if(conver==id){
            return true;
        }
        else{
            return false;
        }
    }
    render() {
       
        return (
            <Modal
            {...this.props}
        
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
               <Modal.Header closeButton  onClick={()=>this.setState({showvideo:''})}>
        <Modal.Title >{this.props.ses.name}</Modal.Title>  </Modal.Header>    
               <ModalBody>
                  {this.state.showvideo===''?<div>Torem Ipsum isas been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently wi</div>:
                  <div>{this.state.showvideo==='demo'?<div>
                     <video className="video-prop" controls>
  <source src={this.props.ses.demo} type="video/mp4" />
  <source src={this.props.ses.demo} type="video/ogg" />
</video> </div>:
<div>      
     <video className="video-prop" controls>
  <source src={this.state.es.video} type="video/mp4" />
  <source src={this.state.es.video} type="video/ogg" />
</video></div>
                  }</div>
} 


                   </ModalBody>
                   <Modal.Footer     onMouseEnter={()=>this.componentDidMount()}>
                       <div>
                       <Button variant="secondary" className="mx-2" onClick={()=>this.setState({showvideo:'demo'})}>Watch Demo</Button>
                       {    this.showaddtocart(this.props.ses.id)==false?( <Button variant="primary " className="mx-2" onClick={()=>this.addtocart(this.props.ses.id)} >Buy Now</Button>): <Button variant="primary " className="mx-2" onClick={()=>this.setState({showvideo:'video'})}>View</Button>}
                       </div>
                       </Modal.Footer>
                   </Modal>
        )
    }
}
