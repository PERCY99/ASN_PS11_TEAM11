import React, { Component } from 'react'
import axios from 'axios';
import NewsPopup from '../NewsPopup';
import Header from '../Header';
export default class Articles extends Component {
    state={res:[],addModalShow:false,res1:[]}
    componentDidMount(){
        axios.get('http://127.0.0.1:8000/api/core/articles/').then(res=>{this.setState({res:res.data})})
    }
    fetcharticledetails=(article)=>{
        return <div className="row pt-4 news-container">
        <div className="pr-4">
            <img src={article.image} className="news-image ml-4" alt="book" onClick={()=>this.setState({addModalShow:true,res1:article})}></img>
            </div>
            <div className="px-0 mx-0" >
                <p className="f-29-unbold pb-0 mb-0" onClick={()=>this.setState({addModalShow:true,res1:article})}>
            {article.title}
            </p>
    <p className="f-29-unbold">{article.date}</p>
            </div>
            <div>
            <div className="float-right my-3 article-icons">
                <i className="far fa-envelope fa-2x pr-3"></i>
                <a href={`whatsapp://send?text=${article.title}`} data-action="share/whatsapp/share"><i className="fab fa-whatsapp fa-2x px-3"></i></a>

<i className="fab fa-telegram fa-2x px-3"></i>
</div>
            </div>
        </div>
    }
    render() {
        let addModalClose =()=>this.setState({addModalShow:false})
        return (
            <div>
                <Header/>
                {this.state.res[0]!=undefined?(
                    <div>
                         <NewsPopup show={this.state.addModalShow} onHide={addModalClose} data1={this.state.res1} type="Articles"/>
                <p className="f-29 mx-4">Free Resources</p>
                {this.state.res.map(articles=>{
                    return this.fetcharticledetails(articles)
                }
                )}
                </div>
                ):(<div className="text-center">
  <div className="spinner-border" role="status">
    <span className="sr-only">Loading...</span>
  </div>
</div>)
    }
            </div>
        )
    }
}
