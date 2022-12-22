import {useEffect, useRef} from 'react';
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
    const location = window.location.pathname;
    useEffect(() => {
        const navLinks = document.querySelectorAll('.header-link');
        navLinks.forEach(link => {
            if(link.href.includes(`${location}`)) {
                link.classList.add('active-page');
            }else {
                link.classList.remove('active-page');
            }
            
        })
    }, [location])
    return (
        <header>
            <div className="logo">
                {/* <img src="" alt="" /> */}
                <a href="issue.com" className='logo'>ISSUE</a>
            </div>
            {user && userId ? 
            <>
                <nav>
                    <Link to="/home" className='header-link'>Home</Link>
                    <Link className='header-link' to={`/u/${user.username}`}>Account</Link>
                </nav>
                <div className="user" onClick={showUserModal}>
                    <div className="profile-picture-div">
                        <img className='profile-picture' src={`${getProfilePictureRoute}/${userId}`} alt="" />
                    </div>
                    <p className="username gradient-text">{user ? user.username : 'user'}</p>
                    <div ref={userModal} className="user-modal">
                        <button className='logout-button' onClick={logout}>Log Out</button>
                    </div>
                </div>
            </>
            : ''}
        </header>
    )
}

export default Header;