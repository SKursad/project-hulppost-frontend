import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Screen from '../UI/Screen/Screen';
import './RequestFeed.css'

const RequestsFeed = ({request}) => {

    const attachmentImageVisible =
        request.fileAttachment && request.fileAttachment.fileType.startsWith('image');


    return (
        <Screen title="Alle Hulpaanvragen" wide={true}>
        <article className="feed-article">
            <div className="feed-article__block">
            <Link to={`/request/${request.id}`}>
                <h2 className='feed-article__h2'>{request.title}</h2>
            </Link>
            <p className="feed-article__type-request" >
                {(request.typeRequest)} </p>
            <p className="feed-article__type-content">
                {(request.content).length <= 40
                    ? request.content
                    : `${(request.content).slice(0, 40)}...`}
            </p>
            {attachmentImageVisible && (
                <div className="feed-article__div-img">
                    <img
                        className="feed-article__img"
                        alt="attachment"
                        src={`http://localhost:8080/images/attachments/${request.fileAttachment.name}`}
                    />
                </div>
            )}
            </div>
        </article>
        </Screen>
    );
};

export default RequestsFeed;
