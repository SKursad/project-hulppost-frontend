import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import api from '../../../api/api-calls';
import Screen from '../../../components/UI/Screen/Screen';
import InputFormTextarea from '../../../components/Input/InputFormTextarea';
import Button from '../../../components/UI/Button/Button';
import {getToken} from '../../../helper/AccesToken/GetToken';
import './PostEditRequest.css';
import {MdCancel, MdUpdate} from 'react-icons/md';

let initialState = {
    title: "",
    content: "",
    typeRequest: "",
    timestamp: new Date(),
};

const options = [ "Praktisch", "Sociaal"];

const PostEditRequest = () => {

    const {id} = useParams();
    const [formValue, setFormValue] = useState(initialState);
    const [editMode, setEditMode] = useState(false);
    const {title, content, typeRequest} = formValue;
    const navigate = useNavigate();


    useEffect(() => {
        if (id) {
            setEditMode(true);
            getSingleRequest(id);
        } else {
            setEditMode(false);
            setFormValue({...initialState});
        }
    }, [id]);

    const getSingleRequest = async (id) => {
        const singleRequest = await api.get(`/api/v1/requests/${id}`);
        if (singleRequest.status === 200) {
            setFormValue({...singleRequest.data});
            console.log(singleRequest.data)
        } else {
            console.log("Er ging iets mis.")
        }
    };


    async function handleSubmit(e) {
        e.preventDefault();
        if (!editMode) {
            // const createdRequest = { id, title, datetime, content, typeRequest};
            const createdRequestData = {...formValue, timestamp: new Date()};
            const response = await api.post(`/api/v1/requests`,
                createdRequestData, getToken());
            console.log(response.data)
           // x
            navigate(`/image/${response.data.id}`);
        } else {

            const updatedRequestData = {...formValue, timestamp: new Date()};
            const response = await api.put(`/api/v1/requests/${id}`,
                updatedRequestData, getToken());
            console.log(response.data)
            if (response.status === 200) {
              // x
            } else {
                // x
            }


            setFormValue({title: "", content: "", typeRequest: "", timestamp: new Date()});
            navigate(`/image/${response.data.id}`);
        }
    }


    const onInputChange = (e) => {
        let {name, value} = e.target;
        setFormValue({...formValue, [name]: value});
    };

    const onCategoryChange = (e) => {
        // setCategoryErrMsg(null);
        setFormValue({...formValue, typeRequest: e.target.value});
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
                    placeholder="Tittel van uw hulpvraag"
                    type="Text"
                    value={title || ""}
                    onChange={onInputChange}
                    autoFocus={true}
                />
                <label htmlFor="type-request-field">
                    <select
                        className="main-form__select"
                        name="type"
                        value={typeRequest}
                        onChange={onCategoryChange}
                    >
                        <option
                            className="main-form__choose"
                            disabled={true}
                            value="">kies type</option>
                        {options.map((option, index) => (
                            <option
                                value={option || ""} key={index}>
                                {option}
                            </option>
                        ))}
                    </select>
                    {/*{error && <small className={classes.alert}>{genError}</small>}*/}
                </label>
                    <InputFormTextarea
                        className="main-form__content"
                        label="Onderwerp"
                        name="content"
                        id={content.id}
                        placeholder="Voer hier uw hulpvraag in"
                        value={content || ""}
                        onChange={onInputChange}/>
                {/*</div>*/}
                <Button className="main-form__button-submit" type="submit">{editMode ? "UPDATE" : "VERZENDEN"}<MdUpdate/></Button>
                    <Button className="main-form__button-cancel"  onClick={() => navigate(`/request/${id}`)}>
                        ANNULEREN<MdCancel/></Button>
                </div>
            </form>

            {/*)}*/}

        </Screen>

    );
};

export default PostEditRequest;