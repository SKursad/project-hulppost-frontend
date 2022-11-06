import React, {useEffect, useState} from 'react';
import api from '../../api/api-calls';
import {Link, useParams} from 'react-router-dom';
import {getToken} from '../../helper/AccesToken/GetToken';
import Screen from '../../components/UI/Screen/Screen';
import ProfileWithDefaultImage from '../../components/ProfileWithDefaultImage/ProfileWithDefaultImage';
import './Accounts.css';

const Accounts = () => {
    const {id} = useParams();
    const [usersData, setUsersData] = useState([]);


    const getUsers = async () => {
        const usersData = await api.get(`/api/v1/users`, getToken());
        if (usersData.status === 200) {
            setUsersData(usersData.data);
            // console.log(usersData)
        } else {
            // appDispatch({type: "flashMessage", value: "Er ging iets mis"});
        }
    };


    useEffect(() => {
        getUsers();
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
                </div>
            </main>
        </Screen>
    );
};

export default Accounts;