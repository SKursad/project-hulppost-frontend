import React from 'react';
import {Link} from 'react-router-dom';

const Footer = () => {
    const today = new Date();
    return (
        <footer className='Footer'>
                <p>
                    <Link to="/" className="mx-1">
                        Hoe werkt het
                    </Link>{" "}
                    |{" "}
                    <Link className="mx-1" to="/about-us">
                        Over Ons
                    </Link>{" "}
                    |{" "}
                    <Link className="mx-1" to="/terms">
                        Voorwaarden
                    </Link>
                </p>
                <p className="m-0">
                    Copyright &copy; {today.getFullYear()}{" "}
                    <a href="/Users/kursh/WebstormProjects/hulppost-frontend/public" className="text-muted">
                        HulpPost
                    </a>
                    .
                </p>
        </footer>
    );
};

export default Footer;