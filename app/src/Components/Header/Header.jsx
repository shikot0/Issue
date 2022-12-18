import {useRef, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useUser from '../../utils/useUser';
import { getProfilePictureRoute } from '../../utils/APIRoutes';
import './Header.css';
function Header() {
    const userModal = useRef();
    const navigate = useNavigate();
    const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : '';
    const user = useUser();
    
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
                {user ? 
                <div className="user" onClick={showUserModal}>
                    <div className="profile-picture-div">
                        <img className='profile-picture' src={`${getProfilePictureRoute}/${userId}`} alt="" />
                    </div>
                    <p className="username">{user ? user.username : 'user'}</p>
                    <div ref={userModal} className="user-modal">
                        <Link className='user-link' to={`/account/${user._id}`}>Account</Link>
                        <button className='logout-button' onClick={logout}>Log Out</button>
                    </div>
                </div>
                : ''}
            </nav>
        </header>
    )
}

export default Header;