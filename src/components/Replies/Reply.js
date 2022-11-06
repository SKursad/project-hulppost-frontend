import React from 'react';
import {Link} from 'react-router-dom';
import './Reply.css';

const Reply = (props) => {
    const reply = props.reply;
    const date = new Date(reply.timestamp);
    const dateFormatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes().toLocaleString().padStart(2, "0")}`;

    return (
        <article className="article-reply">
            <Link onClick={props.onClick} to={`/reply/${reply.id}`}>
                <small className="article-reply__date">{dateFormatted}{" "}</small>
                <p className="article-reply__p"><strong>{reply.text}</strong>{" "}</p>
                <span className="text-muted small">
        {!props.noAuthor && <> {props.username}</>} </span>
            </Link>
        </article>
    );
};

export default Reply;