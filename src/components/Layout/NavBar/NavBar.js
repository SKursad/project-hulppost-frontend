import React, {useContext, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AuthContext} from '../../../context/auth-context';
import {FaBars, FaTimes} from 'react-icons/fa';
import './Navbar.css';


function NavBar(props) {
    const {isAuth, logout, user} = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);


    return (
        <div id="screen-width">
                {isAuth ?
                    <nav className="nav">
                        <ul className={isMobile ? "nav__mobile" : "nav__links"}
                            onClick={() => setIsMobile(false)}>
                            <li className="nav__mobile-logout">
                                <Link aria-label="create-request" title="create-request" to={`/post-request`}
                                      className="nav__request">STEL EEN HULPVRAAG</Link>
                                <Link aria-label="request-feed" title="request-feed" to={`/request-search`}
                                      className="nav__feed">HULPVRAGEN </Link>
                                <Link aria-label="profile-page" title="profile-page" to={`/profile/${user.id}`}
                                      className="nav__profile">PROFIEL </Link>
                                <Link aria-label="logout" title="profile-page" to={logout} onClick={logout}
                                      className="nav__logout">AFMELDEN</Link>
                            </li>
                        </ul>
                        <button className="nav__mobile-menu" title="nav-button"
                                onClick={() => setIsMobile(!isMobile)}>
                            {isMobile ? <FaTimes/>
                                : <FaBars/>}
                        </button>

                    </nav>
                    :
                    <nav className="nav">
                        <ul className={isMobile ? "nav__mobile" : "nav__links"}
                            onClick={() => setIsMobile(false)}>
                            <li className="nav__mobile-login">
                                <Link aria-label="request-feed" title="request-feed" to={`/request-search`}
                                      className="nav__feed">hulpvragen</Link>
                                <Link aria-label="login" title="login" to={`/login`} className="nav__login">login</Link>
                            </li>
                        </ul>
                        <button className="nav__mobile-menu" title="nav-button"
                                onClick={() => setIsMobile(!isMobile)}>
                            {isMobile ? <FaTimes/> : <FaBars/>}
                        </button>
                    </nav>
                }
        </div>
    );
}

export default NavBar;