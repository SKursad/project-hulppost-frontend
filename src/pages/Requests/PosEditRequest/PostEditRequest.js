import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import api from '../../../api/api-calls'
import Screen from '../../../components/UI/Screen/Screen';
import InputFormTextarea from '../../../components/Input/InputFormTextarea';
import Button from '../../../components/UI/Button/Button';
import {getToken} from '../../../helper/AccesToken/GetToken';
import './PostEditRequest.css'

let initialState = {
    title: "",
    content: "",
    typeRequest: "",
    timestamp: new Date(),
};

const options = ["", "Praktisch", "Sociaal"];

const PostEditRequest = ({apiUrlGet, apiUrlPost, apiUrlPut}) => {

    const [formValue, setFormValue] = useState(initialState);
    const [editMode, setEditMode] = useState(false);
    const {title, content, typeRequest} = formValue;
    const {id} = useParams();
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
        const singleRequest = await api.get(`/hulppost/requests/${id}`);
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
            const response = await api.post(`/hulppost/requests`,
                createdRequestData, getToken());
            console.log(response.data)
           // x
            navigate(`/image/${response.data.id}`);
        } else {

            const updatedRequestData = {...formValue, timestamp: new Date()};
            const response = await api.put(`/hulppost/requests/${id}`,
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
            <form className="main-editPost" onSubmit={handleSubmit}>
                <div className="main-editPost__form">
                <p>{editMode ? "Hulpvraag Aanpassen " : "Hulpvraag"}</p>
                <InputFormTextarea
                    label="Onderwerp"
                    autoFocus="tittle"
                    name="title"
                    id={title.id}
                    placeholder="Tittel van uw hulpvraag"
                    type="Text"
                    value={title || ""}
                    onChange={onInputChange}
                />
                <InputFormTextarea
                    label="Onderwerp"
                    name="content"
                    id={content.id}
                    placeholder="Voer hier uw hulpvraag in"
                    value={content || ""}
                    onChange={onInputChange}/>

                <label htmlFor="type-request-field">
                    <small>Type hulpvraag</small>
                    <select
                        id="type-request"
                        name="type"
                        value={typeRequest}
                        onChange={onCategoryChange}
                    >
                        {options.map((option, index) => (
                            <option value={option || ""} key={index}>
                                {option}
                            </option>
                        ))}
                    </select>
                    {/*{error && <small className={classes.alert}>{genError}</small>}*/}
                </label>
                {/*</div>*/}
                <Button type="submit">{editMode ? "UPDATE" : "VERZENDEN"}</Button>
                <Button type="button" onClick={() => navigate(`/request`)}>ANNULEREN</Button>
                </div>
            </form>

            {/*)}*/}

        </Screen>

    );
};

export default PostEditRequest;