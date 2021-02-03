import React, { Component } from 'react'
import { PieChart } from 'react-minimal-pie-chart';
import {connect} from 'react-redux';
import './Submit.css';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';
class Submit extends Component {
    state={res:[],hour:"",min:"",sec:""}
    componentDidMount(){
        axios.get(`http://127.0.0.1:8000/api/quiz/quizzes/${this.props.match.params.id}`,{
            headers:{
                'Authorization':`token ${localStorage.getItem('token')}`
            }
        }).then(res=>{this.setState({res:res.data.quiz})} ).then(()=>{
                var finished=this.state.res.quiztakers_set.date_finished;
                var started=this.state.res.quiztakers_set.starttime;
                var finish = new Date(`${finished}`);
                var start =new Date(`${started}`);
                var diff=finish-start;
                var  hour=Math.floor(diff/3600000);
                var min = Math.floor((diff - (hour * 3600000)) / 60000);
                var chec = min / 10;
    var minute = chec <= 1 ? `0${min}` : min;
                var sec = Math.floor((diff - (hour * 3600000 + min * 60000)) / 1000);
                this.setState({hour:hour,min:minute,sec:sec})
        })
    }
    render() {
        return (
            <div>
{this.state.res.id!=undefined?(
                <div className="row">
                    <div className="col-2 left-nav d-flex flex-column justify-content-center align-items-center">
<p className="result-background f-28">{this.state.res.name}</p>
                        <p className="result-background f-28">{`Current Rank: ${this.state.res.quiztakers_set.rank}`}</p>
<p className="result-background f-28 text-center">Rank On Date Of Test : {this.state.res.quiztakers_set.quiz_day_rank}</p>
                        <p className="f-28">Time Spent:</p>
                        <p className="f-28">{`0${this.state.hour}`}:{this.state.min}:{this.state.sec}</p>
                    </div>
                    <div className="col-10">
                        <p className="blue-bg text-center  d-flex flex-column justify-content-center align-items-center f-40">Check Answers with Explanations</p>
                        <p className="f-36">Your test Result</p>
                        <div className="row">
                            <div className="col-2">
<p className="f-144" style={{color:'#C4C4C4'}}>{this.state.res.quiztakers_set.correct_answers+this.state.res.quiztakers_set.wrong_answers+this.state.res.quiztakers_set.not_attempted}</p>
                                <p className="f-24-1">Total Questions</p>
                            </div>
                            <div className="col-2">
<p className="f-144" style={{color:'#20B038'}}>{this.state.res.quiztakers_set.correct_answers}</p>
                                <p className="f-24-1">Correct Answers</p>
                            </div>
                            <div className="col-2">
<p className="f-144" style={{color:'#C4C4C4'}}>{this.state.res.quiztakers_set.not_attempted}</p>
                                <p className="f-24-1">Not Attempted</p>
                            </div>
                            <div className="col-2">
<p className="f-144" style={{color:'#C4C4C4'}}>{this.state.res.quiztakers_set.wrong_answers}</p>
                                <p className="f-24-1">Wrong</p>
                            </div>
                            <div className="col-2">
<p className="f-144" style={{color:'#0093C4'}}>{this.state.res.quiztakers_set.score}</p>
                                <p className="f-24-1">Total</p>
                            </div>
                            <div className="col-2">
<p className="f-144" style={{color:'#C4C4C4'}}>{this.state.res.quiztakers_set.rank}</p>
                                <p className="f-24-1">Rank</p>
                            </div>
                        </div>
                        <div className="container pt-5" style={{width:'220px'}}>          
<PieChart
  data={[
    { title: 'Correct', value:(this.state.res.quiztakers_set.correct_answers), color: '#0093C4' },
    { title: 'Wrong', value: (this.state.res.quiztakers_set.wrong_answers), color: '#F90909' }
  ]}
/>
<div className="d-flex justify-content-center pt-4">
<span><span className="label-color-blue mr-4"></span>Attempted</span>
<span><span className="label-color-red mr-4"></span>Wrong</span>

</div>

                        </div>
                        <div className="row mt-5">
                        <Button className="mx-auto"><Link to="/" className="no-hover f-24 px-5">Return to Homepage</Link></Button>
                        </div>
                    </div>
                </div>):(<div className="text-center">
  <div className="spinner-border" role="status">
    <span className="sr-only">Loading...</span>
  </div>
</div>)
                }
            </div>
        )
    }
}
const mapStateToProps =state =>{
    return{
        token:state.auth.token
        }
}
export default connect(mapStateToProps)(Submit)
