import React, {useEffect, useState} from 'react';
import Feed from '../../../components/Requests/Feed';
import api from '../../../api/api-calls';
import Screen from '../../../components/UI/Screen/Screen';
import './SearchRequests.css';


const SearchRequests = () => {

    const [requests, setRequests] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [search, setSearch] = useState('');
    const attachmentImageVisible =
        requests.fileAttachment && requests.fileAttachment.fileType.startsWith('image');


    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await api.get('/api/v1/requests');
                setRequests(response.data);
                // console.log(response);
            } catch (e) {
                if (e.response) {
                    // not in the 200 response range
                    console.log(e.response.data);
                } else {
                    // axios documentation
                    console.log(`Fout: ${e.message}`);
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
        <Screen title="Alle Hulpaanvragen" wide={true}>
            <main className="main-searchbar">
                <div className="main-searchbar_background"/>
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
                    {requests.length ? (
                        <Feed requests={searchResults}/>
                    ) : (
                        <p style={{marginTop: '2rem'}}>
                            Geen aanvragen om te laten zien</p>
                    )}
                    {attachmentImageVisible && (
                        <img
                            alt="attachment"
                            src={`http://localhost:8080/images/attachments/${requests.fileAttachment.name}`}
                        />
                    )}
                </div>
                </form>
            </main>
        </Screen>
    );
};

export default SearchRequests;