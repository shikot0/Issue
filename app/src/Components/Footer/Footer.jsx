import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import { profilePictureRoute } from '../../utils/APIRoutes';
import useUsers from '../../utils/useUsers';
import './Footer.css';

function Footer({footer}) {
    const {user, noUsers} = useUsers();
    
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

    return(
        <>
            {user && !noUsers ?
            <footer ref={footer}>
                <Link to='/home' onClick={e => {activeLink(e)}} className='navigation-link'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="home"><rect width="24" height="24" opacity="0"/><path d="M20.42 10.18L12.71 2.3a1 1 0 0 0-1.42 0l-7.71 7.89A2 2 0 0 0 3 11.62V20a2 2 0 0 0 1.89 2h14.22A2 2 0 0 0 21 20v-8.38a2.07 2.07 0 0 0-.58-1.44zM10 20v-6h4v6zm9 0h-3v-7a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H5v-8.42l7-7.15 7 7.19z"/></g></g></svg>
                </Link>
                <Link to={`/issuelist`} onClick={e => {activeLink(e)}} className='navigation-link'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="list"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><circle cx="4" cy="7" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="17" r="1"/><rect x="7" y="11" width="14" height="2" rx=".94" ry=".94"/><rect x="7" y="16" width="14" height="2" rx=".94" ry=".94"/><rect x="7" y="6" width="14" height="2" rx=".94" ry=".94"/></g></g></svg>
                </Link>
                <Link to='/registerwebsite' onClick={e => {activeLink(e)}} className='navigation-link'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="plus"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z"/></g></g></svg>
                </Link>
                <Link to={`/user/${user.username}`} onClick={e => {activeLink(e)}} className='navigation-link'>
                    {user && user._id ? 
                        <div className="profile-picture-wrapper gradient-border">
                            <img className='profile-picture' src={`${profilePictureRoute}/${user._id}`} alt="" />
                        </div>: null}
                </Link>
            </footer>    
            : null}
        </>
    )
}

export default Footer;