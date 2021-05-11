import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { UpdatePassword } from '../store/actionMethods/profileMethod';
import {REMOVE_UPDATE_PASSWORD_SUCCESS,REMOVE_UPDATE_PASSWORD_ERRORS} from '../store/types/Updateprofiletype';


export default function Changepassword() {
    const { user: { _id } } = useSelector(state => state.AuthReducer);
    const { UPDATE_PASSWORD_ERRORS, UPDATE_PASSWORD_SUCCESS } = useSelector(state => state.Updateprofilereducer);
    const [changepassword, setchangepassword] = useState({
        oldpass: '',
        newpass: '',
        cnewpass: ''
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if(UPDATE_PASSWORD_SUCCESS){
            toast.success(UPDATE_PASSWORD_SUCCESS);
            dispatch({type:REMOVE_UPDATE_PASSWORD_SUCCESS})
        }
        
        if(UPDATE_PASSWORD_ERRORS){
            UPDATE_PASSWORD_ERRORS.map(err =>{
                toast.error(err.msg)
            })
        }
    }, [UPDATE_PASSWORD_ERRORS,UPDATE_PASSWORD_SUCCESS])


    const managepassword = (e) => {
        setchangepassword({ ...changepassword, [e.target.name]: e.target.value });
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        changepassword.id = _id;
        dispatch(UpdatePassword(changepassword));
    }

    return (
        <Fragment>
            <Helmet>
                <title>Update Profile-- Blog</title>
                <meta name="description" content="Blog Dashboard" />
            </Helmet>
            <Toaster position="top-center" reverseOrder={false} toastOptions={{ style: { fontSize: '14px' } }} />
            <div className="container mt-100">
                <div className="row ml-minus-15">
                    <div className="col-3">
                        <Sidebar />
                    </div>
                    <div className="ml-15 col-5 p-15">
                        <form onSubmit={handelSubmit} >
                            <h3 className="card__h3">Update Your Password</h3>
                            <div className="group">
                                <label htmlFor="title">Enter Old Password</label>
                                <input
                                    type="text"
                                    className="group__control"
                                    placeholder="Enter Title"
                                    name="oldpass"
                                    id="oldpass"
                                    onChange={managepassword}
                                    value={changepassword.oldpass}
                                />
                            </div>
                            <div className="group">
                                <label htmlFor="title">Enter New Password</label>
                                <input
                                    type="text"
                                    className="group__control"
                                    placeholder="Enter Title"
                                    name="newpass"
                                    id="newpass"
                                    onChange={managepassword}
                                    value={changepassword.newpass}
                                />
                            </div>
                            <div className="group">
                                <label htmlFor="title">Confirm Password</label>
                                <input
                                    type="text"
                                    className="group__control"
                                    placeholder="Enter Title"
                                    name="cnewpass"
                                    id="cnewpass"
                                    onChange={managepassword}
                                    value={changepassword.cnewpass}
                                />
                            </div>
                            <div className="group">
                                <input
                                    type="submit"
                                    name="createpost"
                                    className="image__label"
                                    value="Change Password"
                                    id="createpost"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}
