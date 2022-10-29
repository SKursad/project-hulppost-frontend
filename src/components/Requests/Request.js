import React, {useContext} from 'react';
import {Link, useParams} from 'react-router-dom';
import {AuthContext} from '../../context/auth-context';

const Request = (props) => {
    const {id} = useParams();
    const request = props.request;
    const date = new Date(request.timestamp);
    const context = useContext(AuthContext);

    const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    return (
        <Link onClick={props.onClick} to={`/request/${request.id}`} className="list-group-item list-group-item-action">
            {/*<img className="avatar-tiny" src={`http://localhost:8080/images/profile/`} alt="profile"/>*/}
            <p><strong>{request.title}</strong>{" "}</p>
            <p><strong>{request.typeRequest}</strong>{" "}</p>
            <small>{dateFormatted}{" "}</small>
            <p><strong>{request.content}</strong>{" "}</p>
            <span className="text-muted small">
        {!props.noAuthor && <> {context.username}</>} </span>
        </Link>

    );
};

export default Request;