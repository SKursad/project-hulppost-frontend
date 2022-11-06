import React from 'react';
import Screen from '../../components/UI/Screen/Screen';
import './Info.css';

const Info = () => {
    return (
        <Screen title="Informatie" wide={true}>
            <main className="main-info">
                <div className="main-info__div">
                <h1 className="main-info__h1">Informatie</h1>
                <p className="main-info__p">Doel van deze applicatie is om de connectie te bouwen tussen hulp zoekende
                    mensen en/of organisaties
                    en vrijwilligers (tijdelijk) alleen binnen Noord-Holland.
                    <p className="main-info__p2">
                    De applicatie is nog in testfase en is nog in ontwikkeling. Indien er hulpvragen en reacties zijn
                    die niet
                    gepast zijn, worden de accounts per direct verwijderd. Ook is de applicatie beveiligd en gaat
                    zorgvuldig om
                    met de privacy-gegevens.
                    Omdat de applicatie in de testfase is kunnen geen rechten worden ontleend.
                    Mocht er vragen zijn over de applicatie kunt u mailen naar hulppostAdmin@gmail.com</p>
                    </p>
                </div>
            </main>

        </Screen>
    );
};

export default Info;