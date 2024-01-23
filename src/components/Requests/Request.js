import React from 'react';
import { Link } from 'react-router-dom';
import './Request.css';
import { format } from 'date-fns';

const Request = (props) => {
    const request = props.request;
    const date = new Date(request.timestamp);
    const dateFormatted = format(date, 'dd/MM/yyyy HH:mm');

    return (
        <article className="article-request">
            <Link onClick={props.onClick} to={`/request/${request.id}`} className="list-group-item list-group-item-action">
                <div className="article-request__div-title">
                    <h4 className="article-request__h4-title">Titel</h4>
                    <p className="article-request__p-title"><strong>{request.title}</strong>{" "}</p>
                </div>
                <div className="article-request__div-type">
                    <h4 className="article-request__h4-type">Type aanvraag</h4>
                    <p className="article-request__p-type"><strong>{request.typeRequest}</strong>{" "}</p>
                </div>
                <div className="article-request__div-content">
                    <h4 className="article-request__h4-content">Hulpvraag</h4>
                    <small className="article-request__date">{dateFormatted}{" "}</small>
                    <p className="article-request__p-content"><strong>{request.content}</strong>{" "}</p>
                </div>
            </Link>
        </article>
    );
};

export default Request;
