import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import ProfileWithDefaultImage from '../../../components/ProfileWithDefaultImage/ProfileWithDefaultImage';
import api from '../../../api/api-calls';
import {getToken} from '../../../helper/AccesToken/GetToken';
import {AuthContext} from '../../../context/auth-context';
import Button from '../../../components/UI/Button/Button';
import Reply from '../../../components/Replies/Reply';
import Screen from '../../../components/UI/Screen/Screen';
import RefreshPage from '../../../helper/RefreshPage/RefreshPage';
import {FaTrashAlt} from 'react-icons/fa';
import {TiUserDelete} from 'react-icons/ti';

const VolunteerProfile = () => {
    const {id} = useParams();
    const context = useContext(AuthContext);
    const [userId] = useState(id);
    const [accountId] = useState(id);
    const [replyData, setReplyData] = useState({});
    const [accountData, setAccountData] = useState([]);
    const [userData, setUserData] = useState([]);
    const date = new Date(accountData.birthday);
    const navigate = useNavigate();
    const dateFormatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;


    useEffect(() => {
        getAccountById();
        getUserById();
        getReplyParamByUserId();

    }, [id]);

    const getUserById = async () => {
        const userData = await api.get(`/api/v1/users/${userId}`);
        if (userData.status === 200) {
            setUserData(userData.data);
            console.log(userData);
        } else {
            // appDispatch({type: "flashMessage", value: "Er ging iets mis"});
        }
    };

    async function deleteUserHandler() {
        const areYouSure = window.confirm("ADMIN");
        if (areYouSure) {
            try {
                const response = await api.delete(`/api/v1/users/${id}`, getToken());
                if (response.status === 200) {
                    RefreshPage(navigate(`/`));
                }
            } catch (e) {
            }
        }
    }

    const getAccountById = async () => {
        const accountData = await api.get(`/api/v1/accounts/${accountId}`, getToken());
        if (accountData.status === 200) {
            setAccountData(accountData.data);
            // setIsLoading(false)
            console.log(accountData);
        } else {
            // appDispatch({type: "flashMessage", value: "Er ging iets mis"});
        }
    };

    async function deleteAccountHandler() {
        const areYouSure = window.confirm("Weet je zeker dat je de account wilt verwijderen?");
        if (areYouSure) {
            try {
                const response = await api.delete(`/api/v1/accounts/${id}`, getToken());
                if (response.status === 200) {
                    RefreshPage(navigate(`/`));
                }
            } catch (e) {
            }
        }
    }


    const getReplyParamByUserId = async () => {
        const replyData = await api.get(`/api/v1/replies?userId=${userId}`, getToken());
        if (replyData.status === 200) {
            setReplyData(replyData.data);
            // setRequestData({...requestData.data[1]});
            console.log(replyData.data);
        } else {
            // appDispatch({type: "flashMessage", value: "Er ging iets mis"});
        }
    };


    return (
        <Screen title="Profielpagina" wide={true}>
            <main className="main-profile">
                <h1>Profielpagina</h1>
                <section key={userData.username} id="user">
                    <h2>Gegevens</h2>
                    <div><strong>Gebruikersnaam:</strong> {userData.username}</div>
                    {/*<p><strong>Email:</strong> {userData.email}</p>*/}
                </section>
                <Link to={`/profile-volunteer/${id}`}>
                    <ProfileWithDefaultImage
                        width="200"
                        height="200"
                        alt={`${userData.username} profile`}
                        image={userData.image}
                    />
                </Link>
                {context.user.username === userData.username ? (
                    <div>
                        <Button type="button" onClick={() => navigate(`/edit-personalData/${id}`)}>EDIT</Button>
                        <Button type="button" onClick={() => navigate(`/edit-profileData/${id}`)}>EDIT</Button>
                        <Button type="button" onClick={() => navigate(`/change-password/${id}`)}>PASS</Button>
                        <Button type="button" onClick={() => navigate(`/put-profileImage/${id}`)}>Image</Button>
                    </div>) : ("")}


                {Object.keys(accountData).length > 0 &&
                    <section key={accountData.id}>
                        <p><strong>Naam:</strong>{accountData.firstName}</p>
                        <p><strong>Achternaam:</strong>{accountData.surname}</p>
                        <p><strong>Geslacht:</strong>{accountData.gender}</p>
                        <p><strong>Geboortedatum:</strong>{dateFormatted}</p>
                        <p><strong>Postcode:</strong>{accountData.zipCode}</p>
                    </section>
                }
                <h2>Reacties op Hulpaanvragen</h2>

                {context.user.username === userData.username ? (
                        <p>je hebt totaal {userData.replyId} reactie(s) op hulpaanvragen</p>)
                    :
                    (context.user.username !== userData.username &&
                        <p>Heeft {userData.replyId} reactie(s) op hulpaanvragen</p>)}


                {replyData.length > 0 ? (
                    replyData.map(reply => {
                        return <Reply noAuthor={true} key={reply.id} reply={reply}/>;
                    })) : (<p></p>)}


                {replyData.length === 0 && context.user.username === userData.username ? (
                    <p className="lead text-muted text-center">
                        Je hebt nog geen reacties op hulpaanvragen. <Link to="/createRequest"> Hulp nodig?</Link>
                    </p>) : (replyData.length === 0 && context.user.username !== userData.username &&
                    <p className="lead text-muted text-center">{userData.username} heeft nog geen reacties op
                        hulpaanvragen.</p>)}

                {context.user.username === userData.username && (
                    <div>
                        <p>Account verwijderen</p>
                        <Button id="main-request__button" onClick={deleteAccountHandler}>
                            VERWIJDER<TiUserDelete/>
                        </Button>
                    </div>)}

                {context.user.roles === "ROLE_ADMIN" && (
                    <div>
                        <p>Gebruiker verwijderen</p>
                        <Button id="main-request__button" onClick={deleteUserHandler}>
                            VERWIJDER<TiUserDelete/></Button>
                    </div>)}
            </main>
        </Screen>
    );
};

export default VolunteerProfile;