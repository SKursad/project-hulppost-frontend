import React, {useContext, useEffect, useState} from 'react';
import api from '../../../api/api-calls';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {getToken} from '../../../helper/AccesToken/GetToken';
import {AuthContext} from '../../../context/auth-context';
import Request from '../../../components/Requests/Request';
import Screen from '../../../components/UI/Screen/Screen';
import Reply from '../../../components/Replies/Reply';
import Button from '../../../components/UI/Button/Button';
import ProfileWithDefaultImage from '../../../components/ProfileWithDefaultImage/ProfileWithDefaultImage';

const Profile = () => {
    const {id} = useParams();
    // const {requestId} = useParams();
    const [userId] = useState(id);
    const [accountId] = useState(id);
    const [requestId] = useState();
    const [isLoading, setIsLoading] = useState(true);
    // const [replyId] = useState(id);
    const context = useContext(AuthContext);
    const [accountData, setAccountData] = useState({});
    const [userData, setUserData] = useState({});
    const [requestData, setRequestData] = useState([]);
    const [replyData, setReplyData] = useState([]);
    let [replies, setRepliesData] = useState({});
    // const appDispatch = useContext(DispatchContext);
    const date = new Date(accountData.birthday);
    const navigate = useNavigate();
    const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;


    useEffect(() => {
        if (id) {
            getAccountById();
            getUserById();
            // getRequestParamByUserId();
            getReplyParamByRequestId();
        }
    }, [id]);

    const getUserById = async (id) => {
        const userData = await api.get(`/hulppost/users/${userId}`, getToken());
        if (userData.status === 200) {
            setUserData(userData.data);
            // console.log(userData);
        } else {
            // appDispatch({type: "flashMessage", value: "Er ging iets mis"});
        }
    };


    const getAccountById = async (id) => {
        const accountData = await api.get(`/hulppost/accounts/${accountId}`, getToken());
        if (accountData.status === 200) {
            setAccountData(accountData.data);
            setIsLoading(false);
            // console.log(accountData)
        } else {
            // appDispatch({type: "flashMessage", value: "Er ging iets mis"});
        }
    };

    // const getRepliesParamById = async (id) => {
    //     const response = await api.get(`/hulppost/replies?userId=${userId}`, getToken());
    //     if (response.status === 200) {
    //         setReplyData(response.data);
    //         // setRequestData({...requestData.data[1]});
    //         console.log(replyData);
    //     } else {
    //         // appDispatch({type: "flashMessage", value: "Er ging iets mis"});
    //     }
    // };


    const getReplyParamByRequestId = async (id) => {
        const response = await api.get(`/hulppost/requests?userId=${userId}`);
        if (response.status === 200) {
            setRequestData(response.data);
            console.log(requestData);
        } else if (response.status === 400 || response.status === 500) {
            // appDispatch({type: "flashMessage", value: "Er ging iets mis"});
        }
    };

    // if (isLoading) return <LoadingDotsIcon />
    // const renderList = getRequestData.map((item, index) =>
    //     <div key={index}>{item}</div>
    // );
    //



    return (
        <Screen title="Profielpagina">
            <main className="main-profile">
                <h1>Profielpagina</h1>
                <section id="user">
                    <h2>Gegevens</h2>
                    <div><strong>Gebruikersnaam:</strong> {userData.username}</div>
                    {/*<p><strong>Email:</strong> {userData.email}</p>*/}
                </section>
                <ProfileWithDefaultImage
                    width="150"
                    height="150"
                    alt={`${context.username} profile`}
                    image={userData.image}
                />
                {context.user.username === userData.username &&
                    <Button type="button" onClick={() => navigate(`/profileEdit/${id}`)}>EDIT</Button>}


                {Object.keys(accountData).length > 0 &&
                    <section>
                        <p><strong>Naam:</strong>{accountData.firstName}</p>
                        <p><strong>Achternaam:</strong>{accountData.surname}</p>
                        <p><strong>Gender:</strong>{accountData.gender}</p>
                        <p><strong>Geboortedatum:</strong>{dateFormatted}</p>
                        <p><strong>Postcode:</strong>{accountData.zipCode}</p>
                    </section>
                }


                {/*{context.user.roles === 'ROLE_HELP-SEEKER' ? (<>*/}
                <h2>Hulpvragen</h2>
                {requestData.length > 0 &&
                    requestData.map(request => {
                        return <Request noAuthor={true} key={request.id} request={request}/>;
                    })}
                {requestData.length === 0 && context.user.username === userData.username && (
                    <p className="lead text-muted text-center">
                        Je hebt geen hulpvragen. <Link to="/createRequest"> Hulp nodig?</Link>
                    </p>)}

                {requestData.length === 0 && context.user.username !== userData.username &&
                    <p className="lead text-muted text-center">{userData.username} heeft geen aanvragen.</p>}

                {/*</>) : ('')}*/}

                {/*<div className="main-profile__replies">*/}

                {/*{context.user.roles === "ROLE_VOLUNTEER" ? (<>*/}
                {/*    <h2>Reacties op Hulpaanvragen</h2>*/}

                {/*{replyData.length > 0 &&*/}
                {/*    replyData.map(reply => {*/}
                {/*        return <Reply noAuthor={false} key={userId} request={replyData} />*/}
                {/*    })}*/}

                {/*{replyData.length > 0 && Object.keys(replyData).map(key => <h3>{key} </h3>)}*/}
                {/*{replyData.length === 0 && context.user.username === userData.username && (*/}
                {/*    <p className="lead text-muted text-center">*/}
                {/*        Je hebt geen hulpvragen. <Link to="/createRequest"> Hulp nodig?</Link>*/}
                {/*    </p>)}*/}

                {/*{replyData.length === 0 && context.user.username !== userData.username &&*/}
                {/*    <p className="lead text-muted text-center">{userData.username} heeft geen reacties.</p>}*/}
                {/* </>) : ('')}*/}
                {/*</div>*/}


            </main>
        </Screen>
    );
};

export default Profile;