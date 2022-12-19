import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { getProfilePictureRoute, getAllIssuesRoute } from '../../utils/APIRoutes';
import { ProfilePictureSkeleton, UsernameSkeleton } from '../../Skeletons/Skeletons';
import useUser from '../../utils/useUser';
import './AccountPage.css';
import IssueItem from '../../Components/IssueItem/IssueItem';

function AccountPage() {
    const [issues, setIssues] = useState([]);
    const {id} = useParams();
    const user = useUser(id);
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem('user')) {
            navigate('/register')
        }
    },[navigate])
    
    useEffect(() => {
        fetch(`${getAllIssuesRoute}/${id}`)
        .then(res => res.json())
        .then(data => {
            setIssues(data)
        })
    },[id])

    return(
        <section id="account-page">
            <div className="user">
                {user ? 
                <>
                    <div className="profile-picture-wrapper">
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
            {issues.length !== 0 ? 
                <div className="issues-grid">
                    {issues.map((issue,index) => {
                        return <IssueItem key={index} issue={issue}/>
                    })}
                </div>
            : null}
            {issues.length === 0 ?
                <h3 className='no-issues-hint'>This user has no issues.</h3> 
            : null}
        </section>
    )
}

export default AccountPage;