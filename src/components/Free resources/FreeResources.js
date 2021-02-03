import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import book from '../../images/book.png'
export default class FreeResources extends Component {
    render() {
        return (
            <div className="ui simple dropdown item">
             <Link to="/articles" className="no-hover">  <img src={book} className=" ico book-icon more-size"/>
                    <img src={book} className=" book-icon-mob ico less-size"/></Link>
            </div>
        )
    }
}
