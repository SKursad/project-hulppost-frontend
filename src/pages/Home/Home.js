import React from 'react';
import {useNavigate} from 'react-router-dom';
import Screen from '../../components/UI/Screen/Screen';
import {VscAccount} from 'react-icons/vsc';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    return (
        <Screen title="Welkom!" wide={true}>
            <main className= "app-overview__main">
                    <figure className="background"></figure>
                <section id="app-overview__info">
                    <h1 className= "app-overview__title-h1">Welkom bij HulpPost!</h1>
                    <strong className= "app-overview__subtitle"> Dit is een platform die mensen bij elkaar brengt voor iets goeds</strong>
                    <section className="app-overview__register" id="volunteer">
                        {/*<div  id="volunteer">*/}
                            <h2 className="app-overview__title"> Wil je helpen? </h2>
                            <p className="app-overview__sub">Maak een account aan als je iets voor iemand kan betekenen.</p>
                            <button title="register-helpSeeker" className="btn" onClick={() => navigate(`/register/volunteer`)}><VscAccount/>Registreer</button>
                        {/*</div>*/}
                    </section>
                    <section className="app-overview__register" id="help-seeker">
                        {/*<div id="help-seeker">*/}
                            <h2 className="app-overview__title"> Heb je een hulpvraag? </h2>
                            <p className="app-overview__sub">Maak een account aan als je hulp nodig hebt.</p>
                            <button title="register-volunteer" className="btn" onClick={() => navigate(`/register/help-seeker`)}><VscAccount/>Registreer</button>
                        {/*</div>*/}

                    </section>
                </section>
            </main>
        </Screen>
    );
};

export default Home;