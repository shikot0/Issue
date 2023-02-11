import {useState, useEffect, useRef} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { markNotificationsAsReadRoute, profilePictureRoute } from '../../utils/APIRoutes';
import NotificationItem from '../NotificationItem/NotificationItem';
import useUsers from '../../utils/useUsers';
import './Header.css';

function Header({header}) {
    const notificationsWrapper = useRef();
    const {user, noUsers} = useUsers();
    const [notificationsVisible, setNotificationsVisible] = useState(false);
    const location = useLocation();
    

    const links = document.querySelectorAll('.navigation-link');
    useEffect(() => {
        const moreLinkLeft = window.location.pathname.toString().slice(1,).indexOf('/') !== -1;
        let firstIndex = window.location.pathname.toString().indexOf(1,'/') + 1;
        document.querySelectorAll('.navigation-link').forEach(link => {
            link.classList.remove('active-page');
            if(moreLinkLeft && link.pathname === window.location.pathname.slice(0, window.location.toString().slice(0,).indexOf(firstIndex, '/'))) {
                link.classList.add('active-page');
            }else if(!moreLinkLeft && link.pathname === window.location.pathname) {
                link.classList.add('active-page');
            }else if(window.location.pathname === '') {
                link.classList.remove('active-page')
            }else {
                link.classList.remove('active-page')
            }
        })
    }, [links])

    useEffect(() => {
        const currentPage = location.pathname
        const moreLinkLeft = currentPage.toString().slice(1,).indexOf('/') !== -1;
        let firstIndex = currentPage.toString().indexOf(1,'/') + 1;
        document.querySelectorAll('.navigation-link').forEach(link => {
            link.classList.remove('active-page');
            if(moreLinkLeft && link.pathname === currentPage.slice(0, window.location.toString().slice(0,).indexOf(firstIndex, '/'))) {
                link.classList.add('active-page');
            }else if(!moreLinkLeft && link.pathname === currentPage) {
                link.classList.add('active-page');
            }else if(currentPage === '') {
                link.classList.remove('active-page');
            }else {
                link.classList.remove('active-page');
            }
        })
    }, [location])

    function activeLink(e) {
        document.querySelectorAll('.navigation-link').forEach(link => {
            link.classList.remove('active-page');
        })
        e.currentTarget.classList.add('active-page');
    }
    
    function handleNotificationsWrapper() {
        notificationsWrapper.current.classList.toggle('visible');
        setNotificationsVisible(prev => !prev);
        if(notificationsVisible) {
            fetch(markNotificationsAsReadRoute, {
                method: 'PATCH',
                headers: { 'x-access-token': JSON.parse(localStorage.getItem('token')) }
            });
        }
    }

    return (
        <header ref={header}>
            <div className="header-content">
                <div className="logo">
                    <Link to='/home' className='logo'>ISSUE</Link>
                </div>
                {user && !noUsers ? 
                <>
                    <nav>
                        <Link to="/home" onClick={e => {activeLink(e)}} className='navigation-link' aria-label='home'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="home"><rect width="24" height="24" opacity="0"/><path d="M20.42 10.18L12.71 2.3a1 1 0 0 0-1.42 0l-7.71 7.89A2 2 0 0 0 3 11.62V20a2 2 0 0 0 1.89 2h14.22A2 2 0 0 0 21 20v-8.38a2.07 2.07 0 0 0-.58-1.44zM10 20v-6h4v6zm9 0h-3v-7a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H5v-8.42l7-7.15 7 7.19z"/></g></g></svg>
                        </Link>
                        <Link to={`/issuelist`} onClick={e => {activeLink(e)}} className='navigation-link' aria-label='issues'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="list"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><circle cx="4" cy="7" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="17" r="1"/><rect x="7" y="11" width="14" height="2" rx=".94" ry=".94"/><rect x="7" y="16" width="14" height="2" rx=".94" ry=".94"/><rect x="7" y="6" width="14" height="2" rx=".94" ry=".94"/></g></g></svg>
                        </Link>
                        <Link to='/registerwebsite' onClick={e => {activeLink(e)}} className='navigation-link' aria-label='new website'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="plus"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z"/></g></g></svg>
                        </Link>
                        <Link to={`/user/${user.username}`} onClick={e => {activeLink(e)}} className='navigation-link' aria-label='account'>
                            {user && user._id ? 
                                <div className="profile-picture-wrapper gradient-border">
                                    <img className='profile-picture' src={`${profilePictureRoute}/${user._id}`} alt="" />
                                </div>: null}
                        </Link>
                    </nav>
                    <div className="notification-section">
                        <button type='button' className={user && user.notifications && user.notifications.some(notification => !notification.seen) ? "notification-button unread" : "notification-button"} onClick={handleNotificationsWrapper} aria-label='notification button'>
                        {/* <button type='button' className="notification-button" onClick={handleNotificationsWrapper} aria-label='notification button'> */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="bell"><rect width="24" height="24" opacity="0"/><path d="M20.52 15.21l-1.8-1.81V8.94a6.86 6.86 0 0 0-5.82-6.88 6.74 6.74 0 0 0-7.62 6.67v4.67l-1.8 1.81A1.64 1.64 0 0 0 4.64 18H8v.34A3.84 3.84 0 0 0 12 22a3.84 3.84 0 0 0 4-3.66V18h3.36a1.64 1.64 0 0 0 1.16-2.79zM14 18.34A1.88 1.88 0 0 1 12 20a1.88 1.88 0 0 1-2-1.66V18h4zM5.51 16l1.18-1.18a2 2 0 0 0 .59-1.42V8.73A4.73 4.73 0 0 1 8.9 5.17 4.67 4.67 0 0 1 12.64 4a4.86 4.86 0 0 1 4.08 4.9v4.5a2 2 0 0 0 .58 1.42L18.49 16z"/></g></g></svg>
                        </button>
                        <div ref={notificationsWrapper} className="notifications-wrapper">
                            {user && user.notifications && user.notifications.length !== 0 ? user.notifications.sort((a,b) => {
                                return a.seen && !b.seen ? 1 : -1;
                            }).map((notification, index) => {
                                return <Link to={`issue/${notification.issueId}`} key={index}><NotificationItem notification={notification}/></Link>
                            }): <h4 className='no-notifications-hint'>You have no notifications</h4>}
                        </div>
                    </div>
                </>
                : ''}
            </div>
        </header>
    )
}

export default Header;