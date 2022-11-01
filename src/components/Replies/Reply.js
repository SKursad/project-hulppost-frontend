import React, {useContext} from 'react';
import {AuthContext} from '../../context/auth-context';
import {Link} from 'react-router-dom';

const Reply = (props) => {
    const reply = props.reply;
    const context = useContext(AuthContext);
    const date = new Date(reply.timestamp);
    const dateFormatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes().toLocaleString().padStart(2, "0")}`;

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