import React,{Fragment} from 'react';
import {Helmet} from "react-helmet";


export default function Dashboard() {
    return (
        <Fragment>
              <Helmet>
                <title>Welcome To dashboard-- Blog</title>
                <meta name="description" content="Blog Dashboard"/>
             </Helmet>
            <h1>Welcome to Dashboard</h1>
        </Fragment>
    )
}
