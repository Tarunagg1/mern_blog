import moment from 'moment'
import React from 'react'

export default function Comments({ comment }) {
    return (
        <>
            {
                comment ? (
                    comment.map((ele) => (
                        <div key={ele._id} className="commentSection">
                            <div className="post__header">
                                <div className="post__header__avtar">
                                    {ele.userName ? ele.userName[0] : ""}
                                </div>
                                <div className="post__header__user">
                                    <span>{ele.userName}</span>
                                    <span>{moment(ele.updatedAt).fromNow()}</span>
                                </div>
                            </div>
                            <div className="comment__body">
                                {ele.comment}
                            </div>
                        </div>

                    ))
                ) : <h5>No Comments Found</h5>
            }
        </>
    )
}
