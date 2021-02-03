import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../Ncert/Ncert.css'
import './News.css';
class Ncert extends Component {
    render() {
        return (
            <div> 
                    <div className="ui simple dropdown item">
                  <Link to="/news" className="no-hover">  <i class="fas fa-book-open fa-4x ico more-size"></i><i className="fas fa-book-open fa-3x ico less-size"></i></Link>
                    </div>

         </div>
        )
    }
}
export default Ncert;
