import {Route, Routes} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import {AuthContext} from './context/auth-context';
import './App.css';
import PrivateRoutes from './routes/private-routes';
import LoginPrivateRoutes from './routes/login-private-routes';
import SignIn from './pages/SignIn/SignIn';
import {useContext} from 'react';

function App() {
    const {isAuth} = useContext(AuthContext);

    return (
        <>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route element={<LoginPrivateRoutes authenticated={isAuth}/>}>
                        <Route path="/login" element={<SignIn authenticated={isAuth}/>}/>
                    </Route>
                    <Route element={<PrivateRoutes authenticated={isAuth}/>}>
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
