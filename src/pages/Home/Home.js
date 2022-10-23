import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Screen from '../../components/UI/Screen/Screen';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    return (
        <Screen title="Welkom!" wide={true}>
            <main className= "app-overview__main">
                <section id="app-overview">
                    <div className="background"></div>
                    <h1>Welkom bij HulpPost!</h1>
                    <h3> Dit is een platform om mensen bij elkaar te brengen die elkaar willen helpen</h3>
                    <div className="app-overview__row">
                        <div className="app-overview__info" id="volunteer">
                            <h3 className="app-overview__title"> Wil je helpen? </h3>
                            <p className="app-overview__sub">Maak een account aan als je iets voor iemand kan betekenen.</p>
                            <button className="btn" onClick={() => navigate(`/register/volunteer`)}>Registreer</button>
                        </div>

                        <div className="app-overview__info" id="help-seeker">
                            <h3 className="app-overview__title"> Heb je een hulpvraag? </h3>
                            <p className="app-overview__sub">Maak een account aan als je hulp nodig hebt.</p>
                            <button className="btn" onClick={() => navigate(`/register/help-seeker`)}>Registreer</button>
                        </div>
                    </div>
                </section>
            </main>
        </Screen>
    );
};

export default Home;