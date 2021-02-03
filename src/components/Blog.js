import React, { Component } from 'react'
import SideNav from './SideNav';
import Header from './Header';
import './Blog.css'
export default class Blog extends Component {
    render() {
        return (
            <div>
               <div className="header-blog" onClick={()=>{
                 document.getElementById("sidebar").classList.remove('active')
                 document.getElementById("share-buttons-link").classList.remove('share-buttons-link-active')
                 document.getElementById("scheduled-test-series").classList.remove('scheduled-test-series-active')
                 document.getElementById("search-results").classList.remove('dum');
                 document.getElementById("rewards").classList.remove('rewards-active')
                 }}>
                <Header/>
                </div>
                <div className="na"> 
               <SideNav/>   
               </div> 
            </div>
        )
    }
}
