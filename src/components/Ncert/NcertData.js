import React from 'react'
import {connect} from 'react-redux';
import {fetchpdf} from '../actions';
import {fetchmcqs} from '../actions';
import {fetchsummary} from '../actions';
import image from '../../images/pdf_109.png';
//import faker from 'faker';
class  NcertData extends React.Component{
    componentDidMount(){
        this.props.fetchpdf(this.props.match.params.id);
        this.props.fetchsummary(this.props.match.params.id);
        this.props.fetchmcqs(this.props.match.params.id);
    }
    render() {
        return (
            <div>
                <p>{this.props.match.params.id}</p>

            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        notes:Object.values(state.notes)
    }
}
export default connect(mapStateToProps,{fetchpdf,fetchsummary,fetchmcqs})(NcertData);
