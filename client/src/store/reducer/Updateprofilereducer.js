import {
    SET_LOADER,
    CLOSE_LOADER,
    SET_UPDATE_PROFILE_ERRORS,
    REMOVE_UPDATE_PROFILE_ERRORS,
    SET_SUCCESS_MESSAGE,
    REMOVE_SUCCESS_MESSAGE,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_ERRORS,
    REMOVE_UPDATE_PASSWORD_ERRORS,
    REMOVE_UPDATE_PASSWORD_SUCCESS
} from '../types/Updateprofiletype';

const initState = {
    loading: false,
    UPDATE_PASSWORD_ERRORS: [],
    UPDATE_PASSWORD_SUCCESS: '',
    CHANGE_PROFILE_ERRORS: [],
    SUCCESSMESSAGE: ''
}

const Updateprofilereducer = (state = initState, action) => {
    const { type, payload } = action;
    if (type === SET_LOADER) {
        return { ...state, loading: true };
    } else if (type === CLOSE_LOADER) {
        return { ...state, loading: false };
    } else if (type === SET_UPDATE_PROFILE_ERRORS) {
        return { ...state, CHANGE_PROFILE_ERRORS: payload };
    } else if (type === REMOVE_UPDATE_PROFILE_ERRORS) {
        return { ...state, CHANGE_PROFILE_ERRORS: [] };
    } else if (type === SET_SUCCESS_MESSAGE) {
        return { ...state, SUCCESSMESSAGE: payload }
    } else if (type === REMOVE_SUCCESS_MESSAGE) {
        return { ...state, SUCCESSMESSAGE: '' }
    }
    else if (type === UPDATE_PASSWORD_ERRORS) {
        return { ...state, UPDATE_PASSWORD_ERRORS: payload };
    }
    else if (type === UPDATE_PASSWORD_SUCCESS) {
        return { ...state, UPDATE_PASSWORD_SUCCESS: payload };
    } else if (type === REMOVE_UPDATE_PASSWORD_ERRORS) {
        return { ...state, UPDATE_PASSWORD_ERRORS: [] };
    } else if (type === REMOVE_UPDATE_PASSWORD_SUCCESS) {
        return { ...state, UPDATE_PASSWORD_SUCCESS: '' };
    }
    else {
        return state;
    }
}


export default Updateprofilereducer;