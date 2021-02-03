import React from 'react';
import {connect} from 'react-redux';
import {fetchsummary} from '../actions/index'
import {fetchzeroprice} from '../actions/index'
import './Summary.css'
import history from '../history'
import axios from 'axios';
import Popup from '../Popup';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
var file=[];

var pdfnumber=[];
class Summary extends React.Component {
    state={res:[],addModalShow:false,res1:[],spinn:false,help:"",user:[]}
    async componentDidMount(){
        await this.props.fetchsummary(this.props.id)
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
  
   addtocart=(id)=>{
      
    axios.post("http://127.0.0.1:8000/api/cart/add-to-cart/",{
        "type":"summary",
        "id":id
    },{        headers:{
        'Content-Type':'application/json',
        'Authorization':`token ${localStorage.getItem('token')}`
    }}).then(()=>history.push('/checkout'))
    this.setState({spinn:true})
}
      showaddtocart= (id,price)=>{
          if(price===0){
            axios.get(`http://127.0.0.1:8000/api/core/summaries/${id}`,{headers:{
                'Content-Type':'application/json',
                'Authorization':`token ${localStorage.getItem('token')}`
            }}).then(res=>{file[id]=res.data.file})
           
            
              return true;
          }
       if(this.state.res.summaries==undefined){
           return false;
       }
       const testmap=this.state.res.summaries.filter(sum=> sum.id==id)
       const conver=testmap.map(mas=> mas.id)
       if(conver==id){
           file[id]=testmap.map(mal=>mal.file)
          
           return true;
       }
       else{
           return false;
       }
   }
   extrahelp=()=>{
    this.setState({help:'thanks'})
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
   checklogin=()=>{
    localStorage.getItem('token')?console.log("loggedin"):history.push('/login')
    this.setState({help:'thanks'})
   }
   
    rendersummary=(summary)=>{
        var url=file[summary.id];
        return (
            <div key={summary.id} className="mx-2">
                <div className="summary-border-1">    
           <a><img src={summary.image} className="mx-auto summar-image" alt="pdf icon"   onClick={()=>this.setState({addModalShow:true,res1:summary})}></img></a>
           </div>
           <div className="row mx-auto d-flex justify-content-center" >
           {    this.showaddtocart(summary.id,summary.price)==false?(
  <div onMouseEnter={this.extrahelp} onClick={this.extrahelp} className="ui simple dropdown item  mt-2 mb-1 d-flex justify-content-center align-items-center mr-1 f-8" style={{background:'#40B3E0',borderRadius:'15px',width:'100px'}}>
    Sample
    <i class="dropdown icon" onClick={this.extrahelp}></i>
    <div className="menu" onClick={this.extrahelp}>
      <a className="item f-8" href={summary.preview_file} target="_blank">Summary</a>
      <a className="item" target="_blank" href={summary.mcq[0]!=undefined?summary.mcq[0].preview_file:'#'}>MCQ</a>
</div>
</div> ):<div onMouseEnter={this.extrahelp} onClick={()=>this.checklogin()} className="ui simple dropdown item  d-flex justify-content-center align-items-center mr-1" style={{background:'#40B3E0',borderRadius:'15px',width:'100px'}}>
    Open
    <i class="dropdown icon"></i>
    <div className="menu">
        {localStorage.getItem('token')?(
      <a className="item f-8" target="_blank" href={url!=undefined?`${url}`:``}>Summary</a> ):<div className="item f-8">Summary</div>
        }
</div>
</div> }    
{    this.showaddtocart(summary.id,summary.price)==false?(       
  <div className="ui simple dropdown item  d-flex justify-content-center align-items-center f-8" style={{background:'#40B3E0',borderRadius:'15px',width:'180px'}}>
    Add to cart/Buy Now
    <i className="dropdown icon"></i>
    <div className="menu" style={{width:'180px'}}>
      <div className="item text-center" onClick={()=>{localStorage.getItem('token')?this.addtocart(summary.id):(history.push('/login'))}}>Add To Cart</div>
      <div className="item text-center" onClick={()=>{localStorage.getItem('token')?this.buynow(summary.id,summary.type):(history.push('/login'))}}>Buy Now</div>
    </div>
  </div>):''
    }
            </div>
        <p className="text-center noteshead notesheadm">{summary.name}</p>
        <p className="text-center neg-margin noteshead notesheadm" style={{lineHeight:'1px'}}>Rs.{summary.price}</p>
        <p></p>
            </div>
        );
    }
    render() {
        pdfnumber=this.props.summary.length;
        let addModalClose =()=>this.setState({addModalShow:false})
        return ( 
            <div className="padding-5" onClick={()=>{
                document.getElementById("sidebar").classList.remove('active')
                document.getElementById("share-buttons-link").classList.remove('share-buttons-link-active')
                document.getElementById("scheduled-test-series").classList.remove('scheduled-test-series-active')
                document.getElementById("search-results").classList.remove('dum');
              
                }}>
                {!this.state.spinn?(
                <div>
                 <Popup show={this.state.addModalShow} onHide={addModalClose} data1={this.state.res1}/>
               <div className="noteshead notesheadm neg-mar">
               {this.props.summary[0]!=undefined?"Summary":""}
               </div>
               <div className="row more-size-1">
               <OwlCarousel
    className="owl-theme"
 slideBy={7}
    items={pdfnumber>7?7:pdfnumber}
    autoWidth={pdfnumber<7?true:false}
    margin={0}
    dots={false}
    mergeFit={true}
    autoplay={false}
    nav
>
                {this.props.summary.map(summary=>{
                    return this.rendersummary(summary);
                })}
                </OwlCarousel>
               </div>
               <div className="row less-size-1 ">
               <OwlCarousel
    className="owl-theme"
    slideBy={4}
    items={pdfnumber>4?4:pdfnumber}
    margin={0}
    dots={false}
    mergeFit={true}
    autoplay={false}
    nav
>
                {this.props.summary.map(summary=>{
                    return this.rendersummary(summary);
                })}
                </OwlCarousel>
               </div>
               <div className="row less-less-size-1">
               <OwlCarousel
    className="owl-theme"
    items={pdfnumber>3?3:pdfnumber}
    margin={0}
    dots={false}
    mergeFit={true}
    autoplay={false}
    nav
>
                {this.props.summary.map(summary=>{
                    return this.rendersummary(summary);
                })}
                </OwlCarousel>
               </div>
               <div className="row veryless-less-size-1">
               <OwlCarousel
    className="owl-theme"
    slideBy={2}
    items={pdfnumber>2?2:pdfnumber}
    margin={0}
    dots={false}
    mergeFit={true}
    autoplay={false}
    nav
>
                {this.props.summary.map(summary=>{
                    return this.rendersummary(summary);
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
        summary:Object.values(state.summary)        
    }
}
export default connect(mapStateToProps,{fetchsummary})(Summary);
