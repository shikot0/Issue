import {useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import useUsers from '../../utils/useUsers';
import { profilePictureRoute } from '../../utils/APIRoutes';
import NotificationItem from '../NotificationItem/NotificationItem';
import './Header.css';

function Header() {
    const notificationsWrapper = useRef();
    const {user} = useUsers();
    
    
    const links = document.querySelectorAll('.navigation-link');
    useEffect(() => {
        document.querySelectorAll('.navigation-link').forEach(link => {
            if(link.href.includes((window.location.pathname).slice(1,).slice(0, (window.location.pathname).slice(1,).indexOf('/')))) {
                link.classList.add('active-page')
            }
        })
    }, [links])


    function activeLink(e) {
        document.querySelectorAll('.navigation-link').forEach(link => {
            link.classList.remove('active-page')
        })
        e.currentTarget.classList.add('active-page');
    }
    
    function handleNotificationsWrapper() {
        notificationsWrapper.current.classList.toggle('visible');
    }

    return (
        <header>
            <div className="header-content">
                <div className="logo">
                    <Link to='/home' className='logo'>ISSUE</Link>
                </div>
                {user ? 
                <>
                    <nav>
                        <Link to="/home" onClick={e => {activeLink(e)}} className='navigation-link'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="home"><rect width="24" height="24" opacity="0"/><path d="M20.42 10.18L12.71 2.3a1 1 0 0 0-1.42 0l-7.71 7.89A2 2 0 0 0 3 11.62V20a2 2 0 0 0 1.89 2h14.22A2 2 0 0 0 21 20v-8.38a2.07 2.07 0 0 0-.58-1.44zM10 20v-6h4v6zm9 0h-3v-7a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H5v-8.42l7-7.15 7 7.19z"/></g></g></svg>
                        </Link>
                        <Link to={`/user/${user.username}`} onClick={e => {activeLink(e)}} className='navigation-link'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="person"><rect width="24" height="24" opacity="0"/><path d="M12 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0-6a2 2 0 1 1-2 2 2 2 0 0 1 2-2z"/><path d="M12 13a7 7 0 0 0-7 7 1 1 0 0 0 2 0 5 5 0 0 1 10 0 1 1 0 0 0 2 0 7 7 0 0 0-7-7z"/></g></g></svg>
                        </Link>
                        <Link to='/registerwebsite' onClick={e => {activeLink(e)}} className='navigation-link'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="plus"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z"/></g></g></svg>
                        </Link>
                    </nav>
                    <div className="user">
                        <div className="profile-picture-wrapper gradient-border">
                            <img className='profile-picture' src={`${profilePictureRoute}/${user._id}`} alt="" />
                        </div>
                        {/* <p className="username gradient-text">{user ? user.username : 'user'}</p> */}
                        {/* <div ref={userModal} className="user-modal">
                            <button className='logout-button' onClick={logout}>Log Out</button>
                        </div> */}
                        <div className="notification-section">
                            <button type='button' className='notification-button' onClick={handleNotificationsWrapper}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="bell"><rect width="24" height="24" opacity="0"/><path d="M20.52 15.21l-1.8-1.81V8.94a6.86 6.86 0 0 0-5.82-6.88 6.74 6.74 0 0 0-7.62 6.67v4.67l-1.8 1.81A1.64 1.64 0 0 0 4.64 18H8v.34A3.84 3.84 0 0 0 12 22a3.84 3.84 0 0 0 4-3.66V18h3.36a1.64 1.64 0 0 0 1.16-2.79zM14 18.34A1.88 1.88 0 0 1 12 20a1.88 1.88 0 0 1-2-1.66V18h4zM5.51 16l1.18-1.18a2 2 0 0 0 .59-1.42V8.73A4.73 4.73 0 0 1 8.9 5.17 4.67 4.67 0 0 1 12.64 4a4.86 4.86 0 0 1 4.08 4.9v4.5a2 2 0 0 0 .58 1.42L18.49 16z"/></g></g></svg>
                            </button>
                            <div ref={notificationsWrapper} className="notifications-wrapper">
                                {user && user.notifications.length !== 0 ? user.notifications.map((notification, index) => {
                                    return <NotificationItem key={index} notification={notification}/>
                                }): <h4 className='no-notifications-hint'>You have no notifications</h4>}
                            </div>
                        </div>
                    </div>
                </>
                : ''}
            </div>
        </header>
    )
}

export default Header;