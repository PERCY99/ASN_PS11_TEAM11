import React, { Component } from 'react'
import Timer from './Timer';
import axios from 'axios';

export default class QuizHead extends Component {
    state={questios:[]}
    componentDidMount(){
        axios.get(`http://127.0.0.1:8000/api/quiz/quizzes/${this.props.slug}`,{
        headers:{
            'Authorization':`token ${localStorage.getItem('token')}`
        }
    }).then(res=>this.setState({questios:res.data.quiz}))
}
    render() {
       
        return (
            <div className="container2">
                <div className="row py-3">
                    <div className="col-6">
                        <p className="f-29">{this.state.questios.name}</p>
                    </div>
                    <div className="col-6 ">
                        <p className="float-right"><Timer slug={this.props.slug}/></p>
                    </div>
                </div>
                <div style={{borderBottom:'5px solid red'}}></div>
            </div>
        )
    }
}
