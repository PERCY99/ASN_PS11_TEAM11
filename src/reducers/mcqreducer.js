import _ from 'lodash';
export default(state={},action)=>{
    switch(action.type){
        case 'FETCHMCQ':
            return action.payload;
        default:
            return state;
        }
}