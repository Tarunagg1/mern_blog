import React, { Fragment, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from 'react-redux';
import { REDIRECT_FALSE, REMOVE_MESSAGE, SET_LOADER, CLOSE_LOADER, SET_MESSAGE } from '../store/types/Posttype';
import toast, { Toaster } from 'react-hot-toast';
import { fetchPost } from '../store/actionMethods/PostMethods';
import { Link, useParams } from 'react-router-dom';
import { BsPencil, BsArchive, BsImage } from 'react-icons/bs'
import Loader from './Loder';
import Sidebar from './Sidebar';
import { API_URL } from '../config/Env';
import axios from 'axios';
import Pagenation from './Pagenation';
import moment from 'moment';

export default function Dashboard() {
    const { message, redirect, loading } = useSelector((state) => state.PostReducer);
    const { user: { _id }, token } = useSelector((state) => state.AuthReducer);
    const { posts, count, perPage } = useSelector((state) => state.Fetchposts);
    let { page } = useParams();
    const dispatch = useDispatch();

    const deletepost = async (id) => {
        const confirm = window.confirm("Are you really want to delete this post");
        dispatch({ type: SET_LOADER });
        if (confirm) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
                const { data: { msg } } = await axios.get(`${API_URL}/deletepost/${id}`, config);
                dispatch(fetchPost(_id, page));
                dispatch({ type: CLOSE_LOADER });
                dispatch({ type: SET_MESSAGE, payload: msg });
            } catch (error) {
                console.log(error);
            }
        } else {
            dispatch({ type: CLOSE_LOADER });
        }
    }

    useEffect(() => {
        if (redirect) {
            dispatch({ type: REDIRECT_FALSE });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: REMOVE_MESSAGE });
        }
    }, [message])

    useEffect(() => {
        dispatch(fetchPost(_id, page));
    }, [page])

    return (
        <Fragment>
            <Helmet>
                <title>Welcome To dashboard-- Blog</title>
                <meta name="description" content="Blog Dashboard" />
            </Helmet>
            <Toaster position="top-center" reverseOrder={false} toastOptions={{ style: { fontSize: '14px' } }} />
            <div className="container mt-100">
                <div className="row ml-minus-15">
                    <div className="col-3">
                        <Sidebar />
                    </div>
                    <div className="col-9 p-15">
                        {!loading ? posts.length > 0 ? posts.map(post => (
                            <div className="dashboard__posts" key={post._id}>
                                <div className="dashboard__posts__title">
                                    <Link to='/'>{post.title}</Link>
                                    <span>Published At:- {moment(post.updatedAt).fromNow()}</span>
                                </div>
                                <div className="dashboard__posts__links">
                                    <Link to={`/updateiimage/${post._id}`}><BsImage className='icon' /></Link>
                                    <Link to={`/edit/${post._id}`} className="icon"><BsPencil /></Link>
                                    <Link className="icon"><BsArchive onClick={() => deletepost(post._id)} /></Link>
                                </div>
                            </div>
                        )) : 'You Dont Have any Post' : <Loader />}
                        <Pagenation path="dashboard" page={page} perPage={perPage} count={count} />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
