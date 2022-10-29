import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../context/auth-context';
import {Link, useParams} from 'react-router-dom';
import request from '../Requests/Request';
import api from '../../api/api-calls';
import {getToken} from '../../helper/AccesToken/GetToken';

const Reply = (props) => {
    const {id} = useParams();
    const reply = props.reply;
    const date = new Date(reply.timestamp);
    const context = useContext(AuthContext);
    const [replyData, setReplyData] = useState([]);
    const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;


    return (
        <div>

            <Link onClick={props.onClick} to={`/reply/${reply.id}`}
                  className="list-group-item list-group-item-action">
                {/*<img className="avatar-tiny" src={`http://localhost:8080/images/profile/`} alt="profile"/>*/}
                <small>{dateFormatted}{" "}</small>
                <p><strong>{reply.text}</strong>{" "}</p>
                <span className="text-muted small">
        {!props.noAuthor && <> {context.username}</>} </span>
            </Link>

        </div>
    );
};

export default Reply;