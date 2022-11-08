import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {getToken} from '../../../helper/AccesToken/GetToken';
import {AuthContext} from '../../../context/AuthContext';
import DispatchContext from '../../../context/DispatchContext';
import api from '../../../api/api-calls';
import Button from '../../../components/UI/Button/Button';
import Screen from '../../../components/UI/Screen/Screen';
import ProfileWithDefaultImage from '../../../components/ProfileWithDefaultImage/ProfileWithDefaultImage';
import {MdCancel, MdOutlineImageNotSupported} from 'react-icons/md';
import {RiImageEditFill} from 'react-icons/ri';
import './ProfileImage.css';


const ProfileImage = () => {
    const {id} = useParams();
    const context = useContext(AuthContext);
    const appDispatch = useContext(DispatchContext);
    const [error, setError] = useState(false);
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        getUserById(id);
    }, [id]);

    const getUserById = async (id) => {
        try {
            const userData = await api.get(`/api/v1/users/${id}`);
            if (userData.status === 200) {
                setUserData({...userData.data});
                console.log(userData.status);
            }
        } catch (e) {
            if (e.response) {
                console.log(e.response.data);
            } else {
                console.log(`Fout: ${e.message}`);
            }
        }
    };


    function previewFile() {

        const preview = document.querySelector('img:not(#main-header__logo)');
        const file = document.querySelector('input[type=file]').files[0];
        const reader = new FileReader();

        // console.log(preview);
        // console.log(file);
        console.log(reader);
        setError(false);
        if (
            file.type !== "image/jpeg" &&
            file.type !== "image/png" &&
            file.type !== "image/webp" &&
            file.type !== "image/gif") {
            setError(true);
        } else
            setError(false);


        reader.addEventListener("load", () => {
            // convert image file to base64 string
            preview.src = reader.result;
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }


    const onClickSave = async (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {

            const reader = new FileReader();

            reader.onloadend = async () => {
                const imageBase64 = btoa(reader.result);
                const response = await api.put(`/api/v1/users/${id}/image`, {image: imageBase64}, getToken())
                    .then(files);
                console.log(response);
                // console.log(files);

            };

            reader.onerror = () => {
                console.log("error");
            };

            reader.readAsBinaryString(files[0]);
        }
    };


    const onClickNavigate = (e) => {
        e.preventDefault();
        if (context.user.roles === "ROLE_VOLUNTEER" && !error) {
            navigate(`/profile-volunteer/${id}`);
        }
        if (context.user.roles === "ROLE_HELP-SEEKER" && !error) {
            navigate(`/profile/${id}`);
        }
    };


    async function deleteHandler() {
        const areYouSure = window.confirm("Je profielfoto wordt verwijderd!");
        if (areYouSure) {
            try {
                const response = await api.delete(`/api/v1/users/${id}/deleteImage`, getToken());
                if (response.status === 200) {
                    // 1. display a flash message
                    // appDispatch({type: "flashMessage", value: "Profielfoto succesvol verwijderd."});
                    // 2. redirect back to the current user's profile
                    if (context.user.roles === "ROLE_VOLUNTEER") {
                        navigate(`/profile-volunteer/${id}`);
                    }
                    if (context.user.roles === "ROLE_HELP-SEEKER") {
                        navigate(`/profile/${id}`);
                    }
                    console.log(response.data);
                }
            } catch (e) {
                navigate(-1);
            }
            appDispatch({type: "flashMessage", value: "Profielfoto succesvol verwijderd"});
        }
    }

    return (
        <Screen title="Profielfoto" wide={false}>
            <form className="edit-image" onChange={(e) => {
                onClickSave(e);
            }}>
                <ProfileWithDefaultImage
                    id="edit-image__default"
                    onChange={previewFile}
                    alt={`${context.username} profile`}
                    image={userData.image}
                />
                <div className="edit-image__div">
                    <input
                        className="edit-image__input"
                        type="file"
                        required
                        onChange={(e) => {
                            previewFile(e);
                        }}
                    />
                    {error && <strong className="error">ongeldige bestandstype </strong>}
                    <Button
                        id="edit-image__button"
                        type="submit"
                        disabled={error}
                        onClick={onClickNavigate}>
                        UPLOADEN<RiImageEditFill/>
                    </Button>
                    {context.user.roles === "ROLE_HELP-SEEKER" ? (
                        <Button id="edit-image__button" type="button"
                                onClick={() => navigate(`/profile/${id}`)}>ANNULEREN&nbsp;
                            <MdCancel/></Button>
                    ) : (<Button id="edit-image__button" type="button"
                                 onClick={() => navigate(`/profile-volunteer/${id}`)}>ANNULEREN&nbsp;
                        <MdCancel/></Button>)}
                    <Button id="edit-image__button-del" onClick={deleteHandler}>FOTO VERWIJDEREN&nbsp;
                        <MdOutlineImageNotSupported/></Button>
                </div>
            </form>
        </Screen>
    );
};

export default ProfileImage;