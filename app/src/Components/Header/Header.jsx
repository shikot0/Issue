import {useState, useEffect, useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserRoute, getProfilePictureRoute } from '../../utils/APIRoutes';
import './Header.css';
function Header({userId, user}) {
    const userModal = useRef();
    const navigate = useNavigate();


    function logout() {
        localStorage.removeItem('user')
        navigate('/register');
    }

    function showUserModal() {
        userModal.current.classList.toggle('visible');
    }
    return (
        <header>
            <div className="logo">
                {/* <img src="" alt="" /> */}
                <a href="issue.com" className='logo'>ISSUE</a>
            </div>
            <nav>
                {userId && user ? 
                <div className="user" onClick={showUserModal}>
                    <div className="profile-picture-div">
                        <img className='profile-picture' src={`${getProfilePictureRoute}/${userId}`} alt="" />
                    </div>
                    <p className="username">{user ? user.username : 'user'}</p>
                    <div ref={userModal} className="user-modal">
                        <Link className='user-link' path={'/account'}>Account</Link>
                        <button className='logout-button' onClick={logout}>Log Out</button>
                    </div>
                </div>
                : ''}
            </nav>
        </header>
    )
}

export default Header;