import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { getProfilePictureRoute, getAllIssuesRoute } from '../../utils/APIRoutes';
import { ProfilePictureSkeleton, UsernameSkeleton } from '../../Skeletons/Skeletons';
import {motion, AnimatePresence} from 'framer-motion';
import useUser from '../../utils/useUser';
import './AccountPage.css';
import IssueItem from '../../Components/IssueItem/IssueItem';

function AccountPage() {
    const [issues, setIssues] = useState([]);
    const [noIssues, setNoIssues] = useState(false);
    const [filter, setFilter] = useState('');
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
            setIssues(data);
            if(data.length === 0) {
                setNoIssues(true);
            }
        })
    },[id])

    function handleFilter(e) {
        setFilter(e.target.value);
        let filterButtons = document.querySelectorAll('.filter-button');
        filterButtons.forEach(button => {
            button.classList.remove('selected');
        })
        e.target.classList.add('selected');
    }
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
                    <div className="issues-grid-wrapper">
                        <div className="filter-buttons-wrapper">
                            <button type='button' className="filter-button selected" value={''} onClick={handleFilter}>All</button>
                            <button type='button' className="filter-button" value={'resolved'} onClick={handleFilter}>Resolved</button>
                            <button type='button' className="filter-button" value={'pending'} onClick={handleFilter}>Pending</button>
                        </div>
                    <motion.div layout className="issues-grid">
                        {/* <AnimatePresence> */}
                            {issues.filter(issue => {
                                if(filter === 'resolved') {
                                    return issue.resolved === true;
                                }else if(filter === 'pending') {
                                    return issue.resolved === false;
                                }
                                else {
                                    return issue;
                                }
                            }).map((issue,index) => {
                                return <IssueItem key={index} issue={issue}/>
                            })}
                        {/* </AnimatePresence> */}
                    </motion.div>
                </div>
            : null}
            {noIssues? 
                <h3 className='no-issues-hint'>This user has no issues.</h3> 
            : null}
        </section>
    )
}

export default AccountPage;