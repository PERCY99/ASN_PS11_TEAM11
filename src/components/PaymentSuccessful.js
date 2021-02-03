import React, { Component } from 'react'
import './PaymentSuccessful.css';
import {Link} from 'react-router-dom'
import history from './history'
export default class PaymentSuccessful extends Component {
    render() {
      {setTimeout(()=>history.push('/'),10000)}
        return (
            <div>
                <div className="container pt-4 sty-success">
  <div class="printer-top"></div>
  <div class="paper-container">
    <div class="printer-bottom"></div>

    <div class="paper">
      <div class="main-contents">
        <div class="success-icon">&#10004;</div>
        <div class="success-title">
          Payment Successful
        </div>
        <div className="success-description text-center">
          Your order has been successfully added to your {<Link to="/material">Materials</Link>}.
        </div>
        <div className="order-details text-center">
          <div className="order-number-label">Order Number</div>
        <div className="order-number">{this.props.match.params.id}</div>
        </div>
        <div className="order-footer pt-4">Thank you!</div>
        <div className="order-footer pt-4"><Link to="/">Click here if not automatically redirected to homepage in 5sec</Link></div>
      </div>
      <div class="jagged-edge"></div>
    </div>
  </div>
</div>
            </div>
        )
    }
}
