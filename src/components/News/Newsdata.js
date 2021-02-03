import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import NewsPopup from '../NewsPopup'
import Header from '../Header';
import {Navbar,Nav} from 'react-bootstrap';
export default class Newsdata extends Component {
    state={news:[],addModalShow:false,res1:[],res:[],quiz:[],newsapi:[],keyword:'economy'}
    componentDidMount(){
        axios.get('http://127.0.0.1:8000/api/core/news/').then(res=>{this.setState({news:res.data})})
        axios.get('http://127.0.0.1:8000/api/quiz/quizzes/').then(res=>this.setState({res:res.data}))
        axios.get('http://127.0.0.1:8000/api/core/user-subscriptions/',{headers:{
          'Content-Type':'application/json',
          'Authorization':`token ${localStorage.getItem('token')}`
      }}).then(res=>this.setState({quiz:res.data.tests}))
      axios.get(`https://gnews.io/api/v4/search?q=${this.state.keyword}&token=0d9cb7543e73e80945b8a8c45fe60b39`).then((res)=>this.setState({newsapi:res.data}))
    }
    renewsfetch=(word)=>{
        console.log(word)
        axios.get(`https://gnews.io/api/v4/search?q=${word}&token=0d9cb7543e73e80945b8a8c45fe60b39`).then((res)=>this.setState({newsapi:res.data}))  
    }
    showaddtocart=(id)=>{
        if(this.state.quiz[0]==undefined){
            return false;
        }
        const testmap=this.state.quiz.filter(sum=> sum.id==id)
        const conver=testmap.map(mas=> mas.id)
        if(conver==id){
            return true;
        }
        else{
            return false;
        }
  
    }
    fetcharticledetails=(article)=>{
        return <div className="row pt-4">
        <div className="col-md-3  col-xl-2 col-sm-4">
            <img src={article.image} alt="book" className="news-image ml-4" onClick={()=>this.setState({addModalShow:true,res1:article})}></img>
            </div>
            <div className="col-md-6  col-xl-8 col-sm-8" >
                <p className="f-29-unbold pb-0 mb-0 px-2" onClick={()=>this.setState({addModalShow:true,res1:article})}>
            {article.title}
            </p>
    <p className="f-29-unbold">{article.date}</p>
            </div>
            <div className="article-icons col-lg-2 col-md-3 col-sm-12">
                <i className="far fa-envelope fa-2x pr-3"></i>
<i className="fab fa-whatsapp fa-2x px-3"></i>
<i className="fab fa-telegram fa-2x px-3"></i>
</div>
        </div>
    }
    render() {
        let addModalClose =()=>this.setState({addModalShow:false})
        return (
            <div>
                <Header/>
                <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="#home" >News</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#features" onClick={()=>{this.setState({keyword:'economy'})
      this.renewsfetch('economy')}}>Economy</Nav.Link>
      <Nav.Link href="#pricing" onClick={()=>{this.setState({keyword:'business'})
        this.renewsfetch('business')}}>Business</Nav.Link>
      <Nav.Link href="#deets" onClick={()=>{this.setState({keyword:'polity'})
         this.renewsfetch('polity')}}>Polity</Nav.Link>
      <Nav.Link  href="#memes" onClick={()=>{this.setState({keyword:'environment'})
        this.renewsfetch('environment')}}>
        Environment
      </Nav.Link>
      <Nav.Link href="#deetss" onClick={()=>{this.setState({keyword:'sports'})
        this.renewsfetch('sports')}}>Sports</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
               </div>
                {this.state.newsapi.articles!=undefined?(
                    <div>
                         <NewsPopup show={this.state.addModalShow} onHide={addModalClose} data1={this.state.res1} type="News"/>
               
                 {this.state.newsapi.articles.map(articles=>{
                    return this.fetcharticledetails(articles)
                }
                )}
                 <div className="mx-4 f-24 pt-3 text-center">
                    MCQ
                </div>
                <div className="row  bottom mx-4 mt-4 d-flex justify-content-center">
                   <div>
                   {this.state.res[0]!=undefined?(this.showaddtocart(this.state.res[0].id)?(
                   <Link to={`/start/${this.state.res[0].slug}`}> 
                   <div className="mx-2 sym"><i className="fas fa-th fa-4x more-size ">
                     </i><i className="fas fa-th fa-3x  less-size"></i>
                   </div>
                   </Link>):<div><div className="mx-2 sym position-relative"  onClick={()=>this.setState({addModalShow:true,res1:this.state.res[0]})} ><i className="fas fa-th fa-4x more-size"> </i><i className="fas fa-th fa-3x  less-size"></i>
                   <div className="position-absolute place"><i className="fas fa-lock fa-3x more-size"></i><i className="fas fa-lock fa-2x less-size"></i></div>
                   </div> </div>):''}
                  {this.state.res[0]!=undefined?(
                     <p className="mock mx-2">{this.state.res[0].name}</p>):
                     ""}
                  {this.state.res[0]!=undefined?
                  (<p className="mx-2" style={{color:' rgb(34, 235, 94)'}}>
                    {this.state.res[0].price!==0?this.state.res[0].price:'Free'}</p>):""}
                </div>
                <div>
                {this.state.res[1]!=undefined?(this.showaddtocart(this.state.res[1].id)?(
                <Link className="no-hover" to={`/start/${this.state.res[1].slug}`}>
                 <div className="mx-2 sym position-relative"><i className="fas fa-th fa-4x more-size"> </i><i className="fas fa-th fa-3x  less-size"></i>
                   </div></Link>):<div><div className="mx-2 sym position-relative" onClick={()=>this.setState({addModalShow:true,res1:this.state.res[1]})}><i className="fas fa-th fa-4x more-size"> </i><i className="fas fa-th fa-3x  less-size"></i>
                   <div className="position-absolute place"><i className="fas fa-lock fa-3x more-size"></i><i className="fas fa-lock fa-2x less-size"></i></div>
                   </div> </div>
                ):''}
                   {this.state.res[1]!=undefined?(<p className="mock mx-2">{this.state.res[1].name}</p>):''}
                   {this.state.res[1]!=undefined?(<p className="mx-2" style={{color:'red'}}>{this.state.res[1].price!==0?`Rs.${ this.state.res[1].price}`:'Free'}</p>):""}
                   </div>
                   <div>
                   {this.state.res[2]!=undefined?(this.showaddtocart(this.state.res[2].id)?(
                   <Link className="no-hover" to={`/start/${this.state.res[2].slug}`}><div className="mx-2 sym position-relative"><i className="fas fa-th fa-4x more-size"></i><i className="fas fa-th fa-3x  less-size"></i>
                 <div className="position-absolute more"><Link to="/TestSeries">More</Link></div>
                 </div></Link>):<div><div className="mx-2 sym position-relative" onClick={()=>this.setState({addModalShow:true,res1:this.state.res[2]})}><i className="fas fa-th fa-4x more-size"></i><i className="fas fa-th fa-3x  less-size"></i>
                 <div className="position-absolute place"><i className="fas fa-lock fa-3x more-size"></i><i className="fas fa-lock fa-2x less-size"></i></div>
                 <div className="position-absolute more"><Link to="/TestSeries">More</Link></div>
                 </div> </div>):""}
                {this.state.res[2]!=undefined?(<p className="mock mx-2">{this.state.res[2].name}</p>):""}
                  {this.state.res[2]!=undefined?(<p className="mx-2" style={{color:'red'}}>{this.state.res[2].price!==0?`Rs.${ this.state.res[2].price}`:'Free'}</p>):""}
                 </div>
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

