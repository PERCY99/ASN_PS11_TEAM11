import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../Ncert/Ncert.css'
class Otherbooks extends Component {
    render() {
        return (
            <div> 
                
                    <div className="ui simple dropdown item">
                    <i class="fas fa-book-open fa-4x ico more-size"></i>
                    <i className="fas fa-book-open fa-3x ico less-size"></i>
                    <div className="menu">
                        <div className="item"><Link to="/test/CBSE">CBSE</Link></div>
                        <div className="item"><Link to="/test/ICSE">ICSE</Link></div>
  
                        
                    </div>
                    </div>

         </div>
        )
    }
}
export default Otherbooks;
