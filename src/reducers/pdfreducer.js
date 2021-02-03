import _ from 'lodash';
export default(state={},action)=>{
    switch(action.type){
        case 'FETCHPDF':
            return action.payload;
        default:
            return state;
        }
}