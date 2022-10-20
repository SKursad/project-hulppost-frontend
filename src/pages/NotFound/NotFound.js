import React from 'react';
import Screen from '../../components/UI/Screen/Screen';
import {Link} from 'react-router-dom';

const NotFound = () => {
    return (
        <Screen title="Pagina niet gevonden">
            <div >
                <h2>Whoops, we kunnen de pagina niet vinden.</h2>
                <p>
                    U kunt altijd de <Link to="/">homepagina</Link>bezoeken.
                </p>
            </div>
        </Screen>
    );
};

export default NotFound;