import {Link, useParams} from 'react-router-dom';
import useIssues from '../../utils/useIssues';
import { IssueScreenshotRoute } from '../../utils/APIRoutes';
import './IssuePage.css';

function IssuePage() {
    const {id} = useParams();
    const issue = useIssues(null,id);
    // const test: string = 'test'
    console.log(`${IssueScreenshotRoute}/${id}`)
    
    return(
        <>
        {issue ?
            <section id="issue-page">
                <div className="issue">
                    <Link to={`/u/${issue.openedBy}`} className="issue-creator">{issue.openedBy}</Link>
                    <div className="issue-screenshot-wrapper">
                        <img src={`${IssueScreenshotRoute}/${id}`} className="issue-screenshot" alt='issue'/>
                    </div>
                    <div className="issue-details">
                        <div className="issue-name"></div>
                        <div className="issue-description"></div>
                    </div>
                </div>
            </section> 
        : ''}
        </>
    )
}

export default IssuePage;