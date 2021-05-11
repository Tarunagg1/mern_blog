import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import './main.scss';
import Home from './components/Home'
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Navbar from './components/Navbar';
import Store from './store';
import Dashboard from './components/Dashboard';
import PrivateRoute from './private/PrivateRoute';
import Notfound from './components/Notfound';
import Create from './components/Create'
import Edit from './components/Edit';
import Editimage from './components/Editimage';
import Updateprofile from './components/Updateprofile';
import Changepassword from './components/Changepassword';
import Details from './components/Details';


export default function App() {
    return (
        <Provider store={Store}>
            <Router>
                <Navbar />
                <Switch>
                    <Route path='/' exact component={Home}></Route>
                    <Route path='/home/:page' exact component={Home}></Route>
                    <Route path='/register' exact component={Register}></Route>
                    <Route path='/login' exact component={Login}></Route>
                    <Route path="/details/:id" exact component={Details}></Route>
                    <PrivateRoute path='/dashboard/:page?' exact component={Dashboard}></PrivateRoute>
                    <PrivateRoute path="/createpost" exact component={Create}></PrivateRoute>
                    <PrivateRoute path="/edit/:id" exact component={Edit}></PrivateRoute>
                    {/* <PrivateRoute path="/delete/:id" exact component={Edit}></PrivateRoute> */}
                    <PrivateRoute path="/updateiimage/:id" exact component={Editimage}></PrivateRoute>
                    <PrivateRoute path="/updateprofile" exact component={Updateprofile}></PrivateRoute>
                    <PrivateRoute path="/updatepassword" exact component={Changepassword}></PrivateRoute>

                    <Route component={Notfound}></Route>
                </Switch>
            </Router>
        </Provider>
    )
}
