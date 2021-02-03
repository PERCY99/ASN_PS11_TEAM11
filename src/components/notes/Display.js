import React from 'react'
import PDF from './PDF'
import Summary from './Summary'
import MCQ from './MCQ';
import history from '../history'
import axios from 'axios';
import {fetchmcqs} from '../actions/index'
import {connect} from 'react-redux'
import Popup from '../Popup'
import {fetchpdf} from '../actions/index'
import image from '../../images/pdf_109.png';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Header from '../Header';
import './Summary.css';
import SideNav from '../SideNav'
var openmcq=[];
var pdfnumber=[];
class Display extends React.Component {
    state={res:[],addModalShow:false,res1:[],dummy:[]}
async componentDidMount(){
    await this.props.fetchpdf(this.props.match.params.id);
    await this.props.fetchmcqs(this.props.match.params.id);
   await axios.get('http://127.0.0.1:8000//api/core/user-subscriptions/',{headers:{
            'Content-Type':'application/json',
            'Authorization':`token ${localStorage.getItem('token')}`
        }}).then(res=>this.setState({res:res.data}))
       
    }


renderPDF=(pdf)=>{
    
    return (
        <div key={pdf.id}>
       <a href={pdf.file} target="_blank"><img src={image} alt="pdf icon" style={{width:'100px',height:'80px'}} className="pdf-image"></img></a>
        <p className="pdf-name-padding noteshead notesheadp pdf-text">{pdf.name}</p>
        </div>
    );
}
    render() {
        let addModalClose =()=>this.setState({addModalShow:false})
        pdfnumber=this.props.pdf.length;
        return (
            <div>
                <div onClick={()=>{
                 document.getElementById("sidebar").classList.remove('active')
                 document.getElementById("share-buttons-link").classList.remove('share-buttons-link-active')
                 document.getElementById("scheduled-test-series").classList.remove('scheduled-test-series-active')
                 document.getElementById("search-results").classList.remove('dum');
               
                 }}>
                     <div className="increase-z-index">
                <Header/>
                </div>
                </div>
                 <div className="noteshead padding-5" >
               {this.props.match.params.id}
               </div>
               <div className="noteshead notesheadm padding-5">
                   {this.props.pdf[0]!=undefined?<div> PDF</div>:""}
               </div>
               <div className="row more-size padding-5" onClick={()=>{
                 document.getElementById("sidebar").classList.remove('active')
                 document.getElementById("share-buttons-link").classList.remove('share-buttons-link-active')
                 document.getElementById("scheduled-test-series").classList.remove('scheduled-test-series-active')
                 document.getElementById("search-results").classList.remove('dum');
               
                 }}>
               <OwlCarousel
    className="owl-theme"
    
    items={pdfnumber>9?9:pdfnumber}
    slideBy={9}
    margin={0}
    rewind={false}
dots={false}
    nav
>
                {this.props.pdf.map(pdf=>{
                  return this.renderPDF(pdf);
                })}
                </OwlCarousel>
               </div>
               <div className="row less-size padding-5" onClick={()=>{
                 document.getElementById("sidebar").classList.remove('active')
                 document.getElementById("share-buttons-link").classList.remove('share-buttons-link-active')
                 document.getElementById("scheduled-test-series").classList.remove('scheduled-test-series-active')
                 document.getElementById("search-results").classList.remove('dum');
               
                 }}>
               <OwlCarousel
    className="owl-theme"
    slideBy={3}
    items={pdfnumber>3?3:pdfnumber}
    margin={0}
dots={false}
    nav
>
                {this.props.pdf.map(pdf=>{
                  return this.renderPDF(pdf);
                })}
                </OwlCarousel>  
               </div>
                <Summary id={this.props.match.params.id}/>
               <MCQ id={this.props.match.params.id}/>
               <div className="na sss"> 
                <SideNav/>   
                </div>
                </div>
                
        )
        
    }
}
const mapStateToProps=(state)=>{
    return{
        pdf:Object.values(state.pdf),
        mcq:Object.values(state.mcq),
        token:state.auth.token
    }
}
export default connect(mapStateToProps,{fetchpdf,fetchmcqs})(Display);

