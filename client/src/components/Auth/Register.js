import React,{Fragment,useState,useEffect} from 'react';
import {Helmet} from "react-helmet";
import { useDispatch,useSelector} from 'react-redux';
import {postRegister} from '../../store/actionMethods/AuthMethods'
import toast, { Toaster } from 'react-hot-toast';

export default function Register(props) {
    const [state, setstate] = useState({
        'name':'',
        'email':'',
        'password':'',
        'cpassword':''
    })
    
    const {loading,registerErrors,user} = useSelector((state)=> state.AuthReducer);

    const dispatch = useDispatch();

    const handelInput = (e)=>{
        setstate({...state,[e.target.name]:e.target.value})
    }

    const registerHandel = async (e)=>{
        e.preventDefault();
        dispatch(postRegister(state));
    }
    
    useEffect(() =>{
        if(registerErrors.length > 0){
            registerErrors.map(err =>{
                toast.error(err.msg)
            })
        }
        if(user){
            props.history.push("/dashboard")
        }
    },[registerErrors,user])


    return (
        <Fragment>
            <Helmet>
            <title>User register -- Blog</title>
                <meta name="description" content="learn html css javascript"/>
            </Helmet>

            <div className="row mt-80">
                <div className="col-8">
                    <div className="bgimage"></div>
                    <Toaster   position="top-right" reverseOrder={false} toastOptions={{style: {fontSize:'14px' } }} />
                </div>
                <div className="col-4">
                    <div className="account">
                    <h3 className="account__title">Register Here</h3>
                        <div className="account__section">
                            <form onSubmit={registerHandel}>
                                <div className="group">
                                    <input type="text" name="name" value={state.name} onChange={handelInput} placeholder="Enter name" className="group__control" />
                                </div>
                                <div className="group">
                                    <input type="email" name="email" value={state.email} onChange={handelInput} placeholder="Enter Email" className="group__control" />
                                </div>
                                <div className="group">
                                    <input type="text" name="password" value={state.password} onChange={handelInput} placeholder="Enter password" className="group__control" />
                                </div>
                                <div className="group">
                                    <input type="text" name="cpassword" value={state.cpassword} onChange={handelInput} placeholder="confirm password" className="group__control" />
                                </div>
                                <div className="group">
                                    <input type="submit" className="btn btn-default btn-block" value={loading ? 'Please wait...'  : 'Register'}/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
