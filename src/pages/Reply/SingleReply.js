import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {getToken} from '../../helper/AccesToken/GetToken';
import {AuthContext} from '../../context/AuthContext';
import DispatchContext from '../../context/DispatchContext';
import api from '../../api/api-calls';
import ProfileWithDefaultImage from '../../components/ProfileWithDefaultImage/ProfileWithDefaultImage';
import Screen from '../../components/UI/Screen/Screen';
import Button from '../../components/UI/Button/Button';
import {FaTrashAlt} from 'react-icons/fa';
import {MdUpdate} from 'react-icons/md';
import './SingleReply.css';

const SingleReply = () => {
    const {id} = useParams();
    const context = useContext(AuthContext);
    const appDispatch = useContext(DispatchContext);
    const [replyData, setReplyData] = useState([]);
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();
    const date = new Date(replyData.timestamp);
    const dateFormatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes().toLocaleString().padStart(2, "0")}`;



    const getReplyById = async (id) => {
        const replyData = await api.get(`/api/v1/replies/${id}`);
        if (replyData.status === 200 || replyData.status === 200) {
            setReplyData(replyData.data);
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
        const areYouSure = window.confirm("Het bericht zal worden verwijderd! ");
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
            appDispatch({type: "flashMessage", value: "Reactie succesvol verwijderd"});
        }
    }


    return (
        <Screen title="Reacties">
            <main className="main-reply">
                <div className="main-reply__div-img">
                    <p className="main-reply__p">NAAR DE PROFIEL VAN DE GEBRUIKER</p>
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
                    <article id="article-reply">
                        <p>Geplaatst door</p>
                        <p>{userData.username}</p>
                        <small className="article-reply__date">op {dateFormatted}</small>
                        <p>Bericht:</p>
                        <Link to={`/request/${replyData.requestId}`}><p className="article-reply__p">{replyData.text}</p></Link>
                        <br/>
                        <p id="article-reply__p">KLIK OP HET BERICHT OM NAAR DE HULPAANVRAAG TE GAAN</p>
                    </article>
                ) : (<p>Er zijn nog geen hulpaanvragen</p>)}

                {context.user.id === replyData.userId ? (<>
                    <div className="main-reply__div-button">
                        <Button id="main-reply__button" type="button"
                                onClick={() => navigate(`/edit-reply/${id}`)}>UPDATEN<MdUpdate/></Button>
                        <Button id="main-reply__del-button" onClick={deleteHandler}> VERWIJDEREN<FaTrashAlt/></Button>
                    </div>
                </>) : ('')}


            </main>
        </Screen>
    );
};

export default SingleReply;