import moment from 'moment';
import React, { Fragment, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { homepost } from '../store/actionMethods/PostMethods';
import Loder from './Loder';
import Pagenation from './Pagenation';
import { htmlToText } from 'html-to-text';


export default function Home() {
    const dispatch = useDispatch();
    const {user} = useSelector((state) =>state.AuthReducer);

    let { page } = useParams();
    if (page === undefined) {
        page = 1;
    }

    const { loading } = useSelector(state => state.PostReducer);
    const { perPage, count, posts } = useSelector(state => state.Fetchposts);

    useEffect(() => {
        dispatch(homepost(page));
    }, [])

    return (
        <Fragment>
            <Helmet>
                <title>Web Articals</title>
                <meta name="description" content="learn html css javascript" />
            </Helmet>
            <div className="container mt-100">
                <div className="row">
                    <div className="col-9 home">
                        {
                            !loading ? posts.length > 0 ? posts.map(post => (
                                <div className="row post-style">

                                    <div className="col-8 ">
                                        <div className="post">
                                            <div className="post__header">
                                                <div className="post__header__avtar">
                                                    pi
                                                </div>
                                                <div className="post__header__user">
                                                    <span>{post.username}</span>
                                                    <span>{moment(post.updatedAt).fromNow()}</span>
                                                </div>
                                            </div>
                                            <div className="post__body">
                                                <h1>
                                                    <Link to={`/details/${post.slug}`}>{post.title}</Link>
                                                </h1>
                                                <div className="post__body__details mt-5 font-17">
                                                    {htmlToText(post.body.slice(0, 300))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="post__body__image">
                                        <Link to={`/details/${post.slug}`}><img src={`/postsimg/${post.image}`} alt="image" srcset="" /></Link>
                                        </div>
                                    </div>
                                </div>
                            )) : 'No Post  found' : <Loder />
                        }
                    </div>
                </div>
            </div>
            <Pagenation path="home" page={page} perPage={perPage} count={count} />
        </Fragment>
    )
}
