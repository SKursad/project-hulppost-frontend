import React from 'react';
import {Link} from 'react-router-dom';

const Footer = () => {
    const today = new Date();
    return (
        <footer className='Footer'>
                <p>

                </p>
                <p>
                    Copyright &copy; {today.getFullYear()}{" "}
                    <a href="#" >
                        HulpPost
                    </a>
                    .
                </p>
        </footer>
    );
};

export default Footer;