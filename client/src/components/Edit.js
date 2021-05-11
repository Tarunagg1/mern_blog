import React, { useEffect, useState } from 'react'
import { Helmet } from "react-helmet";
import toast, { Toaster } from 'react-hot-toast';
import { useParams, useHistory } from 'react-router-dom';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from 'react-redux';
import { FetchPost, updatePost } from '../store/actionMethods/PostMethods';
import { POST_RESET, RESET_UPDATE_ERR } from '../store/types/Posttype';
import Loader from '../components/Loder';

export default function Edit() {
    const { id } = useParams();
    const [value, setValue] = useState('');
    const { loading, redirect } = useSelector((state) => state.PostReducer);
    const { post, postStatus } = useSelector((state) => state.FetchPost);
    const { updateErrors } = useSelector((state) => state.UpdatePost);

    const { push } = useHistory();

    const [state, setstate] = useState({
        title: '',
        description: ''
    })

    const handelForm = (e) => {
        e.preventDefault();
        const updatedata = {
            title: state.title,
            body: value,
            description: state.description,
            pid: post._id
        }
        dispatch(updatePost(updatedata));
    }
    const dispatch = useDispatch();

    useEffect(() => {
        if (postStatus) {
            setstate({
                title: post.title,
                description: post.description
            })
            setValue(post.body);
            dispatch({ type: POST_RESET })
        } else {
            dispatch(FetchPost(id));
        }
    }, [post])


    useEffect(() => {
        if (updateErrors.length > 0) {
            updateErrors.map(err => (
                toast.error(err.msg)
                // dispatch({type:RESET_UPDATE_ERR});
            ))
            dispatch({ type: RESET_UPDATE_ERR });
        }
    }, [updateErrors])

    useEffect(() => {
        if (redirect) {
            push('/dashboard');
        }
    }, [redirect]);

    return !loading ?  <div className="create mt-100">
    <Helmet>
        <title>Edit-- Blog</title>
        <meta name="description" content="Blog edit" />
    </Helmet>
    <Toaster position="top-right" reverseOrder={false} toastOptions={{ style: { fontSize: '14px' } }} />
    <div className="container">
        <div className="row ml-minus-15">
            <div className="col-6 p-15">
                <div className="card">
                    <h3 className="card__h3">EditPost</h3>
                    <form onSubmit={handelForm}>
                        <div className="group">
                            <label htmlFor="title">Post Title</label>
                            <input
                                type="text"
                                className="group__control"
                                placeholder="Enter Title"
                                name="title"
                                id="title"
                                value={state.title}
                                onChange={(e) => setstate({ ...state, title: e.target.value })}
                            />
                        </div>
                        <div className="group">
                            <label htmlFor="body">Post Body</label>
                            <ReactQuill theme="snow" value={value} onChange={setValue} />
                        </div>
                        <div className="group">
                            <label htmlFor="body">Meta Description</label>
                            <textarea name="description" id="description" defaultValue={state.description} onChange={(e) => setstate({ ...state, description: e.target.value })} maxLength="150" cols="30" rows="10" placeholder="Meta Description..." className="group__control"></textarea>
                            <p className="length">{state.description ? state.description.length : "0"}</p>
                        </div>
                        <div className="group">
                            <input
                                type="submit"
                                name="createpost"
                                className="image__label"
                                value="Edit"
                                value={loading ? "Please Wait..." : "Edit"}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div> : <Loader />
}
