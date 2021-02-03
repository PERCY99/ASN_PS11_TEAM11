import React, { Component } from 'react'
import './Setting.css';
import {Link} from 'react-router-dom'
import axios from 'axios';
export default class FAQ extends Component {
    state={para:0}
    render() {
        return (
            <div>
                <div className="b-g-purpose"></div>
                 <div className=" d-flex manual-fl">
                        <div className="side-forum">
                            <div className="s-f-1">
                       <div className=" py-2 my-2 text-center highlight-color first-s" ><Link to='/faqs' className="no-hover px-5" style={{fontSize:'21px'}}>Support</Link></div>
                          <div className=" py-2 my-2 text-center first-ss" style={{fontSize:'20.5px'}}><Link to='/changepassword' className=" px-4  no-hover">Change Password
                    </Link></div>
                        </div>
                        </div>
                        <div>

                         <div className="row d-flex justify-content-center my-2">
                            <h1 className=" mt-5 text-center">Welcome To Support</h1>
                            </div>
                        <div className="row center-t search-out d-flex  align-items-center">
                        <i className="fas fa-search fa-lg mx-2"></i>
                            <input type="text" placeholder="Search.."  className="remove-outline" style={{fontSize:'18px'}}/>
                       
                        </div>
                        <h2 className="pt-4 pb-2 f-24 text-center">Problems</h2>
                        <div className="text-faq mt-4 " style={{fontSize:"24px",fontWeight:"200"}} onClick={()=>this.setState({para:1})}>How to Buy any study material? </div>
                        {this.state.para===1?<div className="text-faq f-18 mb-3" f-18 mb-3>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</div>:""}
                        <div className="text-faq mt-4" style={{fontSize:"24px",fontWeight:"200"}} onClick={()=>this.setState({para:2})}>How can I change my email address ,Password,Username ?</div>
                        {this.state.para===2? <div className="text-faq f-18 mb-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</div>:""}
                        <div className="text-faq mt-4"  style={{fontSize:"24px",fontWeight:"200"}} onClick={()=>this.setState({para:3})}> How to avail couponss? Not getting live updates for test.</div>
                        {this.state.para===3?<div className="text-faq f-18 mb-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</div>:""}
                        <div className="text-faq mt-4" style={{fontSize:"24px",fontWeight:"200"}}  onClick={()=>this.setState({para:4})}> Why am I getting the error, ‘ code invalid’ when I try to avail my coupons?</div>
                        {this.state.para===4?<div className="text-faq f-18 mb-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</div>:""}
                        <div className="text-faq mt-4" style={{fontSize:"24px",fontWeight:"200"}}  onClick={()=>this.setState({para:5})}> Can I add more than one email address to myaccount ?</div>
                        {this.state.para===5?<div className="text-faq f-18 mb-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</div>:""}
                        </div>
                    </div>  
            </div>
        )
    }
}
