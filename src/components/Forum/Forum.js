import React, { Component } from 'react'
import './Forum.css';
import {Link} from 'react-router-dom'
import axios from 'axios';
import history from '../history';
import ForumPopup from './ForumPopup'
export default class Forum extends Component {
    state={res:[],sub:[],spinn:false,addModalShow:false,data:[]}
    componentDidMount(){
        axios.get('http://127.0.0.1:8000/api/core/sessions/').then(res=>{
            this.setState({res:res.data})
        })
        axios.get('http://127.0.0.1:8000/api/core/user-subscriptions/',{headers:{
            'Content-Type':'application/json',
            'Authorization':`token ${localStorage.getItem('token')}`
        }}).then(res=>this.setState({sub:res.data}))
        
    }
    renderpastsessions=(session)=>{
        return (<div className="mx-2"> 
            {!session.upcoming?(<div>
                <div>
            <img src={session.image} alt="session-image" style={{width:'160px',height:'100px'}}></img>
                      </div>
            <div className="f-18">{session.name}</div>
            <div className="f-18">{session.date}</div>
            {    this.showaddtocart(session.id)==false?(
            <div className="f-18" style={{color:'red'}} onClick={()=>{localStorage.getItem('token')?this.setState({addModalShow:true,data:session,showvideo:false}):(history.push('/login'))}}>Rs. {session.price}</div>):<div className="f-18" style={{color:'green'}} onClick={()=>this.setState({addModalShow:true,data:session})}>View</div>}
               {    this.showaddtocart(session.id)==false?(
            <div className="f-18" style={{color:'red'}} onClick={()=>{localStorage.getItem('token')?this.setState({addModalShow:true,data:session,showvideo:false}):(history.push('/login'))}}><button className="btn-test mb-2" onClick={()=>this.setState({addModalShow:true,data:session})} style={{padding:'0'}}>View</button></div>):""}
            
                </div>   
        ):""
        
        }</div>)
    }
    renderupcomingsessions=(session)=>{
        return (<div className="mx-1"> 
            {session.upcoming?(<div>
                <div>
            <img src={session.image} alt="session-image" style={{width:'160px',height:'100px'}}></img>
                      </div>
            <div className="f-18">{session.name}</div>
            <div className="f-18">{session.date}</div>
            {    this.showaddtocart(session.id)==false?(
            <div className="f-18" style={{color:'red'}} onClick={()=>{localStorage.getItem('token')?this.setState({addModalShow:true,data:session,showvideo:false}):(history.push('/login'))}}>Rs. {session.price}</div>):<div className="f-18" style={{color:'green'}}>View</div>}
            {    this.showaddtocart(session.id)==false?(
            <div className="f-18" style={{color:'red'}} onClick={()=>{localStorage.getItem('token')?this.setState({addModalShow:true,data:session,showvideo:false}):(history.push('/login'))}}><button className="btn-test mb-2" style={{padding:'0'}}>View</button></div>):""}
                </div>   
        ):""
        }</div>)
    }
    displayRazorpay=async (info)=>{
        this.setState({spinn:false})
        const res = await this.loadScipt('https://checkout.razorpay.com/v1/checkout.js')
        if(!res){
            alert ('razorpay sdk failed to load. are you online?')
            return
        }
       const options = {
           "key": 'rzp_test_d60JA5dzjyDyZ0', 
           "amount": "50000",
           "currency": "INR",
           "name": "UPSC BASIC FUNDA",
           "description": "Test Transaction",
           "image": "https://example.com/your_logo",
           "order_id":info.order_id.id,
           "handler": function (response){

               axios.post('http://127.0.0.1:8000/api/cart/confirm-payment/',{
                        "razorpay_order_id":response.razorpay_order_id,
                        "razorpay_payment_id":response.razorpay_payment_id,
                        "razorpay_signature":response.razorpay_signature
                    })
           },
           "prefill": {
               "name": "Gaurav Kumar",
               "email": "gaurav.kumar@example.com",
               "contact": "9999999999"
           },
           "notes": {
               "address": "Razorpay Corporate Office"
           },
           "theme": {
               "color": "#F37254"
           }
       };
       var rzp1 = new window.Razorpay(options);
       rzp1.open()
   }
   
   loadScipt=(src)=>{
       return new Promise(resolve=>{
       const script =document.createElement('script')
       script.src=src
       script.onload=()=>{
           resolve(true)
       }
       script.onerror=()=>{
           resolve(false)
       }
       document.body.appendChild(script)
   })
   }
    showaddtocart=(id)=>{
        if(this.state.sub.sessions==undefined){
            return false;
        }
        const testmap=this.state.sub.sessions.filter(sum=> sum.id==id)
        const conver=testmap.map(mas=> mas.id)
        if(conver==id){
            return false;
        }
        else{
            return false;
        }
    }
    buynow=(id,type)=>{
        axios.post("http://127.0.0.1:8000/api/cart/buy-now/",{
            "type":type,
            "id":id
        },{        headers:{
            'Content-Type':'application/json',
            'Authorization':`token ${localStorage.getItem('token')}`
        }}).then((res)=>this.displayRazorpay(res.data))
        this.setState({spinn:true})
       }
    render() {
        let addModalClose =()=>this.setState({addModalShow:false})
        return (
            <div >
                {!this.state.spinn?(<div>{this.state.res[0]!=undefined?(
                    <div>
                        <div className="b-g-purpose"></div>
                          <ForumPopup show={this.state.addModalShow} onHide={addModalClose} ses={this.state.data}/>
                    <div className=" d-flex manual-fl">
                        <div className="side-forum">
                            <div className="s-f-1">
                       <div className=" py-2 my-2 text-center highlight-color first-s" ><Link to='/forum' className="no-hover " style={{fontSize:'20px'}}>Sessions</Link></div>
                          <div className=" py-2 my-2 text-center first-ss" style={{fontSize:'20px'}}><Link to='/suggestions' className="no-hover">Suggestions/
                    Feedback</Link></div>
                        </div>
                        </div>
                        <div className="mx-3 pl-3">
                            <p className="f-29">Sessions</p>
                            <p className="f-24">Past events</p>
                            <div className="row">
                                {this.state.res.map(sessions=>{
                                    return this.renderpastsessions(sessions)
                                })}
                                </div>
                        <div className="pt-4 pb-2 f-24">Upcoming Sessions</div>
                        <div className="row">
                                {this.state.res.map(sessions=>{
                                    return this.renderupcomingsessions(sessions)
                                })}
                                </div>
                        </div>
                    </div>
                    </div>
      
                ):""}</div>):(<div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>)
                             } </div>
        )
    }
}
