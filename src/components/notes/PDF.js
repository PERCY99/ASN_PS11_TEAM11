import React from 'react';
import {connect} from 'react-redux';
import {fetchpdf} from '../actions/index'
import image from '../../images/pdf_109.png';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

class PDF extends React.Component {
    componentDidMount(){
        this.props.fetchpdf(this.props.id);
    }
   
    render() {

        return (
            <div>
                
              
             
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        notes:Object.values(state.pdf),
        token: (state.auth.token)
            
    }
}
export default connect(mapStateToProps,{fetchpdf})(PDF);
