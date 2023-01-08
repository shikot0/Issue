import {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import { getProfilePictureRoute } from '../../utils/APIRoutes';
import { ProfilePictureSkeleton, UsernameSkeleton } from '../../Skeletons/Skeletons';
import {motion} from 'framer-motion';
import useUsers from '../../utils/useUsers';
import useIssues from '../../utils/useIssues';
import './AccountPage.css';
import IssueItem from '../../Components/IssueItem/IssueItem';

function AccountPage() {
    const [noIssues, setNoIssues] = useState(false);
    const [filter, setFilter] = useState('');
    const {username} = useParams();
    const user = useUsers(username);
    const issues = useIssues(username);
    const navigate = useNavigate();

    useEffect(() => {
        if(!document.cookie.split('=')[1]) {
            navigate('/register')
        }
    },[navigate])
    
    
    useEffect(() => {
        if(issues.length === 0) {
            setNoIssues(true);
        }else {
            setNoIssues(false);
        }
    },[issues])

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
                                // return <IssueItem key={index} issue={issue}/>
                                return <Link to={`/issue/${issue._id}`} key={index}><IssueItem issue={issue}/></Link>
                            })}
                        {/* </AnimatePresence> */}
                    </motion.div>
                </div>
            : null}
            {noIssues ? 
                <h3 className='no-issues-hint'>This user has no issues.</h3> 
            : null}
        </section>
    )
}

export default AccountPage;