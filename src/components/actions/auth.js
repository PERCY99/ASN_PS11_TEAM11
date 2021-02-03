import axios from 'axios';
import * as actionTypes from './actionTypes';
import history from '../history';
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token,userid) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userid:userid
    }
}
export const password_reset_success = (message) => {
    return {
        type: actionTypes.PASSWORD_RESET_SUCCESS,
        message:message
    }
}
export const reset_password=email=>async dispatch=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    };
    const body=JSON.stringify({email});
    axios.post(`http://127.0.0.1:8000/rest-auth/password/reset/`,body,config).then(res=>{
    let out=res.data;  
    dispatch(
           password_reset_success(out)
        )
    }).catch(err=>{
        dispatch({
            type:actionTypes.PASSWORD_RESET_FAIL
        })

    })}
export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('user');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        
        axios.post('http://127.0.0.1:8000/rest-auth/login/', {
            username: username,
            password: password
        })
        .then(res => {
            const token = res.data.key;
            const userid=res.data.user;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('userid', userid);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token,userid));
            dispatch(checkAuthTimeout(3600));
            history.push('/');
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}
export const authLoginwithfacebook = (tok) => {
    return dispatch => {
        dispatch(authStart());
        
        axios.post('http://127.0.0.1:8000/rest-auth/facebook/',{access_token:tok})
        .then(res => {
            const token = res.data.key;
            const userid=res.data.user;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('userid', userid);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token,userid));
            dispatch(checkAuthTimeout(3600));
            history.push('/');
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}
export const authLoginwithgoogle = (tok) => {
    return dispatch => {
        dispatch(authStart());
        
        axios.post('http://127.0.0.1:8000/rest-auth/google/',{access_token:tok})
        .then(res => {
            const token = res.data.key;
            const userid=res.data.user;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('userid', userid);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token,userid));
            dispatch(checkAuthTimeout(3600));
            history.push('/');
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}
export const reset_password_confirm=(uid,token,new_password,re_new_password)=>async dispatch =>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    };
    const body=JSON.stringify({uid,token,new_password,re_new_password});
    axios.post(`http://127.0.0.1:8000/rest-auth/password/reset/confirm`,body,config).then(res=>{
        dispatch({
            type:actionTypes.PASSWORD_RESET_CONFIRM_SUCCESS
        })
    }).catch(err=>{
        dispatch({
            type:actionTypes.PASSWORD_RESET_CONFIRM_FAIL
        })

    })
}
export const authSignup = (name,username,email,password1, password2,contact , image) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/rest-auth/registration/', {
            first_name:name,
            last_name:name,
            username: username,
            password1: password1,
            password2: password2,
            mobile: contact,
            email:email,
            base64 : image,
            profile_pic : image,
        })  
        .then(res => {
            const token = res.data.key;
            const userid=res.data.user;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('userid', userid);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token,userid));
            dispatch(checkAuthTimeout(3600));
            history.push('/signupsuccess');
        })
        .catch(err => {
            dispatch(authFail(err))
        })   
}
}
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === undefined) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if ( expirationDate <= new Date() ) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000) );
            }
        }
    }
}
