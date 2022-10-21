import {Route, Routes} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import {AuthContext} from './context/auth-context';
import './App.css';
import PrivateRoutes from './routes/private-routes';
import LoginPrivateRoutes from './routes/login-private-routes';
import SignIn from './pages/SignIn/SignIn';
import {useContext} from 'react';
import SignUpHelpSeeker from './pages/SignUp/HelpSeeker/SignUpHelpSeeker';
import SignUpVolunteer from './pages/SignUp/Volunteer/SignUpVolunteer';
import Home from './pages/Home/Home';

function App() {
    const {isAuth} = useContext(AuthContext);

    return (
        <>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="/register/help-seeker" element={<SignUpHelpSeeker/>}/>
                    <Route path="/register/volunteer" element={<SignUpVolunteer/>}/>
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
