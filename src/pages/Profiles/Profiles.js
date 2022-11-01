import React, {useContext, useEffect, useState} from 'react';
import api from '../../api/api-calls';
import {Link, useParams} from 'react-router-dom';
import {getToken} from '../../helper/AccesToken/GetToken';
import './Profiles.css';
import Screen from '../../components/UI/Screen/Screen';
import {AuthContext} from '../../context/auth-context';

const Profiles = () => {
    const {id} = useParams();
    const context = useContext(AuthContext);
    // const [accountData, setAccountData] = useState([]);
    const [accountsData, setAccountsData] = useState({});
    const [usersData, setUsersData] = useState([]);
    // const [usersData, setUsersData] = useState({});


    const getAccounts = async (id) => {
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

    // const getAccountsById = async (id) => {
    //
    //     await api.get(`/hulppost/accounts/${id}`,getToken());
    //
    //     if (accountData.status === 200) {
    //         setAccountData(accountData.data);
    //         console.log(accountData.data)
    //     } else {
    //         // appDispatch({type: "flashMessage", value: "Er ging iets mis"});
    //     }
    // };

    // useEffect(() => {
    //     const filterRolesVolunteer = () => usersData.filter((usersData) => usersData.roles[0] === "ROLE_VOLUNTEER")
    //     console.log(filterRolesVolunteer.data)
    // }, [usersData.data]);


    // useEffect(() => {
    // let filterRolesVolunteer = usersData.filter((usersData) => usersData.roles[0].name === "ROLE_VOLUNTEER")
    // console.log(filterRolesVolunteer)
    // }, [usersData.data]);

    // useEffect(() => {
    //     {Object.values(usersData).filter((usersData) => (usersData.data === "ROLE_HELP-SEEKER"))}
    //
    // }, [usersData]);


    useEffect(() => {
        // if (id) {
            getAccounts();
        getUsers();
            // getAccountsById();
        // }
    }, [id]);

    // Object.values(accountsData).map((x) => console.log(x));
    Object.values(usersData).map((x) => console.log(x));

    return (
        <Screen title={"Profielen"}>

        <main className="main-profiles">
            <p>test 1 2 3 4</p>
            <div className="main-profiles">

                {/*{usersData.data === 'ROLE_HELP-SEEKER' ? (*/}
                    <div>

                {Object.values(accountsData).map((accountsData) => (
                    <li key={accountsData.id}>{accountsData.data} :

                            <Link to={`/profile/${accountsData.id}`}> <p >{accountsData.id}</p></Link>


                        <p >{accountsData.firstName}</p>
                        <p >{accountsData.surname}</p>
                    </li> ))}

                    </div>) : ("")}

                {/*{usersData.roles?.[0]?.name === 'ROLE_HELP-SEEKER' ? (*/}
                {/*    <div>*/}
                {/*        -------------------------------------HELP SEEKR*/}
                {Object.values(usersData).map((currentUserData) => (
                    <>
                        {currentUserData.roles?.[0]?.name === 'ROLE_HELP-SEEKER' ? (
                            <li key={currentUserData.id}>{currentUserData.data}
                                <Link to={`/profile/${currentUserData.id}`}><p>{currentUserData.id}</p></Link>

                                <p>{currentUserData.roles[0].name.toString()}</p>
                                <p>{currentUserData.username}</p>
                            </li>
                        ) : (
                            <li key={currentUserData.id}>{currentUserData.data}
                                <Link to={`/mooooo/${currentUserData.id}`}><p>{currentUserData.id}</p></Link>

                                <p>{currentUserData.roles[0].name.toString()}</p>
                                <p>{currentUserData.username}</p>
                            </li>
                        )}
                    </>
                ))}
                {/*{usersData.map((user) => <div><p>{user.id}</p></div>)}*/}


                {/*{accountsData.length > 0 ? (*/}
                {/*    accountsData.map(key => {*/}
                {/*        return <p  key={key.id}> {accountsData.surname}</p>;*/}
                {/*    })) : (<p>je hebt nog geen reacties</p>)}*/}


                    {/*// <section>*/}
                    {/*//     <li key={accountsData.id}><p>{accountsData.firstName}</p></li>*/}
                    {/*//     <li key={accountsData.id}>{accountsData.firstName}</li>*/}
                    {/*//     <li key={accountsData.data}>{accountsData.id}</li>*/}
                    {/*//     <li key={accountsData.data}>{accountsData.id}</li>*/}
                    {/*// </section>) : (<p></p>)}*/}
            </div>
        </main>
        </Screen>
    );
};

export default Profiles;