import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import ProfileWithDefaultImage from '../../../components/ProfileWithDefaultImage/ProfileWithDefaultImage';
import api from '../../../api/api-calls';
import {getToken} from '../../../helper/AccesToken/GetToken';
import {AuthContext} from '../../../context/AuthContext';
import Button from '../../../components/UI/Button/Button';
import Reply from '../../../components/Replies/Reply';
import Screen from '../../../components/UI/Screen/Screen';
import RefreshPage from '../../../helper/RefreshPage/RefreshPage';
import {FaTrashAlt} from 'react-icons/fa';
import {TiUserDelete} from 'react-icons/ti';
import {RiAccountCircleFill} from 'react-icons/ri';
import {VscAccount} from 'react-icons/vsc';
import {MdPassword} from 'react-icons/md';
import '../Accounts.css'

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

                <Link to={`/profile-volunteer/${id}`}>
                    <ProfileWithDefaultImage
                        width="150"
                        height="150"
                        alt={`${userData.username} profile`}
                        image={userData.image}
                    />
                </Link>
                {context.user.username === userData.username && (
                    <div className="main-profile__edit-foto-div">

                        <Button className="main-profile__edit-foto" type="button"
                                onClick={() => navigate(`/put-profileImage/${id}`)}>
                            <RiAccountCircleFill/> Profielfoto aanpassen
                        </Button>
                    </div>)}
                <section id="user">
                    <div><strong>Gebruikersnaam:</strong> {userData.username}
                        <p><strong>Email: </strong> {userData.email}</p>
                    </div>
                </section>


                {Object.keys(accountData).length > 0 &&
                    <section>
                        <p><strong>Naam:&nbsp;</strong>{accountData.firstName}</p>
                        <p><strong>Achternaam:&nbsp;</strong>{accountData.surname}</p>
                        <p><strong>Geslacht:&nbsp;</strong>{accountData.gender}</p>
                        <p><strong>Geboortedatum:&nbsp;</strong>{dateFormatted}</p>
                        <p><strong>Postcode:&nbsp;</strong>{accountData.zipCode}</p>
                    </section>
                }{context.user.username === userData.username && (
                <div className="main-profile__settings">
                    <p className="main-profile__settings-p">INSTELLINGEN</p>
                    <Button className="main-profile__edit-personal" type="button" onClick={() => navigate(`/edit-personalData/${id}`)}><VscAccount/>&nbsp;Persoonlijke gegevens</Button>
                    <Button className="main-profile__edit-profile" type="button" onClick={() => navigate(`/edit-profileData/${id}`)}><VscAccount/>&nbsp;Profielgegevens</Button>
                    <Button className="main-profile__edit-pass" type="button" onClick={() => navigate(`/change-password/${id}`)}><MdPassword/>&nbsp;Wachtwoord</Button>
                </div>)}
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
                        <p id="main-profile-del">Account verwijderen</p>
                        <Button id="main-profile__del-button" onClick={deleteAccountHandler}>
                            VERWIJDER<TiUserDelete/>
                        </Button>
                    </div>)}

                {context.user.roles === "ROLE_ADMIN" && (
                    <div>
                        <p id="main-profile-del">Gebruiker verwijderen</p>
                        <Button id="main-profile__del-button"  onClick={deleteUserHandler}>
                            VERWIJDER<TiUserDelete/></Button>
                    </div>)}
            </main>
        </Screen>
    );
};

export default VolunteerProfile;