import React, { Component } from 'react'
//import QuizHead from './QuizHead'
import axios from 'axios'
import {Link} from "react-router-dom";
import {Button} from 'react-bootstrap';
export default class QuestionPaper extends Component {
    state={questions:[],questioons:[]}
    componentDidMount(){
        axios.get(`http://127.0.0.1:8000/api/quiz/quizzes/${this.props.match.params.id}`,{
        headers:{
            'Authorization':`token ${localStorage.getItem('token')}`
        }
    }).then(res=>this.setState({questions:res.data.quiz}))
        axios.get(`http://127.0.0.1:8000/api/quiz/quizzes/${this.props.match.params.id}`,{
        headers:{
            'Authorization':`token ${localStorage.getItem('token')}`
        }
    }).then(res=>this.setState({questioons:res.data.quiz.quiztakers_set}))
}
renderoptions=(options)=>{
    return( <div className="ml-5">
        {options.answer_set.map((option,index)=>{
            return (
                <div>
            <div className="row f-18"><li>{option.label}</li></div>
            </div>
            )
        })
        
}
    </div>)
}
renderquestions=(question,index)=>{
   return (<div className="box-q mb-4">
        <div className="row ml-3 f-24">{`${index}.  ${question.label}` }?</div>
        <div className="row">{this.renderoptions(question)}</div>
    </div>)
}
    render() {
    
        return (
            <div>
                 <div className="QuizHead py-3 f-24 px-4">
                Question Paper At a glance
                </div>
                {this.state.questioons.completed?"":(<Button className="my-2" style={{width:"200px",backgroundColor:"#00C2FF",color:"black"}}>
                <Link className="no-hover" to={`/quiz/${this.props.match.params.id}`}>Return to Test Page</Link>
                </Button>)}
                
                <div className="container">
                    {this.state.questions.question_set!=undefined?(this.state.questions.question_set.map((question,index)=>{
                      return this.renderquestions(question,index+1)
                    })):""}
                    </div>
                    <div className="float-right mx-5">
                    {this.state.questioons.completed?"":(<Button className="my-2" style={{width:"200px",backgroundColor:"#00C2FF",color:"black"}}>
                <Link className="no-hover" to={`/quiz/${this.props.match.params.id}`}>Return to Test Page</Link>
                </Button>)}
                    </div>
                </div>
        )
    }
}
