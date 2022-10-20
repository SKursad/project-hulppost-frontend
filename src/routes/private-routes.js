import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';

const PrivateRoutes = ({ authenticated }) => {
    return authenticated ? <Outlet /> : <Navigate to="/profile/:id" />;
};

export default PrivateRoutes;