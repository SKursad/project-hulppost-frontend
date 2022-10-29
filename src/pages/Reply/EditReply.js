import React, {useEffect, useState} from 'react';
import Screen from '../../components/UI/Screen/Screen';
import classes from '../../components/UI/Card/Card.css';
import InputFormTextarea from '../../components/Input/InputFormTextarea';
import Button from '../../components/UI/Button/Button';
import api from '../../api/api-calls';
import {useNavigate, useParams} from 'react-router-dom';
import {getToken} from '../../helper/AccesToken/GetToken';
import reply from '../../components/Replies/Reply';
import request from '../../components/Requests/Request';

let initialState = {
    text: '',
    timestamp: new Date(),
};


const EditReply = () => {
    const {id} = useParams();
    const [formValue, setFormValue] = useState(initialState);
    const {text} = formValue;
    const navigate = useNavigate();

    useEffect(() => {

        getSingleReply(id);

    }, [id]);

    const getSingleReply = async (replyId) => {
        const singleReply = await api.get(`/hulppost/replies/${id}`);
        if (singleReply.status === 200) {
            setFormValue({...singleReply.data});
        } else {
            console.log("Er ging iets mis.");
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();

        const updateReplyData = {...formValue, timestamp: new Date()};
        const response = await api.put(`/hulppost/replies/${id}`,
            updateReplyData, getToken());
        console.log(response.data);
        if (response.status === 200) {
        setFormValue({text: '', timestamp: new Date()});
        navigate(`/reply/${id}`);
            // x
        } else {
            // x
        }



    }

    const onInputChange = (e) => {
        let {name, value} = e.target;
        setFormValue({...formValue, [name]: value});
    };


    return (
        <Screen title="Reactie Aanpassen" wide={true}>
            <form className="main-replyForm" onSubmit={handleSubmit}>
                <p>Reactie aanpassen</p>
                {/*<p>{"Helpen "}</p>*/}
                <InputFormTextarea
                    className="main-replyForm__input"
                    id={text.id}
                    name="text"
                    required
                    value={text}
                    onChange={onInputChange}
                />
                <Button type="submit">UPDATEN</Button>
                <Button type="button" onClick={() => navigate(`/request-search`)}>ANNULEREN</Button>
                {/*<Button type="submit">{"VERZENDEN"}</Button>*/}
            </form>

            {Object.keys(formValue).length > 0 ? (
                <section className="main-request__info">
                    {/*<p>{replyData.text}</p>*/}
                    <h5>Reactie</h5>
                    <p>{formValue.text}</p>
                </section>
            ) : (<p>Er zijn nog geen reacties</p>)}


        </Screen>

    );
};

export default EditReply;