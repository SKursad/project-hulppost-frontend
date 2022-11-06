import React from 'react';
import RequestsFeed from './RequestsFeed';
import Screen from '../UI/Screen/Screen';


const Feed = ({requests}) => {
    return (
        <Screen>
            <div className="feed-article__request">
                {requests.map(request => (
                    <RequestsFeed key={request.id} request={request}/>
                ))}
            </div>
        </Screen>
    );
};

export default Feed;