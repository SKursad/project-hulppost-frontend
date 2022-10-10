import React from 'react';
import NavBar from './NavBar/NavBar';
import {Outlet} from 'react-router-dom';
import Footer from './Footer/Footer';

const Layout = (props) => {
    return (
        <div className="App">
            <NavBar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Layout;