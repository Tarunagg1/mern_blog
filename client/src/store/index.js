import {createStore,applyMiddleware,combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import AuthReducer from "./reducer/AuthReducer";


const rootReducer = combineReducers({
    AuthReducer,
})

const middleware = [thunkMiddleware];
const Store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
);

export default Store;

