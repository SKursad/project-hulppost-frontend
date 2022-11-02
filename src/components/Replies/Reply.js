import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../context/auth-context';
import {Link, useParams} from 'react-router-dom';
import ProfileWithDefaultImage from '../ProfileWithDefaultImage/ProfileWithDefaultImage';
import './Reply.css'
import api from '../../api/api-calls';
import {getToken} from '../../helper/AccesToken/GetToken';

const Reply = (props) => {
    const reply = props.reply;
    const context = useContext(AuthContext);
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