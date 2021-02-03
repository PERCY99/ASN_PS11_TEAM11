import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import history from '../history';
import { Link } from 'react-router-dom';
import QuizlivePopup from './QuizlivePopup';
import './MCQlist.css';
class MCQlist extends Component {
    state = { quizdetails: [], res: [], addModalShow: false, quizdata: [] }
    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/api/quiz/quizzes/`)
            .then(res => this.setState({ quizdetails: res.data }))
        axios.get('http://127.0.0.1:8000/api/core/user-subscriptions/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${localStorage.getItem('token')}`
            }
        }).then(res => this.setState({ res: res.data.tests }))
    }
    displayRazorpay = async (info) => {
        const res = await this.loadScipt('https://checkout.razorpay.com/v1/checkout.js')
        if (!res) {
            alert('razorpay sdk failed to load. are you online?')
            return
        }
        const options = {
            "key": 'rzp_test_d60JA5dzjyDyZ0',
            "amount": "50000",
            "currency": "INR",
            "name": "UPSC BASIC FUNDA",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": info.order_id.id,
            "handler": function (response) {

                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature);
                axios.post('http://127.0.0.1:8000/api/cart/confirm-payment/', {
                    "razorpay_order_id": response.razorpay_order_id,
                    "razorpay_payment_id": response.razorpay_payment_id,
                    "razorpay_signature": response.razorpay_signature
                })

            },
            "prefill": {
                "name": "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "9999999999"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#F37254"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open()
    }

    loadScipt = (src) => {
        return new Promise(resolve => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }
    showaddtocart = (id, index) => {

        if (this.state.quizdetails[index] != undefined) {
            if (this.state.quizdetails[index].price == 0) {
                return true;
            }
        }
        if (this.state.res[0] == undefined) {
            return false;
        }
        const testmap = this.state.res.filter(sum => sum.id == id)
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
    buynow = (id, type) => {
        axios.post("http://127.0.0.1:8000/api/cart/buy-now/", {
            "type": type,
            "id": id
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${localStorage.getItem('token')}`
            }
        }).then((res) => this.displayRazorpay(res.data))
    }
    addtocart = (id) => {
        axios.post("http://127.0.0.1:8000/api/cart/add-to-cart/", {
            "type": "test",
            "id": id
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${localStorage.getItem('token')}`
            }
        }).then(() => history.push('/checkout'))
    }
    render() {

        let addModalClose = () => this.setState({ addModalShow: false })
        return (
            <div>
                <QuizlivePopup show={this.state.addModalShow} onHide={addModalClose} quizdata={this.state.quizdata} />
                <div className="row">
                    <div className="col-lg-7 quiz-listt">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="w-15 f-34">Sr. No.</th>
                                    <th className="w-30 f-34">MCQ Name</th>
                                    <th className="w-25 f-34">Price</th>
                                    <th className="w-25 f-34">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.quizdetails.map((quizde, index) => {
                                    return (<tr>
                                        <td className="w-15 f-24">{index + 1}.</td>
                                        <td className="w-30 f-25">{quizde.name}</td>
                                        <td className="w-15 f-25">{this.showaddtocart(quizde.id) == false ? (<div>Rs. {quizde.price}</div>) : "Purchased"}</td>
                                        <td className="w-40">
                                            {this.showaddtocart(quizde.id, index) == false ? (
                                                <div className="ui simple dropdown item py-1 d-flex justify-content-center align-items-center" style={{ background: '#00C2FF', borderRadius: '15px', width: '180px' }}>
                                                    Add to cart/Buy Now
                                                    <i className="dropdown icon"></i>
                                                    <div className="menu" style={{ width: '180px' }}>
                                                        <div className="item" onClick={() => localStorage.getItem('token') ? this.addtocart(quizde.id) : (history.push('/login'))}>Add To Cart</div>
                                                        <div className="item" onClick={() => localStorage.getItem('token') ? this.buynow(quizde.id, quizde.type) : (history.push('/login'))}>Buy Now</div>
                                                    </div>
                                                </div>) : (<div>
                                                    {quizde.live ? <button className="btn-test" style={{ backgroundColor: 'red' }} onClick={() => this.setState({ addModalShow: true, quizdata: quizde })}>Give Live Test</button> : <div>
                                                        {this.checklive(quizde.rollout_date) ? <Link to={`/start/${quizde.slug}`} className="no-hover"><button className="btn-test" >Open</button></Link> : <button className="btn-test" onClick={() => alert(`Quiz hasnt started yet, it will start on ${quizde.rollout_date}`)}>Scheduled</button>}</div>}</div>)
                                            }
                                        </td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-lg-5 mcqb">

                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}
export default connect(mapStateToProps)(MCQlist)
