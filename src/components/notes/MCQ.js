import React from 'react';
import {connect} from 'react-redux';
import {fetchmcqs} from '../actions/index'
import {fetchpdflink} from '../actions/index'
import image from '../../images/pdf_109.png';
import history from '../history';
import axios from 'axios';
import Popup from '../Popup';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
var file=[];
var pdfnumber=[];
class MCQ extends React.Component {
    state={res:[],addModalShow:false,res1:[],spinn:false,user:[]}
   async componentDidMount(){
       await this.props.fetchmcqs(this.props.id);
       await axios.get('http://127.0.0.1:8000/api/core/user-subscriptions/',{headers:{
            'Content-Type':'application/json',
            'Authorization':`token ${localStorage.getItem('token')}`
        }}).then(res=>this.setState({res:res.data}))
        axios.get(`http://127.0.0.1:8000/api/core/users/${localStorage.getItem('userid')}`).then(res=>this.setState({user:res.data}))
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
   addtocart=(id)=>{
    axios.post("http://127.0.0.1:8000/api/cart/add-to-cart/",{
        "type":"mcq",
        "id":id
    },{        headers:{
        'Content-Type':'application/json',
        'Authorization':`token ${localStorage.getItem('token')}`
    }}).then(()=>history.push('/checkout'))
    this.setState({spinn:true})
   }
   showaddtocart=(id)=>{
    if(this.state.res.mcqs==undefined){
        return false;
    }
    const testmap=this.state.res.mcqs.filter(sum=> sum.id==id)
    const conver=testmap.map(mas=> mas.id)
    if(conver==id){
        file[id]=testmap.map(mal=>mal.file)
        return true;
    }
    else{
        return false;
    }

}
    renderpdf=(pdf)=>{
        return (
            <div  key={pdf.id}>
       <div className="d-flex justify-content-center" > <i className="fas fa-th fa-3x large-icons-mcq" onClick={()=>this.setState({addModalShow:true,res1:pdf})}></i><i className="fas fa-th fa-2x small-icons-mcq" onClick={()=>this.setState({addModalShow:true,res1:pdf})}></i></div>
       {this.showaddtocart(pdf.id)==false?( 
        <div className="d-flex justify-content-center mt-3">
        <div className="ui simple dropdown item d-flex justify-content-center align-items-center f-8 add-to-cart-btn" >
    Add to Cart/ Buy Now
    <i class="dropdown icon"></i>
    <div className="menu" style={{width:'180px'}}>
      <div className="item text-center" style={{fontSize:'1rem',height:'0px'}} onClick={()=>{localStorage.getItem('token')?this.addtocart(pdf.id):(history.push('/login'))}}>Add to Cart</div>
      <div className="item text-center" style={{fontSize:'1rem',height:'0px'}} onClick={()=>{localStorage.getItem('token')?this.buynow(pdf.id,pdf.type):(history.push('/login'))}}>Buy Now</div>
    </div>
    </div>
      </div>
):''
}
        <p className="text-center mock" >{pdf.name}</p>
        {    this.showaddtocart(pdf.id)==false?( <p className="text-center" style={{color:'red'}}>Rs.{pdf.price} </p>
        ):<a href={file[pdf.id] } className="text-center d-flex justify-content-center" target="_blank" style={{color:'red'}}>Open </a>}
 <p></p>
 </div>
        );
    }
    render() {
        pdfnumber=this.props.mcq.length;
        let addModalClose =()=>this.setState({addModalShow:false})
        return (
            <div className="padding-5">
                {!this.state.spinn?(
                <div>
                 <Popup show={this.state.addModalShow} onHide={addModalClose} data1={this.state.res1}/>
                 <div className="noteshead notesheadm neg-mar">
                     {this.props.mcq[0]!=undefined?"MCQ":""}
               </div>
              
                 <div className="row more-size-mcq">
               <OwlCarousel
    className="owl-theme"
    autoplay={true}
    slideBy={8}
    items={pdfnumber>8?8:pdfnumber}
    margin={0}
    dots={false}
    mergeFit={true}
    autoplay={false}
    nav
>
                {this.props.mcq.map(mcq=>{
                    return this.renderpdf(mcq);
                })}
                </OwlCarousel>
               </div>
               <div className="row a-1069-size">
               <OwlCarousel
    className="owl-theme"
    slideBy={5}
    items={5}
    margin={0}
    dots={false}
    mergeFit={true}
    autoplay={false}
    nav
>
                {this.props.mcq.map(mcq=>{
                    return this.renderpdf(mcq);
                })}
                </OwlCarousel>
               </div>
              
               <div className="row a-741-size" >
               <OwlCarousel
    className="owl-theme"
    slideBy={3}
    items={3}
    margin={0}
    dots={false}
    mergeFit={true}
    autoplay={false}
    nav
>
                {this.props.mcq.map(mcq=>{
                    return this.renderpdf(mcq);
                })}
                </OwlCarousel>
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
const mapStateToProps=(state)=>{
    return{
        mcq:Object.values(state.mcq)
    }
}
export default connect(mapStateToProps,{fetchmcqs})(MCQ);
