import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
class CartA extends Component {
    state={res:[]}
    componentDidMount(){
     
    axios.get('http://54.202.69.72/api/core/user-subscriptions/',{
        headers:{
            'Authorization':`token ${this.props.token}`
        }
    }).then(res=>{console.log(res)})
    }
    render() {
        
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <p>My Cart</p>
                    </div>
        <div className="row"></div>
                </div>
            </div>
        )
    }
}
const mapStateToProps =state =>{
    return{
        token:state.auth.token
        }
}
export default connect(mapStateToProps)(CartA)