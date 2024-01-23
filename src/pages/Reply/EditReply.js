import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getToken } from '../../helper/AccesToken/GetToken';
import api from '../../api/api-calls';
import DispatchContext from '../../context/DispatchContext';
import InputFormTextarea from '../../components/Input/InputFormTextarea';
import Screen from '../../components/UI/Screen/Screen';
import Button from '../../components/UI/Button/Button';
import { MdCancel, MdUpdate } from 'react-icons/md';
import './PostEditReply.css';

const initialState = {
    text: '',
    timestamp: new Date(),
};

const EditReply = () => {
    const { id } = useParams();
    const appDispatch = useContext(DispatchContext);
    const [formValue, setFormValue] = useState(initialState);
    const { text } = formValue;
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        getSingleReply(id);
    }, [id]);

    const getSingleReply = async () => {
        try {
            const singleReply = await api.get(`/api/v1/replies/${id}`);
            if (singleReply.status === 200) {
                setFormValue({ ...singleReply.data });
            }
        } catch (e) {
            if (e.response) {
                console.log(e.response.data);
                appDispatch({ type: "flashMessage", value: "Er gaat iets mis" });
            } else {
                console.log(`Fout: ${e.message}`);
            }
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const updateReplyData = { ...formValue, timestamp: new Date() };
            const response = await api.put(`/api/v1/replies/${id}`, updateReplyData, getToken());
            console.log("updated");
            if (response.status === 200) {
                setFormValue({ text: '', timestamp: new Date() });
            }
            appDispatch({ type: "flashMessage", value: "Reactie succesvol geüpdatet" });
            navigate(-1);
        } catch (e) {
            if (e.response) {
                appDispatch({ type: "flashMessage", value: "Er gaat iets mis" });
                setErrors(e.response.data);
                console.log(e.response.data);
            }
        }
    }

    const {
        text: textError
    } = errors;

    const onInputChange = (e) => {
        let { name, value } = e.target;
        setErrors((previousErrors) => ({ ...previousErrors, [name]: undefined }));
        setFormValue({ ...formValue, [name]: value });
    };

    return (
        <Screen title="Reactie Aanpassen" wide={true}>
            <form className="main-form-reply" onSubmit={handleSubmit}>
                <div className="main-form__div-reply">
                    <p className="main-form__p-reply">Reactie aanpassen</p>
                    <InputFormTextarea
                        className="main-form__text"
                        id={text.id}
                        name="text"
                        value={text}
                        onChange={onInputChange}
                    />
                    {textError && <small className="gen-error">{textError}</small>}
                    <Button className="main-form__button-submit-reply" type="submit">UPDATEN&nbsp;<MdUpdate /></Button>
                    <Button className="main-form__button-cancel-reply" type="button" onClick={() => navigate(`/request-search`)}>ANNULEREN&nbsp;<MdCancel /></Button>
                </div>
            </form>
        </Screen>
    );
};

export default EditReply;
