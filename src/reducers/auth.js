import * as actionTypes from '../components/actions/actionTypes';
import { updateObject } from '../components/utility';

const initialState = {
    token: null,
    error: null, 
    loading: false,
    message:''
}

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        userid:action.userid,
        token: action.token,
        error: null,
        loading: false
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const authLogout = (state, action) => {
    return updateObject(state, {
        userid:null,
        token: null
    });
}
const authreset=(state,action)=>{
    return updateObject(state,{
        message:action.message
    })
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.PASSWORD_RESET_SUCCESS:return authreset(state,action)
        case actionTypes.PASSWORD_RESET_FAIL:
        case actionTypes.PASSWORD_RESET_CONFIRM_SUCCESS:
        case actionTypes.PASSWORD_RESET_CONFIRM_FAIL:    
        return{
            ...state
        }
        default:
            return state;
    }
}

export default reducer;