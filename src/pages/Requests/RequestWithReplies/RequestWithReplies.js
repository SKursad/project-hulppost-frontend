import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';

import api from '../../../api/api-calls';
import ProfileWithDefaultImage from '../../../components/ProfileWithDefaultImage/ProfileWithDefaultImage';
import Button from '../../../components/UI/Button/Button';
import Screen from '../../../components/UI/Screen/Screen';
import {getToken} from '../../../helper/AccesToken/GetToken';
import Reply from '../../Reply/Reply';
import './RequestWithReplies.css';
import {AuthContext} from '../../../context/auth-context';


const RequestWithReplies = () => {
    const {id} = useParams();
    const [requestData, setRequestData] = useState({});
    const [replyData, setReplyData] = useState({});
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();
    const context = useContext(AuthContext);
    const date = new Date(requestData.timestamp);
    const dateR = new Date(replyData.timestamp);
    const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes().toLocaleString().padStart(2, "0")}`;
    const dateFormattedR = `${dateR.getMonth() + 1}/${dateR.getDate()}/${dateR.getFullYear()} ${dateR.getHours()}:${dateR.getMinutes().toLocaleString().padStart(2, "0")}`;
    const attachmentImageVisible =
        requestData.fileAttachment && requestData.fileAttachment.fileType.startsWith('image');


    const getRequestById = async (id) => {
        const requestData = await api.get(`hulppost/requests/${id}`);
        const replyData = await api.get(`hulppost/replies?requestId=${id}`);
        if (requestData.status === 200 || replyData.status === 200) {
            setRequestData({...requestData.data});
            setReplyData(replyData.data);
            // const { } = replyData.data[0];
            console.log(requestData);
            console.log(replyData);
        } else {
        }
    };

    const getUserById = async () => {
        const userData = await api.get(`/hulppost/users?requestId=${id}`, getToken());
        if (userData.status === 200) {
            setUserData(userData.data[0]);
            console.log(userData);
        } else {
        }
    };


    useEffect(() => {
        getRequestById(id);
        getUserById(id);
        // getReplyParamByRequestId(id);
    }, [id]);


    async function deleteHandler() {
        const areYouSure = window.confirm("Do you really want to delete this post?");
        if (areYouSure) {
            try {
                const response = await api.delete(`/hulppost/requests/${id}`, getToken());
                if (response.status === 200) {
                    // navigate(`/profile/${user.id}`)
                    const requestsList = requestData.filter(request => request.id !== id);
                    setRequestData(requestsList);
                }
            } catch (e) {
                navigate(-1);
            }
        }
    }

    return (
        <Screen title="Hulpvraag & Reacties">
            <main className="main-request">
                <p>Geplaatst door:</p>
                <ProfileWithDefaultImage
                    width="200"
                    height="200"
                    alt={`${context.username} profile`}
                    image={userData.image}
                />
                {Object.keys(requestData).length > 0 ? (
                    <section className="main-request__info">
                        {/*<p>{replyData.text}</p>*/}
                        <h5>Titel</h5>
                        <p>{requestData.title}</p>
                        <h5>naam</h5>
                        <p>{userData.username}</p>
                        <h5>Type aanvraag</h5>
                        <p>{requestData.typeRequest}</p>
                        <h5>Hulpvraag</h5>
                        <small>{dateFormatted}</small>
                        <p>{requestData.content}</p>
                        {attachmentImageVisible && (
                            <img
                                alt="attachment"
                                src={`http://localhost:8080/images/attachments/${requestData.fileAttachment.name}`}
                            />
                        )}
                    </section>
                ) : (<p>Er zijn nog geen hulpvragen</p>)}
                <div>
                    {replyData.length > 0 ? (
                        replyData.map(reply => {
                            return <Reply noAuthor={true} key={reply.id} reply={reply}/>;
                        })) : (<p>je hebt nog geen reacties</p>)}
                </div>

                {!context.user ? (<>
                    Wil je helpen ? {""}
                    <Button type="button" onClick={() => navigate(`/register/help-seeker`)}>
                        MAAK DAN EEN ACCOUNT AAN</Button>
                </>) : (<>
                        {context.user.roles === 'ROLE_HELP-SEEKER' ? (<>
                            {context.user.id === requestData.userId ? (<>
                                <Button type="button" onClick={() => navigate(`/createReply/${id}`)}>REAGEER
                                    TERUG</Button>
                                <Button type="button"
                                        onClick={() => navigate(`/edit-request/${id}`)}>UPDATEN </Button>
                                <Button onClick={deleteHandler}>VERWIJDEREN</Button>
                            </>) : ('')}
                        </>) : ('')}
                        {context.user.roles === 'ROLE_VOLUNTEER' ? (<>
                            <Button type="button" onClick={() => navigate(`/post-reply/${id}`)}>HELPEN</Button>
                            <Button type="button" onClick={() => navigate(`/edit-Reply/${id}`)}>UPDATEN</Button>
                        </>) : (<>{context.user.id === replyData.userId ?
                            <Button type="button" onClick={() => navigate(`/edit-Reply/${id}`)}>UPDATEN</Button> : ('')}
                        </>)}
                    </>
                )}
            </main>
        </Screen>
    );
};

export default RequestWithReplies;
