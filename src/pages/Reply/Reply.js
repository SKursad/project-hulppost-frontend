import React, {useContext} from 'react';
import {AuthContext} from '../../context/auth-context';
import {Link} from 'react-router-dom';

const Reply= (props) => {
    const reply = props.reply;
    const date = new Date(reply.timestamp);
    const context = useContext(AuthContext);
    const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    return (
        <div>
            <Link onClick={props.onClick} to={`/requestScreen`} className="list-group-item list-group-item-action">
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