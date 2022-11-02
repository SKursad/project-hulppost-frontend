import React, {useContext, useEffect, useState} from 'react';
import api from '../../api/api-calls';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {getToken} from '../../helper/AccesToken/GetToken';
import ProfileWithDefaultImage from '../../components/ProfileWithDefaultImage/ProfileWithDefaultImage';
import Screen from '../../components/UI/Screen/Screen';
import Button from '../../components/UI/Button/Button';
import {FaTrashAlt} from 'react-icons/fa';
import {MdUpdate} from 'react-icons/md';
import {AuthContext} from '../../context/auth-context';

const SingleReply = () => {
    const {id} = useParams();
    const context = useContext(AuthContext);
    const [replyData, setReplyData] = useState([]);
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();
    const date = new Date(replyData.timestamp);
    const dateFormatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes().toLocaleString().padStart(2, "0")}`;



    const getReplyById = async (id) => {
        const replyData = await api.get(`/api/v1/replies/${id}`);
        // const replyData = await api.get(`hulppost/requests?replyId=${id}`);
        if (replyData.status === 200 || replyData.status === 200) {
            // setRequestData({...requestData.data});
            setReplyData(replyData.data);
            // const { } = replyData.data[0];
            // console.log(requestData);
            console.log(replyData.data);
        } else {
        }
    };

    const getUserById = async () => {
        const userData = await api.get(`/api/v1/users?replyId=${id}`, getToken());
        if (userData.status === 200) {
            setUserData(userData.data[0]);
            // console.log(userData);
        } else {
        }
    };

    useEffect(() => {
        getReplyById(id);
        getUserById(id);
    }, [id]);


    async function deleteHandler() {
        const areYouSure = window.confirm("De bericht zal worden verwijderd? ");
        if (areYouSure) {
            try {
                const response = await api.delete(`/api/v1/replies/${id}`, getToken());
                if (response.status === 200) {
                    // navigate(`/profile/${user.id}`)
                    const repliesList = replyData.filter(reply => reply.id !== id);
                    setReplyData(repliesList);
                }
            } catch (e) {
                navigate(-1);
            }
        }
    }


    return (
        <Screen title="Reacties">
            <main className="main-request">
                <div className="main-request__div-img">
                    <p className="main-request__p">NAAR DE PROFIEL VAN DE GEBRUIKER</p>
                    {userData.id === replyData.userId ? (
                            <Link to={`/profile-volunteer/${userData.id}`}>
                                <ProfileWithDefaultImage
                                    alt={`${userData.username} profile`}
                                    image={userData.image}/>
                            </Link>)
                        :
                        (<Link to={`/profile/${userData.id}`}>
                            <ProfileWithDefaultImage
                                alt={`${userData.username} profile`}
                                image={userData.image}/></Link>)}
                </div>
                {Object.keys(replyData).length > 0 ? (
                    <article className="article-reply">
                        <p>Geplaatst door</p>
                        <p>{userData.username}</p>
                        <small className="article-reply__date">{dateFormatted}</small>
                        <p>REACTIE</p>
                        <Link to={`/request/${replyData.requestId}`}><p className="article-reply__p">{replyData.text}</p></Link>
                        <br/>
                        <h5>KLIK OP DE REACTIE OM NAAR DE HULPAANVRAAG TE NAVIGEREN</h5>
                    </article>
                ) : (<p>Er zijn nog geen hulpaanvragen</p>)}

                {context.user.id === replyData.userId ? (<>
                    <div className="main-request__div-button">
                        {/*<Button id="main-request__button" type="button"*/}
                        {/*        onClick={() => navigate(`/post-reply/${id}`)}>REAGEER TERUG*/}
                        {/*    <FaCommentDots/> </Button>*/}
                        <Button id="main-request__button" type="button"
                                onClick={() => navigate(`/edit-reply/${id}`)}>UPDATEN<MdUpdate/></Button>
                        <Button id="main-profile__del-button" onClick={deleteHandler}> VERWIJDEREN<FaTrashAlt/></Button>
                    </div>
                </>) : ('')}


            </main>
        </Screen>
    );
};

export default SingleReply;