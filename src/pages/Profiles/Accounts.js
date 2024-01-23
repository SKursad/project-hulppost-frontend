import React, { useEffect, useState } from 'react';
import api from '../../api/api-calls';
import { Link, useParams } from 'react-router-dom';
import { getToken } from '../../helper/AccesToken/GetToken';
import Screen from '../../components/UI/Screen/Screen';
import ProfileWithDefaultImage from '../../components/ProfileWithDefaultImage/ProfileWithDefaultImage';
import './Accounts.css';

const Accounts = () => {
    const { id } = useParams();
    const [usersData, setUsersData] = useState([]);

    const getUsers = async () => {
        try {
            const usersData = await api.get(`/api/v1/users`, getToken());
            if (usersData.status === 200) {
                setUsersData(usersData.data);
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getUsers();
    }, [id]);

    return (
        <Screen title={"ADMIN"}>
            <main className="main-profiles">
                <div className="main-profiles">
                    {usersData.map((currentUserData, index) => (
                        <React.Fragment key={index}>
                            {currentUserData.roles?.[0]?.name === 'ROLE_HELP-SEEKER' ? (
                                <li key={currentUserData.id}>
                                    <Link to={`/profile/${currentUserData.id}`}>
                                        <ProfileWithDefaultImage
                                            width="150"
                                            height="150"
                                            alt={`${currentUserData.username} profile`}
                                            image={currentUserData.image}
                                        />
                                        <p style={{ fontSize: "1.6rem" }}>{currentUserData.username}</p>
                                    </Link>
                                    <p style={{ fontSize: "1.6rem" }}>{currentUserData.email}</p>
                                </li>
                            ) : (
                                <li key={currentUserData.id}>
                                    <Link to={`/profile-volunteer/${currentUserData.id}`}>
                                        <ProfileWithDefaultImage
                                            width="150"
                                            height="150"
                                            alt={`${currentUserData.username} profile`}
                                            image={currentUserData.image}
                                        />
                                        <p style={{ fontSize: "1.6rem" }}>{currentUserData.username}</p>
                                    </Link>
                                    <p style={{ fontSize: "1.6rem" }}>{currentUserData.email}</p>
                                </li>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </main>
        </Screen>
    );
};

export default Accounts;
