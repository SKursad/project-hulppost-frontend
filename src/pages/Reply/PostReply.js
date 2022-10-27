import React, {useContext, useEffect, useState} from 'react';
import Button from '../../components/UI/Button/Button';
import classes from '../../components/UI/Card/Card.css';
import Screen from '../../components/UI/Screen/Screen';
import api from '../../api/api-calls';
import {getToken} from '../../helper/AccesToken/GetToken';
import {useNavigate, useParams} from 'react-router-dom';
import InputFormTextarea from '../../components/Input/InputFormTextarea';
import './PostReply.css'

let initialState = {
    text: "",
    requestId: ""
};

let initialStateEdit = {
    text: "",
    timestamp: new Date(),
    replyId: ""
};



const PostReply = () => {
    const [formValue, setFormValue] = useState(initialState);
    const [editFormValue, setEditFormValue] = useState(initialStateEdit)
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
        const singleRequest = await api.get(`/hulppost/replies/${replyId}`);
        if (singleRequest.status === 200) {
            // setFormValue({...singleRequest.data});
        } else {
            console.log("Er ging iets mis.")
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();
        if (!editMode) {
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
                const response = await api.put(
                    `/hulppost/replies/${replyId}`,
                    formValue, getToken());
                if (response.status === 200) {
                    // appDispatch({type: "flashMessage", value: "Reactie geüpdatet"});
                } else {
                    // appDispatch({type: "flashMessage", value: "Er ging iets mis"});
                }
            }


                setFormValue({text, requestId, timestamp: new Date()})
                setEditFormValue({text, replyId, timestamp: new Date()})
        // navigate(`/image/${response.data.id}`);
        }
    }

    const onInputChange = (e) => {
        let {name, value} = e.target;
        setFormValue({...formValue, [name]: value});
    };


    return (
        <Screen title="Reageer" className={classes.card}>

            <form className="main-replyForm" onSubmit={handleSubmit}>
                <p>{editMode ? "Aanpassen " : "Helpen"}</p>
                {/*<p>{"Helpen "}</p>*/}
                <InputFormTextarea
                    className="main-replyForm__input"
                    id={requestId}
                    name="text"
                    required
                    value={text}
                    onChange={onInputChange}
                />
                <Button type="submit">{editMode ? "UPDATEN" : "VERZENDEN"}</Button>
                {/*<Button type="submit">{"VERZENDEN"}</Button>*/}
            </form>
        </Screen>
    );
};

export default PostReply;