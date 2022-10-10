import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {AuthContext} from '../../context/auth-context';

function NavBar() {
    const { isAuth, logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <nav>
            <Link to="/">
          <span className="logo-container">
            {/*<img src={logo} alt="logo"/>*/}
            <h3> Hulppost Dev-Test Fase </h3>
          </span>
            </Link>

            {isAuth ?
                <div>
                    <Button type="button" onClick={() => navigate('/createRequest')}>STEL EEN HULPVRAAG</Button>
                    {''}
                    <Button type="button" onClick={() => navigate(`/requestScreen`)}>HULPVRAGEN</Button>
                    <Button type="button" onClick={() => navigate(`/profile/${user.id}`)}>PROFIEL</Button>
                    <Button type="button" onClick={logout}>AFMELDEN</Button>
                </div>
                :
                <div>
                    <Button type="button" onClick={() => navigate('/signIn')}>AANMELDEN</Button>
                    <Button type="button" onClick={() => navigate(`/requestScreen`)}>HULPVRAGEN</Button>
                </div>
            }
        </nav>
    );
}

export default NavBar;