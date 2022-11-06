import React, {useContext, useEffect, useState} from 'react';
import api from '../../api/api-calls';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {getToken} from '../../helper/AccesToken/GetToken';
import './Accounts.css';
import Screen from '../../components/UI/Screen/Screen';
import {AuthContext} from '../../context/auth-context';
import ProfileWithDefaultImage from '../../components/ProfileWithDefaultImage/ProfileWithDefaultImage';
import Button from '../../components/UI/Button/Button';
import {MdUpdate} from 'react-icons/md';

const Accounts = () => {
    const {id} = useParams();
    const context = useContext(AuthContext);
    const [accountsData, setAccountsData] = useState({});
    const [usersData, setUsersData] = useState([]);
    const navigate = useNavigate();
    // const [usersData, setUsersData] = useState({});


    const getAccounts = async () => {
        const accountsData = await api.get(`/api/v1/accounts`, getToken());
        if (accountsData.status === 200) {
            setAccountsData({...accountsData.data});
            // console.log(accountsData)
        } else {
            // appDispatch({type: "flashMessage", value: "Er ging iets mis"});
        }
    };

    const getUsers = async (id) => {
        const usersData = await api.get(`/api/v1/users`, getToken());
        if (usersData.status === 200) {
            // setUsersData({...usersData.data});
            setUsersData(usersData.data)
            console.log(usersData)
        } else {
            // appDispatch({type: "flashMessage", value: "Er ging iets mis"});
        }
    };


    useEffect(() => {
        // if (id) {
            getAccounts();
        getUsers();
            // getAccountsById();
        // }
    }, [id]);

    // Object.values(accountsData).map((x) => console.log(x));
    // Object.values(usersData).map((x) => console.log(x));

    return (
        <Screen title={"Profielen"}>

        <main className="main-profiles">
            <div className="main-profiles">
                {Object.values(usersData).map((currentUserData) => (
                    <>
                        {currentUserData.roles?.[0]?.name === 'ROLE_HELP-SEEKER' ? (
                            <li key={currentUserData.id}>{currentUserData.data}
                                <Link to={`/profile/${currentUserData.id}`}>
                                    <ProfileWithDefaultImage
                                        width="150"
                                        height="150"
                                        alt={`${currentUserData.username} profile`}
                                        image={currentUserData.image}
                                    />
                                    <p>{currentUserData.username}</p></Link>
                                <p>{currentUserData.email}</p>
                            </li>
                        ) : (
                            <li key={currentUserData.id}>{currentUserData.data}
                                <Link to={`/profile-volunteer/${currentUserData.id}`}>
                                    <ProfileWithDefaultImage
                                        width="150"
                                        height="150"
                                        alt={`${currentUserData.username} profile`}
                                        image={currentUserData.image}
                                    />
                                    <p>{currentUserData.username}</p></Link>
                                <p>{currentUserData.email}</p>
                            </li>
                        )}
                    </>
                ))}

                {context.user.roles === "ROLE_ADMIN" && (
                    <div className="main-profiles__button-div"><p>ADMIN REGISTRATIE</p>
                    <Button id="main-profiles__button" type="button" onClick={() => navigate('/register/admin')}>REGISTREER<MdUpdate/>
                    </Button>
                    </div>)}


            </div>
        </main>
        </Screen>
    );
};

export default Accounts;