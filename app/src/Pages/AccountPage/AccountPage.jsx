import {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { getProfilePictureRoute } from '../../utils/APIRoutes';
import { ProfilePictureSkeleton, UsernameSkeleton } from '../../Skeletons/Skeletons';
import useUsers from '../../utils/useUsers';
import useIssues from '../../utils/useIssues';
import IssuesWrapper from '../../Components/IssuesWrapper/IssuesWrapper';
import './AccountPage.css';

function AccountPage() {
    const {username} = useParams();
    const {user} = useUsers(username);
    const {issues} = useIssues(username);
    const navigate = useNavigate();

    useEffect(() => {
        if(!document.cookie.split('=')[1]) {
            navigate('/register')
        }
    },[navigate])
    

    return(
        <section id="account-page">
            {user ?
            <>
            <div className="user"> 
                {user ? 
                    <>
                        <div className="profile-picture-wrapper gradient-border">
                            <img src={`${getProfilePictureRoute}/${user._id}`} alt="" className="profile-picture" />
                        </div>
                        <p className="username gradient-text">{user.username}</p>
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