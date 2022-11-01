import React, {useContext, useEffect, useState} from 'react';
import api from '../../../api/api-calls';
import {useNavigate, useParams} from 'react-router-dom';
import Button from '../../../components/UI/Button/Button';
import {getToken} from '../../../helper/AccesToken/GetToken';
import Screen from '../../../components/UI/Screen/Screen';
import './ProfileImage.css';
import ProfileWithDefaultImage from '../../../components/ProfileWithDefaultImage/ProfileWithDefaultImage';
import {AuthContext} from '../../../context/auth-context';
import {FaImages} from 'react-icons/fa';


const ProfileImage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [userData, setUserData] = useState([]);
    const context = useContext(AuthContext);


    useEffect(() => {
        getUserById(id);
    }, [id]);

    const getUserById = async (id) => {
        const userData = await api.get(`/api/v1/users/${id}`);
        if (userData.status === 200) {
            setUserData({...userData.data});
            console.log(userData.status);
            // setFormValueUser({...userData.data});
        } else {
            console.log("Er ging iets mis");
        }
    };


    function previewFile() {

        const preview = document.querySelector('img:not(#main-header__logo)');
        const file = document.querySelector('input[type=file]').files[0];
        const reader = new FileReader();

        console.log(preview);
        console.log(file);
        console.log(reader);
        setError(false);
        if (
            file.type !== "image/jpeg" &&
            file.type !== "image/png" &&
            file.type !== "image/webp" &&
            file.type !== "image/gif")
        {
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
        console.log();
        const files = e.target.files;
        if (files && files.length > 0) {


            const reader = new FileReader();

            reader.onloadend = async () => {
                const imageBase64 = btoa(reader.result);
                const response = await api.put(`/api/v1/users/${id}/image`, {image: imageBase64}, getToken())
                    .then(files);
                console.log(response);
                console.log(files);

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
        const areYouSure = window.confirm("Je profielfoto wordt verwijderd?");
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
        }
    }

    return (
        <Screen title="Profielfoto" wide={true}>
            <form className="form-upload" onSubmit={onClickSave}>
                <ProfileWithDefaultImage
                    width="200"
                    height="200"
                    onChange={previewFile}
                    alt={`${context.username} profile`}
                    image={userData.image}
                />
                <div className="div-profileImage">
                    <input
                        type="file"
                        required={true}
                        // id="fileInput"
                        // onChange={previewFile}
                        onChange={e => {
                            previewFile(e);
                            onClickSave(e);
                        }}
                    />
                    {error && <strong className="error">ongeldige bestandstype </strong>}
                    <button
                        type="submit"
                        disabled={error}
                        onClick={onClickNavigate}>
                        UPLOADEN<FaImages/>
                    </button>
                    <Button onClick={deleteHandler}>FOTO VERWIJDEREN</Button>
                </div>
            </form>
        </Screen>
    );
};

export default ProfileImage;