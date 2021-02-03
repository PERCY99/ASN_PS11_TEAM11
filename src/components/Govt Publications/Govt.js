import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import book from '../../images/book.png';
class Govt extends Component {
    render() {
        return (
            <div> 
                
                    <div className="ui simple dropdown item">
                    <img src={book} className=" ico book-icon more-size"/>
                    <img src={book} className=" book-icon-mob ico less-size"/>
                    <div className="menu">
                        <div className="item"><Link to="/test/Economy Survey">Economy Survey</Link></div>
                        <div className="item"><Link to="/test/Budget IYB">Budget/IYB</Link></div>
                    </div>
                    </div>

         </div>
        )
    }
}
export default Govt;
