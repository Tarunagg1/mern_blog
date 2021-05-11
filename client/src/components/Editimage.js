import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { useParams, useHistory } from 'react-router-dom';
import { updateimageaction } from '../store/actionMethods/PostMethods';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { RESET_UPDATE_ERR, RESET_UPDATE_IMAGE_ERRORS } from '../store/types/Posttype';

export default function Editimage() {
    const { id } = useParams();
    const [currimage, setCurrimage] = useState("Choose Image");
    const [imgPreview, setimgPreview] = useState('');
    const [state, setstate] = useState({
        image: "",
    });


    const dispatch = useDispatch();
    const { updateImageErrors } = useSelector(state => state.updateImage);
    const { redirect, loading } = useSelector((state) => state.PostReducer);

    const { push } = useHistory();

    const updateImage = (e) => {
        e.preventDefault();
        const fromdata = new FormData();
        fromdata.append('id', id);
        fromdata.append('image', state.image);
        dispatch(updateimageaction(fromdata));
    }

    const fileHandel = (e) => {
        var file = e.target.files[0];
        setstate({ ...state, [e.target.name]: e.target.files[0] })
        var imageType = /image.*/;
        if (file.type.match(imageType)) {
            setCurrimage(file.name);
            var reader = new FileReader();
            reader.onloadend = function () {
                setimgPreview(reader.result)
            }
            reader.readAsDataURL(file);
        } else
            toast.error("File not supported!");
    };

    const openBox = () => {
        document.getElementById("image").click();
    };

    useEffect(() => {
        if (updateImageErrors.length > 0) {
            updateImageErrors.map(err => toast.error(err.msg))
        }
        dispatch({ type: RESET_UPDATE_ERR });

    }, [updateImageErrors])

    useEffect(() => {
        if (redirect) {
            push('/dashboard');
        }
    }, [redirect])

    return (
        <div className="container mt-100">
            <Helmet>
                <title>Edit Image -- Blog</title>
                <meta name="description" content="Update image" />
            </Helmet>
            <Toaster position="top-right" reverseOrder={false} toastOptions={{ style: { fontSize: '14px' } }} />
            <div className="row">
                <div className="col-6 p-15">
                    <div className="card">
                        <div className="card__h3">Update Post Image</div>
                        <form onSubmit={updateImage}>
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
                                <div className="imgpreView">
                                    {state.imagePreview ? <img src={imgPreview} alt="not found" srcSet="false" /> : ""}
                                </div>
                            </div>

                            <div className="group">
                                <input
                                    type="submit"
                                    name="createpost"
                                    className="image__label"
                                    value={loading ? "Please Wait..." : "Update Image"}
                                    id="createpost"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
