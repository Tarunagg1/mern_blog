import { SET_LOADER, CLOSE_LOADER, CREATE_ERRORS, REDIRECT_TRUE, SET_MESSAGE, REMOVE_ERRORS, SET_POSTS, SET_POST, POST_REQUEST, SET_UPDATE_ERR, UPDATE_IMG_ERRORS, SET_DETAILS } from '../types/Posttype';
import { API_URL } from '../../config/Env';
import axios from 'axios';


export const createAction = (postData) => {
    return async (dispatch, getState) => {
        const { AuthReducer: { token } } = getState();
        dispatch({ type: SET_LOADER })
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
            const { data: { msg } } = await axios.post(`${API_URL}/create_post`, postData, config);
            dispatch({ type: CLOSE_LOADER })
            dispatch({ type: REMOVE_ERRORS })
            dispatch({ type: REDIRECT_TRUE });
            dispatch({ type: SET_MESSAGE, payload: msg });
        } catch (error) {
            console.log(error.response);
            dispatch({ type: CLOSE_LOADER })
            dispatch({ type: REMOVE_ERRORS })
            const { errors } = error.response.data;
            dispatch({ type: CREATE_ERRORS, payload: errors })
        }
    }
}

export const fetchPost = (id, page) => {
    return async (dispatch, getState) => {
        const { AuthReducer: { token } } = getState();
        dispatch({ type: SET_LOADER })
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
            const { data: { response, count, perPage } } = await axios.get(`${API_URL}/posts/${id}/${page}`, config);
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: SET_POSTS, payload: { response, count, perPage } });
        } catch (error) {
            dispatch({ type: CLOSE_LOADER })
        }
    }
}

export const FetchPost = (id) => {
    return async (dispatch, getState) => {
        const { AuthReducer: { token } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
        dispatch({ type: SET_LOADER })
        try {
            const { data: { post } } = await axios.get(`${API_URL}/post/${id}`, config);
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: SET_POST, payload: post });
            dispatch({ type: POST_REQUEST });
        } catch (error) {
            dispatch({ type: CLOSE_LOADER });
            console.log(error);
        }
    }
}

export const updatePost = (editdata) => {
    return async (dispatch, getState) => {
        const { AuthReducer: { token } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
        dispatch({ type: SET_LOADER })
        try {
            const { data } = await axios.post(`${API_URL}/updatepost`, editdata, config);
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: REDIRECT_TRUE });
            dispatch({ type: SET_MESSAGE, payload: data.msg });
            console.log(data);
        } catch (error) {
            dispatch({ type: CLOSE_LOADER });
            const { response: { data: { errors } } } = error;
            dispatch({ type: SET_UPDATE_ERR, payload: errors });
        }
    }
}

export const updateimageaction = (updateData) => {
    return async (dispatch, getState) => {
        const { AuthReducer: { token } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
        dispatch({ type: SET_LOADER })
        try {
            const { data: { msg } } = await axios.post(`${API_URL}/updateimage`, updateData, config);
            console.log(msg);
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: REDIRECT_TRUE });
            dispatch({ type: SET_MESSAGE, payload: msg });
        } catch (error) {
            dispatch({ type: CLOSE_LOADER });
            const { response: { data: { errors } } } = error;
            dispatch({ type: UPDATE_IMG_ERRORS, payload: errors });
        }
    }
}

export const homepost = (page) => {
    return async (dispatch) => {
        dispatch({ type: SET_LOADER })
        try {
            const { data: { response, count, perPage } } = await axios.get(`${API_URL}/homepost/${page}`);
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: SET_POSTS, payload: { response, count, perPage } });
        } catch (error) {
            dispatch({ type: CLOSE_LOADER })
        }
    }
}

export const postDetails = (id)=>{
    return async (dispatch)=>{
        dispatch({ type: SET_LOADER })
        try {
            const {data:{post}} =  await axios.get(`/details/${id}`);
            dispatch({ type: CLOSE_LOADER })
            dispatch({type:SET_DETAILS,payload:post})
        } catch (error) {
            dispatch({ type: CLOSE_LOADER })
            console.log(error);
        }
    }
}

export const postComment = async (commentdata)=>{
    return async (dispatch,getState)=>{
        console.log('mkjnh');
        console.log(commentdata);
        // const { AuthReducer: { token } } = getState();
        // const config = {
        //     headers: {
        //         Authorization: `Bearer ${token}`
        //     },
        // }
        // dispatch({ type: SET_LOADER })
        // try {
        //     const {data} =  await axios.get(`/comment`,commentdata,config);
        //     dispatch({ type: CLOSE_LOADER })
        //     console.log(data);
        // } catch (error) {
        //     dispatch({ type: CLOSE_LOADER })
        //     console.log(error);
        // }
    }   
}