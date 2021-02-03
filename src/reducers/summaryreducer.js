import _ from 'lodash';
export default(state={},action)=>{
    switch(action.type){
        case 'FETCHSUMMARY':
            return action.payload;
        default:
            return state;
        }
}