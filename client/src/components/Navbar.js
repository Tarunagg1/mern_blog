import React from 'react'
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {LOG_OUT} from '../store/types/Usertypes'

export default function Navbar() {
    const {user} = useSelector((state) =>state.AuthReducer);
    const dispatch = useDispatch();

    const logout = ()=>{
        localStorage.removeItem('myToken');
        dispatch({type:LOG_OUT});
    }

    const Links = user ? <div className="navbar__right">
                    <li>
                        <Link to="/dashboard">{user.name}</Link>
                    </li>
                    <li>
                        <Link to="/createpost">Createpost</Link>
                    </li>
                    <li>
                        <span onClick={logout}>Logout</span>
                    </li>
            </div> : 
            <div className="navbar__right">
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
            </div>

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar__row">
                    <div className="navbar__left">
                        <Link to='/'>
                            <img className="logo" src="/images/logo.png" alt="not found" srcSet=""/>
                        </Link>
                    </div>
                    {Links}
                </div>
            </div>
        </nav>
    )
}
