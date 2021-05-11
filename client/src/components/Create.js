import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createAction } from '../store/actionMethods/PostMethods';


export default function Create(props) {
    const [currimage, setCurrimage] = useState("Choose Image");
    const [value, setValue] = useState("");

    const [state, setstate] = useState({
        title: "",
        description: "",
        image: "",
    });

    const [Slug, setSlug] = useState("");
    const [slugButton, setslugButton] = useState(false);
    const [imgPreview, setimgPreview] = useState('');
    const dispatch = useDispatch();
    const { user: { _id, name } } = useSelector(state => state.AuthReducer);
    const { loading, createErrors, redirect } = useSelector((state) => state.PostReducer);

    useEffect(() => {
        if (redirect) {
            props.history.push('/dashboard')
        }
        if (createErrors.length > 0) {
            createErrors.map(err => toast.error(err.msg))
        }
    }, [createErrors, redirect])

    const fileHandel = (e) => {
        var file = e.target.files[0];
        setstate({ ...state, [e.target.name]: e.target.files[0] })
        var imageType = /image.*/;
        if (file.type.match(imageType)) {
            setCurrimage(file.name);
            var reader = new FileReader();
            reader.onload = function () {
                setimgPreview(reader.result)
            }
            reader.readAsDataURL(file);
        } else
            toast.error("File not supported!");
    };

    const openBox = () => {
        document.getElementById("image").click();
    };
    const handelInput = (e) => {
        setstate({ ...state, [e.target.name]: e.target.value });
        const createSlug = e.target.value.trim().split(" ").join("-");
        setSlug(createSlug);
    };
    const handelFromSubmit = (e) => {
        e.preventDefault();
        const { title, description, image } = state;
        var form_data = new FormData();
        form_data.append('title', title);
        form_data.append('body', value);
        form_data.append('image', image);
        form_data.append('description', description);
        form_data.append('slug', Slug);
        form_data.append('name', name);
        form_data.append('id', _id);
        console.log(form_data);
        dispatch(createAction(form_data));
    };

    const slutHandel = (e) => {
        setslugButton(true);
        setSlug(e.target.value);
    };
    const handelUrl = (e) => {
        e.preventDefault();
        setSlug(Slug.trim().split(" ").join("-"));
        setslugButton(false);
    };

    const handelDesc = (e) => {
        setstate({ ...state, [e.target.name]: e.target.value })
    }
    return (
        <div className="create mt-100">
            <Helmet>
                <title>Create post -- Blog</title>
                <meta name="description" content="Create post" />
            </Helmet>

            <div className="container">
                <Toaster position="top-right" reverseOrder={false} toastOptions={{ style: { fontSize: '14px' } }} />
                <form onSubmit={handelFromSubmit}>
                    <div className="row ml-minus-15">
                        <div className="col-6 p-15">
                            <div className="card">
                                <h3 className="card__h3">Create New Post</h3>
                                <div className="group">
                                    <label htmlFor="title">Post Title</label>
                                    <input
                                        type="text"
                                        value={state.title}
                                        onChange={handelInput}
                                        className="group__control"
                                        placeholder="Enter Title"
                                        name="title"
                                        id="title"
                                    />
                                </div>
                                <div className="group">
                                    <label
                                        htmlFor="cimage"
                                        onClick={openBox}
                                        className="image__label"
                                    >
                                        {currimage}
                                    </label>
                                    <input
                                        type="file"
                                        onChange={fileHandel}
                                        className="form-group"
                                        name="image"
                                        id="image"
                                    />
                                </div>
                                <div className="group">
                                    <label htmlFor="body">Enter the Description</label>
                                    <ReactQuill theme="snow" value={value} onChange={setValue} />
                                </div>
                                <div className="group">
                                    <label htmlFor="body">Meta Description</label>
                                    <textarea name="description" id="description" defaultValue={state.description} onChange={handelDesc} maxLength="150" cols="30" rows="10" placeholder="Meta Description..." className="group__control"></textarea>
                                    <p className="length">{state.description ? state.description.length : "0"}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 p-15">
                            <div className="card">
                                <div className="group">
                                    <label htmlFor="title">Post Url</label>
                                    <input
                                        type="text"
                                        value={Slug}
                                        onChange={slutHandel}
                                        className="group__control"
                                        placeholder="Post url..."
                                        name="url"
                                        id="url"
                                    />
                                </div>
                                <div className="group">
                                    {slugButton ? (
                                        <input
                                            type="button"
                                            onClick={handelUrl}
                                            name="changeslug"
                                            className="image__label"
                                            value="Update"
                                            id="changeslug"
                                        />
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="group">
                                    <div className="imgpreView">
                                        {imgPreview ? <img src={imgPreview} alt="not found" srcSet="false" /> : ""}
                                    </div>
                                </div>

                                <div className="group">
                                    <input
                                        type="submit"
                                        name="createpost"
                                        className="image__label"
                                        value={loading ? "Please Wait..." : "Create post"}
                                        id="createpost"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
