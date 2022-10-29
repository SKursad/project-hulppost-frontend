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
import Profile from './pages/Profiles/HelpSeekerProfile/Profile';
import VolunteerProfile from './pages/Profiles/VolunteerProfile/VolunteerProfile';
import EditReply from './pages/Reply/EditReply';
import SingleReply from './pages/Reply/SingleReply';

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
                    <Route path="/edit-reply/:id" element={<EditReply/>}/>
                    <Route path="/reply/:id" element={<SingleReply/>}/>
                    <Route path="/profile/:id/*" element={<Profile/>}/>
                    <Route path="/profile-volunteer/:id/*" element={<VolunteerProfile/>}/>
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
