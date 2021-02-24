import jwt_decode from 'jwt-decode';
import {SET_LODER,CLOSE_LODER,REGISTER_ERRORS,SET_TOKEN,LOG_OUT,LOGIN_ERRORS} from '../types/Usertypes';

const initState = {
    loading:false,
    registerErrors:[],
    loginErrors:[],
    token:'',
    user:''
}

const verifytoken = (token)=>{
        const decodedToken = jwt_decode(token);
        const ExpireIn = new Date(decodedToken.exp * 1000);
        if(new Date() > ExpireIn){
            localStorage.removeItem('moToken');
            return;
        }else{
            return decodedToken; 
        }
};

const token = localStorage.getItem('myToken');
if(token){
    const decodetoken = verifytoken(token);
    initState.token = token;
    const {user} = decodetoken;
    initState.user = user;
}

const AuthReducer = (state = initState , action) =>{
    // console.log(action);
    if(action.type === SET_LODER){
        return {...state,loading:true}
    }
    else if(action.type === CLOSE_LODER){
        return {...state,loading:false}
    }
    else if(action.type === REGISTER_ERRORS){
        return {...state,registerErrors:action.payload}
    }
    else if(action.type === SET_TOKEN){
        const decoded = verifytoken(action.payload);
        const {user} = decoded;
        return {...state,token:action.payload,user:user,loginErrors:[],registerErrors:[]};
    }
    else if(action.type === LOG_OUT){
        return {...state,token:'',user:''};
    }
    else if(action.type === LOGIN_ERRORS){
        return {...state,loginErrors:action.payload}
    }
    else{
        return state
    }
}

export default AuthReducer;