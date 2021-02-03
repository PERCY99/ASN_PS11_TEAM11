import React from 'react';
import { connect } from 'react-redux';
import * as actions from './actions/auth';
import Header from './Header';
import SideNav from './SideNav';
import './HomePage.css'
import { Link } from 'react-router-dom';
//  import Ncert from './Ncert/Ncert';
//  import Otherbooks from './Otherbooks/Otherbooks';
// import FreeResources from './Free resources/FreeResources';
//  import News from './News/News'
//  import Air from './Pib/Air/Air';
//  import Govt from './Govt Publications/Govt';
import axios from 'axios';
import Popup from './Popup'
import { Navbar, Nav } from 'react-bootstrap';

class Homepage extends React.Component {
  state = { res: [], quiz: [], addModalShow: false, res1: [] }
  componentDidMount() {

    this.props.onTryAutoSignup();
    axios.get('http://127.0.0.1:8000/api/quiz/quizzes/')
    .then(res => {this.setState({ res: res.data });
      console.log(res);}
    )
    axios.get('http://127.0.0.1:8000/api/core/user-subscriptions/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${localStorage.getItem('token')}`
      }
    }).then(res => this.setState({ quiz: res.data.tests }))
  }
  showaddtocart = (id, index) => {

    if (this.state.res[index] != undefined) {
      if (this.state.res[index].price == 0) {
        return true;
      }
    }
    if (this.state.quiz[0] == undefined) {
      return false;
    }
    const testmap = this.state.quiz.filter(sum => sum.id == id)
    const conver = testmap.map(mas => mas.id)
    if (conver == id) {
      return true;
    }
    else {
      return false;
    }

  }
  checklive = (rollout_date) => {
    var now = new Date().getTime();
    var quizt = new Date(`${rollout_date}`).getTime();
    if (now > quizt)
      return true;
  }
  render() {
    let addModalClose = () => this.setState({ addModalShow: false })
    return (
      <div>

        <Popup show={this.state.addModalShow} onHide={addModalClose} data1={this.state.res1} />
        <div className="header" onClick={() => {
          document.getElementById("sidebar").classList.remove('active')
          document.getElementById("share-buttons-link").classList.remove('share-buttons-link-active')
          document.getElementById("scheduled-test-series").classList.remove('scheduled-test-series-active')
          document.getElementById("rewards").classList.remove('rewards-active')
          document.getElementById("search-results").classList.remove('dum');

        }}>

          <Header {...this.props} />
        </div>

                       
               <div className="cont1" onClick={()=>{
                 document.getElementById("sidebar").classList.remove('active')
                 document.getElementById("share-buttons-link").classList.remove('share-buttons-link-active')
                 document.getElementById("scheduled-test-series").classList.remove('scheduled-test-series-active')}}>
                 
                 {/* <div className="row ncert-section">
                <div className="col-sm-6 px-0 col-xs-12">
                  <div>
                  <p className="pt-2 heading text-sm-left text-center">UPSC's Traditional Portion</p>
                  </div>
                  <div className="d-flex justify-content-center float-md-left ">
                  <div>
                    <div>
                  <Ncert/>
                  </div>
                  <div className="text-center">
                    NCERT
                  </div>
                  </div>
                  <div>
                    <div>
                  <Otherbooks/>
                  </div>
                  <div className="text-center">
                    Standard <br></br>books
                  </div>
                  </div>
                  <div>
                    <div>
                    <FreeResources/>
                    </div>
                    <div className="text-center">
                      Free Resources
                    </div>
                  </div>
                  </div>
                </div>
                <div className="col-sm-6 col-xs-12 px-0">
                <div>
                  <p className="text-sm-right pt-2 heading text-center">Dynamic Current Affairs</p>
                  </div>
                  <div className="d-flex justify-content-center float-sm-right">
                  <div>
                    <div>
                  <Air/>
                  </div>
                  <div className="text-center">
                    AIR/PIB<br></br>/DD NEWS
                  </div>
                  </div>
                  <div>
                    <div>
                  <News/>
                  </div>
                  <div className="text-center">
                    News
                  </div>
                  </div>
                  <div>
                    <div>
                    <Govt/>
                    </div>
                    <div className="text-center">
                      Govt. Publications
                    </div>
                  </div>
                  </div>

                </div>
                 </div> */}
                 </div> 
        <div className="container pt-2" style = {{marginTop : '50px'}}>
          <p className="text-center Test-font ">Test Series</p>
          <p className="text-center Total-users">Total Users Appeared : 1236</p>
          <div className="row d-flex justify-content-sm-center bottom justify-content-center">
            <div>
              {this.state.res[0] != undefined ? (this.showaddtocart(this.state.res[0].id, 0) ? (<div>{!this.state.res[0].live ?
                <div>{this.checklive(this.state.res[0].rollout_date) ?
                  <Link className="no-hover" to={`/start/${this.state.res[0].slug}`}>
                    <div className="mx-2 sym position-relative"><i className="fas fa-th fa-3x more-size"> </i><i className="fas fa-th fa-3x  less-size"></i>
                    </div></Link> : <div style={{ cursor: 'pointer' }} onClick={() => alert(`Quiz hasn't started yet, it will start at ${this.state.res[0].rollout_date}`)}>
                    <div className="mx-2 sym position-relative"><i className="fas fa-th fa-3x more-size"> </i><i className="fas fa-th fa-3x  less-size"></i>
                    </div></div>}</div> : <div onClick={() => alert(`This is a Quiz part of our AITS series , to access it click on more button near the Quiz and open ${this.state.res[0].name} correspondingly from there`)}>
                  <div className="mx-2 sym"><i className="fas fa-th fa-3x more-size ">
                  </i><i className="fas fa-th fa-3x  less-size"></i>
                  </div>
                </div>}</div>) : <div><div className="mx-2 sym position-relative" onClick={() => this.setState({ addModalShow: true, res1: this.state.res[0] })} ><i className="fas fa-th fa-3x more-size"> </i><i className="fas fa-th fa-3x  less-size"></i>
                  <div className="position-absolute place"><i className="fas fa-lock fa-2x more-size"></i><i className="fas fa-lock fa-2x less-size"></i></div>
                </div> </div>) : ''}
              {this.state.res[0] != undefined ? (
                <p className="mock mx-2">{this.state.res[0].name}</p>) :
                ""}
              {this.state.res[0] != undefined ?
                (<p className="mx-2" style={{ color: ' rgb(34, 235, 94)' }}>
                  {this.state.res[0].price !== 0 ? `Rs.${this.state.res[0].price}` : 'Free'}</p>) : ""}
            </div>
            <div>
              {this.state.res[1] != undefined ? (this.showaddtocart(this.state.res[1].id, 1) ? (<div>{!this.state.res[1].live ? <div>{this.checklive(this.state.res[1].rollout_date) ?
                <Link className="no-hover" to={`/start/${this.state.res[1].slug}`}>
                  <div className="mx-2 sym position-relative"><i className="fas fa-th fa-3x more-size"> </i><i className="fas fa-th fa-3x  less-size"></i>
                  </div></Link> : <div style={{ cursor: 'pointer' }} onClick={() => alert(`Quiz hasn't started yet, it will start at ${this.state.res[1].rollout_date}`)}>
                  <div className="mx-2 sym position-relative"><i className="fas fa-th fa-3x more-size"> </i><i className="fas fa-th fa-3x  less-size"></i>
                  </div></div>}</div> : <div onClick={() => alert(`This is a Quiz part of our AITS series , to access it click on more button near the Quiz and open ${this.state.res[1].name} correspondingly from there`)}>
                  <div className="mx-2 sym"><i className="fas fa-th fa-3x more-size ">
                  </i><i className="fas fa-th fa-3x  less-size"></i>
                  </div>
                </div>}</div>) : <div><div className="mx-2 sym position-relative" onClick={() => this.setState({ addModalShow: true, res1: this.state.res[1] })}><i className="fas fa-th fa-3x more-size"> </i><i className="fas fa-th fa-3x  less-size"></i>
                  <div className="position-absolute place"><i className="fas fa-lock fa-2x more-size"></i><i className="fas fa-lock fa-2x less-size"></i></div>
                </div> </div>
              ) : ''}
              {this.state.res[1] != undefined ? (<p className="mock mx-2">{this.state.res[1].name}</p>) : ''}
              {this.state.res[1] != undefined ? (<p className="mx-2" style={{ color: 'red' }}>{this.state.res[1].price !== 0 ? `Rs.${this.state.res[1].price}` : 'Free'}</p>) : ""}
            </div>
            <div>
              {this.state.res[2] != undefined ? (this.showaddtocart(this.state.res[2].id, 2) ? (<div>{!this.state.res[2].live ? <div>{this.checklive(this.state.res[2].rollout_date) ?
                <Link className="no-hover" to={`/start/${this.state.res[2].slug}`}><div className="mx-2 sym position-relative"><i className="fas fa-th fa-3x more-size"></i><i className="fas fa-th fa-3x  less-size"></i>
                  <div className="position-absolute more"><Link to="/TestSeries">More</Link></div>
                </div></Link> : <div><div style={{ cursor: 'pointer' }} className="mx-2 sym position-relative"><div onClick={() => alert(`Quiz hasn't started yet, it will start at ${this.state.res[2].rollout_date}`)}><i className="fas fa-th fa-3x more-size"></i><i className="fas fa-th fa-3x  less-size"></i></div>
                  <div className="position-absolute more"><Link to="/TestSeries">More</Link></div>
                </div></div>}</div> : <div onClick={() => alert(`This is a Quiz part of our AITS series , to access it click on more button near the Quiz and open ${this.state.res[2].name} correspondingly from there`)}>
                  <div className="mx-2 sym"><i className="fas fa-th fa-3x more-size ">
                  </i><i className="fas fa-th fa-3x  less-size"></i>
                  </div>
                </div>}</div>) : <div><div className="mx-2 sym position-relative" onClick={() => this.setState({ addModalShow: true, res1: this.state.res[2] })}><i className="fas fa-th fa-3x more-size"></i><i className="fas fa-th fa-3x  less-size"></i>
                  <div className="position-absolute place"><i className="fas fa-lock fa-2x more-size"></i><i className="fas fa-lock fa-2x less-size"></i></div>
                  <div className="position-absolute more"><Link to="/TestSeries">More</Link></div>
                </div> </div>) : ""}
              {this.state.res[2] != undefined ? (<p className="mock mx-2">{this.state.res[2].name}</p>) : ""}
              {this.state.res[2] != undefined ? (<p className="mx-2" style={{ color: 'red' }}>{this.state.res[2].price !== 0 ? `Rs. ${this.state.res[2].price}` : 'Free'}</p>) : ""}
            </div>
          </div>
        </div>

        <div className="na">
          <SideNav />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: (state.auth.token !== null),
    token: state.auth.token,
    userid: state.auth.userid
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
/*
<div className="chat" >
                 <div>
               <i class="far fa-comment-alt fa-4x"></i>
               </div>
               <div>
                 <Link className="chatwith">Chat with us</Link>
               </div>
               </div>
               <div id="share-buttons">

    <!-- Buffer -->
    <a href="https://bufferapp.com/add?url=https://simplesharebuttons.com&amp;text=Simple Share Buttons" target="_blank">
        <img src="https://simplesharebuttons.com/images/somacro/buffer.png" alt="Buffer" />
    </a>

    <!-- Digg -->
    <a href="http://www.digg.com/submit?url=https://simplesharebuttons.com" target="_blank">
        <img src="https://simplesharebuttons.com/images/somacro/diggit.png" alt="Digg" />
    </a>

    <!-- Email -->
    <a href="mailto:?Subject=Simple Share Buttons&amp;Body=I%20saw%20this%20and%20thought%20of%20you!%20 https://simplesharebuttons.com">
        <img src="https://simplesharebuttons.com/images/somacro/email.png" alt="Email" />
    </a>

    <!-- Facebook -->
    <a href="http://www.facebook.com/sharer.php?u=https://simplesharebuttons.com" target="_blank">
        <img src="https://simplesharebuttons.com/images/somacro/facebook.png" alt="Facebook" />
    </a>

    <!-- Google+ -->
    <a href="https://plus.google.com/share?url=https://simplesharebuttons.com" target="_blank">
        <img src="https://simplesharebuttons.com/images/somacro/google.png" alt="Google" />
    </a>

    <!-- LinkedIn -->
    <a href="http://www.linkedin.com/shareArticle?mini=true&amp;url=https://simplesharebuttons.com" target="_blank">
        <img src="https://simplesharebuttons.com/images/somacro/linkedin.png" alt="LinkedIn" />
    </a>

    <!-- Pinterest -->
    <a href="javascript:void((function()%7Bvar%20e=document.createElement('script');e.setAttribute('type','text/javascript');e.setAttribute('charset','UTF-8');e.setAttribute('src','http://assets.pinterest.com/js/pinmarklet.js?r='+Math.random()*99999999);document.body.appendChild(e)%7D)());">
        <img src="https://simplesharebuttons.com/images/somacro/pinterest.png" alt="Pinterest" />
    </a>

    <!-- Print -->
    <a href="javascript:;" onclick="window.print()">
        <img src="https://simplesharebuttons.com/images/somacro/print.png" alt="Print" />
    </a>

    <!-- Reddit -->
    <a href="http://reddit.com/submit?url=https://simplesharebuttons.com&amp;title=Simple Share Buttons" target="_blank">
        <img src="https://simplesharebuttons.com/images/somacro/reddit.png" alt="Reddit" />
    </a>

    <!-- StumbleUpon-->
    <a href="http://www.stumbleupon.com/submit?url=https://simplesharebuttons.com&amp;title=Simple Share Buttons" target="_blank">
        <img src="https://simplesharebuttons.com/images/somacro/stumbleupon.png" alt="StumbleUpon" />
    </a>

    <!-- Tumblr-->
    <a href="http://www.tumblr.com/share/link?url=https://simplesharebuttons.com&amp;title=Simple Share Buttons" target="_blank">
        <img src="https://simplesharebuttons.com/images/somacro/tumblr.png" alt="Tumblr" />
    </a>

    <!-- Twitter -->
    <a href="https://twitter.com/share?url=https://simplesharebuttons.com&amp;text=Simple%20Share%20Buttons&amp;hashtags=simplesharebuttons" target="_blank">
        <img src="https://simplesharebuttons.com/images/somacro/twitter.png" alt="Twitter" />
    </a>

    <!-- VK -->
    <a href="http://vkontakte.ru/share.php?url=https://simplesharebuttons.com" target="_blank">
        <img src="https://simplesharebuttons.com/images/somacro/vk.png" alt="VK" />
    </a>

    <!-- Yummly -->
    <a href="http://www.yummly.com/urb/verify?url=https://simplesharebuttons.com&amp;title=Simple Share Buttons" target="_blank">
        <img src="https://simplesharebuttons.com/images/somacro/yummly.png" alt="Yummly" />
    </a>

</div>*/