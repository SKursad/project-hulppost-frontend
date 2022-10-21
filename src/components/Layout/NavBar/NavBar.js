import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {AuthContext} from '../../../context/auth-context';
import Button from '../../UI/Button/Button';
import './Navbar.css'
import logo from '../../../assets/HulpPost-style.png'


function NavBar() {
    const { isAuth, logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <header className="main-header">
            <div>
                <a href="/" className="main-header__logo" >
                <img src={logo} alt="logo" className="logo"/></a>
            </div>
            {isAuth ?
                <nav className="main-nav">
                    <button className="main-nav__btn" type="button" onClick={() => navigate('/createRequest')}>STEL EEN HULPVRAAG</button>
                    {''}
                    <button className="main-nav__btn" type="button" onClick={() => navigate(`/requestScreen`)}>HULPVRAGEN</button>
                    <button className="main-nav__btn" type="button" onClick={() => navigate(`/profile/${user.id}`)}>PROFIEL</button>
                    <button className="main-nav__btn" type="button" onClick={logout}> AFMELDEN </button>
                </nav>
                :
                <nav className="main-nav">
                    <Button className="main-nav__btn" type="button" onClick={() => navigate('/login')}> login </Button>
                    <Button className="main-nav__btn" type="button" onClick={() => navigate(`/requestScreen`)}> hulpvragen </Button>
                </nav>
            }
        </header>
    );
}

export default NavBar;