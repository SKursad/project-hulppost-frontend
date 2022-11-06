import {Route, Routes} from 'react-router-dom';
import {useImmerReducer} from 'use-immer';
import {AuthContext} from './context/AuthContext';
import StateContext from './context/StateContext';
import DispatchContext from './context/DispatchContext';
import {useContext} from 'react';
import Layout from './components/Layout/Layout';
import PrivateRoutes from './routes/private-routes';
import LoginPrivateRoutes from './routes/login-private-routes';

import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn';
import SignUpHelpSeeker from './pages/SignUp/HelpSeeker/SignUpHelpSeeker';
import SignUpVolunteer from './pages/SignUp/Volunteer/SignUpVolunteer';
import Accounts from './pages/Profiles/Accounts';
import HelpSeekerProfile from './pages/Profiles/HelpSeekerProfile/HelpSeekerProfile';
import VolunteerProfile from './pages/Profiles/VolunteerProfile/VolunteerProfile';
import PostEditRequest from './pages/Requests/PosEditRequest/PostEditRequest';
import UploadImage from './pages/Requests/ImageUpload/UploadImage';
import RequestWithReplies from './pages/Requests/RequestWithReplies/RequestWithReplies';
import SearchRequests from './pages/Requests/RequestsFeed/SearchRequests';
import PostReply from './pages/Reply/PostReply';
import EditReply from './pages/Reply/EditReply';
import SingleReply from './pages/Reply/SingleReply';
import EditPersonalData from './pages/Profiles/EditAccount/EditPersonalData';
import EditProfileData from './pages/Profiles/EditAccount/EditProfileData';
import ChangePassword from './pages/Profiles/EditAccount/ChangePassword';
import ProfileImage from './pages/Profiles/EditAccount/ProfileImage';
import NotFound from './pages/NotFound/NotFound';
import './App.css';
import FlashMessages from './components/UI/FlashMessages/FlashMessages';
import Info from './pages/Info/Info';

function App() {
    const {isAuth, logout} = useContext(AuthContext);
    const initialState = {flashMessages: [],};
    const [state, dispatch] = useImmerReducer(appReducer, initialState);

    function appReducer(draft, action) {
        switch (action.type) {
            case "flashMessage":
                draft.flashMessages.push(action.value);
                return;
            default:
                return state;
        }
    }

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                <FlashMessages messages={state.flashMessages}/>
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
                        <Route path="/profile/:id/*" element={<HelpSeekerProfile/>}/>
                        <Route path="/profile-volunteer/:id" logOut={logout} element={<VolunteerProfile/>}/>
                        <Route path="/edit-personalData/:id" element={<EditPersonalData/>}/>
                        <Route path="/edit-profileData/:id" element={<EditProfileData/>}/>
                        <Route path="/change-password/:id" element={<ChangePassword/>}/>
                        <Route path="/put-profileImage/:id" element={<ProfileImage/>}/>
                        <Route path="/accounts" element={<Accounts/>}/>
                        <Route path="/image/:id" element={<UploadImage/>}/>
                        <Route path="/info" element={<Info/>} />
                        <Route path="*" element={<NotFound/>}/>
                        <Route element={<LoginPrivateRoutes authenticated={isAuth}/>}>
                            <Route path="/login" element={<SignIn authenticated={isAuth}/>}/>
                        </Route>
                        <Route element={<PrivateRoutes authenticated={isAuth}/>}>
                        </Route>
                    </Route>
                </Routes>
            </DispatchContext.Provider>
        </StateContext.Provider>
    );
}

export default App;
