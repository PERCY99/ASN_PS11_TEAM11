import React, { Component } from 'react'
import history from '../history'
import './TestStart.css';
import QuizBody from './QuizBody';
import axios from 'axios';
import { connect } from 'react-redux';
import Login from '../Login';
import image from '../../images/instructions.jpg';
import ReactFullscreen from 'react-easyfullscreen';

//import { FullScreen, useFullScreenHandle } from "react-full-screen";

class TestStart extends Component {
    state = { questions: [] }
    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/api/quiz/quizzes/${this.props.match.params.id}`, {
            headers: {
                'Authorization': `token ${localStorage.getItem('token')}`
            }
        }).then(res => this.setState({ questions: res.data.quiz.quiztakers_set }))
    }


    starttest = () => {
        if (this.state.questions.completed == true) {
            history.push(`/questionpaper/${this.props.match.params.id}`)
            // this.handle();
            return;
        }
        else
            history.push(`/quiz/${this.props.match.params.id}`)
    }


    render() {

        return (
            <div>
                {localStorage.getItem('token') ? (
                    <div>
                        <div className="top-gif">
                            <div className="container">
                                <p className="f-48"></p>
                                <p className="f-48">Mock Test</p>
                                <p><i className="far fa-envelope fa-3x pr-4"></i>
                                    <i className="fab fa-whatsapp fa-3x px-4"></i>
                                    <i className="fab fa-telegram fa-3x px-4"></i>
                                    <i className="fab fa-instagram fa-3x px-4"></i>
                                    <i className="fab fa-facebook fa-3x px-4"></i></p>
                            </div>
                        </div>
                        <div className="container body-heade">
                            <div className="row pt-3">
                                <p className="f-24">Created By:</p>
                            </div>
                            <div className="row">
                                <p className="f-18">Procto</p>
                            </div>
                        </div>
                        <div className="body-head">
                            <div className="container">
                                <div className="row f-18">
                                    Welcome Applicants !
                    </div>
                                <div className="row mt-3 f-18">
                                    <p>This page is for you to practice and get acquainted with your learning, exam format and pattern. You are advised to attempt and practice the mocktest</p>
                                    <p>Important: Please take the test on the Google Chrome browser only. (on Apple iPhone iOS you must use Safari browser) All the Best, Upsc Basic Funda</p>
                                </div>
                                <div className="row">
                                    <div className="col-xl-4 col-lg-5 mt-2">
                                        <img src={image}></img>
                                    </div>
                                    <div className="col-xl-8 col-lg-7 mt-2">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Symbol</th>
                                                    <th>Meaning</th>
                                                    <th>Remark</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><span className="border-r px-3"></span></td>
                                                    <td>Question visited but not answered</td>
                                                    <td>Shall NOT be Examined</td>
                                                </tr>
                                                <tr>
                                                    <td><span className="border-g px-3"></span></td>
                                                    <td>Question is visited and Answered</td>
                                                    <td>Shall be Examined</td>
                                                </tr>
                                                <tr>
                                                    <td><span className="border-p px-3"></span></td>
                                                    <td>The question has NOT been answered but marked for review</td>
                                                    <td>Shall NOT be Examined</td>
                                                </tr>
                                                <tr>
                                                    <td><span className="border-n px-3"></span></td>
                                                    <td>Question is not visited</td>
                                                    <td>Shall NOT be Examined</td>
                                                </tr>
                                                <tr>
                                                    <td><span className="border-b px-3"></span></td>
                                                    <td>The question is answered as well as marked for review</td>
                                                    <td>Shall be Examined</td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <h4>General Instructions</h4>
                                <div className="row text-title f-18">
                                    <div className="col-12">
                                        1. The clock will be set at the server. The countdown timer in the top right corner of screen will display the remaining time available for you to complete the examination. When the timer reaches zero, the examination will end by itself. You will not be required to end or submit your examination.
                            </div>
                                    <div className="col-12">
                                        2.The Question Palette displayed on the right side of screen will show the status of each question using one of the following symbols shown above:
                                </div>
                                    <div className="col-12">
                                        The Marked for Review status for a question simply indicates that you would like to look at that question again.
                                </div>
                                    <div className="col-12">
                                        3. You can click on question paper button on left side to view question paper at a glance
                                </div>
                                    <h4 className="mt-2">Navigating between questions</h4>
                                    <div className="col-12">
                                        4. To answer a question, do the following:
                                </div>
                                    <div className="col-12 mx-2">
                                        a. Click on the question number in the Question Palette at the right of your screen to go to that numbered question directly. Note that using this option does NOT save your answer to the current question.
                                </div>
                                    <div className="col-12 mx-2">
                                        b. Click on Save & Next to save your answer for the current question and then go to the next question.
                                </div>
                                    <div className="col-12 mx-2">
                                        c. Click on Mark for Review & Next to save your answer for the current question, mark it for review, and then go to the next question.
                                </div>
                                    <h4 className="mt-2">Answering Question</h4>
                                    <div className="col-12">
                                        5. Procedure for answering a multiple choice type question:
                                </div>

                                    <div className="col-12 mx-2">
                                        a. To select your answer, click on the button of one of the options
                                </div>
                                    <div className="col-12 mx-2">
                                        b. To deselect your chosen answer, click on the button of the chosen option again or click on the Clear Response button
                                </div>
                                    <div className="col-12 mx-2">
                                        c. To change your chosen answer, click on the button of another option
                                </div>
                                    <div className="col-12 mx-2">
                                        d. To save your answer, you MUST click on the Save & Next button
                                </div>
                                    <div className="col-12 mx-2">
                                        e. To mark the question for review, click on the Mark for Review & Next button.
                                </div>
                                    <div className="col-12 mx-2 ">
                                        f.  To change your answer to a question that has already been answered, first select that question for answering and then follow the procedure for answering that type of question.
                                </div>

                                </div>
                                <div className="row pt-4 f-18">
                                    <p>Anti-Cheating Mechanism</p>
                                    <p>Please read the instructions carefully before you proceed with practicing on the mock exams below: </p>
                                    <p># This exam is smartly protected by anti cheating mechanism Lock and Track, which tracks violations made.</p>
                                    <p># Minimizing the browse or exiting fullscreen mode shall be a violation.</p>
                                    <p># Any attempt to copy paste is a violation. # Any attempt to google out answers or deviate from the current browser tab shall lead to a ‘Violations Message’.</p>
                                    <p># Use of keys like Ctrl, Cmd, Esc, Alt shall lead to a violation. # This exam also records candidate's video to eliminate impersonation or malpractice. AI detects additional faces, objects, sounds, eye movement etc. and raises red flags.</p>
                                    <p> # Goggles are not allowed, only reading classes can be used # All such violations are recorded and will show in you performance report. </p>
                                    <p># After reaching a maximum allowed violations, you will be automatically logged out and disqualified for this exam. </p>
                                    <p># BE HONEST! Use of unfair means shall nullify your candidacy automatically</p>
                                </div>
                            </div>
                        </div>
                        <ReactFullscreen>

                            {({ ref, onRequest, onExit }) => (
                                <div className="container pb-5"
                                    ref={ref}>
                                    <button className="float-right btn-test" onClick={() => { this.starttest(); onRequest() }}>Start</button>
                                </div>

                            )}
                        </ReactFullscreen>


                    </div>) : <div><Login /></div>
                }
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: (state.auth.token !== null)
    }
}
export default connect(mapStateToProps)(TestStart)