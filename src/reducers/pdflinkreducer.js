import _ from 'lodash';
export default(state={},action)=>{
    switch(action.type){
        case 'FETCHZEROPRICE':
            return action.payload;
        default:
            return state;
        }
}