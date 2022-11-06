import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../../context/auth-context';
import './Request.css';

const Request = (props) => {
    const request = props.request;
    const context = useContext(AuthContext);
    const date = new Date(request.timestamp);
    const dateFormatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes().toLocaleString().padStart(2, "0")}`;

    return (
        <article className="article-request">
            <Link onClick={props.onClick} to={`/request/${request.id}`}
                  className="list-group-item list-group-item-action">
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
                <span className="text-muted small">
        {!props.noAuthor && <> {context.username}</>} </span>
            </Link>
        </article>

    );
};

export default Request;