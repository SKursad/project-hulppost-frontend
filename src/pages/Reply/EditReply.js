import React, {useEffect, useState} from 'react';
import Screen from '../../components/UI/Screen/Screen';
import InputFormTextarea from '../../components/Input/InputFormTextarea';
import Button from '../../components/UI/Button/Button';
import api from '../../api/api-calls';
import {useNavigate, useParams} from 'react-router-dom';
import {getToken} from '../../helper/AccesToken/GetToken';
import './PostEditReply.css'
import {MdCancel, MdUpdate} from 'react-icons/md';

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

    const getSingleReply = async () => {
        const singleReply = await api.get(`/api/v1/replies/${id}`);
        if (singleReply.status === 200) {
            setFormValue({...singleReply.data});
        } else {
            console.log("Er ging iets mis.");
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const updateReplyData = {...formValue, timestamp: new Date()};
            const response = await api.put(`/api/v1/replies/${id}`,
                updateReplyData, getToken());
            console.log(response.data);
            if (response.status === 200)
                setFormValue({text: '', timestamp: new Date()});
            navigate(`/reply/${id}`);
            // x
        } catch (e) {
            // x
        }
    }

    const onInputChange = (e) => {
        let {name, value} = e.target;
        setFormValue({...formValue, [name]: value});
    };


    return (
        <Screen title="Reactie Aanpassen" wide={true}>
            <form className="main-form-reply" onSubmit={handleSubmit}>
                <div className="main-form__div-reply">

                <p className="main-form__p-reply">Reactie aanpassen</p>
                {/*<p>{"Helpen "}</p>*/}
                <InputFormTextarea
                    className="main-form__text"
                    id={text.id}
                    name="text"
                    required
                    value={text}
                    onChange={onInputChange}
                />
                <Button className="main-form__button-submit-reply" type="submit">UPDATEN&nbsp;<MdUpdate/></Button>
                <Button className="main-form__button-cancel-reply" type="button" onClick={() => navigate(`/request-search`)}>ANNULEREN&nbsp;<MdCancel/></Button>
                {/*<Button type="submit">{"VERZENDEN"}</Button>*/}
                </div>
            </form>
        </Screen>

    );
};

export default EditReply;