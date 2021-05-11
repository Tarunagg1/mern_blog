import React from 'react';
import { Fragment, useEffect,useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postComment, postDetails } from '../store/actionMethods/PostMethods';
import Loder from './Loder';
import moment from 'moment';
import { htmlToText } from 'html-to-text';


const Details = () => {
    
    const { id } = useParams();
    const { loading, details } = useSelector(state => state.PostReducer);
    const { user } = useSelector(state => state.AuthReducer);

    const [Comment, setComment] = useState()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(postDetails(id));
    }, [id])

    const handelComment = (e)=>{
        e.preventDefault();
        // alert(comment)
        dispatch(postComment({id,comment:Comment,username:user.name}));
        setComment('');
    }

    return (
        <Fragment>
            <Helmet>
                <title>{id} Artical</title>
                <meta name="description" content="learn html css javascript" />
            </Helmet>
            <div className="container">
                <div className="row mt-100">
                    <div className="col-8">
                        {
                            !loading ? (
                                <div className="post">
                                    <div className="post__details">
                                        <div className="post__header">
                                            <div className="post__header__avtar">
                                                pi
                                                </div>
                                            <div className="post__header__user">
                                                <span>{details.username}</span>
                                                <span>{moment(details.updatedAt).fromNow()}</span>
                                            </div>
                                        </div>
                                        <div className="post__body">
                                            <h1>
                                                {details.title}
                                            </h1>
                                            <div className="post__body__details mt-5 font-17">
                                                {htmlToText(details.body)}
                                            </div>
                                            <div className="post__body__image">
                                                <img src={`/postsimg/${details.image}`} alt="image" srcset="" />
                                            </div>
                                            {
                                                user ? (
                                                    <form className="mt-5" onSubmit={handelComment}>
                                                        <input type="text" className="group__control" value={Comment} onChange={(e) => setComment(e.target.value)} placeholder="write a comment....." />
                                                        <div className="group mt-5">
                                                            <input type="submit" value="Post Comment" className="btn btn-default" />
                                                        </div>
                                                    </form>
                                                ) : <h2>Login For Comment</h2>
                                            }
                                        </div>
                                    </div>
                                </div>

                            ) : <Loder />
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Details;