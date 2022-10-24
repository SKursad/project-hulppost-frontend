import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Screen from '../../components/UI/Screen/Screen';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    return (
        <Screen title="Welkom!" wide={true}>
            <main className= "app-overview__main">
                <section id="app-overview__info">
                    <div className="background"/>
                    <h1 className= "app-overview__title-h1">Welkom bij HulpPost!</h1>
                    <h3 className= "app-overview__sub-h3"> Dit is een platform om mensen bij elkaar te brengen die elkaar willen helpen</h3>
                    <section className="app-overview__v">
                        <div  id="volunteer">
                            <h3 className="app-overview__title"> Wil je helpen? </h3>
                            <p className="app-overview__sub">Maak een account aan als je iets voor iemand kan betekenen.</p>
                            <button className="btn" onClick={() => navigate(`/register/volunteer`)}>Registreer</button>
                        </div>
                    </section>
                    <section className="app-overview__h">
                        <div id="help-seeker">
                            <h3 className="app-overview__title"> Heb je een hulpvraag? </h3>
                            <p className="app-overview__sub">Maak een account aan als je hulp nodig hebt.</p>
                            <button className="btn" onClick={() => navigate(`/register/help-seeker`)}>Registreer</button>
                        </div>
                    </section>
                </section>
            </main>
        </Screen>
    );
};

export default Home;