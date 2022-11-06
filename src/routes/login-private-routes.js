import React from 'react';
import {Navigate, Outlet} from "react-router-dom";

const LoginPrivateRoutes = ({ authenticated }) => {
        return !authenticated ? <Outlet /> : <Navigate to="/" />;
};

export default LoginPrivateRoutes;