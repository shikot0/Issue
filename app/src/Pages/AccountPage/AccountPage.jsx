import {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { profilePictureRoute } from '../../utils/APIRoutes';
import { ProfilePictureSkeleton, UsernameSkeleton } from '../../Skeletons/Skeletons';
import useUsers from '../../utils/useUsers';
import useIssues from '../../utils/useIssues';
import IssuesWrapper from '../../Components/IssuesWrapper/IssuesWrapper';
import './AccountPage.css';

function AccountPage() {
    const {username} = useParams();
    const {user, noUsers} = useUsers(username);
    const {user: currentUser} = useUsers();
    const {issues} = useIssues(username);
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem('token')) {
            navigate('/register')
        }
    },[navigate])

    function logout() {
        // document.cookie = `token=; expires=Thu, 01 Jan 1970T00:00:00Z;`
        localStorage.removeItem('token');
        navigate('/register');
    }
    

    return(
        <section id="account-page">
            {!noUsers ?
            <>
            <div className="user"> 
                {user ? 
                    <>
                        <div className="profile-picture-wrapper gradient-border">
                            <img src={`${profilePictureRoute}/${user._id}`} alt="" className="profile-picture" />
                        </div>
                        <p className="username gradient-text">{user.username}</p>
                        {user.username === currentUser.username ? <button className='logout-button' onClick={logout}>logout</button> : null}
                    </>
                    : null
                }
                {!user ? 
                <>
                    <ProfilePictureSkeleton/>
                    <UsernameSkeleton/>
                </>    
                : null}
            </div>
            <IssuesWrapper issues={issues}/>
            </>
            : <h3 className='not-found-hint'>Sorry this user could not be found.</h3>}
        </section>
    )
}

export default AccountPage;