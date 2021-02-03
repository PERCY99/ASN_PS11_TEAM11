import React, { Component } from 'react'
import Header from './Header';
import SideNav from './SideNav'
import './AboutUs.css'
export default class AboutUs extends Component {
    render() {
        return (
            <div>
                   <div className="header-aboutus" onClick={()=>{
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
               <p className="f-29 text-center">About us</p>
               <div className="container">
               <p className="text-left text-center pb-3 pt-2" style={{fontSize:'16px'}}><b><i>“If You Are Working on Something That You Really Care About, You Don’t Have To Be Pushed. The Vision Pulls You.” – Steve Jobs</i></b></p>
                <p className="text-left f-text">UPSC Basic Funda a team of churned out professionals, former aspirants started this venture to cater  the students who cannot afford high end fees of coaching institutes and for the ones who have  innumerous sources, books, materials but could not make it through on account of less clarity and confusion.</p>
            <p className="text-lef f-text">We started this initiative through telegram with the intention of reaching it to the aspirants easily, and response was beyond our expectation. We could feel that there is a tremendous demand of such materials which the Top Shots Coaching Institutes are unable to provide.</p>
            <p className="text-left f-text">Reading Newspaper, Magazines, articles is tedious for the aspirants who are Doing job or are married or are bestowed with some responsibilities and cannot take out time from daily cores, so for them we started the Summary Edition of PIB, IE, AIR, NCERT. Our intent is to compile all relevant facts and figures keeping in mind the past year papers and the present trends.</p>
            <p className="text-left f-text">We hope we can serve you better and will be very happy with if we contribute little bit in your selection</p>
            <p className="text-center f-text">ALL THE BEST!!!!</p>
            </div>
            </div>
        )
    }
}
