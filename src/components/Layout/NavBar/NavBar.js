import React, {useContext, useRef, useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {AuthContext} from '../../../context/auth-context';
import Button from '../../UI/Button/Button';
import {FaBars, FaTimes} from 'react-icons/fa';
import './Navbar.css';
import logo from '../../../assets/HulpPost-style.png';


function NavBar() {
    const {isAuth, logout, user} = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);


    return (
        <header className="main-header">
            <Link to="/" className="main-header__logo">
                <img src={logo} alt="logo" className="logo"/></Link>
            {isAuth ?
                <nav className="nav">
                    <ul className={isMobile ? "nav__mobile" : "nav__links"}
                        onClick={() => setIsMobile(false)}>
                        <div className="nav__mobile-logout">
                        <Link to={`/createRequest`} className="nav__request">STEL EEN HULPVRAAG</Link>
                        <Link to={`/requestFeed`} className="nav__feed">HULPVRAGEN </Link>
                        <Link to={`/profile/${user.id}`} className="nav__profile">PROFIEL </Link>
                        <Link to={logout} onClick={logout} className="nav__logout">AFMELDEN</Link>
                        </div>
                    </ul>
                    <button className="nav__mobile-menu"
                            onClick={() => setIsMobile(!isMobile)}>
                        {isMobile ? <FaTimes/>
                            : <FaBars/>}
                    </button>
                </nav>
                :
                <nav className="nav">
                    <ul className={isMobile ? "nav__mobile" : "nav__links"}
                        onClick={() => setIsMobile(false)}>
                        <div className="nav__mobile-login">
                        <Link to={`/requestFeed`} className="nav__feed">hulpvragen</Link>
                        <Link to={`/login`} className="nav__login">login</Link>
                        </div>
                    </ul>
                    <button className="nav__mobile-menu"
                            onClick={() => setIsMobile(!isMobile)}>
                        {isMobile ? <FaTimes/> : <FaBars/>}
                    </button>
                </nav>
            }
        </header>
    );
}

export default NavBar;