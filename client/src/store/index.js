import {createStore,applyMiddleware,combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import AuthReducer from "./reducer/AuthReducer";
import {PostReducer,Fetchposts,FetchPost,UpdatePost,updateImage} from './reducer/PostReducer';
import Updateprofilereducer from './reducer/Updateprofilereducer';
import { composeWithDevTools } from 'redux-devtools-extension';


const rootReducer = combineReducers({
    AuthReducer,
    PostReducer,
    Fetchposts,
    FetchPost,
    UpdatePost,
    updateImage,
    Updateprofilereducer
})

const middleware = [thunkMiddleware];
const Store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;

