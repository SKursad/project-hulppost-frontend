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
import PostEditRequest from './pages/Requests/PosEditRequest/PostEditRequest';
import UploadImage from './pages/Requests/ImageUpload/UploadImage';
import RequestWithReplies from './pages/Requests/RequestWithReplies/RequestWithReplies';
import SearchRequests from './pages/Requests/RequestsFeed/SearchRequests';
import PostReply from './pages/Reply/PostReply';

function App(props) {
    const {isAuth} = useContext(AuthContext);

    return (
        // <>
            <main className="main-content">
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="/register/help-seeker" element={<SignUpHelpSeeker/>}/>
                    <Route path="/register/volunteer" element={<SignUpVolunteer/>}/>
                    <Route path="/request-search" element={<SearchRequests/>}/>
                    <Route path="/request/:id" element={<RequestWithReplies/>}/>
                    <Route path="/post-request" element={<PostEditRequest/>}/>
                    <Route path="/edit-request/:id" element={<PostEditRequest/>}/>
                    <Route path="/post-reply/:id" element={<PostReply/>}/>
                    <Route path="/edit-reply/:id" element={<PostReply/>}/>
                    <Route path="/image/:id" element={<UploadImage/>}/>
                    <Route element={<LoginPrivateRoutes authenticated={isAuth}/>}>
                        <Route path="/login" element={<SignIn authenticated={isAuth}/>}/>
                    </Route>
                    <Route element={<PrivateRoutes authenticated={isAuth}/>}>
                    </Route>
                </Route>
            </Routes>
            </main>
        /*    <Footer/>*/
        /*</>*/
    );
}

export default App;
