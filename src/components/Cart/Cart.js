import React, { Component } from 'react'
import './cart.css'
import axios from 'axios';
import {connect} from 'react-redux';
import Header from '../Header'
import {Link} from 'react-router-dom'
import history from '../history';
import image from '../../images/home\ \(2\).png';
import SideNav from '../SideNav';
import {Button} from 'react-bootstrap';
class Cart extends Component {
    state={items:[],user:[],err:'',validate:'false',message:"",promocode:"",showtotal:""}
    componentDidMount(){
        axios.get(`http://127.0.0.1:8000/api/core/users/${localStorage.getItem('userid')}`).then(res=>this.setState({user:res.data}))
        axios.get('http://127.0.0.1:8000/api/cart/cart',{
            headers:{
                'Authorization':`token ${localStorage.getItem('token')}`
            }
        }).then(res=>{this.setState({items:res.data})}).catch(err=>this.setState({err:err.message}))
    }
    buynow=(id,type)=>{
        axios.post("http://127.0.0.1:8000/api/cart/buy-now/",{
            "type":type,
            "id":id
        },{        headers:{
            'Content-Type':'application/json',
            'Authorization':`token ${localStorage.getItem('token')}`
        }}).then((res)=>this.displayRazorpa(res.data))
    }
    displayRazorpay=async ()=>{
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
            "image": image,
            "order_id":this.state.items.order_id.id,
            "handler": function (response){
                    axios.post('http://127.0.0.1:8000/api/cart/confirm-payment/',{
                        "razorpay_order_id":response.razorpay_order_id,
                        "razorpay_payment_id":response.razorpay_payment_id,
                        "razorpay_signature":response.razorpay_signature
                    }).then(()=>history.push(`/successful/${response.razorpay_order_id}`)).catch((err)=>{
                        history.push('/')
                        alert("Transaction was unsuccessful, if any deductions has been done it will be refunded in 5-10 days")})

            },
            "prefill": {
                "name": this.state.user.username,
                "email": this.state.user.email,
                "contact": this.state.user.mobile
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#883FF6"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open()
    }
    
    displayRazorpa=async (info)=>{
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
            "image": image,
            "order_id":info.order_id.id,
            "handler": function (response){
                    axios.post('http://54.202.69.72/api/cart/confirm-payment/',{
                        "razorpay_order_id":response.razorpay_order_id,
                        "razorpay_payment_id":response.razorpay_payment_id,
                        "razorpay_signature":response.razorpay_signature
                    }).then(()=>history.push(`/successful/${response.razorpay_order_id}`)).catch((err)=>alert(err.message))

            },
            "prefill": {
                "name": this.state.user.username, //change to name after deployment of first_name in backend
                "email": this.state.user.email,
                "contact": this.state.user.mobile
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#883FF6"
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
    displaysummary=()=>{
        if(this.state.items.summaries!==undefined){
       return this.state.items.summaries.map((res)=>{
            return this.rendersummaries(res)
         })
        }
        else{
            return null;
        }
}
    displaysessions=()=>{
        if(this.state.items.sessions!==undefined){
       return this.state.items.sessions.map((res)=>{
            return this.rendersessions(res)
         })
        }
        else{
            return null;
        }
}
    displaymcqs=()=>{
        if(this.state.items.mcqs!=undefined){
            return this.state.items.mcqs.map((res)=>{
                return this.rendermcq(res)
             })
        }
        else{
            return null;
        }
}
    displaytest=()=>{
        if(this.state.items.tests!=undefined){
            return this.state.items.tests.map((res)=>{
                return this.rendertest(res)
             })
        }
        else{
            return null;
        }
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
    }).then(()=>{axios.post("http://127.0.0.1:8000/api/cart/remove-from-cart/",{
        "type":type,
        "id":id
    },{        headers:{
        'Content-Type':'application/json',
        'Authorization':`token ${localStorage.getItem('token')}`
    }})}).then(()=>this.componentDidMount())
}
removefromcart=(type,id)=>{
    axios.post("http://127.0.0.1:8000/api/cart/remove-from-cart/",{
        "type":type,
        "id":id
    },{        headers:{
        'Content-Type':'application/json',
        'Authorization':`token ${localStorage.getItem('token')}`
    }}).then(()=>this.componentDidMount())
}
    rendersummaries=(res)=>{
        return <div className="col-md-2 col-sm-4 mb-3">
            <div className="mob-cart">
        <div>
            <img  src={res.image} alt="book image" style={{width:'100px',height:'100px'}}></img>
        </div>
        <div className="font-mob">
        <div className="px-2"><b>{res.name}</b></div>
    <div className="px-2" style={{color:'green'}}>{res.sub_category.name}</div>
    <div className="px-2" style={{color:'red'}}> Rs .{res.price}</div>
    </div>
    </div>
        <button className="btn-test btn-test-m" style={{width:'100%'}} onClick={()=>this.buynow(res.id,res.type)}>Buy Now</button>
        <div className="d-flex justify-content-center">
        <i className="far fa-trash-alt fa-2x px-2 pt-2" onClick={()=>this.removefromcart('summary',res.id)}>
            <div className="delete-hover mt-1">Delete</div>
        </i>
        <i className="far fa-bookmark px-2 fa-2x pt-2" onClick={()=>this.addtobookmark('summary',res.id)}>
        <div className="add-to-wish-hover mt-1">Add to Wishlist</div>
            </i></div>
        </div>
    }
    rendermcq=(res)=>{
        return <div className=" col-sm-4 col-md-2 mb-3">
            <div className="mob-cart">
        <div>
        <div className="mcq-icon"><i className="fas fa-th fa-4x  "></i></div>
        </div>
        <div className="font-mob">
        <div><b>{res.name}</b></div>
        <div style={{color:'green'}}>Subject Name</div>
        <div style={{color:'red'}}>Rs. {res.price}</div>
        </div>
        </div>
        <button className="btn-test btn-test-m" style={{width:'100%'}} onClick={()=>this.buynow(res.id,res.type)}>Buy Now</button>
        <div className="d-flex justify-content-center"><i className="far fa-trash-alt fa-2x px-2 pt-2" onClick={()=>this.removefromcart('mcq',res.id)}>
        <div className="delete-hover mt-1">Delete</div>
            </i>
            <i className="far fa-bookmark px-2 fa-2x pt-2" onClick={()=>this.addtobookmark('mcq',res.id)}>
            <div className="add-to-wish-hover mt-1">Add to Wishlist</div>
                </i></div>
        </div>
    }
        rendertest=(res)=>{
            return <div className="col-md-2 col-sm-4 mb-3 ">
                <div className="mob-cart">
            <div>
            <div className="mcq-icon"><i className="fas fa-th fa-4x  "></i></div>
            </div>
            <div className="font-mob">
            <div><b>{res.name}</b></div>
        <div style={{color:'green'}}>Live Test</div>
            <div style={{color:'red'}}>Rs. {res.price}</div>
            </div>
            </div>
            <button className="btn-test btn-test-m" style={{width:'100%'}} onClick={()=>this.buynow(res.id,res.type)}>Buy Now</button>
            <div className="d-flex justify-content-center"><i className="far fa-trash-alt fa-2x px-2 pt-2" onClick={()=>this.removefromcart('test',res.id)}>
            <div className="delete-hover mt-1">Delete</div>
                </i><i className="far fa-bookmark px-2 fa-2x pt-2" onClick={()=>this.addtobookmark('mcq',res.id)}>
            <div className="add-to-wish-hover mt-1">Add to Wishlist</div></i></div>
            </div>
        }
        rendersessions=(res)=>{
            return <div className="col-md-2 col-sm-4 mb-3">
            <div className="mob-cart">
        <div>
            <img  src={res.image} alt="book image" style={{width:'100px',height:'100px'}}></img>
        </div>
        <div className="font-mob">
        <div className="px-2"><b>{res.name}</b></div>
    <div className="px-2" style={{color:'green'}}>Session</div>
    <div className="px-2" style={{color:'red'}}> Rs .{res.price}</div>
    </div>
    </div>
        <button className="btn-test btn-test-m" style={{width:'100%'}} onClick={()=>this.buynow(res.id,res.type)}>Buy Now</button>
        <div className="d-flex justify-content-center">
        <i className="far fa-trash-alt fa-2x px-2 pt-2" onClick={()=>this.removefromcart('summary',res.id)}>
            <div className="delete-hover mt-1">Delete</div>
        </i>
        <i className="far fa-bookmark px-2 fa-2x pt-2" onClick={()=>this.addtobookmark('summary',res.id)}>
        <div className="add-to-wish-hover mt-1">Add to Wishlist</div>
            </i></div>
        </div>
        }
    handlesubmit=()=>{
        this.setState({message:'Checking...'});
        axios.post("http://127.0.0.1:8000/api/core/promo-code/",{
            "cart_id":this.state.items.id,
            "code":this.state.promocode
        },{        headers:{
            'Content-Type':'application/json',
            'Authorization':`token ${localStorage.getItem('token')}`
        }}).then((res)=>{
            this.componentDidMount()
            this.setState({message:res.data,showtotal:'true'}) }).catch((res)=>this.setState({message:res.response.data}))
    }
    render() {

        return (
            <div>
               

                <div>
                    <Header/>
                </div>
                
                <div className="mx-5">
                    <div className="row">
                        <p className="f-29 mx-auto pt-3 mb-5">My Cart</p>
                    </div>
                </div>
                <div className="mx-5">
                <div className="row">
                    {this.displaysummary()}
                    {this.displaymcqs()}
                    {this.displaytest()}
                    {this.displaysessions()}
                </div>
                </div>
                {localStorage.getItem('token')!=null?(this.state.items.id!=undefined?(<div>
                    <div className="mx-5 px-5 mt-3 d-flex flex-column justify-content-between align-items-end">
                <div className="row float-right f-18" style={{color:'red'}}><b>
                    {`Amount : Rs. ${this.state.items.total_amount}`}</b></div>
         
         {this.state.showtotal?<React.Fragment>     <div className="row float-right f-18" style={{color:'red'}}><b>
                        {`Discount : Rs. ${this.state.items.total_amount-this.state.items.final_amount}`}</b></div>
                    <div className="row float-right f-18" style={{color:'green'}}><b>
                        {`Final Price : Rs. ${this.state.items.final_amount}`}</b></div></React.Fragment>:""}
               
                        <div className="row d-flex flex-column">
                            <form className="float-right">
                        <input type="text" className="form-control" placeholder="Have a Promocode?" value={this.state.promocode} onChange={(event)=>{
                            this.setState({validate:'true',promocode:event.target.value.toUpperCase()})
                        }}></input>
                    </form>
                   <div >
                    {this.state.validate==='true'? <Button className="f-18 px-5 mt-2 mx-auto" onClick={this.handlesubmit}>Validate</Button>:""}
                    </div>
                            </div>
                            {this.state.message!==''?<div className="mt-2" style={{color:'red'}}>{this.state.message}</div>:""}
                        
                           
                         
                    </div>
                 
                    <div className="conatiner mt-3">
                <div className="row float-right mr-5">
                    
                    <button className="btn-la" onClick={this.displayRazorpay}>Proceed to Checkout</button>
                </div>
                </div>
                <div className="na">
                                    <SideNav/>
                                    </div>
                </div>):<div>{(!this.state.err)?(<div className="text-center">
  <div className="spinner-border" role="status">
    <span className="sr-only">Loading...</span>
  </div>
</div>):<p className="text-center f-29 empty-cart">Your cart is empty</p>}</div>) :<Link to="/login" className="f-29"><p className="text-center empty-cart">Please Login to view your Cart</p></Link>}
                </div>
        )
    }
}
const mapStateToProps =state =>{
    return{
        token:state.auth.token
        }
}
export default connect(mapStateToProps)(Cart)
/* */