import React from 'react';
import { Link } from 'react-router-dom';
import Screen from '../UI/Screen/Screen';
import './RequestFeed.css';

const RequestsFeed = ({ request }) => {
    const attachmentImageVisible = request.fileAttachment && request.fileAttachment.fileType.startsWith('image');

    return (
        <Screen title="Alle Hulpaanvragen" wide={true}>
            <article className="feed-article">
                <div className="feed-article__block">
                    <Link to={`/request/${request.id}`}>
                        <h2 className="feed-article__h2">{request.title}</h2>
                        <h4 className="feed-article__type-request">
                            Type aanvraag: {request.typeRequest}
                        </h4>
                        <h4 className="feed-article__type-content">
                            Hulpvraag: {(request.content.length <= 40) ? request.content : `${request.content.slice(0, 40)}...`}
                        </h4>
                        {attachmentImageVisible && (
                            <img
                                className="feed-article__img"
                                alt={`Attachment for ${request.title}`}
                                src={`/images/attachments/${request.fileAttachment.name}`}
                            />
                        )}
                    </Link>
                </div>
            </article>
        </Screen>
    );
};

export default RequestsFeed;
