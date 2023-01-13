import {useEffect, useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useUsers from '../../utils/useUsers';
import { getProfilePictureRoute } from '../../utils/APIRoutes';
import './Header.css';
function Header() {
    const userModal = useRef();
    const navigate = useNavigate();
    const user = useUsers();
    
    function logout() {
        // localStorage.removeItem('user');
        document.cookie = `token=; expires=Thu, 01 Jan 1970T00:00:00Z;`
        navigate('/register');
    }

    function showUserModal() {
        userModal.current.classList.toggle('visible');
    }
    
    const location = window.location.pathname;
    useEffect(() => {
        activeLink(location)
    }, [location])

    let navigationLinks = document.querySelectorAll('.header-link');
    useEffect(() => {
        const location = window.location.pathname;
        activeLink(location);
    }, [navigationLinks])

    function activeLink(location) {
        document.querySelectorAll('.navigation-link').forEach(link => {
            if(link.href.includes(`${location}`)) {
                link.classList.add('active-page');
            }else {
                link.classList.remove('active-page');
            }
            
        })
    }
    
    return (
        <header>
            <div className="header-content">
                <div className="logo">
                    {/* <img src="" alt="" /> */}
                    <Link to='/home' className='logo'>ISSUE</Link>
                </div>
                {user ? 
                <>
                    <nav>
                        <Link to="/home" className='navigation-link'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="home"><rect width="24" height="24" opacity="0"/><path d="M20.42 10.18L12.71 2.3a1 1 0 0 0-1.42 0l-7.71 7.89A2 2 0 0 0 3 11.62V20a2 2 0 0 0 1.89 2h14.22A2 2 0 0 0 21 20v-8.38a2.07 2.07 0 0 0-.58-1.44zM10 20v-6h4v6zm9 0h-3v-7a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H5v-8.42l7-7.15 7 7.19z"/></g></g></svg>
                        </Link>
                        <Link to={`/user/${user.username}`} className='navigation-link'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="person"><rect width="24" height="24" opacity="0"/><path d="M12 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0-6a2 2 0 1 1-2 2 2 2 0 0 1 2-2z"/><path d="M12 13a7 7 0 0 0-7 7 1 1 0 0 0 2 0 5 5 0 0 1 10 0 1 1 0 0 0 2 0 7 7 0 0 0-7-7z"/></g></g></svg>
                        </Link>
                        <Link to='/registerwebsite' className='navigation-link'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="plus"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z"/></g></g></svg>
                        </Link>
                    </nav>
                    <div className="user" onClick={showUserModal}>
                        <div className="profile-picture-wrapper">
                            <img className='profile-picture' src={`${getProfilePictureRoute}/${user._id}`} alt="" />
                        </div>
                        <p className="username gradient-text">{user ? user.username : 'user'}</p>
                        <div ref={userModal} className="user-modal">
                            <button className='logout-button' onClick={logout}>Log Out</button>
                        </div>
                    </div>
                </>
                : ''}
            </div>
        </header>
    )
}

export default Header;