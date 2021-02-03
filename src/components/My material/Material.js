import React, { Component } from 'react'
import axios from 'axios';
import {connect} from 'react-redux';
import Summary from '../notes/Summary';
import './Material.css'
import {Link} from 'react-router-dom'
import Header from '../Header'
class Material extends Component {
    state={res:[],err:""}
    componentDidMount(){
        axios.get('http://127.0.0.1:8000/api/core/user-subscriptions/',{headers:{
            'Content-Type':'application/json',
            'Authorization':`token ${localStorage.getItem('token')}`
        }}).then(res=>this.setState({res:res.data})).catch(err=>this.setState({err:err.message}))
    }
    rendersummaries=(summary)=>{
        return (
            <div key={summary.id} className="col-sm-3 col-md-2 col-6">
                <div className="d-flex justify-content-center summary-border align-items-center">    
           <a href={summary.file}><img src={summary.image} className="no-hover summary-image-1" alt="pdf icon" ></img></a>
    </div>
    <a href={summary.file}><div className="font-content no-hover px-2" style={{textTransform:'capitalize'}}>{summary.name}</div></a>
    <a href={summary.file}><div className="font-content no-hover px-2" style={{textTransform:'capitalize'}}>{summary.sub_category.name}</div></a>
    </div>)
    }
    rendermcqs=(summary)=>{
        return (
            <div key={summary.id} className="col-lg-1 col-md-2 col-sm-3 col-4">
            <a href={summary.file}>    <div className="d-flex justify-content-center no-hover mcq-design py-3" > <i className="fas fa-th fa-4x "></i></div></a>
    <a href={summary.file}><div className="font-content no-hover text-center" style={{textTransform:'capitalize'}}>{summary.name}</div></a>
    <a href={summary.file}><p className="font-content no-hover text-center" style={{textTransform:'capitalize'}}>{summary.sub_category.name}</p></a>
    </div>)
    }
    rendertests=(summary)=>{
        return (
            <div key={summary.id} className="col-lg-1 col-md-2 col-sm-3 col-4">
                <Link to={`/start/${summary.slug}`} className="d-flex justify-content-center mcq-design py-3"  > <i className="fas fa-th fa-4x "></i></Link>
    <Link to={`/start/${summary.slug}`} className="font-content text-center no-hover" style={{textTransform:'capitalize'}}>{summary.name}</Link>
    <div className="font-content pb-2" style={{textTransform:'capitalize'}}>{summary.rank!=null?<div>Rank. {summary.rank}</div>:""}</div>
    </div>)
    }


    render() {

        return (
            <div className="material">
                <Header/>
                <p className="f-29">My Material</p>
                {localStorage.getItem('token')?<div>{(!this.state.err)?(<div>
                <div>
                {this.state.res.summaries!=undefined?(
                    <div>
                    <div className="f-24">Summaries </div>
                    <div className="row pt-2">
                    {this.state.res.summaries.map(Summary=>{
                    return this.rendersummaries(Summary)
                })}</div></div>):''}
            </div>
                {this.state.res.mcqs!=undefined?(
                    <div>
                    <div className="f-24 pt-2">MCQ</div>
                    <div className="row pt-2">
                    {this.state.res.mcqs.map(mcq=>{
                    return this.rendermcqs(mcq)
                })}</div></div>):''}
                {this.state.res.tests!=undefined?(
                    <div>
                    <div className="f-24 pt-2">Mock Tests</div>
                    <div className="row pt-2">
                    {this.state.res.tests.map(test=>{
                    return this.rendertests(test)
                })}</div></div>):''}</div>):<p className="empty-cart f-29">You haven't purchased anything</p>}</div>:<Link to="/login" className="f-29"><p className="text-center empty-cart">Login to view your purchased materials</p></Link>
            }
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        token:state.auth.token
    }
}
export default connect(mapStateToProps)(Material);

