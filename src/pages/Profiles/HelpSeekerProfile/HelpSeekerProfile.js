import React, {useContext, useEffect, useState} from 'react';
import api from '../../../api/api-calls';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {getToken} from '../../../helper/AccesToken/GetToken';
import {AuthContext} from '../../../context/auth-context';
import Request from '../../../components/Requests/Request';
import Screen from '../../../components/UI/Screen/Screen';
import Button from '../../../components/UI/Button/Button';
import ProfileWithDefaultImage from '../../../components/ProfileWithDefaultImage/ProfileWithDefaultImage';
import {FaTrashAlt} from 'react-icons/fa';
import RefreshPage from '../../../helper/RefreshPage/RefreshPage';
import {TiUserDelete} from 'react-icons/ti';

const HelpSeekerProfile = () => {
    const {id} = useParams();
    const [userId] = useState(id);
    const [accountId] = useState(id);
    const context = useContext(AuthContext);
    const [accountData, setAccountData] = useState({});
    const [userData, setUserData] = useState({});
    const [requestData, setRequestData] = useState([]);
    // const appDispatch = useContext(DispatchContext);
    const date = new Date(accountData.birthday);
    const navigate = useNavigate();
    const dateFormatted = `${date.getDate() + 1}/${date.getMonth() + 1}/${date.getFullYear()}`;


    useEffect(() => {
        if (id) {
            getAccountById();
            getUserById();
            getRequestParamByUserId();
        }
    }, [id]);

    const getUserById = async () => {
        const userData = await api.get(`/api/v1/users/${userId}`, getToken());
        if (userData.status === 200) {
            setUserData(userData.data);
            // console.log(userData);
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
            // console.log(accountData)
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


    const getRequestParamByUserId = async () => {
        const response = await api.get(`/api/v1/requests?userId=${userId}`);
        if (response.status === 200) {
            setRequestData(response.data);
            console.log(response.data);
        } else if (response.status === 400 || response.status === 500) {
            // appDispatch({type: "flashMessage", value: "Er ging iets mis"});
        }
    };


    return (
        <Screen title="Profielpagina">
            <main className="main-profile">
                <h1>Profielpagina</h1>
                <section id="user">
                    <h2>Gegevens</h2>
                    <div><strong>Gebruikersnaam:</strong> {userData.username}</div>
                    {/*<p><strong>Email:</strong> {userData.email}</p>*/}
                </section>
                <Link to={`/profile/${id}`}>
                    <ProfileWithDefaultImage
                        width="150"
                        height="150"
                        alt={`${userData.username} profile`}
                        image={userData.image}
                    />
                </Link>

                {context.user.username === userData.username && (
                    <div>

                        <Button type="button" onClick={() => navigate(`/put-profileImage/${id}`)}>Image</Button>
                    </div>)}


                {Object.keys(accountData).length > 0 &&
                    <section>
                        <p><strong>Naam:</strong>{accountData.firstName}</p>
                        <p><strong>Achternaam:</strong>{accountData.surname}</p>
                        <p><strong>Geslacht:</strong>{accountData.gender}</p>
                        <p><strong>Geboortedatum:</strong>{dateFormatted}</p>
                        <p><strong>Postcode:</strong>{accountData.zipCode}</p>
                    </section>
                }{context.user.username === userData.username && (
                <div>
                    <Button type="button" onClick={() => navigate(`/edit-personalData/${id}`)}>EDIT</Button>
                    <Button type="button" onClick={() => navigate(`/edit-profileData/${id}`)}>EDIT</Button>
                    <Button type="button" onClick={() => navigate(`/change-password/${id}`)}>PASS</Button>

                </div>)}


                {/*{context.user.roles === 'ROLE_HELP-SEEKER' ? (<>*/}
                <h2>Hulpvragen</h2>
                {requestData.length > 0 &&
                    requestData.map(request => {
                        return <Request noAuthor={true} key={request.id} request={request}/>;
                    })}
                {requestData.length === 0 && context.user.username === userData.username && (
                    <p className="lead text-muted text-center">
                        Je hebt geen hulpvragen. <Link to="/post-request"> Klik hier als je een hulpvraag hebt?</Link>
                    </p>)}

                {requestData.length === 0 && context.user.username !== userData.username &&
                    <p className="lead text-muted text-center">{userData.username} heeft geen aanvragen.</p>}

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

export default HelpSeekerProfile;