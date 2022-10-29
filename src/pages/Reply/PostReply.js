import React, {useContext, useEffect, useState} from 'react';
import Button from '../../components/UI/Button/Button';
import classes from '../../components/UI/Card/Card.css';
import Screen from '../../components/UI/Screen/Screen';
import api from '../../api/api-calls';
import {getToken} from '../../helper/AccesToken/GetToken';
import {useNavigate, useParams} from 'react-router-dom';
import InputFormTextarea from '../../components/Input/InputFormTextarea';
import './PostReply.css'
import reply from '../../components/Replies/Reply';

let initialState = {
    text: "",
    timestamp: new Date(),
    requestId: ""
};



const PostReply = () => {
    const [formValue, setFormValue] = useState(initialState);
    const [editMode, setEditMode] = useState(false);
    const {text} = formValue;
    const {id} = useParams();
    // const [text, setText] = useState('');
    const [requestId] = useState(id);
    const [replyId] = useState(id);
    const navigate = useNavigate();


    useEffect(() => {
        if (replyId) {
            setEditMode(true);
            getSingleReply(replyId);
        } else {
            setEditMode(false);
            setFormValue({...initialState});
        }
    }, [replyId]);

    const getSingleReply = async (replyId) => {
        const singleRequest = await api.get(`/hulppost/replies?requestId=${id}`);
        if (singleRequest.status === 200) {
            // setFormValue({...singleRequest.data});
        } else {
            console.log("Er ging iets mis.")
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();
       {
            // const createdRequest = { id, title, datetime, content, typeRequest};
            const createdReplyData = {...formValue, requestId, timestamp: new Date()};
            const response = await api.post(
                `/hulppost/replies`, createdReplyData
                , getToken());
            // setText('');
            // Redirect to new url
            // navigate(`/image/${response.data.id}`);
            console.log("created");
            console.log(response.data);
            if (response.status === 201) {
            navigate(`/request/${requestId}`);
            } else {
                    // appDispatch({type: "flashMessage", value: "Reactie geüpdatet"});
                    // appDispatch({type: "flashMessage", value: "Er ging iets mis"});
                }
            }


                setFormValue({text, requestId, timestamp: new Date()})
        // navigate(`/image/${response.data.id}`);
    }

    const onInputChange = (e) => {
        let {name, value} = e.target;
        setFormValue({...formValue, [name]: value});
    };


    return (
        <Screen title="Reageer" wide={true}>
            <form className="main-replyForm" onSubmit={handleSubmit}>
                <p>Reageer</p>
                {/*<p>{"Helpen "}</p>*/}
                <InputFormTextarea
                    className="main-replyForm__input"
                    id={text.id}
                    name="text"
                    required
                    value={text}
                    onChange={onInputChange}
                />
                <Button type="submit">VERZENDEN</Button>
                {/*<Button type="submit">{"VERZENDEN"}</Button>*/}
            </form>
        </Screen>
    );
};

export default PostReply;