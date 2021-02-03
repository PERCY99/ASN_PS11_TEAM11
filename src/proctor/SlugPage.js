import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export class SlugPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            res: [], quiz: [], addModalShow: false, res1: []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/quiz/quizzes/')
        .then(res => {this.setState({ res: res.data });
          console.log(res);}
        )
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
        return (
            <div>
            <Header {...this.props} />
            <p style = {{fontSize : "40px"}} className="row d-flex justify-content-sm-center bottom justify-content-center">
                Teachers Dashboard
            </p>
            <div  style = {{marginTop : "200px"}} className="row d-flex justify-content-sm-center bottom justify-content-center">
            <div>
              {this.state.res[0] != undefined ? (this.showaddtocart(this.state.res[0].id, 0) ? (<div>{!this.state.res[0].live ?
                <div>{this.checklive(this.state.res[0].rollout_date) ?
                  <Link className="no-hover" to={`/verification/${this.state.res[0].slug}`}>
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
                <Link className="no-hover" to={`/verification/${this.state.res[1].slug}`}>
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
                <Link className="no-hover" to={`/verification/${this.state.res[2].slug}`}><div className="mx-2 sym position-relative"><i className="fas fa-th fa-3x more-size"></i><i className="fas fa-th fa-3x  less-size"></i>
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
        )
    }
}

export default SlugPage
