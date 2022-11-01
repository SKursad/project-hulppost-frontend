import React, {useEffect, useState} from 'react';
import Button from '../../components/UI/Button/Button';
import Screen from '../../components/UI/Screen/Screen';
import api from '../../api/api-calls';
import {getToken} from '../../helper/AccesToken/GetToken';
import {useNavigate, useParams} from 'react-router-dom';
import InputFormTextarea from '../../components/Input/InputFormTextarea';
import './PostReply.css';

let initialState = {
    text: "",
    timestamp: new Date(),
    requestId: ""
};


const PostReply = () => {
    const [formValue, setFormValue] = useState(initialState);
    const {text} = formValue;
    const {id} = useParams();
    const [requestId] = useState(id);
    const [replyId] = useState(id);
    const navigate = useNavigate();


    useEffect(() => {
        if (replyId) {
            getSingleReply(replyId);
            setFormValue({...initialState});
        }
    }, [replyId]);

    const getSingleReply = async () => {
        const singleRequest = await api.get(`/api/v1/replies?requestId=${id}`);
        if (singleRequest.status === 200) {
            // setFormValue({...singleRequest.data});
        } else {
            console.log("Er ging iets mis.");
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const createdReplyData = {...formValue, requestId, timestamp: new Date()};
            const response = await api.post(
                `/api/v1/replies`, createdReplyData
                , getToken());
            // setText('');
            // Redirect to new url
            // navigate(`/image/${response.data.id}`);
            console.log("created");
            console.log(response.data);
            if (response.status === 201)
                navigate(`/request/${requestId}`);
        } catch (e) {
            // appDispatch({type: "flashMessage", value: "Reactie geüpdatet"});
            // appDispatch({type: "flashMessage", value: "Er ging iets mis"});
        }
        setFormValue({text, requestId, timestamp: new Date()});
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