import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';

import {AuthContext} from '../../../context/auth-context';
import api from '../../../api/api-calls';

import ProfileWithDefaultImage from '../../../components/ProfileWithDefaultImage/ProfileWithDefaultImage';
import Button from '../../../components/UI/Button/Button';
import Screen from '../../../components/UI/Screen/Screen';
import {getToken} from '../../../helper/AccesToken/GetToken';
import Reply from '../../../components/Replies/Reply';
import './RequestWithReplies.css';
import {FaCommentDots, FaHandsHelping, FaRegFileExcel, FaTrashAlt} from 'react-icons/fa';
import {MdUpdate} from 'react-icons/md';
import {VscAccount} from 'react-icons/vsc';
import {TiDocumentDelete} from 'react-icons/ti';
import {BiImageAlt} from 'react-icons/bi';


const RequestWithReplies = () => {
    const {id} = useParams();
    const [requestData, setRequestData] = useState({});
    const [replyData, setReplyData] = useState({});
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();
    const context = useContext(AuthContext);
    const date = new Date(requestData.timestamp);
    const dateFormatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes().toLocaleString().padStart(2, "0")}`;
    const attachmentImageVisible =
        requestData.fileAttachment && requestData.fileAttachment.fileType.startsWith('image');


    const getRequestById = async (id) => {
        const requestData = await api.get(`/api/v1/requests/${id}`);
        const replyData = await api.get(`/api/v1/replies?requestId=${id}`);
        if (requestData.status === 200 || replyData.status === 200) {
            setRequestData({...requestData.data});
            setReplyData(replyData.data);
            // const { } = replyData.data[0];
            console.log(requestData.data);
            // console.log(replyData);
        } else {
        }
    };

    const getUserById = async () => {
        const userData = await api.get(`/api/v1/users?requestId=${id}`);
        if (userData.status === 200) {
            setUserData(userData.data[0]);
            // console.log(userData);
        } else {
        }
    };


    useEffect(() => {
        getRequestById(id);
        getUserById(id);
        // getReplyParamByRequestId(id);
    }, [id]);


    async function deleteHandler() {
        const areYouSure = window.confirm("De bericht zal worden verwijderd?");
        if (areYouSure) {
            try {
                const response = await api.delete(`/api/v1/requests/${id}`, getToken());
                if (response.status === 200) {
                    navigate(`/profile/${userData.id}`);
                    const requestsList = requestData.filter(request => request.id !== id);
                    setRequestData(requestsList);
                }
            } catch (e) {
                navigate(`/profile/${userData.id}`);
            }
        }
    }

    async function deleteImageHandler() {
        const areYouSure = window.confirm("De afbeelding zal worden verwijderd?");
        if (areYouSure) {
            try {
                const response = await api.delete(`/api/v1/requests/${id}/deleteImage`, getToken());
                if (response.status === 200) {
                    navigate(`/profile/${userData.id}`);
                    const requestsList = requestData.filter(request => request.id !== id);
                    setRequestData(requestsList);
                }
            } catch (e) {
                navigate(`/profile/${userData.id}`);
            }
        }
    }

    return (
        <Screen title="Hulpvraag & Reacties" wide={false}>
            <main className="main-request">
                {!context.user ?
                    (<div className="main-request__div-img">
                        <p className="main-request__p"></p>
                        <Link to={`/login`}>
                            <ProfileWithDefaultImage
                                alt={`${userData.username} profile`}
                                image={userData.image}
                            /></Link>
                    </div>)
                    :
                    (<div className="main-request__div-img">
                        <p className="main-request__p">NAAR DE PROFIEL VAN DE GEBRUIKER</p>
                        <Link to={`/profile/${userData.id}`}>
                            <ProfileWithDefaultImage
                                alt={`${userData.username} profile`}
                                image={userData.image}
                            /> </Link>
                    </div>)}


                {Object.keys(requestData).length > 0 ? (
                    <section className="main-request__info">
                        <h4 className="main-request__h4-title">Titel</h4>
                        <p className="main-request__title">{requestData.title}</p>
                        <div className="main-request__div-username">
                        <h4 className="main-request__h4-username">Gebruikersnaam</h4>
                        <p className="main-request__username">{userData.username}</p>
                        </div>
                        <div className="main-request__div-type">
                        <h4 className="main-request__h4-type">Type aanvraag</h4>
                        <p className="main-request__typeRequest">{requestData.typeRequest}</p>
                        </div>
                        <div className="main-request__div-content">
                        <h4 className="main-request__h4-content">Hulpvraag</h4>
                            <small className="main-request__date">{dateFormatted}</small>
                            <p className="main-request__content">{requestData.content}</p>
                        </div>


                        <div className="main-request__img-div">
                        {attachmentImageVisible && (
                            // <figure className="main-request__fig">
                                <img
                                className="main-request__img"
                                alt="attachment"
                                src={`http://localhost:8080/images/attachments/${requestData.fileAttachment.name}`}
                            />
                            // </figure>
                        )}
                        </div>


                        {context.user &&
                            (<div className="main-request__div-align-1">
                                <p className="request-replies">REACTIES OP DE AANVRAAG</p>
                                {replyData.length > 0 ? (
                                    replyData.map(reply => {
                                        return <Reply noAuthor={false} key={reply.id} reply={reply}/>;
                                    })) : (<p className="request-replies" >je hebt nog geen reacties</p>)}
                            </div>)}
                    </section>
                ) : (<p>Er zijn nog geen hulpaanvragen</p>)}

                {!context.user ? (<div>
                    Wil je helpen ? {""}
                    <Button id="main-request__button" type="button" onClick={() => navigate(`/register/volunteer`)}>
                        Registreer<VscAccount/></Button>
                </div>) : (

                    <div>
                    {context.user.roles === 'ROLE_HELP-SEEKER' &&

                        <div className="main-request__div-align-2" >
                        {context.user.id === requestData.userId && (
                            <div className="main-request__div-button">
                                {replyData.length > 0 ? (
                                    <Button id="main-request__button-react" type="button"
                                            onClick={() => navigate(`/post-reply/${id}`)}>REAGEER TERUG
                                        <FaCommentDots/> </Button>) : ("")}
                                <Button id="main-request__button-update" type="button"
                                        onClick={() => navigate(`/edit-request/${id}`)}>UPDATEN<MdUpdate/></Button>
                                <Button id="main-request__button-delete"
                                        onClick={deleteHandler}>VERWIJDEREN<FaRegFileExcel/></Button>
                                {requestData.fileAttachment && (
                                    <Button id="main-request__button-deletePic" onClick={deleteImageHandler}>FOTO
                                        VERWIJDEREN<BiImageAlt/></Button>)}
                            </div>)}
                    </div>}
                    {context.user.roles === 'ROLE_VOLUNTEER' && (
                        <div className="main-reply__div-button">
                            <Button id="main-reply__button" type="button"
                                    onClick={() => navigate(`/post-reply/${id}`)}>
                                HELPEN
                                <FaHandsHelping/>
                            </Button>
                        </div>)}
                </div>)}
            </main>
        </Screen>
    );
};

export default RequestWithReplies;
