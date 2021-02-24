import React,{Fragment,useState,useEffect} from 'react';
import {Helmet} from "react-helmet";
import { useDispatch,useSelector} from 'react-redux';
import {postLogin} from '../../store/actionMethods/AuthMethods'
import toast, { Toaster } from 'react-hot-toast';

export default function Login(props) {

    const dispatch = useDispatch();
    const {loginErrors,loading,user} = useSelector(state => state.AuthReducer);

    const [User, setUser] = useState({
        email:'',
        password:''
    })

    const handelInput = (e)=>{
        const name = e.target.name;
        setUser({...User,[name]:e.target.value});
    }

    const formSubmit = (e)=>{
        e.preventDefault();
        dispatch(postLogin(User));
    }

    useEffect(() => {
        if(loginErrors.length > 0){
            loginErrors.map(err =>{
                toast.error(err.msg)
            })
        }
        if(user){
            props.history.push("/dashboard")
        }
    }, [loginErrors,user])

    return (
        <Fragment>
            <Helmet>
                <title>User Login -- Blog</title>
                <meta name="description" content="learn html css javascript"/>
            </Helmet>
            <div className="row mt-80">
                <div className="col-8">
                    <div className="bgimage1"></div>
                    <Toaster   position="top-right" reverseOrder={false} toastOptions={{style: {fontSize:'14px' } }} />
                </div>
                <div className="col-4">
                    <div className="account">
                        <h3 className="account__title">Login Here</h3>
                        <div className="account__section">
                            <form onSubmit={formSubmit}>
                                <div className="group">
                                    <input type="email" name="email" value={User.email} onChange={handelInput}  placeholder="Enter Email" className="group__control" />
                                </div>
                                <div className="group">
                                    <input type="text" name="password"  value={User.password} onChange={handelInput} placeholder="Enter password" className="group__control" />
                                </div>
                                <div className="group">
                                <input type="submit" className="btn btn-default btn-block" value={loading ? 'Please wait...'  : 'Login'}/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
