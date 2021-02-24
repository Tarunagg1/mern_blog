import React from 'react'
import {BrowserRouter as Router ,Route,Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
// import './main.scss';
import Home from './components/Home'
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Navbar from './components/Navbar';
import Store from './store';
import Dashboard from './components/Dashboard';
import PrivateRoute from './private/PrivateRoute';
import Notfound from './components/Notfound';


export default function App() {
    return (
        <Provider store={Store}>
            <Router>
                <Navbar />
                <Switch>
                    <Route path='/' exact component={Home}></Route>
                    <Route path='/register' exact component={Register}></Route>
                    <Route path='/login' exact component={Login}></Route>
                    <PrivateRoute path='/dashboard' exact component={Dashboard}></PrivateRoute>
                    <Route component={Notfound}></Route>
                </Switch>
            </Router>
        </Provider>
    )
}
