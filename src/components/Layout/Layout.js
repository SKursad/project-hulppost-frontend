import React from 'react';
import {Outlet} from 'react-router-dom';

import NavBar from './NavBar/NavBar';
import Footer from './Footer/Footer';
import Header from './Header/Header';

const Layout = () => {
    return (
        <div className="keep-in-place">
            <Header/>
            <NavBar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Layout;