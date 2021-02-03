import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Ncert.css';
import book from '../../images/book.png'
class Ncert extends Component {
    render() {
        return (
            <div> 
                    <div className="ui simple dropdown item">
                    <img src={book} className=" ico book-icon more-size"/>
                    <img src={book} className=" book-icon-mob ico less-size"/>
                    <div className="menu">
                        <div className="item"><Link to="/test/Class 6">Class 6</Link></div>
                        <div className="item"><Link to="/test/Class 7">Class 7</Link></div>
                        <div className="item"><Link to="/test/Class 8">Class 8</Link></div>
                        <div className="item"><Link to="/test/Class 9">Class 9</Link></div>
                        <div className="item"><Link to="/test/Class1 0">Class 10</Link></div>
                        <div className="item"><Link to="/test/Class 11">Class 11</Link></div>
                        <div className="item"><Link to="/test/Class 12">Class 12</Link></div>
                        
                
                    </div>

                </div>

            </div>
        )
    }
}
export default Ncert;
