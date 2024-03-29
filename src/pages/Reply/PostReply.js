import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getToken } from '../../helper/AccesToken/GetToken';
import api from '../../api/api-calls';
import DispatchContext from '../../context/DispatchContext';
import InputFormTextarea from '../../components/Input/InputFormTextarea';
import Button from '../../components/UI/Button/Button';
import Screen from '../../components/UI/Screen/Screen';
import { MdCancel } from 'react-icons/md';
import './PostEditReply.css';

const initialState = {
    text: "",
    timestamp: new Date(),
    requestId: ""
};

const PostReply = () => {
    const { id } = useParams();
    const appDispatch = useContext(DispatchContext);
    const [formValue, setFormValue] = useState(initialState);
    const { text, requestId } = formValue;
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getSingleReply(id);
            setFormValue({ ...initialState, requestId: id });
        }
    }, [id]);

    const getSingleReply = async () => {
        try {
            await api.get(`/api/v1/replies?requestId=${id}`);
        } catch (e) {
            if (e.response) {
                console.log(e.response.data);
            } else {
                console.log(`Fout: ${e.message}`);
            }
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setErrors('');
        try {
            const createdReplyData = { ...formValue, timestamp: new Date() };
            const response = await api.post(
                `/api/v1/replies`, createdReplyData, getToken()
            );
            console.log("created");
            if (response.status === 201) {
                navigate(`/request/${requestId}`);
                appDispatch({ type: "flashMessage", value: "Reactie succesvol geplaatst" });
            }
        } catch (e) {
            if (e.response) {
                appDispatch({ type: "flashMessage", value: "Er gaat iets mis" });
                setErrors(e.response.data);
                console.log(e.response.data);
            }
        }
        setFormValue({ text: "", timestamp: new Date(), requestId: id });
    }

    const { text: textError } = errors;

    const onInputChange = (e) => {
        let { name, value } = e.target;
        setErrors((previousErrors) => ({ ...previousErrors, [name]: undefined }));
        setFormValue({ ...formValue, [name]: value });
    };

    return (
        <Screen title="Reageer" wide={true}>
            <form className="main-form" onSubmit={handleSubmit}>
                <div className="main-form__div-reply">
                    <p className="main-form__p-reply">Jouw reactie</p>
                    <InputFormTextarea
                        className="main-form__text"
                        id={text.id}
                        name="text"
                        value={text}
                        onChange={onInputChange}
                    />
                    {textError && <small className="gen-error">{textError}</small>}
                    <Button className="main-form__button-submit-reply" type="submit">VERZENDEN&nbsp;</Button>
                    <Button className="main-form__button-cancel-reply" onClick={() => navigate(`/request/${id}`)}>
                        ANNULEREN&nbsp;<MdCancel />
                    </Button>
                </div>
            </form>
        </Screen>
    );
};

export default PostReply;
