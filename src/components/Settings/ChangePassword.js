import React, { Component } from 'react'
import './Setting.css';
import {Link} from 'react-router-dom'
import axios from 'axios';
import { Button } from 'react-bootstrap';
import history from '../history'
export default class ChangePassword extends Component {
    state={oldpassword:"",newpassword:"",confirmpassword:""}
    onformsubmit=(event)=>{
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/rest-auth/password/change/',{ old_password: this.state.oldpassword,
        new_password1: this.state.newpassword,
        new_password2: this.state.confirmpassword},{headers:{
            'Content-Type':'application/json',
            'Authorization':`token ${localStorage.getItem('token')}`
        }}).then((res)=>{alert(res.data.detail)
        history.push('/')}).catch((res)=>alert(res.response.data.new_password2[0]))
    }
    render() {
        return (
            <div>
                <div className="b-g-purpose"></div>
                 <div className=" d-flex  manual-fl">
                <div className="side-forum">
                            <div className="s-f-1">
                       <div className=" py-2 my-2 text-center  first-s" ><Link to='/faqs' className="no-hover px-5" style={{fontSize:'21px'}}>Support</Link></div>
                          <div className=" py-2 my-2 text-center highlight-color first-ss" style={{fontSize:'20.5px'}}><Link to='/changepassword' className=" px-4  no-hover">Change Password
                    </Link></div>
                        </div>
                        </div>  
                        <div>
                        <div className="container special-t">
                            <div className="row d-flex flex-column mx-auto">
                                <form onSubmit={this.onformsubmit}>
                                <div className="text-center mb-4"><h2>Change Password</h2></div>
                                <div className="change-pass-block">
                                <div className="text-center px-2 mt-2" style={{fontSize:'18px'}}>Old Password</div>
                                <input type="password" className="form-control px-2 form-width-80" required onChange={(e)=>this.setState({oldpassword:e.target.value})}></input>
                                <div className="text-center px-2 mt-2" style={{fontSize:'18px'}}>New Password</div>
                                <input type="password" className="form-control px-2 form-width-80" required onChange={(e)=>this.setState({newpassword:e.target.value})}></input>
                                <div className="text-center px-2 mt-2" style={{fontSize:'18px'}}>Confirm New Password</div>
                                <input type="password" className="form-control px-2 form-width-80" required onChange={(e)=>this.setState({confirmpassword:e.target.value})}></input>
                                <div className=" d-flex justify-content-center"><Button type="submit" variant="primary my-2 mt-3" className="dsgn-btn-6">Change</Button>
                                </div>
                            </div>
                            </form>
                            </div>
                            
                        </div>
                        </div>
                        </div>
            </div>
        )
    }
}
