import {Link, useParams} from 'react-router-dom';
import useIssues from '../../utils/useIssues';
import { IssueScreenshotRoute, getProfilePictureRoute } from '../../utils/APIRoutes';
import './IssuePage.css';
import useUsers from '../../utils/useUsers';

function IssuePage() {
    const {id} = useParams();
    const issue = useIssues(null,id);
    const user = useUsers(issue.openedBy)
    console.log(`${IssueScreenshotRoute}/${id}`)
    
    return(
        <>
        {issue && user ?
            <section id="issue-page">
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
                    <p className="issue-description">{issue.description}</p>
                    <p className="link-hint">A link to the issue can be found <a className='gradient-text' href={issue.link}>here</a></p>
                </div>
            </section> 
        : ''}
        </>
    )
}

export default IssuePage;