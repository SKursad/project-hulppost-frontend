import React, { useEffect, useState } from 'react';
import Feed from '../../../components/Requests/Feed';
import api from '../../../api/api-calls';
import Screen from '../../../components/UI/Screen/Screen';
import './SearchRequests.css';

const SearchRequests = () => {
    const [requests, setRequests] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [search, setSearch] = useState('');
    
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await api.get('/api/v1/requests');
                setRequests(response.data);
            } catch (e) {
                if (e.response) {
                    console.log(e.response.data);
                } else {
                    console.log(`Fout: ${e.message}`);
                }
            }
        };

        fetchRequests();
    }, []);

    useEffect(() => {
        const filteredResults = requests.filter(request =>
            request.content.toLowerCase().includes(search.toLowerCase()) ||
            request.title.toLowerCase().includes(search.toLowerCase()) ||
            request.typeRequest.toLowerCase().includes(search.toLowerCase())
        );
        setSearchResults(filteredResults.reverse());
    }, [requests, search]);

    return (
        <Screen title="Alle Hulpaanvragen" wide={true}>
            <main className="main-searchbar">
                <div className="main-searchbar_background" />
                <form className="main-searchbar__form" onSubmit={(e) => e.preventDefault()}>
                    <div className="main-searchbar__div">
                        <input
                            className="main-searchbar__search"
                            id="search"
                            type="text"
                            placeholder="zoek in hulpvragen"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        {searchResults.length ? (
                            <Feed requests={searchResults} />
                        ) : (
                            <p style={{ marginTop: '2rem' }}>
                                Geen aanvragen om te laten zien
                            </p>
                        )}
                    </div>
                </form>
            </main>
        </Screen>
    );
};

export default SearchRequests;
