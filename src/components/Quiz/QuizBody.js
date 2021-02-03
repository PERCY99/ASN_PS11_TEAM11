import './QuizBody.css';
import React, { Component } from 'react'
import questions from './Question.json';
import isEmpty from './is-empty';
import history from '../history';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import ReactFullscreen from 'react-easyfullscreen';


var check = [];
var chose = [];
var questionheading = [];
var questionoption = [];
var questionnumber = [];
var questionsetid = [];
var answersetid = [];
var colorscheme = [];

class QuizBody extends Component {

    state = {
        res: [], answerid: [], dummy: [],
        option: [],
        tes: [],
        nextquestion: [], prevquestion: [], answer: '',
        numberofQuestion: 0, numberofansweredQuestion: 0, ver: [],
        currentindex: 0, correctanswer: 0, wronganswer: 0, time: {}, useranswer: []
    }
    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/api/quiz/quizzes/${this.props.slug}`, {
            headers: {
                'Authorization': `token ${localStorage.getItem('token')}`
            }
        }).then(res => this.setState({ questions: res.data.quiz.quiztakers_set })).then(() => {
            if (this.state.questions.completed) {
                history.push(`/questionpaper/${this.props.slug}`)
            }
        })
        axios.get(`http://127.0.0.1:8000/api/quiz/quizzes/${this.props.slug}`, {
            headers: {
                'Authorization': `token ${localStorage.getItem('token')}`
            }
        }).then(res => { this.setState({ res: res.data.quiz }) }
        ).then(() => this.fetchQuestions()).then(() => this.fetchoptions()).then(() => this.fetchQuestionnumber()).then(() => this.fetchanswersetid()).then(() => this.fetchquestionsetid()).then(() => this.displayQuestions())
    }


    fetchquestionsetid = () => {
        if (this.state.res.question_set != undefined) {
            questionsetid = this.state.res.question_set.map(ques => {
                return ques.id;
            })
        }
    }
    fetchanswersetid = () => {
        if (this.state.res.question_set != undefined) {
            answersetid = this.state.res.question_set.map(ques => {
                return ques.answer_set.map(ide => { return ide.id })
            })
        }
    }
    fetchoptions = () => {
        if (this.state.res.question_set != undefined) {
            questionoption = this.state.res.question_set.map(ques => {
                return ques.answer_set.map(opt => { return opt.label })
            })
        }
    }
    fetchQuestionnumber = () => {
        if (this.state.res.question_set != undefined) {
            questionnumber = this.state.res.question_set.length;
        }
    }
    fetchQuestions = () => {
        if (this.state.res.question_set != undefined) {
            questionheading = this.state.res.question_set.map(ques => {
                return ques.label;
            })
        }
    }
    displayQuestions = () => {
        this.setState({ dummy: 'thanks' })
        if (chose[this.state.currentindex] != null) {
            var radiobtn = document.getElementById(`a${chose[this.state.currentindex]}`)
            radiobtn.checked = true;
        }
        if (chose[this.state.currentindex] == null) {
            this.clearAllRadios()
        }

    }
    handleoptionclick = (e) => {
        if (this.state.tes === 'y') {
            check[this.state.currentindex] = this.state.useranswer;
            chose[this.state.currentindex] = this.state.option;
            colorscheme[this.state.currentindex] = "green"

            axios.patch('http://127.0.0.1:8000/api/quiz/save-answer/', {
                "quiztaker": this.state.res.quiztakers_set.id,
                "question": questionsetid[this.state.currentindex],
                "answer": this.state.answerid
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`
                }
            })

        }
        if (this.state.tes != 'y' && this.state.ver != 'y' && check[this.state.currentindex] == null) {
            colorscheme[this.state.currentindex] = "red";
            check[this.state.currentindex] = null;
            chose[this.state.currentindex] = null;
        }
        if (this.state.tes != 'y' && this.state.ver != 'y' && check[this.state.currentindex] != null) {
            colorscheme[this.state.currentindex] = "green";
        }
        if (this.state.tes === '' && this.state.ver === 'y') {
            colorscheme[this.state.currentindex] = "red";
            check[this.state.currentindex] = null;
            chose[this.state.currentindex] = null;
            axios.patch('http://127.0.0.1:8000/api/quiz/save-answer/', {
                "quiztaker": this.state.res.quiztakers_set.id,
                "question": questionsetid[this.state.currentindex],
                "answer": "null"
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`
                }
            })
            this.setState({ ver: '' })
        }

        this.setState(prevState => ({
            currentindex: prevState.currentindex + 1
        }), () => {
            this.setState({ tes: '', answerid: '' })
            this.displayQuestions()
        });
    }
    handlemarkclick = (e) => {
        if (this.state.tes === 'y') {
            check[this.state.currentindex] = this.state.useranswer;
            chose[this.state.currentindex] = this.state.option;
            colorscheme[this.state.currentindex] = "blue"

            axios.patch('http://127.0.0.1:8000/api/quiz/save-answer/', {
                "quiztaker": this.state.res.quiztakers_set.id,
                "question": questionsetid[this.state.currentindex],
                "answer": this.state.answerid
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`
                }
            })

        }
        if (this.state.tes != 'y' && this.state.ver != 'y' && check[this.state.currentindex] == null) {
            colorscheme[this.state.currentindex] = "purple";
            check[this.state.currentindex] = null;
            chose[this.state.currentindex] = null;
        }
        if (this.state.tes != 'y' && this.state.ver != 'y' && check[this.state.currentindex] != null) {
            colorscheme[this.state.currentindex] = "blue";
        }
        if (this.state.tes === '' && this.state.ver === 'y') {
            colorscheme[this.state.currentindex] = "purple";
            check[this.state.currentindex] = null;
            chose[this.state.currentindex] = null;
            axios.patch('http://127.0.0.1:8000/api/quiz/save-answer/', {
                "quiztaker": this.state.res.quiztakers_set.id,
                "question": questionsetid[this.state.currentindex],
                "answer": "null"
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`
                }
            })
            this.setState({ ver: '' })
        }

        this.setState(prevState => ({
            currentindex: prevState.currentindex + 1
        }), () => {
            this.setState({ tes: '', answerid: '' })
            this.displayQuestions()
        });
    }
    handleoptionback = (e) => {
        if (this.state.tes === 'y') {
            colorscheme[this.state.currentindex] = "green";
            check[this.state.currentindex] = this.state.useranswer;
            chose[this.state.currentindex] = this.state.option;
            axios.patch('http://127.0.0.1:8000/api/quiz/save-answer/', {
                "quiztaker": this.state.res.quiztakers_set.id,
                "question": questionsetid[this.state.currentindex],
                "answer": this.state.answerid
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`
                }
            })

        }
        if (this.state.tes != 'y' && this.state.ver != 'y' && check[this.state.currentindex] == null) {
            colorscheme[this.state.currentindex] = "red";
            check[this.state.currentindex] = null;
            chose[this.state.currentindex] = null;
        }
        if (this.state.tes === '' && this.state.ver === 'y') {
            colorscheme[this.state.currentindex] = "red";
            axios.patch('http://127.0.0.1:8000/api/quiz/save-answer/', {
                "quiztaker": this.state.res.quiztakers_set.id,
                "question": questionsetid[this.state.currentindex],
                "answer": "null"
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`
                }
            })
            colorscheme[this.state.currentindex] = "red";
            check[this.state.currentindex] = null;
            chose[this.state.currentindex] = null;
            this.setState({ ver: '' })

        }
        this.setState(prevState => ({
            currentindex: prevState.currentindex - 1
        }), () => {
            this.setState({ tes: '', answerid: '' })
            this.displayQuestions()
        });
    }
    selectquestion = (index) => {
        if (this.state.tes === 'y') {
            check[this.state.currentindex] = this.state.useranswer;
            colorscheme[this.state.currentindex] = "green";
            chose[this.state.currentindex] = this.state.option;
            axios.patch('http://127.0.0.1:8000/api/quiz/save-answer/', {
                "quiztaker": this.state.res.quiztakers_set.id,
                "question": questionsetid[this.state.currentindex],
                "answer": this.state.answerid
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`
                }
            })
        }
        if (this.state.tes != 'y' && this.state.ver != 'y' && check[this.state.currentindex] == null) {
            check[this.state.currentindex] = null;
            colorscheme[this.state.currentindex] = "red";
            chose[this.state.currentindex] = null;
        }

        if (this.state.tes === '' && this.state.ver === 'y') {
            colorscheme[this.state.currentindex] = "red";
            axios.patch('http://127.0.0.1:8000/api/quiz/save-answer/', {
                "quiztaker": this.state.res.quiztakers_set.id,
                "question": questionsetid[this.state.currentindex],
                "answer": "null"
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`
                }
            })
            check[this.state.currentindex] = null;
            chose[this.state.currentindex] = null;
            this.setState({ ver: '' })

        }
        this.setState(prevState => ({
            currentindex: index
        }), () => {
            this.setState({ tes: '', answerid: '' })
            this.displayQuestions()
        });
    }
    clearAllRadios = () => {
        var A = document.getElementsByName('A');
        for (var i = 0; i < A.length; i++) {
            if (A[i].checked) A[i].checked = false;
        }
    }
    clearAllRadio = () => {
        var A = document.getElementsByName('A');
        for (var i = 0; i < A.length; i++) {
            if (A[i].checked) A[i].checked = false;
            this.setState({ tes: '', ver: 'y' })
        }
    }
    onSubmitQuiz = () => {
        if (this.state.tes === 'y') {
            axios.patch('http://127.0.0.1:8000/api/quiz/save-answer/', {
                "quiztaker": this.state.res.quiztakers_set.id,
                "question": questionsetid[this.state.currentindex],
                "answer": this.state.answerid
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`
                }
            })
            check[this.state.currentindex] = this.state.useranswer;
        }
        console.log('fire quiz submit');
        axios.post(`http://127.0.0.1:8000/api/quiz/quizzes/${this.props.slug}/submit/`, {
            "quiztaker": this.state.res.quiztakers_set.id
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${localStorage.getItem('token')}`
            }
        }).then(() => history.push(`/submit/${this.props.slug}`))

    }
    render() {
        const { currentquestion } = this.state;
        return (
            <div>
                <div className="row">
                    <div className="col-xl-2 col-sm-3 mt-2  quiz-box l-quiz">
                        <div className="row d-flex justify-content-between flex-column">

                            <div className="pos-d-icons">
                                <span className="border-r px-3 d-icons mr-2"></span>
                                <span className="direction-icons">Not Answered</span>
                            </div>
                            <div className="pos-d-icons">
                                <span className="border-g px-3 d-icons mx-2"></span>
                                <span className="direction-icons" >Answered</span>
                            </div>
                            <div className="pos-d-icons">
                                <span className="border-p px-3 d-icons mr-2"></span>
                                <span className="direction-icons">Marked for Review</span>
                            </div>
                            <div className="pos-d-icons">
                                <span className="border-n px-3 d-icons mr-1"></span>
                                <span className="direction-icons">Not Visited</span>
                            </div>

                            <div>
                                <span className="border-b px-3 d-icons"></span>
                                <span className="direction-icons span-rem">Answered & Marked for Review(Will be considered for evaluation)</span>
                            </div>
                        </div>
                        <div className="mt-4 blue-bg-c">Choose A Question</div>
                        <div className="row pt-2">
                            {questionheading.map((an, index) => {
                                return (<div className="col-3 my-2 btn-wid" onClick={() => { this.selectquestion(index) }}>
                                    <span key={index} className={`px-3  ${colorscheme[index] === 'green' ? 'border-g' : colorscheme[index] === "red" ? "border-r" : colorscheme[index] === "blue" ? 'border-b' : colorscheme[index] === "purple" ? "border-p" : "border-n"}`} >{index + 1}</span></div>
                                );
                            })}
                        </div>
                        <div className="row mt-5 d-flex flex-column align-items-center justify-content-center ">
                            <div className="my-2">
                                <Link to={`/questionpaper/${this.props.slug}`}>
                                    <Button className="left-q-btn" >
                                        Question Paper
                        </Button>
                                </Link>
                            </div>
                            <div>
                                <Button className=" mb-2 left-q-btn" onClick={() => { this.onSubmitQuiz() }}>Submit</Button>
                            </div>


                        </div>
                    </div>

                    <div className=" mx-auto col-xl-9 col-sm-8 l-quiz">
                        <div>
                            <div className="box-q pb-2">
                                <div className="f-34 pb-4 Question" style={{ background: '#f3f3f3'}} ><span className="px-4 f-34">{this.state.currentindex + 1}.</span>{questionheading[this.state.currentindex]}</div>
                                <div className="mt-3  opt f-18"><input type="radio" id="aA" className="ml-5 mr-2" name="A" value={questionoption[this.state.currentindex] != undefined ? questionoption[this.state.currentindex][0] : ''} onClick={e => { this.setState({ useranswer: e.target.value, option: 'A', tes: 'y', answerid: answersetid[this.state.currentindex][0] }) }}></input><label>{questionoption[this.state.currentindex] != undefined ? questionoption[this.state.currentindex][0] : null}</label></div>
                                <div className="opt f-18"><input type="radio" id="aB" className="ml-5 mr-2 " name="A" value={questionoption[this.state.currentindex] != undefined ? questionoption[this.state.currentindex][1] : ''} onClick={e => { this.setState({ useranswer: e.target.value, option: 'B', tes: 'y', answerid: answersetid[this.state.currentindex][1] }) }} ></input><label>{questionoption[this.state.currentindex] != undefined ? questionoption[this.state.currentindex][1] : null}</label></div>
                                <div className="opt f-18"><input type="radio" id="aC" className="ml-5 mr-2" name="A" value={questionoption[this.state.currentindex] != undefined ? questionoption[this.state.currentindex][2] : ''} onClick={e => { this.setState({ useranswer: e.target.value, option: 'C', tes: 'y', answerid: answersetid[this.state.currentindex][2] }) }}></input><label>{questionoption[this.state.currentindex] != undefined ? questionoption[this.state.currentindex][2] : null}</label></div>
                                <div className="opt f-18 mb-3"><input type="radio" id="aD" className="ml-5 mr-2" name="A" value={questionoption[this.state.currentindex] != undefined ? questionoption[this.state.currentindex][3] : ''} onClick={e => { this.setState({ useranswer: e.target.value, option: 'D', tes: 'y', answerid: answersetid[this.state.currentindex][3] }) }} /><label>{questionoption[this.state.currentindex] != undefined ? questionoption[this.state.currentindex][3] : null}</label></div>

                                {this.state.currentindex != questionnumber - 1 ? (<Button className="mx-2 mb-3 left-q-btn" style={{ width: "200px", backgroundColor: "#00C2FF", color: "black" }} onClick={this.handlemarkclick}>Mark For Review &Next</Button>) : ''}
                                <Button className="mx-2 mb-3 left-q-btn " onClick={this.clearAllRadio}>Clear</Button>
                                {this.state.currentindex != questionnumber - 1 ? (<Button className="mx-2  mb-3 float-lg-right" style={{ width: "200px", backgroundColor: "#00C2FF", color: "black" }} onClick={this.handleoptionclick}>Save & Next</Button>) : ''}
                                {this.state.currentindex == questionnumber - 1 ? (<Button className="mx-2  mb-2" style={{ width: "200px", backgroundColor: "#00C2FF", color: "black" }} onClick={this.onSubmitQuiz}>Submit</Button>) : ''}
                            </div>
                        </div>
                    </div>
                    <div className=" mx-auto col-xl-9 col-sm-8 s-quiz">
                        <div>
                            <div className="box-q box-q-2 pb-2">
                                <div className="f-34 pb-4" style={{ background: '#f3f3f3' , fontFamily : "Calligraffitti, cursive" }}><span className="px-4 f-34">{this.state.currentindex + 1}.</span>{questionheading[this.state.currentindex]}</div>
                                <div className="mt-3  opt f-18"><input type="radio" id="aA" className="ml-5 mr-2" name="A" value={questionoption[this.state.currentindex] != undefined ? questionoption[this.state.currentindex][0] : ''} onClick={e => { this.setState({ useranswer: e.target.value, option: 'A', tes: 'y', answerid: answersetid[this.state.currentindex][0] }) }}></input><label>{questionoption[this.state.currentindex] != undefined ? questionoption[this.state.currentindex][0] : null}</label></div>
                                <div className="opt f-18"><input type="radio" id="aB" className="ml-5 mr-2 " name="A" value={questionoption[this.state.currentindex] != undefined ? questionoption[this.state.currentindex][1] : ''} onClick={e => { this.setState({ useranswer: e.target.value, option: 'B', tes: 'y', answerid: answersetid[this.state.currentindex][1] }) }} ></input><label>{questionoption[this.state.currentindex] != undefined ? questionoption[this.state.currentindex][1] : null}</label></div>
                                <div className="opt f-18"><input type="radio" id="aC" className="ml-5 mr-2" name="A" value={questionoption[this.state.currentindex] != undefined ? questionoption[this.state.currentindex][2] : ''} onClick={e => { this.setState({ useranswer: e.target.value, option: 'C', tes: 'y', answerid: answersetid[this.state.currentindex][2] }) }}></input><label>{questionoption[this.state.currentindex] != undefined ? questionoption[this.state.currentindex][2] : null}</label></div>
                                <div className="opt f-18 mb-3"><input type="radio" id="aD" className="ml-5 mr-2" name="A" value={questionoption[this.state.currentindex] != undefined ? questionoption[this.state.currentindex][3] : ''} onClick={e => { this.setState({ useranswer: e.target.value, option: 'D', tes: 'y', answerid: answersetid[this.state.currentindex][3] }) }} /><label>{questionoption[this.state.currentindex] != undefined ? questionoption[this.state.currentindex][3] : null}</label></div>

                                {this.state.currentindex != questionnumber - 1 ? (<Button className="mx-2 mb-3 left-q-btn" style={{ width: "200px", backgroundColor: "#00C2FF", color: "black" }} onClick={this.handlemarkclick}>Mark For Review &Next</Button>) : ''}
                                <Button className="mx-2 mb-3" style={{ width: "200px", backgroundColor: "#00C2FF", color: "black" }} onClick={this.clearAllRadio}>Clear</Button>
                                {this.state.currentindex != questionnumber - 1 ? (<Button className="mx-2  mb-3 float-lg-right" style={{ width: "200px", backgroundColor: "#00C2FF", color: "black" }} onClick={this.handleoptionclick}>Save & Next</Button>) : ''}
                                {this.state.currentindex == questionnumber - 1 ? (<Button className="mx-2  mb-2" style={{ width: "200px", backgroundColor: "#00C2FF", color: "black" }} onClick={this.onSubmitQuiz}>Submit</Button>) : ''}
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 col-sm-3 mt-2  quiz-box s-quiz">
                        <div className="row d-flex justify-content-between flex-column">

                            <div className="pos-d-icons">
                                <span className="border-r px-3 d-icons mr-2"></span>
                                <span className="direction-icons">Not Answered</span>
                            </div>
                            <div className="pos-d-icons">
                                <span className="border-g px-3 d-icons mx-2"></span>
                                <span className="direction-icons" >Answered</span>
                            </div>
                            <div className="pos-d-icons">
                                <span className="border-p px-3 d-icons mr-2"></span>
                                <span className="direction-icons">Marked for Review</span>
                            </div>
                            <div className="pos-d-icons">
                                <span className="border-n px-3 d-icons mr-1"></span>
                                <span className="direction-icons">Not Visited</span>
                            </div>

                            <div>
                                <span className="border-b px-3 d-icons"></span>
                                <span className="direction-icons span-rem">Answered & Marked for Review(Will be considered for evaluation)</span>
                            </div>
                        </div>
                        <div className="mt-4 blue-bg-c">Choose A Question</div>
                        <div className="row pt-2">
                            {questionheading.map((an, index) => {
                                return (<div className="col-2 my-2 btn-wid" onClick={() => { this.selectquestion(index) }}>
                                    <span key={index} className={`px-3  ${colorscheme[index] === 'green' ? 'border-g' : colorscheme[index] === "red" ? "border-r" : colorscheme[index] === "blue" ? 'border-b' : colorscheme[index] === "purple" ? "border-p" : "border-n"}`} >{index + 1}</span></div>
                                );
                            })}
                        </div>
                        <div className="row mt-5 d-flex flex-column align-items-center justify-content-center ">
                            <div className="my-2">
                                <Link to={`/questionpaper/${this.props.slug}`}>
                                    <Button className="left-q-btn" >
                                        Question Paper
                        </Button>
                                </Link>
                            </div>
                            <ReactFullscreen>

                                {({ ref, onRequest, onExit }) => (
                                    <div
                                        ref={ref}>
                                        <Button className=" mb-2 left-q-btn" onClick={() => { this.onSubmitQuiz(); onExit() }}>Submit</Button>
                                    </div>

                                )}
                            </ReactFullscreen>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

export default QuizBody
