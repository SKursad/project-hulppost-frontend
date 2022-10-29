import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import ProfileWithDefaultImage from '../../../components/ProfileWithDefaultImage/ProfileWithDefaultImage';
import api from '../../../api/api-calls';
import {getToken} from '../../../helper/AccesToken/GetToken';
import {AuthContext} from '../../../context/auth-context';
import Button from '../../../components/UI/Button/Button';
import Reply from '../../../components/Replies/Reply';

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
    const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;


    useEffect(() => {
        if (id) {
            getAccountById();
            getUserById();
            getReplyParamByUserId();
        }
    }, [id]);

    const getUserById = async (id) => {
        const userData = await api.get(`/hulppost/users/${userId}`);
        if (userData.status === 200) {
            setUserData(userData.data);
            console.log(userData);
        } else {
            // appDispatch({type: "flashMessage", value: "Er ging iets mis"});
        }
    };

    const getAccountById = async (id) => {
        const accountData = await api.get(`/hulppost/accounts/${accountId}`, getToken());
        if (accountData.status === 200) {
            setAccountData(accountData.data);
            // setIsLoading(false)
            // console.log(accountData)
        } else {
            // appDispatch({type: "flashMessage", value: "Er ging iets mis"});
        }
    };


    const getReplyParamByUserId = async (id) => {
        const replyData = await api.get(`/hulppost/replies?userId=${userId}`, getToken());
        if (replyData.status === 200) {
            setReplyData(replyData.data);
            // setRequestData({...requestData.data[1]});
            console.log(replyData.data);
        } else {
            // appDispatch({type: "flashMessage", value: "Er ging iets mis"});
        }
    };


    return (
        <div>
            <main className="main-profile">
                <h1>Profielpagina</h1>
                <section id="user">
                    <h2>Gegevens</h2>
                    <div><strong>Gebruikersnaam:</strong> {userData.username}</div>
                    {/*<p><strong>Email:</strong> {userData.email}</p>*/}
                </section>
                <Link to={`/profile-volunteer/${id}`}>
                <ProfileWithDefaultImage
                    width="200"
                    height="200"
                    alt={`${context.username} profile`}
                    image={userData.image}
                />
                </Link>
                {context.user.username === userData.username &&
                    <Button type="button" onClick={() => navigate(`/profileEdit/${id}`)}>EDIT</Button>}



                {Object.keys(accountData).length > 0 &&
                    <section>
                        <p><strong>Naam:</strong>{accountData.firstName}</p>
                        <p><strong>Achternaam:</strong>{accountData.surname}</p>
                        <p><strong>Gender:</strong>{accountData.gender}</p>
                        <p><strong>Geboortedatum:</strong>{dateFormatted}</p>
                        <p><strong>Postcode:</strong>{accountData.zipCode}</p>
                        <p><strong>Postcode:</strong>{replyData.text}</p>
                    </section>
                }
                <h2>Reacties op Hulpaanvragen</h2>

                {Object.keys(replyData).length > 0 &&
                    <section>
                        <p><strong>Postcode:</strong>{replyData.data}</p>
                    </section>
                }

                {context.user.username === userData.username ? (
                        <p>je hebt totaal {userData.replyId} reactie(s) op hulpaanvragen</p>)
                    :
                    (context.user.username !== userData.username &&
                        <p>Heeft {userData.replyId} reactie(s) op hulpaanvragen</p>)}


                <>
                    {Object.values(replyData).map((replyData) => (
                        <section>
                            <p key={replyData.id}>{replyData.id}</p>
                        </section>
                    ))}
                    {replyData.length > 0 ? (
                        replyData.map(reply => {
                            return <Reply noAuthor={true} key={reply.id} reply={reply} />
                        })) : (<p></p>)}
                </>

                {replyData.length === 0 && context.user.username === userData.username ? (
                    <p className="lead text-muted text-center">
                        Je hebt nog geen reacties op hulpaanvragen. <Link to="/createRequest"> Hulp nodig?</Link>
                    </p>) : (replyData.length === 0 && context.user.username !== userData.username &&
                        <p className="lead text-muted text-center">{userData.username} heeft nog geen reacties op hulpaanvragen.</p>)}

                {/*</>) : ('')}*/}
            </main>
        </div>
    );
};

export default VolunteerProfile;