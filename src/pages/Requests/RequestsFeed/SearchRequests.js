import React, {useContext, useEffect, useState} from 'react';
import Feed from '../../../components/Requests/Feed';
import api from '../../../api/api-calls';
import Screen from '../../../components/UI/Screen/Screen';
import {AuthContext} from '../../../context/auth-context';
import {Link} from 'react-router-dom';
import './SearchRequests.css';


const SearchRequests = () => {

    const [requests, setRequests] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [search, setSearch] = useState('');
    const context = useContext(AuthContext);
    const attachmentImageVisible =
        requests.fileAttachment && requests.fileAttachment.fileType.startsWith('image');


    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await api.get('/api/v1/requests');
                setRequests(response.data);
                console.log(response);

            } catch (err) {
                if (err.response) {
                    console.log();
                    // not in the 200 response range
                    console.log(err.response.data);
                } else {
                    // axios documentation
                    console.log(`Fout: ${err.message}`);
                }
            }
        };

        fetchRequests();
    }, []);


    useEffect(() => {
        const filteredResults = requests.filter(request =>
            ((request.content.toLowerCase())).includes(search.toLocaleLowerCase())
            || ((request.title.toLowerCase())).includes(search.toLocaleLowerCase())
            || ((request.typeRequest.toLowerCase())).includes(search.toLocaleLowerCase()));
        setSearchResults(filteredResults.reverse());
    }, [requests, search]);

    return (
        <Screen title="Alle Hulpaanvragen">
            <main className="main-searchbar">
                <form className="main-searchbar__form" onSubmit={(e) => e.preventDefault()}>
                    <input
                        className="main-searchbar__search"
                        // label="search"
                        id="search"
                        type="text"
                        placeholder="Zoek in hulpvragen"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        // error={error}
                    />
                    {!context.user && (
                        <Link to="/register/help-seeker">MAAK EEN ACCOUNT AAN</Link>
                    )}
                    {requests.length ? (
                        <Feed requests={searchResults}/>
                    ) : (
                        <p style={{marginTop: '2rem'}}>
                            Geen aanvragen om te laten zien
                        </p>
                    )}
                    {attachmentImageVisible && (
                        <img
                            alt="attachment"
                            src={`http://localhost:8080/images/attachments/${requests.fileAttachment.name}`}
                        />
                    )}
                </form>
            </main>
        </Screen>
    );
};

export default SearchRequests;