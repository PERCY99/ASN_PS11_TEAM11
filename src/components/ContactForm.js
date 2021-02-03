import React from 'react';
import SideNav from './SideNav';
import Header from './Header';
import note from '../apis/api';
import './ContactForm.css'
import PopupThankyou from './PopupThankyou';

class ContactForm extends React.Component{
    state={name:[],email:[],phone:[],message:[],addModalShow:false};
    onFormSubmit=(event)=>{
        event.preventDefault();
     
        note.post('contact-us/',{email:this.state.email,
        full_name:this.state.name,
        message: this.state.message,
        mobile:this.state.phone}).then(()=>{this.setState({addModalShow:true})})
    }
    render(){
        let addModalClose =()=>this.setState({addModalShow:false})
        return(
            <div>  
                <div className="header-contactus" onClick={()=>{
                 document.getElementById("sidebar").classList.remove('active')
                 document.getElementById("share-buttons-link").classList.remove('share-buttons-link-active')
                 document.getElementById("scheduled-test-series").classList.remove('scheduled-test-series-active')
                 document.getElementById("search-results").classList.remove('dum');
                 document.getElementById("rewards").classList.remove('rewards-active')
                 }}>
                <Header/>
                </div>
                <PopupThankyou show={this.state.addModalShow} onHide={addModalClose}/>
                                <div className="container">
                      <div className="row">
                          <div className="col-6 side-contact">

                          </div>
                          <div className="col-sm-6 px-0" >
                              <p className="text-center contactus">Contact Us</p>
                    <form onSubmit={this.onFormSubmit}>

                            <div className="d-flex justify-content-between contact-us-1">
                            <div class="form-group mr-4 w-30">
                <label>Name</label>
                <input type="text" className="form-control form-box" placeholder="Name" 
                onChange={(event)=>{this.setState({name:event.target.value})}}></input>
                </div>
                <div className="form-group mr-4 w-40">
                <label>Email</label>
                <input type="email" className="form-control form-box" placeholder="Email" 
                 onChange={(event)=>{this.setState({email:event.target.value})}}
                ></input>
                </div>
                <div className="form-group w-30">
                <label>Phone No</label>
                <input type="text" className="form-control form-box" placeholder="Phone"
                 onChange={(event)=>{this.setState({phone:event.target.value})}}
                ></input>
                </div>
                </div>
                <div>
                <div className="form-group  contact-us-1 ">
                <label>Message</label>
                <textarea  rows="5" className="form-control form-box"
                 onChange={(event)=>{this.setState({message:event.target.value})}}></textarea>
                 </div>
                <button className="btn btn-primary float-right btn-large" type="submit">Submit</button>
                </div>
            </form>
            </div>
            </div>
            </div>
            <div className="na"> 
               <SideNav/>   
               </div>
            </div>

        )
    }
}
export default ContactForm;