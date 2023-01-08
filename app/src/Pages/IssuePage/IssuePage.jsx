import {Link, useParams} from 'react-router-dom';
import useIssues from '../../utils/useIssues';
import { IssueScreenshotRoute, getProfilePictureRoute } from '../../utils/APIRoutes';
import useUsers from '../../utils/useUsers';
import {IssueSkeleton} from '../../Skeletons/Skeletons';
import './IssuePage.css';

function IssuePage() {
    const {id} = useParams();
    const issue = useIssues(null,id);
    const user = useUsers(issue.openedBy)
    // console.log(issue.link.slice(0,6))
    
    return(
        <section id="issue-page">
        {issue && user ?
                <div className="issue">
                    <header>
                        <h2 className="issue-name">{issue.name}</h2>
                        <div className="user">
                            <div className="profile-picture-wrapper">
                                <img src={`${getProfilePictureRoute}/${user._id}`} className="profile-picture" alt='user'/>
                            </div>
                            <Link to={`/u/${issue.openedBy}`} className="issue-creator gradient-text">{issue.openedBy}</Link>
                        </div>
                    </header>
                    <div className="issue-screenshot-wrapper">
                        <img src={`${IssueScreenshotRoute}/${id}`} className="issue-screenshot" alt='issue'/>
                    </div>
                    <p className='issue-status'>Status: <span className={issue.resolved ? 'resolved' : 'pending'}>{issue.resolved ? 'Resolved' : 'Pending'}</span></p>
                    <p className="link-hint">Link: <a className='issue-link gradient-text' href={issue.link.slice(0,7) === 'http://' || issue.link.slice(0,8) ==='https://' ? issue.link : `http://${issue.link}`}>{issue.link}</a></p>
                    <p className="issue-description">{issue.description}</p>
                </div>
        : <IssueSkeleton/>}
        {/* <IssueSkeleton/> */}
        </section> 
    )
}

export default IssuePage;