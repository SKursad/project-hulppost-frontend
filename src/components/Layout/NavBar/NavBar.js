import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {AuthContext} from '../../../context/auth-context';
import Button from '../../UI/Button/Button';


function NavBar() {
    const { isAuth, logout, user } = useContext(AuthContext);
    // const appState = useContext(StateContext)
    const navigate = useNavigate();
    // let imageSource = logo;

    return (
        <body>
        <header className="header">
            <figure className="header__logo">
            <Link to="/">
                <div >
                    {/*<img src={} alt="logo" className="logo"/>*/}
                </div>
            </Link>
            </figure>
            {isAuth ?
                <div>
                    <Button type="button" onClick={() => navigate('/createRequest')}>STEL EEN HULPVRAAG</Button>
                    {''}
                    <Button type="button" onClick={() => navigate(`/requestScreen`)}>HULPVRAGEN</Button>
                    <Button type="button" onClick={() => navigate(`/profile/${user.id}`)}>PROFIEL</Button>
                    <Button type="button" onClick={logout}>AFMELDEN</Button>
                </div>
                :
                <div>
                    <Button type="button" onClick={() => navigate('/signIn')}>AANMELDEN</Button>
                    <Button type="button" onClick={() => navigate(`/requestScreen`)}>HULPVRAGEN</Button>
                </div>
            }
        </header>
        </body>
    );
}

export default NavBar;