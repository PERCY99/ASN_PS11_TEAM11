import React from 'react';
import Header from './Header';
import SideNav from './SideNav';
//import faker from 'faker';
import './ContactForm.css'
import './Jteam.css'
import note from '../apis/api'
import axios from 'axios';
import PopupThankyou from './PopupThankyou';
class Jteam extends React.Component {
    state={res:[],name:"",email:"",phone:"",cv:[],other:[],addModalShow:false}
    componentDidMount(){
        axios.get('http://127.0.0.1:8000/api/core/team-members/').then(res=>{
            this.setState({res:res.data})
        })
    }
    onFormSubmit=(event)=>{
        event.preventDefault();
        var bodyFormData = new FormData();
        bodyFormData.append('email',this.state.email);
        bodyFormData.append('full_name',this.state.name);
        bodyFormData.append('mobile',this.state.phone);
        bodyFormData.append('cv',this.state.cv);
        bodyFormData.append('other',this.state.other)
       
        note.post('team-form/',
        bodyFormData
    ,{headers:{
        'Content-Type':'multipart/form-data',
        
    }}).then(()=>{this.setState({addModalShow:true})})
    
    }
    rendermembers=(member)=>{
        return (<div>
                <img src={member.image} alt="members" className="j-team-image"></img>
        <div className="text-center">{member.name}</div>
        <div className="text-center">{member.designation}</div>
        </div>)
    }
    render() {
        let addModalClose =()=>this.setState({addModalShow:false})
        return (
            <div>
                {this.state.res[0]!=undefined?(<div> <div className="header-jteam" onClick={()=>{
                 document.getElementById("sidebar").classList.remove('active')
                 document.getElementById("share-buttons-link").classList.remove('share-buttons-link-active')
                 document.getElementById("scheduled-test-series").classList.remove('scheduled-test-series-active')
                 document.getElementById("search-results").classList.remove('dum');
                 document.getElementById("rewards").classList.remove('rewards-active')
                 }}>
                    <Header/>
                </div>
                <PopupThankyou show={this.state.addModalShow} onHide={addModalClose}/>
              
                    <div className="row">
                        <div className="col-md-5 d-none d-md-block">
                          <div className="container mt-5 pt-2">
                              <div className="row ml-5 mr-2" style={{color:' #E72531',fontSize:'20px',fontFamily:'Roboto'}}>
                              We are here to materialize your dreams to reality and create working business models which will make significant breakthroughs in the industry.

                                  </div>
                                  <div className="row ml-5 mr-2" style={{color:' #E72531',fontSize:'20px',fontFamily:'Roboto'}}>
                                  
You will come on board with our team of experienced professionals like engineers, lawyers, marketers, accountants and likewise. With our exemplary support and mentorship, you will excel beyond your wildest dreams. Our resources will assist you in unlocking your true potential amid market and propel on the path of becoming a business leader.


</div>
<div className="row ml-5 mr-2" style={{color:' #E72531',fontSize:'20px',fontFamily:'Roboto'}}>
Established in 2019, we helped numerous non-tech entrepreneur like yours to grow from ground zero.   </div>
                              </div>  
                        </div>
                        <div className="col-md-7 j-team">
                            <p className="text-center f-29">
                                Our Team
                            </p>
                            <div className="row member">
                                {this.state.res.map(member=>{
                                    return this.rendermembers(member)
                                })}
                                </div>
                                <p className="text-center f-29">Join our Team</p>
                            <form onSubmit={this.onFormSubmit}>
                            <div className="d-flex justify-content-between">
                            <div class="form-group mr-3 w-50">
                <label>Name <b style={{color:'red'}}>*</b></label>
                <input type="text" className="form-control form-box" placeholder="Name" required
             onChange={(event)=>{this.setState({name:event.target.value})}}></input>
                </div>
                <div class="form-group mr-3 w-50">
                <label>Email <b style={{color:'red'}}>*</b></label>
                <input type="email" className="form-control form-box" placeholder="Email" required
                 onChange={(event)=>{this.setState({email:event.target.value})}} 
                ></input>
                </div>
                <div class="form-group w-50">
                <label>Phone No <b style={{color:'red'}}>*</b></label>
                <input type="text" className="form-control form-box" placeholder="Phone" required
                 onChange={(event)=>{this.setState({phone:event.target.value})}}
                ></input>
                </div>
                </div>
               <div className="d-flex justify-content-start">
                   <div>
                   <label>Uplaod CV <b style={{color:'red'}}>*</b></label>
                <input type="file" className="form-control upload-cv" id="myFile"required name="filename" onChange={(event)=>{this.setState({cv:event.target.files[0]})}}/>
                </div>
                <div><label>Upload Photo <b style={{color:'red'}}>*</b></label>
                <input type="file" className="form-control upload-cv" id="myFile" name="filename" onChange={(event)=>{this.setState({other:event.target.files[0]})}}/>
                </div>
               </div>
                <button className="btn btn-primary float-right btn-large mt-2 mr-5" type="submit">Submit</button>
                </form>

                        </div>
                    </div>
                    <div className="na"> 
               <SideNav/>   
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
export default Jteam
