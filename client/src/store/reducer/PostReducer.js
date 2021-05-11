import {SET_LOADER,CLOSE_LOADER,CREATE_ERRORS,REDIRECT_TRUE,SET_MESSAGE,RESET_UPDATE_IMAGE_ERRORS,REMOVE_ERRORS,REDIRECT_FALSE,REMOVE_MESSAGE,SET_POSTS,UPDATE_IMG_ERRORS,SET_POST,POST_REQUEST,POST_RESET,SET_UPDATE_ERR,RESET_UPDATE_ERR, SET_DETAILS} from '../types/Posttype';

const initState = {
    loading:false,
    createErrors:[],
    redirect:false,
    message:'',
    posts:[],
    perPage: 0,
    count:0,
    post:{},
    postStatus:false,
    updateErrors:[],
    updateImageErrors:[],
    details:[]
}
export const PostReducer = (state = initState,action)=>{
    if(action.type === SET_LOADER){
        return {...state,loading:true};
    }else if(action.type === CLOSE_LOADER){
        return {...state,loading:false};
    }else if(action.type === CREATE_ERRORS){
        return {...state,createErrors:action.payload};
    }else if(action.type === REDIRECT_TRUE){
        return {...state,redirect:true};
    }else if(action.type === SET_MESSAGE){
        return {...state,message:action.payload};
    }else if(action.type === REMOVE_ERRORS){
        return {...state,createErrors:[]};
    }else if(action.type === REDIRECT_FALSE){
        return {...state,redirect:false}
    }else if(action.type === REMOVE_MESSAGE){
        return {...state,message:''};
    }
    else if(action.type === SET_DETAILS){
        return {...state,details:action.payload}
    }
    else{
        return state;
    }
}


export const Fetchposts = (state=initState,action)=>{
    const {type,payload} = action;
    if(type === SET_POSTS){
        return {...state,posts:payload.response,perPage:payload.perPage,count:payload.count};
    }
    else{
        return state;
    }
}

export const FetchPost = (state = initState,action)=>{
    const {type,payload} = action;
    if(type === SET_POST){
        return {...state,post:payload};
    }else if(type === POST_REQUEST){
        return {...state,postStatus:true};
    }else if(type === POST_RESET){
        return {...state,postStatus:false};
    }
    else{
        return state;
    }
}

export const UpdatePost = (state = initState,action)=>{
    const {type,payload} = action;
    if(type === SET_UPDATE_ERR){
        return {...state,updateErrors:payload}
    }else if(type === RESET_UPDATE_ERR){
        return {...state,updateErrors:[]}
    }else{
        return state;
    }
}

export const updateImage = (state=initState,action)=>{
    const {type,payload} = action;
    if(type === UPDATE_IMG_ERRORS){
        return {...state,updateImageErrors:payload};
    }else if(type === RESET_UPDATE_IMAGE_ERRORS){
        return {...state,updateImageErrors:[]}
    }else{
        return state;
    }
}

