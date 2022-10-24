import React from 'react';
import './Footer.css'

const Footer = () => {
    const today = new Date();
    return (
        <footer className="main-footer">
            <nav>
                <ul className="main-footer__links">
                    <li className= "main-footer__link">
                       <p> Copyright &copy; {today.getFullYear()}</p>
                        <a href="#">
                            {" "}HulpPost
                        </a>
                        .
                    </li>
                </ul>
            </nav>
        </footer>
    );
};

export default Footer;