import React from 'react';
import Screen from '../../components/UI/Screen/Screen';
import {Link} from 'react-router-dom';
import './NotFound.css'

const NotFound = () => {
    return (
        <Screen title="Pagina niet gevonden" wide={true}>
            <div className="not-found">
                <p className="not-found__p">Whoops, we kunnen de pagina die je zoekt niet vinden.</p>
                <p className="not-found__p2">
                    Je kunt altijd terug naar de <Link to="/">homepagina</Link>.
                </p>
            </div>
        </Screen>
    );
};

export default NotFound;