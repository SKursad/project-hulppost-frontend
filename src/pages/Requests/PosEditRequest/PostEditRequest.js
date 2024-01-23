import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DispatchContext from '../../../context/DispatchContext';
import api from '../../../api/api-calls';
import Screen from '../../../components/UI/Screen/Screen';
import InputFormTextarea from '../../../components/Input/InputFormTextarea';
import Button from '../../../components/UI/Button/Button';
import { getToken } from '../../../helper/AccesToken/GetToken';
import { MdCancel, MdUpdate } from 'react-icons/md';
import './PostEditRequest.css';

let initialState = {
    title: "",
    content: "",
    typeRequest: "",
    timestamp: new Date(),
};

const options = ["Praktisch", "Sociaal"];

const PostEditRequest = () => {

    const { id } = useParams();
    const appDispatch = useContext(DispatchContext);
    const [formValue, setFormValue] = useState(initialState);
    const [editMode, setEditMode] = useState(false);
    const { title, content, typeRequest } = formValue;
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            setEditMode(true);
            getSingleRequest(id);
        } else {
            setEditMode(false);
            setFormValue({ ...initialState });
        }
    }, [id]);

    const getSingleRequest = async (id) => {
        try {
            const singleRequest = await api.get(`/api/v1/requests/${id}`);
            if (singleRequest.status === 200) {
                setFormValue({ ...singleRequest.data });
            }
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
        if (!editMode) {
            try {
                const createdRequestData = { ...formValue, timestamp: new Date() };
                const response = await api.post(`/api/v1/requests`,
                    createdRequestData, getToken());
                appDispatch({ type: "flashMessage", value: "Hulpvraag verzonden" });
                navigate(`/image/${response.data.id}`);
            } catch (e) {
                if (e.response) {
                    setErrors(e.response.data);
                    appDispatch({ type: "flashMessage", value: "Er gaat iets mis" });
                    console.log(e.response.data);
                }
            }
        } else {
            const updatedRequestData = { ...formValue, timestamp: new Date() };
            const response = await api.put(`/api/v1/requests/${id}`,
                updatedRequestData, getToken());
            if (response.status === 200) {
                appDispatch({ type: "flashMessage", value: "Hulpvraag geüpdatet" });
            } else {
                appDispatch({ type: "flashMessage", value: "Er ging iets mis" });
            }
            setFormValue({ title: "", content: "", typeRequest: "", timestamp: new Date() });
            navigate(`/image/${response.data.id}`);
        }
    }

    const {
        title: titleError,
        content: contentError,
        typeRequest: typeRequestError,
    } = errors;

    const onInputChange = (e) => {
        let { name, value } = e.target;
        setErrors((previousErrors) => ({ ...previousErrors, [name]: undefined }));
        setFormValue({ ...formValue, [name]: value });
    };

    const onCategoryChange = (e) => {
        setErrors((previousErrors) => ({ ...previousErrors, typeRequest: undefined }));
        setFormValue({ ...formValue, typeRequest: e.target.value });
    };

    return (
        <Screen title={editMode ? "Hulpvraag aanpassen" : "Nieuwe Hulpvraag"}>
            <form className="main-form" onSubmit={handleSubmit}>
                <div className="main-form__div">
                    <p className="main-form__p">{editMode ? "Hulpvraag aanpassen " : "Jouw hulpvraag"}</p>
                    <InputFormTextarea
                        className="main-form__title"
                        label="Onderwerp"
                        name="title"
                        id={title.id}
                        placeholder="Titel van uw hulpvraag"
                        type="Text"
                        value={title || ""}
                        onChange={onInputChange}
                        autoFocus={true}
                    />
                    {titleError && <small className="gen-error">{titleError}</small>}
                    <label htmlFor="type-request-field">
                        <select
                            className="main-form__select"
                            name="typeRequest"
                            value={typeRequest}
                            onChange={onCategoryChange}
                        >
                            <option
                                className="main-form__choose"
                                disabled={true}
                                value="">kies type
                            </option>
                            {options.map((option, index) => (
                                <option
                                    value={option || ""} key={index}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        {typeRequestError && <small className="gen-error">{typeRequestError}</small>}
                    </label>
                    <InputFormTextarea
                        className="main-form__content"
                        label="Onderwerp"
                        name="content"
                        id={content.id}
                        placeholder="Voer hier uw hulpvraag in"
                        value={content || ""}
                        onChange={onInputChange}
                    />
                    {contentError && <small className="gen-error">{contentError}</small>}
                    <Button className="main-form__button-submit"
                        type="submit">{editMode ? "UPDATE" : "VERZENDEN"}<MdUpdate /></Button>
                    {editMode ?
                        <Button className="main-form__button-cancel" onClick={() => navigate(`/request/${id}`)}>
                            ANNULEREN<MdCancel /></Button> :
                        <Button className="main-form__button-cancel" onClick={() => navigate(`/request-search`)}>
                            ANNULEREN<MdCancel /></Button>}
                </div>
            </form>
        </Screen>
    );
};

export default PostEditRequest;
