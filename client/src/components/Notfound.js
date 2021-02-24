import React from 'react'
import {Helmet} from "react-helmet";

export default function Notfound() {
    return (
        <>
            <Helmet>
                <title>404--Not Found To dashboard-- Blog</title>
                <meta name=">Opps! That Page not found" content=""/>
             </Helmet>
            <div className="notFound">
                <div className="notFound__container">
                    <h1 className="notFound__container__h1">404 </h1>
                    <p className="notFound__container__p">Opps! That Page not found</p>
                </div>
            </div>
        </>
    )
}
