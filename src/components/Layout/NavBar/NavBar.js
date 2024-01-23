import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

function NavBar() {
    const { isAuth, logout, user } = useContext(AuthContext);
    const [isMobile, setIsMobile] = useState(false);

    const getProfileLink = () => {
        if (user.roles === 'ROLE_HELP-SEEKER') {
            return `/profile/${user.id}`;
        } else if (user.roles === 'ROLE_VOLUNTEER') {
            return `/profile-volunteer/${user.id}`;
        }
        // Handle other roles if needed
        return '/';
    };

    const getCreateRequestLink = () => {
        return user.roles === 'ROLE_HELP-SEEKER' ? '/post-request' : '/';
    };

    return (
        <div id="screen-width">
            {isAuth ?
                <nav className="nav">
                    <ul className={isMobile ? "nav__mobile" : "nav__links"} onClick={() => setIsMobile(false)}>
                        <li className="nav__mobile-logout">
                            <a aria-label="profile-page" title="profile-page" href={getProfileLink()} className="nav__profile">PROFIEL </a>
                            <Link aria-label="create-request" title="create-request" to={getCreateRequestLink()} className="nav__request">STEL EEN HULPVRAAG</Link>
                            {user.roles === 'ROLE_ADMIN' &&
                                <Link aria-label="accounts" title="accounts" to={`/accounts`} className="nav__feed">PROFIELEN</Link>
                            }
                            <Link aria-label="request-feed" title="request-feed" to={`/request-search`} className="nav__feed">ALLE HULPAANVRAGEN </Link>
                            <Link aria-label="logout" title="logout" to={`/request-search`} onClick={logout} className="nav__logout">AFMELDEN</Link>
                        </li>
                    </ul>
                    <button className="nav__mobile-menu" title="nav-button" onClick={() => setIsMobile(!isMobile)}>
                        {isMobile ? <FaTimes /> : <FaBars />}
                    </button>
                </nav>
                :
                <nav className="nav">
                    <ul className={isMobile ? "nav__mobile" : "nav__links"} onClick={() => setIsMobile(false)}>
                        <li className="nav__mobile-login">
                            <Link aria-label="request-feed" title="request-feed" to={`/request-search`} className="nav__feed">hulpvragen</Link>
                            <Link aria-label="login" title="login" to={`/login`} className="nav__login">login</Link>
                        </li>
                    </ul>
                    <button className="nav__mobile-menu" title="nav-button" onClick={() => setIsMobile(!isMobile)}>
                        {isMobile ? <FaTimes /> : <FaBars />}
                    </button>
                </nav>
            }
        </div>
    );
}

export default NavBar;
