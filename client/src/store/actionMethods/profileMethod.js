import {
    SET_LOADER,
    SET_UPDATE_PROFILE_ERRORS,
    SET_SUCCESS_MESSAGE,
    CLOSE_LOADER,
    UPDATE_PASSWORD_ERRORS,
    UPDATE_PASSWORD_SUCCESS
} from '../types/Updateprofiletype';

import { API_URL } from '../../config/Env';
import axios from 'axios';
import { dispatch } from 'react-hot-toast';
import { CLOSE_LODER } from '../types/Usertypes';

export const updateProfile = (updatedata) => {
    return async (dispatch, getState) => {
        const { AuthReducer: { token } } = getState();
        dispatch({ type: SET_LOADER });
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
            const { data: { msg } } = await axios.post(`${API_URL}/updateprofile`, updatedata, config);
            dispatch({ type: SET_SUCCESS_MESSAGE, payload: msg });
            dispatch({ type: CLOSE_LOADER });
        } catch (error) {
            dispatch({ type: CLOSE_LOADER });
            const { response: { data: { errors } } } = error;
            dispatch({ type: SET_UPDATE_PROFILE_ERRORS, payload: errors });
        }
    }
}

export const UpdatePassword = (updatedata) => {
    return async (dispatch, getState) => {
        const { AuthReducer: { token } } = getState();
        dispatch({ type: SET_LOADER });
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
            const { data: { msg } } = await axios.post(`${API_URL}/changepassword`, updatedata, config);
            dispatch({ type: CLOSE_LODER });
            dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: msg });
        } catch (error) {
            dispatch({ type: CLOSE_LOADER });
            const { response: { data: { errors } } } = error;
            dispatch({ type: UPDATE_PASSWORD_ERRORS, payload: errors });
            // console.log(errors);
        }
    }
}

