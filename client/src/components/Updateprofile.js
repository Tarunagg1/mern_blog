import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import Sidebar from './Sidebar';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile} from '../store/actionMethods/profileMethod';
import { getUserByIdData} from '../store/actionMethods/AuthMethods';

import {REMOVE_SUCCESS_MESSAGE,REMOVE_UPDATE_PROFILE_ERRORS} from '../store/types/Updateprofiletype';

export default function Updateprofile() {
    const { user: { _id, name, email } } = useSelector(state => state.AuthReducer);

    const {CHANGE_PROFILE_ERRORS,SUCCESSMESSAGE} = useSelector(state => state.Updateprofilereducer);
    
    const [upname, setName] = useState();
    const [upemail, setEmail] = useState();
    

    useEffect(() => {
        setName(name)
        setEmail(email);
    }, []);

    const dispatch = useDispatch();

    useEffect(() => {
        if (SUCCESSMESSAGE) {
            toast.success(SUCCESSMESSAGE);
            dispatch({type:REMOVE_SUCCESS_MESSAGE});
            const datauid = {
                id:_id
            }
            dispatch(getUserByIdData(datauid));
        }
        if (CHANGE_PROFILE_ERRORS.length > 0) {
            CHANGE_PROFILE_ERRORS.map(err => toast.error(err.msg))
            dispatch({type:REMOVE_UPDATE_PROFILE_ERRORS});
        }
    }, [SUCCESSMESSAGE,CHANGE_PROFILE_ERRORS])

    const handelupdateprofile = (e)=>{
        e.preventDefault();
        const userdata = {
            id:_id,
            name:upname
        }
        dispatch(updateProfile(userdata));
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
                        <h3 className="card__h3">Update Your Profile</h3>
                        <form onSubmit={handelupdateprofile}>
                            <div className="group">
                                <label htmlFor="title">Your name</label>
                                <input
                                    type="text"
                                    className="group__control"
                                    placeholder="Enter Title"
                                    name="title"
                                    id="name"
                                    onChange={(e) => setName(e.target.value)}
                                    value={upname}
                                />
                            </div>
                            <div className="group">
                                <label htmlFor="title">Your Email</label>
                                <input
                                    type="text"
                                    className="group__control"
                                    placeholder="Enter Title"
                                    name="title"
                                    id="email"
                                    readOnly
                                    value={upemail}
                                />
                            </div>
                            <div className="group">
                                <input
                                    type="submit"
                                    name="createpost"
                                    className="image__label"
                                    value="Update Profile"
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
