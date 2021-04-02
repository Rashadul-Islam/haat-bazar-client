import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import "./Header.css";

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { name, displayName, email } = loggedInUser;
    const history = useHistory();
    const handleLogin = () => {
        history.push('/login')
    }
    return (
            <nav className="container navbar navbar-expand-lg navbar-light">
                <p className='pt-2 font-weight-bold'>Haat-Bazar</p>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className='px-3 pt-2 link' to='/home'>Home</Link>
                        <Link className='px-3 pt-2 link' to='/Orders'>Orders</Link>
                        <Link className='px-3 pt-2 link' to='/manageProduct'>Admin</Link>
                        <Link className='px-3 pt-2 link' to='/'>Deals</Link>
                        {
                            email ? <p className="px-3 pt-2">{name || displayName}</p> : <button type="button" onClick={handleLogin} className="btn btn-success px-3 login-style">Login</button>
                        }
                        {
                            email && <button type="button" onClick={() => setLoggedInUser({})} className="btn btn-success px-3 logout-style">Log Out</button>

                        }
                    </div>
                </div>
            </nav>
    )
};

export default Header;