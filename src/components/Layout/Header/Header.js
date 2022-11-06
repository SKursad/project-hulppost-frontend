import React from 'react';
import logo from '../../../assets/HulpPost-style.png';
import {Link} from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="main-header">
            <Link to="/" className="main-header__link">
                <img id="main-header__logo" src={logo} alt="logo"/></Link>
        </header>
    );
};

export default Header;