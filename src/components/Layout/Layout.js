import React from 'react';
import {Outlet} from 'react-router-dom';

import NavBar from './NavBar/NavBar';
import Footer from './Footer/Footer';
import SearchRequests from '../../pages/Requests/RequestsFeed/SearchRequests';
import Header from './Header/Header';
import RequestsFeed from '../Requests/RequestsFeed';
import RequestWithReplies from '../../pages/Requests/RequestWithReplies/RequestWithReplies';
import Feed from '../Requests/Feed';

const Layout = (props) => {
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