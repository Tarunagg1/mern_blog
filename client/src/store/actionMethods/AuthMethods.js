import axios from 'axios'
import { LOGIN_ERRORS, SET_USER } from '../types/Usertypes'
import { API_URL } from '../../config/Env';

export const postRegister = (state) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
        }

        dispatch({ type: 'SET_LODER' });

        try {
            const data = await axios.post(`${API_URL}/register`, state, config);
            dispatch({ type: 'CLOSE_LODER' });
            const token = data.data.token;
            localStorage.setItem('myToken', token);
            dispatch({ type: "SET_TOKEN", payload: token });
        } catch (error) {
            dispatch({ type: 'CLOSE_LODER' });
            dispatch({ type: "REGISTER_ERRORS", payload: error.response.data.errors });
            // console.log(error.response);
        }
    }
};

export const postLogin = (state) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
        }
        dispatch({ type: 'SET_LODER' });
        try {
            const data = await axios.post(`${API_URL}/login`, state, config);
            dispatch({ type: 'CLOSE_LODER' });
            const token = data.data.token;
            localStorage.setItem('myToken', token);
            dispatch({ type: "SET_TOKEN", payload: token });
        } catch (error) {
            dispatch({ type: 'CLOSE_LODER' });
            // console.log(error.response.data.errors);
            dispatch({ type: LOGIN_ERRORS, payload: error.response.data.errors });
        }
    };
};

export const getUserByIdData = (id) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
        }
        try {
            const { data } = await axios.post(`${API_URL}/getuserbyid`, id, config);
            dispatch({ type: SET_USER, payload: data });
        } catch (error) {
            console.log(error);
        }
    };
}

