import React,{Fragment} from 'react';
import {Helmet} from "react-helmet";

export default function Home() {
    return (
        <Fragment>
            <Helmet>
                <title>Web Articals</title>
                <meta name="description" content="learn html css javascript"/>
            </Helmet>
        </Fragment>
    )
}
