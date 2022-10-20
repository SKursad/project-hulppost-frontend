import React from 'react';
import { Outlet, Navigate } from "react-router-dom";

const LoginPrivateRoutes = ({ authenticated }) => {
        return !authenticated ? <Outlet /> : <Navigate to="/" />;
};

export default LoginPrivateRoutes;