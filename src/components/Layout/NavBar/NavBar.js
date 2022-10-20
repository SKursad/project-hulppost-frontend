import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {AuthContext} from '../../../context/auth-context';
import Button from '../../UI/Button/Button';


function NavBar() {
    const { isAuth, logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <header className="main-header">
            {/*<div><Link className="main-header__logo" to="/">*/}
            {/*    <img src={logo} alt="logo" className="logo"/></Link></div>*/}
            {isAuth ?
                <nav className="main-nav">
                    <a href='/createRequest' className="btn btn--white">TEST</a>
                    <button className="main-nav__btn" type="button" onClick={() => navigate('/createRequest')}>STEL EEN HULPVRAAG</button>
                    {''}
                    <button className="main-nav__btn" type="button" onClick={() => navigate(`/requestScreen`)}>HULPVRAGEN</button>
                    <button className="main-nav__btn" type="button" onClick={() => navigate(`/profile/${user.id}`)}>PROFIEL</button>
                    <button className="main-nav__btn" type="button" onClick={logout}>AFMELDEN</button>
                </nav>
                :
                <nav className="main-nav">
                    <Button className="main-nav__btn" type="button" onClick={() => navigate('/signIn')}>AANMELDEN</Button>
                    <Button className="main-nav__btn" type="button" onClick={() => navigate(`/requestScreen`)}>HULPVRAGEN</Button>
                </nav>
            }
        </header>
    );
}

export default NavBar;